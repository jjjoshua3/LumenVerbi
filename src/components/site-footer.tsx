import { useLocale } from "@/lib/locale";

export function SiteFooter() {
  const { t } = useLocale();
  return (
    <footer className="site-footer border-t border-white/10 bg-dusk text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-display text-lg tracking-tight">LumenVerbi</p>
        <p className="text-sm text-cream/80">
          {t.designedBy}{" "}
          <a
            href="https://jjjoshua3.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
          >
            Joshua
          </a>
        </p>
      </div>
    </footer>
  );
}
