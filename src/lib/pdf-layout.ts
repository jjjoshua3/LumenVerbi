import type { ScriptKey } from "@/lib/i18n";
import { pdfOpenOptions } from "@/lib/extract-text";

export type LayoutBox = {
  id: number;
  page: number;
  font: number;
  text: string;
  slots: { x: number; y: number; w: number; h: number }[];
};

export type PdfLayout = {
  marked: string;
  boxes: LayoutBox[];
};

type ImageBox = { x: number; y: number; w: number; h: number };
type RawItem = { x: number; y: number; w: number; h: number; s: string };

const CHUNK = 2800;
const MAX_CHUNKS = 10;

export function chunkMarked(text: string): string[] | null {
  const blocks = text.trim().split(/\n{2,}(?=\[\[\d+\]\])/);
  if (!blocks.length || !blocks[0]?.startsWith("[[")) return null;
  const chunks: string[] = [];
  let buf = "";
  for (const block of blocks) {
    if (block.length > CHUNK) return null;
    const next = buf ? `${buf}\n\n${block}` : block;
    if (next.length > CHUNK) {
      if (buf) chunks.push(buf);
      buf = block;
    } else {
      buf = next;
    }
  }
  if (buf) chunks.push(buf);
  if (!chunks.length || chunks.length > MAX_CHUNKS) return null;
  return chunks;
}

