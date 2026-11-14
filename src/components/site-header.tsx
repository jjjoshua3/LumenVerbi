import { CrossMark } from "@/components/mark";
import { LanguageMenu } from "@/components/language-switcher";
import { useLocale } from "@/lib/locale";

export function SiteHeader() {
  const { t } = useLocale();
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-parchment/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-gold">
            <CrossMark className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-xl leading-none tracking-tight text-ink">LumenVerbi</span>
            <span className="mt-1 hidden truncate text-sm text-muted sm:block">{t.tagline}</span>
          </span>
        </a>
        <LanguageMenu />
      </div>
    </header>
  );
}
