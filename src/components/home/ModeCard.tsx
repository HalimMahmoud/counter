import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";

type ModeCardProps = {
  to: string;
  hoverBorderClass: string;
  watermarkShape: React.ReactNode;
  iconBgClass: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  footerText: string;
  footerTextClass: string;
};

export default function ModeCard({
  to,
  hoverBorderClass,
  watermarkShape,
  iconBgClass,
  icon,
  title,
  description,
  footerText,
  footerTextClass,
}: ModeCardProps) {
  return (
    <Link to={to} className="group">
      <Card
        className={`h-full relative overflow-hidden bg-theme-card hover:bg-theme-bg/30 border-theme-border transition-all duration-300 shadow-md ${hoverBorderClass}`}
      >
        {/* Soft PlayStation shape backgrounds floating */}
        <div className="absolute right-4 bottom-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-300 pointer-events-none select-none text-text-primary">
          {watermarkShape}
        </div>

        <CardContent className="p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col gap-4 sm:gap-5 items-start">
          {/* Soft gamer icon panel */}
          <div
            className={`p-3.5 rounded-xl bg-theme-bg border border-theme-border shadow-inner ${iconBgClass}`}
          >
            {icon}
          </div>

          <div>
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-text-primary transition-colors tracking-tight">
              {title}
            </h2>
            <p className="mt-2 text-xs md:text-sm text-text-secondary font-medium leading-relaxed">
              {description}
            </p>
          </div>

          <div
            className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider mt-2 ${footerTextClass}`}
          >
            <span>{footerText}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