export function stripMarkers(text: string): string {
  return text
    .replace(/\[\[\d+\]\]/g, "")
    .replace(/^#{1,3}\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function parseMarkerMap(translated: string, boxes: LayoutBox[]): Map<number, string> | null {
  const cleaned = translated.replace(/^\s*```[\w]*\n/, "").replace(/\n```\s*$/, "").trim();
  const parts = cleaned.split(/\[\[(\d+)\]\]/);
  const map = new Map<number, string>();
  for (let index = 1; index < parts.length; index += 2) {
    const id = Number(parts[index]);
    const text = (parts[index + 1] ?? "").replace(/^#{1,3}\s+/gm, "").replace(/\s+/g, " ").trim();
    if (id && text) map.set(id, text);
  }
  if (map.size === boxes.length && boxes.every((box) => map.has(box.id))) return map;
  const bodies = parts.filter((_, index) => index % 2 === 0).map((part) => part.replace(/\s+/g, " ").trim()).filter(Boolean);
  if (bodies.length === boxes.length) {
    const zipped = new Map<number, string>();
    boxes.forEach((box, index) => {
      const text = bodies[index];
      if (text) zipped.set(box.id, text);
    });
    if (zipped.size === boxes.length) return zipped;
  }
  return null;
}

function overlaps(a: ImageBox, b: ImageBox): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function boxesFromPage(items: RawItem[], images: ImageBox[], pageWidth: number, pageHeight: number, page: number, startId: number): LayoutBox[] | null {
  const raw = items.filter((item) => {
    const cx = item.x + item.w / 2;
    const cy = item.y + item.h * 0.35;
    if (images.some((image) => cx > image.x + 2 && cx < image.x + image.w - 2 && cy > image.y + 2 && cy < image.y + image.h - 2)) {
      return false;
    }
    if (/^\d{1,3}$/.test(item.s.trim()) && item.y > pageHeight - 70 && item.w < 36) return false;
    return true;
  });
  if (raw.length < 3) return [];
  raw.sort((a, b) => b.y - a.y || a.x - b.x);

  const lines: { y: number; h: number; items: RawItem[] }[] = [];
  for (const item of raw) {
    const line = lines.find((entry) => Math.abs(entry.y - item.y) < Math.max(2, item.h * 0.4));
    if (line) {
      line.items.push(item);
      line.h = Math.max(line.h, item.h);
      line.y = Math.max(line.y, item.y);
    } else {
      lines.push({ y: item.y, h: item.h, items: [item] });
    }
  }

  const rows = lines.map((line) => {
    const ordered = [...line.items].sort((a, b) => a.x - b.x);
    let text = "";
    let prevRight: number | null = null;
    for (const item of ordered) {
      if (prevRight !== null && item.x - prevRight > 2.5) text += " ";
      text += item.s;
      prevRight = item.x + item.w;
    }
    return {
      x: Math.min(...ordered.map((item) => item.x)),
      right: Math.max(...ordered.map((item) => item.x + item.w)),
      y: line.y,
      h: line.h,
      text: text.replace(/\s+/g, " ").trim(),
    };
  }).filter((row) => row.text);

  if (rows.length < 2) return [];
  const gaps: number[] = [];
  for (let index = 1; index < rows.length; index += 1) {
    const gap = rows[index - 1]!.y - rows[index]!.y;
    if (gap > 6 && gap < 20) gaps.push(gap);
  }
  gaps.sort((a, b) => a - b);
  const lineGap = gaps[Math.floor(gaps.length / 2)] ?? 14;

  type Group = { rows: typeof rows; font: number };
  const groups: Group[] = [];
  let current: Group | null = null;
  for (const row of rows) {
    const previous = current?.rows[current.rows.length - 1];
    const gap = previous ? previous.y - row.y : 0;
    if (!current || gap > lineGap * 1.45) {
      current = { rows: [row], font: row.h };
      groups.push(current);
    } else {
      current.rows.push(row);
      current.font = Math.max(current.font, row.h);
    }
  }

  const longs = rows.filter((row) => row.right - row.x > pageWidth * 0.45);
  const rights = (longs.length ? longs : rows).map((row) => row.right).sort((a, b) => a - b);
  const colRight = rights[Math.floor(rights.length * 0.8)] ?? pageWidth - 56;

  const boxes: LayoutBox[] = [];
  for (const group of groups) {
    const text = group.rows.map((row) => row.text).join(" ").replace(/\s+/g, " ").trim();
    if (!text) continue;
    const slots = group.rows.map((row) => {
      let right = Math.max(row.right, colRight);
      for (const image of images) {
        const vertical = row.y < image.y + image.h && row.y + row.h > image.y;
        if (vertical && image.x > row.x + 8) right = Math.min(right, image.x - 3);
      }
      right = Math.max(right, row.right);
      return { x: row.x - 1, y: row.y - 2, w: Math.max(20, right - row.x + 2), h: row.h + 3 };
    });
    const blocked = slots.some((slot) =>
      images.some((image) => overlaps(slot, image) && overlapArea(slot, image) > slot.w * slot.h * 0.25),
    );
    if (blocked) return null;
    boxes.push({
      id: startId + boxes.length,
      page,
      font: group.font >= 13 ? group.font : Math.min(group.font, 12),
      text,
      slots,
    });
  }
  return boxes;
}

function overlapArea(a: ImageBox, b: ImageBox): number {
  const width = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
  const height = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  return width * height;
}

type Pdfjs = typeof import("pdfjs-dist/legacy/build/pdf.mjs");

async function loadPdfjs(): Promise<Pdfjs> {
  const pdfjs = (await import("pdfjs-dist")) as unknown as Pdfjs;
  if (typeof window !== "undefined") {
    const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
    pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  }
  return pdfjs;
}

function imageBoxes(pdfjs: Pdfjs, ops: { fnArray: number[]; argsArray: unknown[][] }): ImageBox[] {
  const stack: number[][] = [];
  let ctm = [1, 0, 0, 1, 0, 0];
  const mul = (a: number[], b: number[]) => [
    a[0]! * b[0]! + a[2]! * b[1]!,
    a[1]! * b[0]! + a[3]! * b[1]!,
    a[0]! * b[2]! + a[2]! * b[3]!,
    a[1]! * b[2]! + a[3]! * b[3]!,
    a[0]! * b[4]! + a[2]! * b[5]! + a[4]!,
    a[1]! * b[4]! + a[3]! * b[5]! + a[5]!,
  ];
  const images: ImageBox[] = [];
  for (let index = 0; index < ops.fnArray.length; index += 1) {
    const fn = ops.fnArray[index];
    const args = ops.argsArray[index] ?? [];
    if (fn === pdfjs.OPS.save) stack.push(ctm.slice());
    else if (fn === pdfjs.OPS.restore) ctm = stack.pop() ?? [1, 0, 0, 1, 0, 0];
    else if (fn === pdfjs.OPS.transform) ctm = mul(ctm, args as number[]);
    else if (fn === pdfjs.OPS.paintImageXObject || fn === pdfjs.OPS.paintInlineImageXObject) {
      images.push({
        x: ctm[4] ?? 0,
        y: ctm[5] ?? 0,
        w: Math.hypot(ctm[0] ?? 0, ctm[1] ?? 0),
        h: Math.hypot(ctm[2] ?? 0, ctm[3] ?? 0),
      });
    }
  }
  return images;
}

export async function readPdfLayout(data: ArrayBuffer): Promise<PdfLayout | null> {
  try {
    const pdfjs = await loadPdfjs();
    const doc = await pdfjs.getDocument(pdfOpenOptions(data.slice(0))).promise;
    if (doc.numPages > 40) {
      await doc.cleanup();
      return null;
    }
    const boxes: LayoutBox[] = [];
    for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber += 1) {
      const page = await doc.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1 });
      const content = await page.getTextContent();
      const ops = await page.getOperatorList();
      const images = imageBoxes(pdfjs, ops);
      const items: RawItem[] = [];
      for (const item of content.items) {
        if (!("str" in item) || !item.str.trim()) continue;
        const transform = item.transform;
        items.push({
          x: transform[4] ?? 0,
          y: transform[5] ?? 0,
          w: item.width || 0,
          h: Math.hypot(transform[2] ?? 0, transform[3] ?? 0) || item.height || 11,
          s: item.str,
        });
      }
      const pageBoxes = boxesFromPage(items, images, viewport.width, viewport.height, pageNumber, boxes.length + 1);
      if (!pageBoxes) {
        await doc.cleanup();
        return null;
      }
      boxes.push(...pageBoxes);
    }
    await doc.cleanup();
    if (boxes.length < 2) return null;
    const marked = boxes.map((box) => `[[${box.id}]]\n${box.text}`).join("\n\n");
    if (!chunkMarked(marked)) return null;
    return { marked, boxes };
  } catch {
    return null;
  }
}

