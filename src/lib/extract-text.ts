const MAX_BYTES = 20 * 1024 * 1024;
const MAX_CHARS = 70_000;
const MAX_PDF_PAGES = 60;

export class ExtractError extends Error {
  code: "type" | "size" | "empty" | "read" | "long";

  constructor(code: "type" | "size" | "empty" | "read" | "long") {
    super(code);
    this.code = code;
  }
}

export async function extractDocument(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (!name.endsWith(".docx") && !name.endsWith(".pdf")) throw new ExtractError("type");
  if (file.size > MAX_BYTES) throw new ExtractError("size");

  try {
    const data = await file.arrayBuffer();
    const text = name.endsWith(".docx") ? await extractDocx(data) : await extractPdf(data);
    const cleaned = text.replace(/\n{3,}/g, "\n\n").trim();
    if (cleaned.length < 40) throw new ExtractError("empty");
    if (cleaned.length > MAX_CHARS) throw new ExtractError("long");
    return cleaned;
  } catch (error) {
    if (error instanceof ExtractError) throw error;
    throw new ExtractError("read");
  }
}

async function extractDocx(data: ArrayBuffer): Promise<string> {
  const mod = await import("mammoth");
  const mammoth = (
    "convertToHtml" in mod ? mod : (mod as { default: typeof mod }).default
  ) as {
    convertToHtml: (input: { arrayBuffer: ArrayBuffer }) => Promise<{ value: string }>;
  };
  const result = await mammoth.convertToHtml({ arrayBuffer: data });
  return htmlToText(result.value);
}

function htmlToText(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const parts: string[] = [];
  const nodes = doc.body.querySelectorAll("h1,h2,h3,h4,p,li,blockquote");
  if (nodes.length === 0) return (doc.body.textContent ?? "").replace(/\s+/g, " ").trim();
  nodes.forEach((el) => {
    const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
    if (!text) return;
    if (/^H[1-4]$/.test(el.tagName)) parts.push(`## ${text}`);
    else parts.push(text);
  });
  return parts.join("\n\n");
}

type Glyph = { str: string; x: number; y: number; h: number; dir: string };

async function extractPdf(data: ArrayBuffer): Promise<string> {
  const pdfjs = await import("pdfjs-dist");
  const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  const doc = await pdfjs.getDocument({ data: new Uint8Array(data) }).promise;
  if (doc.numPages > MAX_PDF_PAGES) {
    await doc.cleanup();
    throw new ExtractError("long");
  }
  const pages: string[] = [];
  for (let index = 1; index <= doc.numPages; index += 1) {
    const page = await doc.getPage(index);
    const content = await page.getTextContent();
    const glyphs: Glyph[] = [];
    for (const item of content.items) {
      if (!("str" in item) || !item.str) continue;
      const height = Math.hypot(item.transform[2] ?? 0, item.transform[3] ?? 0) || item.height || 12;
      glyphs.push({
        str: item.str,
        x: item.transform[4] ?? 0,
        y: item.transform[5] ?? 0,
        h: height,
        dir: item.dir,
      });
    }
    const text = glyphsToText(glyphs);
    if (text) pages.push(text);
  }
  await doc.cleanup();
  return pages.join("\n\n");
}

function glyphsToText(glyphs: Glyph[]): string {
  const lines: { y: number; h: number; items: Glyph[] }[] = [];
  const sorted = [...glyphs].sort((a, b) => b.y - a.y || a.x - b.x);
  for (const glyph of sorted) {
    const line = lines.find((entry) => Math.abs(entry.y - glyph.y) < Math.max(2.5, glyph.h * 0.45));
    if (line) {
      line.items.push(glyph);
      line.h = Math.max(line.h, glyph.h);
    } else {
      lines.push({ y: glyph.y, h: glyph.h, items: [glyph] });
    }
  }

  const rows: { y: number; h: number; text: string }[] = [];
  for (const line of lines) {
    const rtl = line.items.filter((item) => item.dir === "rtl").length > line.items.length / 2;
    const ordered = [...line.items].sort((a, b) => (rtl ? b.x - a.x : a.x - b.x));
    const text = ordered
      .map((item) => item.str)
      .join("")
      .replace(/\s+/g, " ")
      .trim();
    if (text) rows.push({ y: line.y, h: line.h, text });
  }
  rows.sort((a, b) => b.y - a.y);

  const paragraphs: string[] = [];
  let buf = "";
  let prev: { y: number; h: number } | null = null;
  for (const row of rows) {
    const gap = prev ? prev.y - row.y : 0;
    const broke = prev !== null && gap > prev.h * 1.45;
    if (broke) {
      if (buf) paragraphs.push(buf);
      buf = row.text;
    } else if (!buf) {
      buf = row.text;
    } else if (buf.endsWith("-") && /^[a-zà-žа-яіїєґ]/i.test(row.text)) {
      buf = buf.slice(0, -1) + row.text;
    } else {
      buf = `${buf} ${row.text}`;
    }
    prev = row;
  }
  if (buf) paragraphs.push(buf);
  return paragraphs.join("\n\n");
}
