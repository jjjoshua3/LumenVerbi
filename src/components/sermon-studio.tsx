import { useRef, useState } from "react";
import { Download, FileText, LoaderCircle, Upload, X } from "lucide-react";
import { LanguageGrid } from "@/components/language-switcher";
import { ExtractError, extractDocument } from "@/lib/extract-text";
import { fill, translationBrief } from "@/lib/i18n";
import { useLocale } from "@/lib/locale";
import { downloadSermonPdf, pdfFilename } from "@/lib/make-pdf";
import { chunkSermon, countWords, parseSermon, type SermonBlock } from "@/lib/sermon";
import { translateChunk } from "@/lib/translate";

type Phase = "idle" | "reading" | "ready" | "translating" | "done";

export function SermonStudio() {
  const { t, lang, srScript, script, dir } = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState("");
  const [source, setSource] = useState("");
  const [blocks, setBlocks] = useState<SermonBlock[]>([]);
  const [doneKey, setDoneKey] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const [pdfError, setPdfError] = useState(false);
  const [makingPdf, setMakingPdf] = useState(false);
  const [ratio, setRatio] = useState(0);

  const localeKey = `${lang}:${lang === "sr" ? srScript : ""}`;
  const stale = phase === "done" && doneKey !== localeKey;

  function messageFor(code: ExtractError["code"] | "ai" | "unavailable" | "long"): string {
    if (code === "type") return t.errorType;
    if (code === "size") return t.errorSize;
    if (code === "empty") return t.errorEmpty;
    if (code === "long") return t.errorLong;
    if (code === "unavailable") return t.errorUnavailable;
    if (code === "ai") return t.errorAi;
    return t.errorRead;
  }

  async function accept(file: File | undefined) {
    if (!file) return;
    setError("");
    setPdfError(false);
    setBlocks([]);
    setPhase("reading");
    setFileName(file.name);
    try {
      const text = await extractDocument(file);
      setSource(text);
      setPhase("ready");
    } catch (caught) {
      setSource("");
      setPhase("idle");
      setError(messageFor(caught instanceof ExtractError ? caught.code : "read"));
    }
  }

  async function translate() {
    if (!source || phase === "translating") return;
    const chunks = chunkSermon(source);
    if (!chunks) {
      setError(t.errorLong);
      return;
    }
    setError("");
    setPdfError(false);
    setPhase("translating");
    setRatio(0);
    const brief = translationBrief(lang, srScript);
    const parts: string[] = [];
    try {
      for (let index = 0; index < chunks.length; index += 1) {
        setProgress(fill(t.part, { n: index + 1, m: chunks.length }));
        setRatio(index / chunks.length);
        const chunk = chunks[index] ?? "";
        const result = await translateChunk({
          data: {
            text: chunk,
            targetName: brief.targetName,
            scriptNote: brief.scriptNote,
            continuation: index > 0,
          },
        });
        if (!result.ok) {
          setPhase(source ? "ready" : "idle");
          setError(result.error === "unavailable" ? t.errorUnavailable : t.errorAi);
          setProgress("");
          return;
        }
        parts.push(result.text);
      }
      const parsed = parseSermon(parts.join("\n\n"));
      if (parsed.length === 0) {
        setPhase("ready");
        setError(t.errorAi);
        return;
      }
      setBlocks(parsed);
      setDoneKey(localeKey);
      setPhase("done");
      setRatio(1);
      setProgress("");
      requestAnimationFrame(() => {
        document.getElementById("preek")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      void savePdf(parsed);
    } catch {
      setPhase(source ? "ready" : "idle");
      setError(t.errorAi);
      setProgress("");
    }
  }

  async function savePdf(next: typeof blocks = blocks) {
    if (!next.length || makingPdf) return;
    setMakingPdf(true);
    setPdfError(false);
    try {
      await downloadSermonPdf({
        blocks: next,
        credit: t.pdfCredit,
        dir,
        script,
        filename: pdfFilename(fileName),
      });
    } catch {
      setPdfError(true);
    } finally {
      setMakingPdf(false);
    }
  }

  async function download() {
    await savePdf();
  }

  function reset() {
    setPhase("idle");
    setSource("");
    setBlocks([]);
    setFileName("");
    setError("");
    setPdfError(false);
    setProgress("");
    setRatio(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  const words = source ? countWords(source) : 0;

  return (
    <section id="vertaal" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="panel p-5 sm:p-8">
        <p className="font-display text-3xl text-ink">{t.howTitle}</p>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {t.steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl bg-parchment px-4 py-4">
              <p className="font-display text-sm tracking-[0.16em] text-amber-deep">0{index + 1}</p>
              <p className="mt-2 font-display text-xl">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 border-t border-line pt-8">
          <LanguageGrid />
        </div>

        <div
          className={`mt-6 rounded-3xl border-2 border-dashed px-4 py-10 text-center transition-colors ${dragOver ? "border-amber bg-gold/15" : "border-amber/40 bg-parchment"}`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragOver(false);
            void accept(event.dataTransfer.files?.[0]);
          }}
        >
          <Upload className="mx-auto h-8 w-8 text-amber-deep" aria-hidden="true" />
          <p className="mt-3 font-display text-2xl">{t.dropTitle}</p>
          <p className="mt-1 text-muted">{t.dropOr}</p>
          <button
            type="button"
            className="btn-ink mt-5"
            onClick={() => inputRef.current?.click()}
            disabled={phase === "reading" || phase === "translating"}
          >
            {phase === "reading" ? t.reading : t.dropTitle}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".docx,.pdf,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={(event) => {
              void accept(event.target.files?.[0] ?? undefined);
            }}
          />
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">{t.dropNote}</p>
        </div>

        {source && phase !== "reading" ? (
          <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-parchment px-4 py-3">
            <FileText className="h-5 w-5 text-amber-deep" aria-hidden="true" />
            <div className="min-w-0 flex-1 text-start">
              <p className="truncate font-semibold">{fileName}</p>
              <p className="text-sm text-muted">
                {t.fileReady} · {words} {t.words}
              </p>
            </div>
            <button type="button" className="btn-quiet" onClick={reset}>
              <X className="h-4 w-4" aria-hidden="true" />
              {t.remove}
            </button>
          </div>
        ) : null}

        {source ? (
          <details className="mt-4 rounded-2xl border border-line px-4 py-3">
            <summary className="cursor-pointer font-semibold text-amber-deep">{t.sourcePreview}</summary>
            <pre className="source-preview mt-3 max-h-52 overflow-auto text-sm leading-relaxed whitespace-pre-wrap text-muted">
              {source.slice(0, 2800)}
            </pre>
          </details>
        ) : null}

        {error ? (
          <p className="mt-4 rounded-2xl border border-amber/40 bg-gold/10 px-4 py-3 text-start text-sm" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            className="btn-gold btn-lg"
            disabled={!source || phase === "translating" || phase === "reading"}
            onClick={() => void translate()}
          >
            {phase === "translating" ? (
              <LoaderCircle className="h-5 w-5 motion-safe:animate-spin" aria-hidden="true" />
            ) : null}
            {phase === "translating" ? t.translating : t.translate}
          </button>
          {phase === "translating" ? <p className="text-sm text-muted">{progress}</p> : null}
        </div>
        {phase === "translating" ? (
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
            <div className="h-full bg-amber transition-[width] duration-300" style={{ width: `${Math.max(8, ratio * 100)}%` }} />
          </div>
        ) : null}
      </div>

      {phase === "done" && blocks.length > 0 ? (
        <article id="preek" className="sheet mx-auto mt-10 max-w-3xl px-6 py-10 sm:px-12">
          <div className="no-print flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.14em] text-amber-deep uppercase">{t.resultKicker}</p>
              <h2 className="mt-1 font-display text-3xl">{t.resultTitle}</h2>
            </div>
            <button type="button" className="btn-gold" onClick={() => void download()} disabled={makingPdf}>
              {makingPdf ? (
                <LoaderCircle className="h-5 w-5 motion-safe:animate-spin" aria-hidden="true" />
              ) : (
                <Download className="h-5 w-5" aria-hidden="true" />
              )}
              {makingPdf ? t.preparing : t.download}
            </button>
          </div>
          {stale ? <p className="no-print mt-4 text-sm text-amber-deep">{t.changedLang}</p> : null}
          {pdfError ? (
            <div className="no-print mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <p className="text-sm">{t.errorPdf}</p>
              <button type="button" className="btn-ink" onClick={() => window.print()}>
                {t.printFallback}
              </button>
            </div>
          ) : null}
          <div id="sermon-sheet" className="sermon mt-8 text-start">
            {blocks.map((block, index) =>
              block.kind === "h" ? (
                <h3 key={`${block.kind}-${index}`} className="mt-8 mb-3 font-display text-2xl text-amber-deep">
                  {block.text}
                </h3>
              ) : (
                <p key={`${block.kind}-${index}`} className="mb-4">
                  {block.text}
                </p>
              ),
            )}
            <p className="print-credit mt-10 border-t border-line pt-3 text-center text-sm text-muted">{t.pdfCredit}</p>
          </div>
        </article>
      ) : null}
    </section>
  );
}