function fontQuery(script: ScriptKey): { family: string; param: string } {
  if (script === "arab") return { family: "Noto Naskh Arabic", param: "Noto+Naskh+Arabic" };
  if (script === "nast") return { family: "Noto Nastaliq Urdu", param: "Noto+Nastaliq+Urdu" };
  if (script === "syrc") return { family: "Noto Sans Syriac", param: "Noto+Sans+Syriac" };
  if (script === "serto") return { family: "Noto Sans Syriac Western", param: "Noto+Sans+Syriac+Western" };
  if (script === "ethi") return { family: "Noto Sans Ethiopic", param: "Noto+Sans+Ethiopic" };
  return { family: "Noto Serif", param: "Noto+Serif" };
}

async function ensureFont(family: string, param: string): Promise<void> {
  const id = `lumen-face-${param}`;
  if (!document.getElementById(id)) {
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${param}:wght@400;700&display=swap`;
    document.head.appendChild(link);
  }
  await document.fonts.load(`400 16px "${family}"`);
  await document.fonts.load(`700 16px "${family}"`);
  await document.fonts.ready;
}

function pour(ctx: CanvasRenderingContext2D, text: string, widths: number[]): string[] | null {
  const words = text.split(/\s+/).filter(Boolean);
  let index = 0;
  const lines: string[] = [];
  for (const width of widths) {
    let current = "";
    while (index < words.length) {
      const word = words[index] ?? "";
      const next = current ? `${current} ${word}` : word;
      if (current && ctx.measureText(next).width > width) break;
      current = next;
      index += 1;
    }
    lines.push(current);
  }
  if (index < words.length) return null;
  return lines;
}

export async function downloadLayoutPdf(options: {
  data: ArrayBuffer;
  boxes: LayoutBox[];
  texts: Map<number, string>;
  dir: "rtl" | "ltr";
  script: ScriptKey;
  credit: string;
  filename: string;
}): Promise<void> {
  const { family, param } = fontQuery(options.script);
  await ensureFont(family, param);
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument(pdfOpenOptions(options.data.slice(0))).promise;
  const { jsPDF } = await import("jspdf");
  let pdf: InstanceType<typeof jsPDF> | null = null;
  const scale = 2;
  let cramped = 0;

  for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber += 1) {
    const page = await doc.getPage(pageNumber);
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas");
    await page.render({ canvas, viewport, annotationMode: 0 }).promise;

    const pageBoxes = options.boxes.filter((box) => box.page === pageNumber);
    const rtl = options.dir === "rtl";
    let lowest = base.height;
    for (const box of pageBoxes) {
      const text = options.texts.get(box.id) ?? "";
      if (!text || box.slots.length === 0) continue;
      ctx.fillStyle = "#ffffff";
      for (const slot of box.slots) {
        lowest = Math.min(lowest, slot.y);
        const x = slot.x * scale;
        const y = (base.height - slot.y - slot.h) * scale;
        ctx.fillRect(x, y, slot.w * scale, slot.h * scale);
      }
      const min = (box.font >= 13 ? 10 : 8) * scale;
      let size = box.font * scale;
      let lines: string[] | null = null;
      const bold = box.font >= 13 ? "700 " : "";
      while (size >= min) {
        ctx.font = `${bold}${size}px "${family}", serif`;
        lines = pour(ctx, text, box.slots.map((slot) => Math.max(12, slot.w * scale - 8)));
        if (lines) break;
        size -= 0.5;
      }
      if (!lines) {
        cramped += 1;
        ctx.font = `${bold}${min}px "${family}", serif`;
        lines = pour(ctx, text, box.slots.map((slot) => Math.max(12, slot.w * scale - 8))) ?? [];
      }
      ctx.fillStyle = "#1A1D24";
      ctx.font = `${bold}${size}px "${family}", serif`;
      ctx.direction = rtl ? "rtl" : "ltr";
      ctx.textAlign = rtl ? "right" : "left";
      ctx.textBaseline = "top";
      box.slots.forEach((slot, index) => {
        const line = lines?.[index];
        if (!line) return;
        const x = slot.x * scale;
        const y = (base.height - slot.y - slot.h) * scale;
        const textX = rtl ? x + slot.w * scale - 4 : x + 4;
        ctx.fillText(line, textX, y + 1);
      });
    }

    if (lowest > 36) {
      ctx.direction = "ltr";
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#5C564E";
      ctx.font = `400 ${10 * scale}px "${family}", serif`;
      ctx.fillText(options.credit, canvas.width / 2, canvas.height - 16 * scale);
    }

    if (!pdf) pdf = new jsPDF({ unit: "pt", format: [base.width, base.height], compress: true });
    else pdf.addPage([base.width, base.height]);
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.86), "JPEG", 0, 0, base.width, base.height);
  }

  await doc.cleanup();
  if (!pdf) throw new Error("empty");
  if (cramped > 0) throw new Error("cramped");
  pdf.save(options.filename);
}
