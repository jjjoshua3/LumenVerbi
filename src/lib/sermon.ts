export type SermonBlock = { kind: "h" | "p"; text: string };

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function parseSermon(raw: string): SermonBlock[] {
  const cleaned = raw
    .replace(/^\uFEFF/, "")
    .replace(/\r\n/g, "\n")
    .replace(/^\s*```[\w]*\n/, "")
    .replace(/\n```\s*$/, "")
    .trim();

  const blocks: SermonBlock[] = [];
  let buffer: string[] = [];

  const flush = () => {
    const text = buffer.join(" ").replace(/\s+/g, " ").trim();
    buffer = [];
    if (text) blocks.push({ kind: "p", text: stripMarks(text) });
  };

  for (const line of cleaned.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) {
      flush();
      continue;
    }
    const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed);
    if (heading) {
      flush();
      const text = stripMarks(heading[2] ?? "");
      if (text.length > 180) blocks.push({ kind: "p", text });
      else if (text) blocks.push({ kind: "h", text });
      continue;
    }
    buffer.push(trimmed);
  }
  flush();
  return blocks;
}

function stripMarks(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/(^|\s)\*(.+?)\*(?=\s|$)/g, "$1$2").trim();
}

const CHUNK = 7000;
const MAX_CHUNKS = 10;

export function chunkSermon(text: string): string[] | null {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (trimmed.length <= CHUNK) return [trimmed];

  const parts = trimmed.split(/\n{2,}/);
  const chunks: string[] = [];
  let buf = "";

  const pushLong = (piece: string) => {
    let rest = piece;
    while (rest.length > CHUNK) {
      let cut = rest.lastIndexOf(" ", CHUNK);
      if (cut < CHUNK * 0.5) cut = CHUNK;
      chunks.push(rest.slice(0, cut).trim());
      rest = rest.slice(cut).trim();
    }
    if (rest) chunks.push(rest);
  };

  for (const part of parts) {
    const piece = part.trim();
    if (!piece) continue;
    if (piece.length > CHUNK) {
      if (buf) {
        chunks.push(buf);
        buf = "";
      }
      pushLong(piece);
      continue;
    }
    const next = buf ? `${buf}\n\n${piece}` : piece;
    if (next.length > CHUNK) {
      chunks.push(buf);
      buf = piece;
    } else {
      buf = next;
    }
  }
  if (buf) chunks.push(buf);
  if (chunks.length > MAX_CHUNKS) return null;
  return chunks;
}
