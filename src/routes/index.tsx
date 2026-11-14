import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SermonStudio } from "@/components/sermon-studio";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { t } = useLocale();
  return (
    <div id="top" className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="hero">
          <img src="/images/golgotha.png" alt={t.heroAlt} className="hero-photo" />
          <div className="hero-scrim" />
          <div className="rise relative z-10 mx-auto w-full max-w-3xl px-5 pt-14 pb-28 text-center sm:pt-20">
            <p className="font-display text-xl text-gold sm:text-2xl">{t.epigraph}</p>
            <p className="mt-1 text-sm tracking-wide text-cream/80">{t.epigraphRef}</p>
            <h1 className="hero-title mt-6 font-display text-4xl leading-tight text-cream sm:text-5xl md:text-6xl">
              {t.welcomeTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-cream/90">{t.welcomeLead}</p>
            <a href="#vertaal" className="btn-gold btn-lg mt-8">
              {t.cta}
            </a>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-cream/85">
              {t.reassurance.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <SermonStudio />
        <section className="bg-ink text-cream">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6">
            <h2 className="font-display text-3xl text-gold sm:text-4xl">{t.promiseTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-cream/90">{t.promiseBody}</p>
            <p className="mt-6 text-sm leading-relaxed text-cream/70">{t.trust}</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
