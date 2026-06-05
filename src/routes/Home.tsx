import ModeCard from "../components/home/ModeCard";

function HomeHeader() {
  return (
    <>
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
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-center mb-1 text-text-primary select-none">
        GAME COUNTER
      </h1>
      <p className="text-[10px] sm:text-xs md:text-sm text-text-secondary font-semibold tracking-wider uppercase text-center mb-6 md:mb-10 lg:mb-14 select-none">
        Select your dashboard configuration
      </p>
    </>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 select-none">
      <HomeHeader />


      {/* PlayStation-Inspired Dashboard blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 w-full max-w-2xl lg:max-w-3xl">
        <ModeCard
          to="/Players"
          hoverBorderClass="hover:border-sky-500/40"
          watermarkShape={
            <svg className="w-28 h-28 stroke-current fill-none stroke-[3]" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          }
          iconBgClass="text-sky-500 dark:text-sky-400"
          icon={
            <svg className="w-6 h-6 stroke-current fill-none stroke-[4]" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          }
          title="PLAYERS MODE"
          description="Track individual players scoreboards. Custom controller settings, individual avatar support, and complete match logs."
          footerText="Configure Controller"
          footerTextClass="text-sky-500 dark:text-sky-400"
        />

        <ModeCard
          to="/Teams"
          hoverBorderClass="hover:border-emerald-500/40"
          watermarkShape={
            <svg className="w-28 h-28 stroke-current fill-none stroke-[3]" viewBox="0 0 24 24">
              <polygon points="12 3, 21 20, 3 20" />
            </svg>
          }
          iconBgClass="text-emerald-600 dark:text-emerald-400"
          icon={
            <svg className="w-6 h-6 stroke-current fill-none stroke-[3]" viewBox="0 0 24 24">
              <polygon points="12 3, 21 20, 3 20" />
            </svg>
          }
          title="TEAMS MODE"
          description="Initiate cooperative dual score tracking. Configure team identifiers and battle for the victory screen."
          footerText="Configure Arena"
          footerTextClass="text-emerald-650 dark:text-emerald-400"
        />
      </div>
    </div>
  );
}
