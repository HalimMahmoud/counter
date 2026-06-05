// PlayStation button shape definitions — shared across Players, Teams, Switcher

export const psShapes = [
  {
    symbol: "✕",
    label: "Cross",
    colorName: "sky-500",
    colorClass: "text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-850 bg-sky-100 dark:bg-sky-950",
    badgeVariant: "cross" as const,
    svg: (
      <svg className="w-5 h-5 stroke-current fill-none stroke-[4.5]" viewBox="0 0 24 24">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    ),
  },
  {
    symbol: "◯",
    label: "Circle",
    colorName: "rose-500",
    colorClass: "text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-850 bg-rose-100 dark:bg-rose-950",
    badgeVariant: "circle" as const,
    svg: (
      <svg className="w-5 h-5 stroke-current fill-none stroke-[4.5]" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
      </svg>
    ),
  },
  {
    symbol: "△",
    label: "Triangle",
    colorName: "emerald-500",
    colorClass: "text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-855 bg-emerald-100 dark:bg-emerald-950",
    badgeVariant: "triangle" as const,
    svg: (
      <svg className="w-5 h-5 stroke-current fill-none stroke-[3.5]" viewBox="0 0 24 24">
        <polygon points="12 4, 20 19, 4 19" />
      </svg>
    ),
  },
  {
    symbol: "▢",
    label: "Square",
    colorName: "pink-500",
    colorClass: "text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-850 bg-pink-100 dark:bg-pink-950",
    badgeVariant: "square" as const,
    svg: (
      <svg className="w-5 h-5 stroke-current fill-none stroke-[4.5]" viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="2.5" />
      </svg>
    ),
  },
];
