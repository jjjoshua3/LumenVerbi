import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  direction,
  endonym,
  getCopy,
  htmlLang,
  scriptKey,
  type Copy,
  type Lang,
  type ScriptKey,
  type SrScript,
  type SyrStyle,
} from "@/lib/i18n";

const STORAGE_KEY = "lumenverbi-locale";

type LocaleValue = {
  lang: Lang;
  srScript: SrScript;
  syrStyle: SyrStyle;
  setLang: (lang: Lang) => void;
  setSrScript: (script: SrScript) => void;
  setSyrStyle: (style: SyrStyle) => void;
  t: Copy;
  dir: "rtl" | "ltr";
  script: ScriptKey;
  label: string;
};

const LocaleContext = createContext<LocaleValue | null>(null);

const LANGS = new Set<Lang>(["nl", "en", "sw", "sr", "ar", "syr", "fa", "ur", "ti", "uk", "tr"]);

function readStored(): { lang: Lang; srScript: SrScript; syrStyle: SyrStyle } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<{ lang: Lang; srScript: SrScript; syrStyle: SyrStyle }>;
    if (!data.lang || !LANGS.has(data.lang)) return null;
    return {
      lang: data.lang,
      srScript: data.srScript === "latn" ? "latn" : "cyrl",
      syrStyle: data.syrStyle === "serto" ? "serto" : "estrangelo",
    };
  } catch {
    return null;
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("nl");
  const [srScript, setSrScript] = useState<SrScript>("cyrl");
  const [syrStyle, setSyrStyle] = useState<SyrStyle>("estrangelo");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setLang(stored.lang);
      setSrScript(stored.srScript);
      setSyrStyle(stored.syrStyle);
    }
    setReady(true);
  }, []);

  const t = useMemo(() => getCopy(lang, srScript), [lang, srScript]);
  const dir = direction(lang);
  const script = scriptKey(lang, srScript, syrStyle);
  const label = endonym(lang, srScript);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.lang = htmlLang(lang, srScript);
    root.dir = dir;
    root.dataset.script = script;
    document.title = `LumenVerbi — ${t.tagline}`;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lang, srScript, syrStyle }));
  }, [ready, lang, srScript, syrStyle, dir, script, t.tagline]);

  const value = useMemo(
    () => ({ lang, srScript, syrStyle, setLang, setSrScript, setSyrStyle, t, dir, script, label }),
    [lang, srScript, syrStyle, t, dir, script, label],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale outside provider");
  return value;
}
