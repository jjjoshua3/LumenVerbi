import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { LANGUAGES, type Lang } from "@/lib/i18n";
import { useLocale } from "@/lib/locale";
import { LangMark } from "@/components/mark";

export function LanguageMenu() {
  const { lang, srScript, setLang, t, label } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="flex min-h-11 items-center gap-2 rounded-full border border-line bg-card px-3 py-2 text-start"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
      >
        <LangMark id={lang} />
        <span className="max-w-36 truncate text-sm font-semibold">{label}</span>
        <ChevronDown className="h-4 w-4 text-muted" aria-hidden="true" />
      </button>
      {open ? (
        <div
          id={listId}
          role="listbox"
          aria-label={t.langLabel}
          className="panel absolute end-0 z-40 mt-2 max-h-[70vh] w-[min(22rem,calc(100vw-2rem))] overflow-auto p-2"
        >
          {LANGUAGES.map((item) => {
            const selected = item.id === lang;
            const name = item.id === "sr" && srScript === "latn" && selected ? "Srpski" : item.endonym;
            return (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={selected}
                className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-start ${selected ? "bg-parchment-deep" : "hover:bg-parchment"}`}
                onClick={() => {
                  setLang(item.id);
                  setOpen(false);
                }}
              >
                <LangMark id={item.id} />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{name}</span>
                  <span className="block text-xs text-muted">{item.latin}</span>
                </span>
                {selected ? <Check className="h-4 w-4 text-amber-deep" aria-hidden="true" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function LanguageGrid() {
  const { lang, setLang, t } = useLocale();
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-muted">{t.chooseTitle}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4" role="listbox" aria-label={t.langLabel}>
        {LANGUAGES.map((item) => {
          const selected = item.id === lang;
          return (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => setLang(item.id as Lang)}
              className={`flex min-h-14 items-center gap-2 rounded-2xl border px-3 py-2 text-start ${selected ? "border-amber bg-gold/15" : "border-line bg-parchment hover:border-amber/60"}`}
            >
              <LangMark id={item.id} />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{item.endonym}</span>
                <span className="block truncate text-xs text-muted">{item.latin}</span>
              </span>
            </button>
          );
        })}
      </div>
      <ScriptToggle />
    </div>
  );
}

export function ScriptToggle() {
  const { lang, srScript, syrStyle, setSrScript, setSyrStyle, t } = useLocale();
  if (lang !== "sr" && lang !== "syr") return null;
  const options =
    lang === "sr"
      ? [
          { id: "cyrl" as const, label: t.cyrillic, active: srScript === "cyrl" },
          { id: "latn" as const, label: t.latin, active: srScript === "latn" },
        ]
      : [
          { id: "estrangelo" as const, label: t.estrangelo, active: syrStyle === "estrangelo" },
          { id: "serto" as const, label: t.serto, active: syrStyle === "serto" },
        ];

  return (
    <div className="mt-4">
      <p className="mb-2 text-sm font-semibold text-muted">{t.scriptLabel}</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t.scriptLabel}>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={option.active}
            onClick={() => {
              if (lang === "sr") setSrScript(option.id === "latn" ? "latn" : "cyrl");
              else setSyrStyle(option.id === "serto" ? "serto" : "estrangelo");
            }}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold ${option.active ? "border-amber bg-ink text-cream" : "border-line bg-card"}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
