import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, ChevronDown, ChevronRight, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getPathByRegionId } from '../data/slugs';
import BrandLogo from './BrandLogo';

interface HeaderProps {
  currentRegionId: string;
  currentRegionName: string;
  onNavigate: (regionId: string) => void;
}

// Extensible City & Region Data Structure
const CITIES_DATA = [
  {
    cityId: "siheung",
    cityName: "시흥출장마사지",
    subtext: "PREMIUM HOME CARE",
    regions: [
      { name: "시흥출장마사지 (메인)", regionId: "시흥출장마사지" },
      { name: "정왕동출장마사지", regionId: "정왕동출장마사지" },
      { name: "배곧출장마사지", regionId: "배곧출장마사지" },
      { name: "월곶출장마사지", regionId: "월곶출장마사지" },
      { name: "오이도출장마사지", regionId: "오이도출장마사지" },
      { name: "거북섬출장마사지", regionId: "거북섬출장마사지" },
      { name: "시화출장마사지", regionId: "시화출장마사지" },
      { name: "시화MTV출장마사지", regionId: "시화MTV출장마사지" },
      { name: "은행동출장마사지", regionId: "은행동출장마사지" },
      { name: "신천동출장마사지", regionId: "신천동출장마사지" },
      { name: "대야동출장마사지", regionId: "대야동출장마사지" },
      { name: "능곡동출장마사지", regionId: "능곡출장마사지" },
      { name: "목감출장마사지", regionId: "목감출장마사지" },
      { name: "장곡동출장마사지", regionId: "장곡동출장마사지" },
      { name: "하중동출장마사지", regionId: "하중동출장마사지" },
      { name: "하상동출장마사지", regionId: "하상동출장마사지" },
      { name: "연성동출장마사지", regionId: "연성동출장마사지" },
      { name: "군자동출장마사지", regionId: "군자동출장마사지" },
      { name: "매화동출장마사지", regionId: "매화동출장마사지" }
    ]
  }
];

