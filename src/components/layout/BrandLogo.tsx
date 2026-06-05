import { Link } from "react-router-dom";

export default function BrandLogo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 select-none cursor-pointer hover:opacity-80 transition-opacity"
    >
      {/* Mini d-pad icon */}
      <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center relative opacity-70 shrink-0">
        <div className="absolute w-5 h-1.5 bg-theme-border rounded-full" />
        <div className="absolute w-1.5 h-5 bg-theme-border rounded-full" />
        <div className="absolute w-2 h-2 bg-theme-bg rounded-full border border-theme-border" />
      </div>
      <span className="font-display font-black tracking-tight text-text-primary text-sm sm:text-base leading-none">
        GAME
      </span>
      <span className="font-display font-black tracking-tight text-emerald-500 text-sm sm:text-base leading-none -ml-1">
        COUNTER
      </span>
    </Link>
  );
}
