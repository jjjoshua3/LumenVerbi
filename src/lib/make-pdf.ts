import type { ScriptKey } from "@/lib/i18n";
import type { SermonBlock } from "@/lib/sermon";

const PAGE_W = 794;
const PAGE_H = 1123;
const PAD_X = 68;
const PAD_TOP = 58;
const FOOT_SPACE = 64;
const CONTENT_MAX = PAGE_H - PAD_TOP - FOOT_SPACE;

type Piece = { kind: "h" | "p"; text: string; height: number };

function fontQuery(script: ScriptKey): { family: string; param: string } {
  if (script === "arab") return { family: "Noto Naskh Arabic", param: "Noto+Naskh+Arabic" };
  if (script === "nast") return { family: "Noto Nastaliq Urdu", param: "Noto+Nastaliq+Urdu" };
  if (script === "syrc") return { family: "Noto Sans Syriac", param: "Noto+Sans+Syriac" };
  if (script === "serto") return { family: "Noto Sans Syriac Western", param: "Noto+Sans+Syriac+Western" };
  if (script === "ethi") return { family: "Noto Sans Ethiopic", param: "Noto+Sans+Ethiopic" };
  return { family: "Noto Serif", param: "Noto+Serif" };
}

function complex(script: ScriptKey): boolean {
  return script === "arab" || script === "nast" || script === "syrc" || script === "serto" || script === "ethi";
}

function bufToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const step = 0x4000;
  for (let index = 0; index < bytes.length; index += step) {
    binary += String.fromCharCode(...bytes.subarray(index, index + step));
  }
  return btoa(binary);
}

async function subsetCss(param: string, text: string): Promise<string> {
  const unique = Array.from(new Set(text)).join("");
  const slices: string[] = [];
  for (let index = 0; index < unique.length; index += 120) slices.push(unique.slice(index, index + 120));
  if (slices.length === 0) slices.push("LumenVerbi");

  const sheets = await Promise.all(
    slices.map(async (slice) => {
      const url = `https://fonts.googleapis.com/css2?family=${param}:wght@400;700&text=${encodeURIComponent(slice)}&display=swap`;
      const css = await fetch(url).then((response) => {
        if (!response.ok) throw new Error("font");
        return response.text();
      });
      const urls = [...css.matchAll(/url\((https:[^)]+)\)/g)].map((match) => match[1] ?? "");
      let next = css;
      for (const fontUrl of urls) {
        if (!fontUrl || next.includes(`url(data:`)) {
          /* still replace each */
        }
        const fontRes = await fetch(fontUrl);
        if (!fontRes.ok) throw new Error("font");
        const b64 = bufToBase64(await fontRes.arrayBuffer());
        const mime = fontUrl.includes("woff2") ? "font/woff2" : "font/ttf";
        next = next.replaceAll(fontUrl, `data:${mime};base64,${b64}`);
      }
      return next;
    }),
  );
  return sheets.join("\n");
}

function lastBreak(value: string, index: number): number {
  const slice = value.slice(0, Math.max(1, index));
  const breaks = [" ", "\u00a0", "،", "؛", "።", "፣", "܂"].map((mark) => slice.lastIndexOf(mark));
  const at = Math.max(...breaks);
  return at > 24 ? at : index;
}

