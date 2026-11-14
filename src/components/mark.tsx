import { useId } from "react";

export function CrossMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="14" y="3" width="4" height="26" rx="1" fill="currentColor" />
      <rect x="5" y="9" width="22" height="4" rx="1" fill="currentColor" />
    </svg>
  );
}

export function LangMark({ id }: { id: string }) {
  const clipId = useId().replace(/:/g, "");
  if (id === "nl") {
    return (
      <svg viewBox="0 0 22 16" className="h-4 w-6 shrink-0 rounded-[2px]" aria-hidden="true">
        <rect width="22" height="16" fill="#fff" />
        <rect width="22" height="5.34" fill="#AE1C28" />
        <rect y="10.66" width="22" height="5.34" fill="#21468B" />
      </svg>
    );
  }
  if (id === "en") {
    return (
      <svg viewBox="0 0 60 30" className="h-4 w-6 shrink-0 rounded-[2px]" aria-hidden="true">
        <clipPath id={clipId}>
          <rect width="60" height="30" />
        </clipPath>
        <g clipPath={`url(#${clipId})`}>
          <rect width="60" height="30" fill="#012169" />
          <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="8" />
          <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="4" />
          <path d="M30 0 V30 M0 15 H60" stroke="#fff" strokeWidth="14" />
          <path d="M30 0 V30 M0 15 H60" stroke="#C8102E" strokeWidth="8" />
        </g>
      </svg>
    );
  }
  if (id === "sr") {
    return (
      <svg viewBox="0 0 22 16" className="h-4 w-6 shrink-0 rounded-[2px]" aria-hidden="true">
        <rect width="22" height="5.34" fill="#C6363C" />
        <rect y="5.34" width="22" height="5.33" fill="#0C4076" />
        <rect y="10.67" width="22" height="5.33" fill="#fff" />
      </svg>
    );
  }
  if (id === "uk") {
    return (
      <svg viewBox="0 0 22 16" className="h-4 w-6 shrink-0 rounded-[2px]" aria-hidden="true">
        <rect width="22" height="8" fill="#005BBB" />
        <rect y="8" width="22" height="8" fill="#FFD500" />
      </svg>
    );
  }
  if (id === "tr") {
    return (
      <svg viewBox="0 0 22 16" className="h-4 w-6 shrink-0 rounded-[2px]" aria-hidden="true">
        <rect width="22" height="16" fill="#E30A17" />
        <circle cx="8.6" cy="8" r="3.5" fill="#fff" />
        <circle cx="9.7" cy="8" r="2.7" fill="#E30A17" />
        <polygon
          points="12.4,8 13.5,8.45 12.9,7.35 13.9,6.8 12.7,6.75 12.3,5.7 12.05,6.8 10.85,6.9 11.85,7.45 11.2,8.5"
          fill="#fff"
        />
      </svg>
    );
  }
  if (id === "fa") {
    return (
      <svg viewBox="0 0 22 16" className="h-4 w-6 shrink-0 rounded-[2px]" aria-hidden="true">
        <rect width="22" height="5.34" fill="#239F40" />
        <rect y="5.34" width="22" height="5.33" fill="#fff" />
        <rect y="10.67" width="22" height="5.33" fill="#DA0000" />
      </svg>
    );
  }
  if (id === "ur") {
    return (
      <svg viewBox="0 0 22 16" className="h-4 w-6 shrink-0 rounded-[2px]" aria-hidden="true">
        <rect width="22" height="16" fill="#01411C" />
        <rect width="5.5" height="16" fill="#fff" />
        <circle cx="12.5" cy="8" r="3.15" fill="#fff" />
        <circle cx="13.35" cy="7.65" r="2.55" fill="#01411C" />
        <polygon
          points="15.2,6.05 15.58,7.15 16.75,7.2 15.85,7.95 16.15,9.05 15.1,8.4 14.05,9.05 14.35,7.95 13.45,7.2 14.6,7.15"
          fill="#fff"
        />
      </svg>
    );
  }
  if (id === "sw") {
    return (
      <svg viewBox="0 0 22 16" className="h-4 w-6 shrink-0 rounded-[2px]" aria-hidden="true">
        <rect width="22" height="16" fill="#0E6B45" />
        <rect y="6.1" width="22" height="3.8" fill="#F4C430" />
        <rect y="7.35" width="22" height="1.3" fill="#1A1D24" />
      </svg>
    );
  }
  const glyph = id === "ar" ? "ع" : id === "syr" ? "ܐ" : "ት";
  return (
    <span
      className="grid h-4 w-6 shrink-0 place-items-center rounded-[2px] bg-ink text-[10px] leading-none font-semibold text-gold"
      aria-hidden="true"
    >
      {glyph}
    </span>
  );
}