export default function Header({ currentRegionId, currentRegionName, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileAccordionOpen, setIsMobileAccordionOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll to dynamically toggle minimum shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (elementId: string) => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRegionClick = (regionId: string) => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    onNavigate(regionId);
  };

  // Helper to check if a region is active
  const isRegionActive = (regionId: string) => {
    return currentRegionId === regionId;
  };

  // Menu items config as requested: 홈, 프리미엄 케어, 시흥출장마사지, FAQ
  const menuItems = [
    { 
      label: '홈', 
      action: () => { 
        setIsDropdownOpen(false); 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
      },
      sectionId: 'hero-banner'
    },
    { 
      label: '코스·가격', 
      action: () => handleScrollTo('premium-courses-section'),
      sectionId: 'premium-courses-section'
    },
    { 
      label: '시흥출장마사지 ▼', 
      isDropdownTrigger: true, 
      action: (e?: React.MouseEvent) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        setIsDropdownOpen(!isDropdownOpen);
      } 
    },
    { 
      label: 'FAQ', 
      action: () => handleScrollTo('premium-faqs-section'),
      sectionId: 'premium-faqs-section'
    },
  ];

  const currentCityData = CITIES_DATA[0];

  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full h-[100px] bg-[#090909] border-b border-[#292929] backdrop-blur-md transition-shadow duration-300 ${
          isScrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.5)]' : 'shadow-none'
        }`} 
        id="app-header"
      >
        <div className="mx-auto h-full flex items-center w-full max-w-[1600px] px-[18px] lg:px-0 lg:w-[calc(100%-80px)]">
          
          {/* Left: Minimal Logo & Brand */}
          <div 
            className="shrink-0 flex items-center cursor-pointer group"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsDropdownOpen(false);
              onNavigate("시흥출장마사지");
            }}
            id="logo-container"
          >
            <div className="w-[220px] xs:w-[240px] lg:w-[280px] h-[75px] flex items-center scale-[0.88] xs:scale-[1.0] lg:scale-[1.15] origin-left shrink-0">
              <BrandLogo />
            </div>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center justify-between flex-1 max-w-[820px] ml-[70px]" style={{ gap: 'clamp(48px, 5vw, 88px)' }} id="desktop-nav-menu">
            {menuItems.map((item, idx) => {
              if (item.isDropdownTrigger) {
                return (
                  <div
                    key={idx}
                    className="relative py-4"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <button
                      onClick={(e) => item.action(e)}
                      className={`text-[17px] font-sans font-semibold transition-colors cursor-pointer flex items-center space-x-1 group relative py-1 ${isDropdownOpen ? 'text-[#E63946]' : 'text-[#F5F5F5] hover:text-[#E63946]'}`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180 ${isDropdownOpen ? 'text-[#E63946] rotate-180' : 'text-[#F5F5F5] group-hover:text-[#E63946]'}`} />
                      {/* Active or Hover red dot indicator */}
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E63946] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    {/* Desktop Dropdown Menu (340px - 380px Width) */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute top-[58px] left-1/2 -translate-x-1/2 w-[350px] bg-[#181818] border border-[#2C2C2C] rounded-[20px] shadow-[0_4px_30px_rgba(0,0,0,0.3)] z-50 overflow-hidden text-[#F5F5F5] py-4 flex flex-col"
                          id="nav-dropdown-menu"
                        >
                          {/* Menu Header */}
                          <div className="px-5 pb-3 border-b border-[#2C2C2C] flex flex-col text-left">
                            <span className="font-sans font-bold text-[13px] tracking-tight text-[#F5F5F5]">{currentCityData.cityName}</span>
                            <span className="text-[9px] font-sans font-bold text-[#C1121F] tracking-wider uppercase mt-0.5">{currentCityData.subtext}</span>
                          </div>

                          {/* Menu List - Vertical scrollable list */}
                          <div className="max-h-[350px] overflow-y-auto py-2 custom-scrollbar px-2 space-y-0.5">
                            {currentCityData.regions.map((region) => {
                              const isActive = isRegionActive(region.regionId);
                              return (
                                <a
                                  key={region.regionId}
                                  href={getPathByRegionId(region.regionId)}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleRegionClick(region.regionId);
                                  }}
                                  className={`group/item w-full text-left py-2 px-3 rounded-[8px] text-xs font-sans transition-all duration-200 flex items-center justify-between cursor-pointer ${
                                    isActive 
                                      ? 'bg-[rgba(230,57,70,0.1)] text-[#E63946] font-bold' 
                                      : 'hover:bg-[rgba(230,57,70,0.05)] hover:text-[#E63946] text-[#A8A8A8] bg-transparent'
                                  }`}
                                >
                                  <div className="flex items-center space-x-2">
                                    {isActive ? (
                                      <span className="w-1 h-1 rounded-full bg-[#E63946] shrink-0" />
                                    ) : (
                                      <span className="w-1 h-1 rounded-full bg-transparent shrink-0" />
                                    )}
                                    <span>{region.name}</span>
                                  </div>
                                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform group-hover/item:translate-x-0.5 ${isActive ? 'text-[#E63946]' : 'text-[#A8A8A8] group-hover/item:text-[#E63946]'}`} />
                                </a>
                              );
                            })}
                          </div>

                          {/* Menu Footer */}
                          <div className="px-5 pt-3 border-t border-[#2C2C2C] flex items-center space-x-2 text-[10px] text-[#A8A8A8]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shrink-0" />
                            <span className="font-sans font-semibold">시흥 전지역 24시간 예약 가능</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={idx}
                  onClick={item.action}
                  className="text-[17px] font-sans font-semibold text-[#F5F5F5] hover:text-[#E63946] tracking-normal transition-colors cursor-pointer group relative py-1"
                >
                  <span>{item.label}</span>
                  {/* Hover or Active Red Underline */}
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#E63946] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-250" />
                </button>
              );
            })}
          </nav>

          {/* Right: Empty container since Header CTA is deleted */}
          <div className="hidden lg:flex flex-1 justify-end items-center" id="desktop-cta-container">
          </div>

          {/* Hamburger Menu Icon (Mobile) */}
          <div className="lg:hidden flex flex-1 justify-end items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#F5F5F5] hover:text-[#E63946] transition-colors focus:outline-none ml-auto"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu - Apple Style slide down */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 top-[100px] z-40 w-full bg-[#090909] flex flex-col justify-between p-6 border-t border-[#292929] lg:hidden overflow-y-auto"
            id="mobile-drawer-menu"
          >
            <div className="flex flex-col space-y-4 mt-2">
              {menuItems.map((item, idx) => {
                if (item.isDropdownTrigger) {
                  return (
                    <div key={idx} className="border-b border-[#292929] pb-2">
                      <button
                        onClick={() => setIsMobileAccordionOpen(!isMobileAccordionOpen)}
                        className="w-full text-left py-2 text-lg font-sans font-semibold text-[#F5F5F5] hover:text-[#E63946] transition-colors flex items-center justify-between"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isMobileAccordionOpen ? 'rotate-180 text-[#E63946]' : 'text-[#A8A8A8]'}`} />
                      </button>

                      {/* Mobile Accordion Container */}
                      <AnimatePresence>
                        {isMobileAccordionOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pl-2 pt-2 space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar"
                          >
                            <div className="pb-2 text-[10px] text-[#C1121F] font-bold tracking-wider uppercase">
                              시흥 프리미엄 서비스 구역
                            </div>
                            
                            {currentCityData.regions.map((region) => {
                              const isActive = isRegionActive(region.regionId);
                              return (
                                <a
                                  key={region.regionId}
                                  href={getPathByRegionId(region.regionId)}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleRegionClick(region.regionId);
                                  }}
                                  className={`w-full text-left py-2 px-3 rounded-[8px] text-xs font-sans transition-all flex items-center justify-between ${
                                    isActive
                                      ? 'bg-[rgba(230,57,70,0.1)] text-[#E63946] font-bold'
                                      : 'hover:bg-[rgba(230,57,70,0.05)] hover:text-[#E63946] text-[#A8A8A8]'
                                  }`}
                                >
                                  <div className="flex items-center space-x-2">
                                    {isActive && (
                                      <span className="w-1 h-1 rounded-full bg-[#E63946] shrink-0" />
                                    )}
                                    <span>{region.name}</span>
                                  </div>
                                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#E63946]' : 'text-[#A8A8A8]'}`} />
                                </a>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={idx}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      item.action();
                    }}
                    className="text-left text-lg font-sans font-semibold text-[#F5F5F5] hover:text-[#E63946] transition-colors border-b border-[#292929] pb-2"
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Drawer Footer with Booking CTA removed */}
            <div className="pt-6 pb-4 flex items-center justify-center space-x-2 border-t border-[#292929]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shrink-0" />
              <span className="text-[10px] text-[#A8A8A8] tracking-tight font-sans">시흥 전지역 24시간 예약 가능</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
