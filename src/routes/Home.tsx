import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 select-none">
      {/* Console D-Pad/Logo Accent */}
      <div className="flex items-center gap-3 mb-6 select-none">
        {/* Simple gaming d-pad outline */}
        <div className="w-12 h-12 flex items-center justify-center relative opacity-40">
          <div className="absolute w-10 h-3 bg-theme-border rounded-full"></div>
          <div className="absolute w-3 h-10 bg-theme-border rounded-full"></div>
          <div className="absolute w-4 h-4 bg-theme-bg rounded-full border border-theme-border"></div>
        </div>
        <div className="flex items-center gap-1.5 text-text-secondary font-black tracking-widest text-[10px] uppercase">
          <span>Mode</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Select</span>
        </div>
      </div>

      {/* Main Console Title */}
      <h1 className="text-3xl md:text-4xl font-black font-display tracking-tight text-center mb-1 text-text-primary select-none">
        GAME COUNTER
      </h1>
      <p className="text-[10px] md:text-xs text-text-secondary font-semibold tracking-wider uppercase text-center mb-12 select-none">
        Select your dashboard configuration
      </p>

      {/* PlayStation-Inspired Dashboard blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        <Link to="/Players" className="group">
          <Card className="h-full relative overflow-hidden bg-theme-card hover:bg-theme-bg/30 border-theme-border hover:border-sky-500/40 transition-all duration-300 shadow-md">
            {/* Soft PlayStation shape backgrounds floating */}
            <div className="absolute right-4 bottom-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300 pointer-events-none select-none text-text-primary">
              {/* Cross Shape */}
              <svg className="w-28 h-28 stroke-current fill-none stroke-[3]" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>

            <CardContent className="p-8 flex flex-col gap-5 items-start">
              {/* Soft gamer icon panel */}
              <div className="p-3.5 rounded-xl bg-theme-bg text-sky-500 dark:text-sky-400 border border-theme-border shadow-inner">
                {/* ✕ Icon */}
                <svg className="w-6 h-6 stroke-current fill-none stroke-[4]" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </div>

              <div>
                <h2 className="text-lg font-bold text-text-primary group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors tracking-tight">
                  PLAYERS MODE
                </h2>
                <p className="mt-2 text-xs text-text-secondary font-medium leading-relaxed">
                  Track individual players scoreboards. Custom controller settings, individual avatar support, and complete match logs.
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-sky-500 dark:text-sky-400 mt-2">
                <span>Configure Controller</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/Teams" className="group">
          <Card className="h-full relative overflow-hidden bg-theme-card hover:bg-theme-bg/30 border-theme-border hover:border-emerald-500/40 transition-all duration-300 shadow-md">
            {/* Soft PlayStation shape backgrounds floating */}
            <div className="absolute right-4 bottom-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300 pointer-events-none select-none text-text-primary">
              {/* Triangle Shape */}
              <svg className="w-28 h-28 stroke-current fill-none stroke-[3]" viewBox="0 0 24 24">
                <polygon points="12 3, 21 20, 3 20" />
              </svg>
            </div>

            <CardContent className="p-8 flex flex-col gap-5 items-start">
              {/* Soft gamer icon panel */}
              <div className="p-3.5 rounded-xl bg-theme-bg text-emerald-600 dark:text-emerald-400 border border-theme-border shadow-inner">
                {/* △ Icon */}
                <svg className="w-6 h-6 stroke-current fill-none stroke-[3]" viewBox="0 0 24 24">
                  <polygon points="12 3, 21 20, 3 20" />
                </svg>
              </div>

              <div>
                <h2 className="text-lg font-bold text-text-primary group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight">
                  TEAMS MODE
                </h2>
                <p className="mt-2 text-xs text-text-secondary font-medium leading-relaxed">
                  Initiate cooperative dual score tracking. Configure team identifiers and battle for the victory screen.
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-emerald-650 dark:text-emerald-400 mt-2">
                <span>Configure Arena</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