export async function downloadSermonPdf(options: {
  blocks: SermonBlock[];
  credit: string;
  dir: "rtl" | "ltr";
  script: ScriptKey;
  filename: string;
}): Promise<void> {
  const { family, param } = fontQuery(options.script);
  const sample = `${options.blocks.map((block) => block.text).join("\n")}\n${options.credit}\nLumenVerbi ©0123456789`;
  const fontCss = await subsetCss(param, sample);

  const style = document.createElement("style");
  style.setAttribute("data-lumen-font", "1");
  style.textContent = fontCss;
  document.head.appendChild(style);

  try {
    await Promise.all([
      document.fonts.load(`400 18px "${family}"`),
      document.fonts.load(`700 22px "${family}"`),
      document.fonts.ready,
    ]);
  } catch {
    /* measurement still uses fallback if the face is slow */
  }

  const isComplex = complex(options.script);
  const bodySize = options.script === "nast" ? 22 : isComplex ? 20 : 17;
  const bodyLine = options.script === "nast" ? 2.45 : isComplex ? 1.9 : 1.65;
  const headSize = options.script === "nast" ? 28 : isComplex ? 26 : 22;
  const headLine = options.script === "nast" ? 1.8 : 1.35;
  const pCss = `margin:0 0 14px;font-size:${bodySize}px;line-height:${bodyLine};font-weight:400;font-family:"${family}",serif;`;
  const hCss = `margin:6px 0 12px;font-size:${headSize}px;line-height:${headLine};font-weight:700;font-family:"${family}",serif;`;

  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = "position:fixed;left:-12000px;top:0;width:794px;";
  const probe = document.createElement("div");
  probe.style.cssText = `width:${PAGE_W - PAD_X * 2}px;font-family:"${family}",serif;`;
  probe.dir = options.dir;
  host.appendChild(probe);
  document.body.appendChild(host);

  const heightOf = (kind: "h" | "p", text: string) => {
    const el = document.createElement(kind === "h" ? "h2" : "p");
    el.textContent = text;
    el.style.cssText = kind === "h" ? hCss : pCss;
    probe.appendChild(el);
    const height = el.offsetHeight;
    el.remove();
    return height || (kind === "h" ? 36 : 28);
  };

  const split = (kind: "h" | "p", text: string, max: number): string[] => {
    if (heightOf(kind, text) <= max) return [text];
    const parts: string[] = [];
    let rest = text.trim();
    let guard = 0;
    while (rest && guard < 80) {
      guard += 1;
      if (heightOf(kind, rest) <= max) {
        parts.push(rest);
        break;
      }
      let lo = 1;
      let hi = rest.length;
      let best = 0;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        const cut = lastBreak(rest, mid);
        const slice = rest.slice(0, cut).trim();
        if (slice && heightOf(kind, slice) <= max) {
          best = cut;
          lo = mid + 1;
        } else {
          hi = mid - 1;
        }
      }
      if (best < 8) {
        const forced = rest.slice(0, Math.min(rest.length, 80)).trim() || rest.slice(0, 1);
        parts.push(forced);
        rest = rest.slice(forced.length).trim();
        continue;
      }
      parts.push(rest.slice(0, best).trim());
      rest = rest.slice(best).trim();
    }
    return parts.filter(Boolean);
  };

  const pieces: Piece[] = [];
  for (const block of options.blocks) {
    for (const text of split(block.kind, block.text, CONTENT_MAX - 8)) {
      pieces.push({ kind: block.kind, text, height: heightOf(block.kind, text) });
    }
  }

  const pages: Piece[][] = [];
  let current: Piece[] = [];
  let used = 0;
  pieces.forEach((piece, index) => {
    const next = pieces[index + 1];
    const reserve = piece.kind === "h" && next ? Math.min(next.height, 72) : 0;
    if (current.length && used + piece.height + reserve > CONTENT_MAX) {
      pages.push(current);
      current = [];
      used = 0;
    }
    current.push(piece);
    used += piece.height;
  });
  if (current.length) pages.push(current);
  if (pages.length === 0) {
    host.remove();
    style.remove();
    throw new Error("empty");
  }

  const pageNodes = pages.map((items) => {
    const page = document.createElement("div");
    page.dir = options.dir;
    page.style.cssText = [
      `width:${PAGE_W}px`,
      `height:${PAGE_H}px`,
      "box-sizing:border-box",
      "background:#FAF8F5",
      "color:#1A1D24",
      `padding:${PAD_TOP}px ${PAD_X}px 0`,
      `font-family:"${family}",serif`,
      "position:relative",
      "overflow:hidden",
    ].join(";");

    const brand = document.createElement("div");
    brand.textContent = "LumenVerbi";
    brand.style.cssText = `font-family:"${family}",serif;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#D97706;font-weight:700;margin:0 0 18px;`;
    page.appendChild(brand);

    for (const item of items) {
      const el = document.createElement(item.kind === "h" ? "h2" : "p");
      el.textContent = item.text;
      el.style.cssText = `${item.kind === "h" ? hCss : pCss}color:${item.kind === "h" ? "#9A3412" : "#1A1D24"};`;
      page.appendChild(el);
    }

    const foot = document.createElement("div");
    foot.textContent = options.credit;
    foot.style.cssText = [
      "position:absolute",
      `left:${PAD_X}px`,
      `right:${PAD_X}px`,
      "bottom:22px",
      "border-top:1px solid #E6DFD4",
      "padding-top:8px",
      "text-align:center",
      "font-size:12px",
      "line-height:1.45",
      "color:#5C564E",
      `font-family:"${family}",serif`,
    ].join(";");
    page.appendChild(foot);
    host.appendChild(page);
    return page;
  });

  const { toCanvas } = await import("html-to-image");
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();

  for (let index = 0; index < pageNodes.length; index += 1) {
    const node = pageNodes[index];
    if (!node) continue;
    const canvas = await toCanvas(node, {
      pixelRatio: 2,
      backgroundColor: "#FAF8F5",
      width: PAGE_W,
      height: PAGE_H,
      fontEmbedCSS: fontCss,
      cacheBust: false,
    });
    if (index > 0) pdf.addPage();
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, width, height);
  }

  host.remove();
  style.remove();
  pdf.save(options.filename);
}

export function pdfFilename(original: string): string {
  const base = original
    .replace(/\.[^.]+$/, "")
    .replace(/[^\p{L}\p{N}\-_]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return `${base || "preek"}-LumenVerbi.pdf`;
}
