import React from "react";

const SHAPE_PATHS = [
  <path d="M18 6L6 18M6 6l12 12" />,
  <circle cx="12" cy="12" r="8" />,
  <polygon points="12 4, 20 19, 4 19" />,
  <rect x="4" y="4" width="16" height="16" rx="2.5" />
];

export function renderShapeIcon(shapeIndex: number, svgClass: string) {
  return (
    <svg className={svgClass} viewBox="0 0 24 24">
      {SHAPE_PATHS[shapeIndex % 4]}
    </svg>
  );
}

const CONTAINER_CLASSES = {
  true: "w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full border-2 border-theme-border/60 bg-theme-bg/40 flex items-center justify-center overflow-hidden cursor-pointer shadow-md transition-all duration-300 group-hover:border-theme-border hover:scale-105 relative",
  false: "w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center overflow-hidden bg-theme-bg/40 shadow-inner transition-all duration-300 hover:scale-105 relative",
};

const SVG_CLASSES = {
  true: "w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22 stroke-current fill-none stroke-[3.5]",
  false: "w-7 h-7 md:w-8 md:h-8 stroke-current fill-none stroke-[4]",
};

const HOVER_TEXTS = {
  true: "Upload",
  false: "Up",
};

const HOVER_OVERLAYS = {
  true: "absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[7px] sm:text-[9px] text-white font-black uppercase tracking-wider",
  false: "absolute inset-0 bg-black/44 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[7px] md:text-[9px] text-white font-black uppercase tracking-wider",
};

const CLEAR_BTN_CLASSES = {
  true: "absolute top-1 right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center text-[11px] sm:text-xs font-black border border-white dark:border-slate-800 cursor-pointer shadow-md hover:scale-110 transition-all duration-300 z-10",
  false: "absolute top-0 right-0 w-4.5 h-4.5 md:w-5 md:h-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center text-[8px] md:text-[9px] font-black border border-white dark:border-slate-800 cursor-pointer shadow-md hover:scale-110 transition-all duration-300 z-10",
};

export function getAvatarStyles(isArena: boolean, avatar?: string, colorClass: string = "") {
  const arenaKey = String(isArena);
  let containerClass = CONTAINER_CLASSES[arenaKey as "true" | "false"];
  if (!isArena) {
    containerClass += ` ${avatar ? "border-theme-border" : colorClass}`;
  }

  return {
    containerClass,
    svgClass: SVG_CLASSES[arenaKey as "true" | "false"],
    hoverText: HOVER_TEXTS[arenaKey as "true" | "false"],
    hoverOverlayClass: HOVER_OVERLAYS[arenaKey as "true" | "false"],
    clearBtnClass: CLEAR_BTN_CLASSES[arenaKey as "true" | "false"],
  };
}

export function handleAvatarFileChange(
  e: React.ChangeEvent<HTMLInputElement>,
  id: number,
  onUpload: (id: number, dataUrl: string) => void
) {
  const file = e.target.files?.[0];
  if (file) {
    if (file.size > 200 * 1024) {
      alert("Please select an image smaller than 200KB to ensure smooth session saving.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        onUpload(id, result);
      }
    };
    reader.readAsDataURL(file);
  }
}

