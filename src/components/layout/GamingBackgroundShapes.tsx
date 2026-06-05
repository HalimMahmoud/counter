export default function GamingBackgroundShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none transition-opacity duration-300 z-0">
      {/* Top-Left: Triangle Shape (Green) */}
      <div className="absolute top-[8%] left-[4%] lg:left-[8%] xl:left-[12%] hidden sm:block text-ps-triangle opacity-[0.25] dark:opacity-[0.15] transition-all duration-300">
        <svg className="w-20 h-20 stroke-current fill-none stroke-[3.5]" viewBox="0 0 24 24">
          <polygon points="12 3, 21 20, 3 20" />
        </svg>
      </div>
      
      {/* Bottom-Left: Square Shape (Pink) */}
      <div className="absolute bottom-[8%] left-[4%] lg:left-[8%] xl:left-[12%] hidden sm:block text-ps-square opacity-[0.25] dark:opacity-[0.15] transition-all duration-300">
        <svg className="w-20 h-20 stroke-current fill-none stroke-[3.5]" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      </div>

      {/* Top-Right: Circle Shape (Red) */}
      <div className="absolute top-[8%] right-[4%] lg:right-[8%] xl:right-[12%] hidden sm:block text-ps-circle opacity-[0.25] dark:opacity-[0.15] transition-all duration-300">
        <svg className="w-20 h-20 stroke-current fill-none stroke-[3.5]" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
        </svg>
      </div>

      {/* Bottom-Right: Cross Shape (Blue) */}
      <div className="absolute bottom-[8%] right-[4%] lg:right-[8%] xl:right-[12%] hidden sm:block text-ps-cross opacity-[0.25] dark:opacity-[0.15] transition-all duration-300">
        <svg className="w-20 h-20 stroke-current fill-none stroke-[3.5]" viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </div>
    </div>
  );
}
