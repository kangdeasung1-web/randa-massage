import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { getPathByRegionId } from '../data/slugs';

interface BreadcrumbProps {
  currentRegionId: string;
  currentRegionName: string;
  onNavigate: (regionId: string) => void;
}

export default function Breadcrumb({ currentRegionId, currentRegionName, onNavigate }: BreadcrumbProps) {
  // Determine if we are on the main city core page
  const isMain = currentRegionId === "시흥출장마사지";

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate("시흥출장마사지");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMainClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate("시흥출장마사지");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Base domain for Schema.org (using origin dynamically)
  const origin = 'https://ganda-massage.com';

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="max-w-7xl mx-auto px-6 py-4 flex items-center space-x-2 text-xs font-sans tracking-wide text-[#A8A8A8]"
      id="seo-breadcrumb"
    >
      {/* Home node */}
      <a 
        href="/" 
        onClick={handleHomeClick}
        className="hover:text-[#E63946] transition-colors duration-250 flex items-center space-x-1 font-semibold"
      >
        <Home className="w-3.5 h-3.5" />
        <span>홈</span>
      </a>

      <ChevronRight className="w-3 h-3 text-[#2C2C2C] shrink-0" />

      {/* Second node: City Core */}
      {isMain ? (
        <span className="text-[#C1121F] font-bold" aria-current="page">
          시흥출장마사지
        </span>
      ) : (
        <>
          <a 
            href={getPathByRegionId("시흥출장마사지")} 
            onClick={handleMainClick}
            className="hover:text-[#E63946] transition-colors duration-250 font-semibold"
          >
            시흥출장마사지
          </a>
          <ChevronRight className="w-3 h-3 text-[#2C2C2C] shrink-0" />
          <span className="text-[#C1121F] font-bold truncate max-w-[180px] sm:max-w-none" aria-current="page">
            {currentRegionName}
          </span>
        </>
      )}
    </nav>
  );
}
