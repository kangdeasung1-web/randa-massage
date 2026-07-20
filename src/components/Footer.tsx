import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, ShieldCheck, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { REGIONS_LIST } from '../data/regions';
import { getPathByRegionId } from '../data/slugs';
import BrandLogo from './BrandLogo';

interface FooterProps {
  currentRegionId: string;
  onNavigate: (id: string) => void;
}

export default function Footer({ currentRegionId, onNavigate }: FooterProps) {
  // 11 requested premium regions with their corresponding internal IDs and keyword-rich anchor texts
  const serviceRegions = [
    { id: '시흥출장마사지', name: '시흥출장마사지' },
    { id: '정왕동출장마사지', name: '정왕동출장마사지' },
    { id: '배곧출장마사지', name: '배곧출장마사지' },
    { id: '월곶출장마사지', name: '월곶출장마사지' },
    { id: '오이도출장마사지', name: '오이도출장마사지' },
    { id: '거북섬출장마사지', name: '거북섬출장마사지' },
    { id: '능곡동출장마사지', name: '능곡동출장마사지' },
    { id: '은행동출장마사지', name: '은행동출장마사지' },
    { id: '목감출장마사지', name: '목감출장마사지' },
    { id: '신천동출장마사지', name: '신천동출장마사지' },
    { id: '시화MTV출장마사지', name: '시화MTV출장마사지' },
  ];

  const quickLinks = [
    { label: '홈', href: '#app-header' },
    { label: '서비스', href: '#service-process-section' },
    { label: '가격안내', href: '#premium-courses-section' },
    { label: '이용절차', href: '#service-process-section' },
    { label: '후기', href: '#customer-reviews-section' },
    { label: 'FAQ', href: '#premium-faqs-section' },
    { label: '예약문의', href: '#contact-section' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegionClick = (id: string) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0B0B] border-t border-[#2C2C2C] pt-16 pb-12 mt-16 text-[#A8A8A8]" id="site-footer">
      <div className="max-w-[1440px] mx-auto px-6 md:px-14">
        
        {/* Main Footer Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12"
        >
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-1">
                <BrandLogo isSmall />
              </div>
              <p className="text-xs text-[#A8A8A8] font-sans font-light leading-relaxed">
                시흥출장마사지 전문 프리미엄 홈케어 서비스
              </p>
            </div>
            
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-4 group">
                <span className="premium-icon-wrapper shrink-0 scale-[0.6] origin-left">
                  <Phone className="premium-icon" />
                </span>
                <div>
                  <span className="text-xs text-[#A8A8A8] font-sans">전화번호: </span>
                  <a href="tel:010-7497-2653" className="text-xs font-sans font-bold text-[#F8F8F8] hover:text-[#E63946] transition-colors">
                    010-7497-2653
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="premium-icon-wrapper shrink-0 scale-[0.6] origin-left">
                  <MessageSquare className="premium-icon" />
                </span>
                <div>
                  <span className="text-xs text-[#A8A8A8] font-sans">카카오톡: </span>
                  <a href="https://open.kakao.com/o/se8MdBEi" target="_blank" rel="noopener noreferrer" className="text-xs font-sans font-medium text-[#F8F8F8] hover:text-[#E63946] transition-colors">
                    간다출장상담센터
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="premium-icon-wrapper shrink-0 scale-[0.6] origin-left">
                  <Clock className="premium-icon" />
                </span>
                <div>
                  <span className="text-xs text-[#A8A8A8] font-sans">운영시간: </span>
                  <span className="text-xs font-sans font-semibold text-[#F8F8F8]">
                    24시간 연중무휴 (24/7)
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#A8A8A8] leading-relaxed font-sans max-w-sm pt-2">
              저희 간다 브랜드는 시흥출장마사지, 출장안마, 출장마사지 및 홈타이 서비스를 대표하는 공인 플랫폼으로서, 음주 만취자 및 선입금 사기 방지를 준수합니다.
            </p>
          </div>

          {/* Column 2: Service Regions */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs text-[#C1121F] font-sans font-bold tracking-wider block">
              서비스 지역
            </span>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {serviceRegions.map((region) => {
                const isActive = region.id === currentRegionId;
                return (
                  <a
                    key={region.id}
                    href={getPathByRegionId(region.id)}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRegionClick(region.id);
                    }}
                    className={`text-left text-xs font-sans transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                      isActive 
                        ? 'text-[#E63946] font-semibold' 
                        : 'text-[#A8A8A8] hover:text-[#E63946] font-light'
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#E63946]' : 'bg-[#2C2C2C]'}`} />
                    <span>{region.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs text-[#C1121F] font-sans font-bold tracking-wider block">
              빠른 이동
            </span>
            
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx} className="w-fit">
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="relative text-xs font-sans font-light text-[#A8A8A8] hover:text-[#E63946] transition-colors duration-200 block pb-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Customer Guide */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs text-[#C1121F] font-sans font-bold tracking-wider block">
              이용 안내
            </span>
            
            <ul className="space-y-2 text-xs font-sans font-light text-[#A8A8A8]">
              <li className="flex items-center space-x-2">
                <span className="w-1 h-1 bg-[#C1121F]" />
                <span>24시간 실시간 상담 가능</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1 h-1 bg-[#C1121F]" />
                <span>100% 현장 안전 후불제</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1 h-1 bg-[#C1121F]" />
                <span>호텔 및 모텔 방문 가능</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1 h-1 bg-[#C1121F]" />
                <span>자택 및 오피스텔 방문 가능</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1 h-1 bg-[#C1121F]" />
                <a href="#site-footer" className="hover:text-[#E63946] transition-colors">예약 및 이용안내 규정</a>
              </li>
            </ul>
          </div>

        </motion.div>

        {/* Corporate safety policy disclosures row (Required for total compatibility) */}
        <div className="border-t border-[#2C2C2C] py-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] text-[#A8A8A8] font-sans leading-relaxed">
          <div className="space-y-2">
            <span className="text-[#A8A8A8] font-semibold block">안심 보증 제도 안내</span>
            <p className="break-keep font-light">
              최근 출장마사지 업계를 사칭하여 예약금, 유니폼 비용, 선지급 수수료를 무단 요구하는 보이스피싱 및 입금 사기가 극성을 부리고 있습니다. 저희 간다는 어떠한 사전 비용도 절대 요구하지 않는 100% 완전 대면 후불 안전보장 장치를 고수합니다.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-[#A8A8A8] font-semibold block">이용 제한 정책 고지</span>
            <p className="break-keep font-light">
              공정거래위원회 표준 약관 및 매니저 보호 매뉴얼에 따라 폭력, 과도한 만취, 비상식적인 행동, 무단 예약 파기(노쇼) 전력이 있으신 분들은 실시간 배차 차단 시스템에 등록되며 영구적으로 이용이 불가능합니다.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright and SNS Links */}
        <div className="pt-8 border-t border-[#2C2C2C] flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Centered copyright on mobile, left on desktop */}
          <div className="text-center md:text-left space-y-1">
            <span className="text-[12px] text-[#888888] font-mono block">
              &copy; 2026 GANDA MASSAGE. All Rights Reserved.
            </span>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-[10px] text-[#A8A8A8]">
              <a href="#site-footer" className="hover:text-[#E63946] transition-colors">이용약관</a>
              <span>|</span>
              <a href="#site-footer" className="hover:text-[#E63946] transition-colors">개인정보처리방침</a>
              <span>|</span>
              <a href="#site-footer" className="hover:text-[#C1121F] transition-colors text-[#C1121F]">후불제 안심 안전장치</a>
            </div>
          </div>

          {/* Social / Contact Icons (hover to Red) */}
          <div className="flex items-center space-x-4">
            <a 
              href="tel:010-7497-2653" 
              className="premium-icon-wrapper"
              title="전화 연결"
            >
              <Phone className="premium-icon" />
            </a>
            <a 
              href="https://open.kakao.com/o/se8MdBEi" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="premium-icon-wrapper"
              title="카카오톡 상담"
            >
              <MessageSquare className="premium-icon" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
