import React from 'react';

interface BrandLogoProps {
  className?: string;
  isSmall?: boolean;
}

export default function BrandLogo({ className = '', isSmall = false }: BrandLogoProps) {
  if (isSmall) {
    return (
      <div className={`flex items-center space-x-3 ${className}`} id="brand-logo-small">
        <div className="relative flex flex-col items-center justify-center select-none shrink-0" style={{ height: '48px' }}>
          <span className="text-[7px] text-[#E63946] font-serif font-extrabold tracking-[0.2em] mb-0.5 leading-none">GANDA</span>
          <div className="w-9 h-9 rounded-full border border-[#C1121F] flex items-center justify-center relative">
            <div className="absolute inset-[1.5px] rounded-full border border-[#C1121F]/35 border-dashed" />
            <span className="font-serif font-black text-[12px] text-[#C1121F] tracking-tight leading-none">간다</span>
          </div>
          <span className="text-[5px] text-[#A8A8A8] font-sans tracking-[0.08em] mt-0.5 leading-none font-bold">PREMIUM</span>
        </div>
        <div className="flex flex-col justify-center border-l-2 border-[#5A151B] pl-3 h-8">
          <span 
            className="font-sans font-extrabold text-[#FFFFFF] tracking-tight leading-none whitespace-nowrap"
            style={{ fontSize: "clamp(13px, 3.8vw, 15px)", letterSpacing: "-0.03em" }}
          >
            간다출장마사지
          </span>
          <span className="text-[8px] text-[#A8A8A8] font-sans tracking-[0.15em] uppercase leading-none mt-1 font-bold">Premium Hotel Spa</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-4 ${className}`} id="brand-logo-large">
      {/* Circle emblem with GANDA branding - precisely 60-70px high */}
      <div className="relative flex flex-col items-center justify-center select-none shrink-0" style={{ height: '64px' }}>
        {/* "GANDA" text neatly above the circle */}
        <span className="text-[9px] text-[#E63946] font-serif font-black tracking-[0.25em] mb-1 leading-none">GANDA</span>
        
        {/* Outer Circle with thin red border */}
        <div className="w-11 h-11 rounded-full border-2 border-[#C1121F] flex items-center justify-center relative shadow-[0_0_15px_rgba(193,18,31,0.15)]">
          {/* Inner dashed circle for luxury detail */}
          <div className="absolute inset-[2px] rounded-full border border-[#C1121F]/40 border-dashed" />
          
          {/* Decorative leaf/flair on top-left of circle */}
          <svg className="absolute -top-[2px] -left-[2px] w-3 h-3 text-[#C1121F]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C11.5 2 10 3 10 5C10 7.5 12 9.5 12 9.5C12 9.5 14 7.5 14 5C14 3 12.5 2 12 2ZM12 9.5C9.5 9.5 7.5 11.5 7.5 14C7.5 14.5 8.5 16 10.5 16C13 16 15 14 15 14C15 14 13 12 10.5 12C10.5 12 10.5 9.5 12 9.5Z" />
          </svg>
          
          {/* Korean calligraphy "간다" inside the circle */}
          <span className="font-serif font-black text-[15px] text-[#C1121F] tracking-tight leading-none mt-[0.5px]">간다</span>
        </div>
        
        {/* "PREMIUM HOME CARE" in small red letters below the circle */}
        <span className="text-[6.5px] text-[#A8A8A8] font-sans tracking-[0.08em] mt-1 leading-none font-extrabold uppercase">PREMIUM HOME CARE</span>
      </div>

      {/* Text Brand - "간다출장마사지" vertically aligned, highly readable */}
      <div className="flex flex-col justify-center border-l-2 border-[#5A151B] pl-4 h-11">
        <span 
          className="font-sans font-black text-[#FFFFFF] tracking-tight leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(17px, 5.2vw, 22px)", letterSpacing: "-0.04em" }}
        >
          간다출장마사지
        </span>
        <span className="text-[10px] text-[#A8A8A8] font-sans tracking-[0.15em] uppercase leading-none mt-1.5 font-bold">Premium Hotel Spa</span>
      </div>
    </div>
  );
}
