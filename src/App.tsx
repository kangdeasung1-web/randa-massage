import { useState, useEffect } from 'react';
import { REGIONS_LIST, getPageById, GeneratedPage } from './data/regions';
import Header from './components/Header';
import Footer from './components/Footer';
import CourseSection from './components/CourseSection';
import ProcessSection from './components/ProcessSection';
import ReviewSection from './components/ReviewSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import Breadcrumb from './components/Breadcrumb';
import SchemaMarkup from './components/SchemaMarkup';
import NotFoundPage from './components/NotFoundPage';
import { getRegionByPath, getPathByRegionId } from './data/slugs';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  CheckCircle,
  HelpCircle,
  CircleHelp,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Calendar,
  Clock,
  Clock3,
  ShieldCheck,
  Award,
  Star,
  Users,
  MessageSquare,
  Plus,
  Minus,
  CreditCard,
  Heart
} from 'lucide-react';

import brandModelImg from './assets/images/ganda-hero-model.webp';

const MASTER_FAQS = [
  {
    q: "시흥출장마사지 예약금을 먼저 내야 하나요?",
    a: "간다출장마사지는 선입금이나 예약금을 절대로 받지 않는 100% 현장 후불제 시스템입니다. 시흥출장마사지, 시흥출장안마, 시흥홈타이 업계를 사칭하는 악성 선입금 사기로부터 고객님의 자산과 신뢰를 철저하게 보호하고 있으니, 반드시 현장에서 관리사를 직접 대면하신 후에 결제해 주시기 바랍니다."
  },
  {
    q: "시흥출장안마는 어디까지 방문하나요?",
    a: "경기도 시흥시 전 지역을 대상으로 촘촘한 방문망을 구성하고 있습니다. 배곧, 정왕동, 월곶동, 은계지구, 목감동, 장현지구 등 대단지 아파트와 오피스텔 같은 주택가는 물론, 관내에 정식 등록된 모든 호텔이나 모텔 등의 숙박시설까지 고객님이 머무시는 사적 공간이라면 언제든지 신속하고 정확하게 찾아갑니다."
  },
  {
    q: "호텔이나 모텔에서도 이용 가능한가요?",
    a: "네, 시흥 관내 모든 숙박업소에서도 안전하고 편리하게 시흥출장안마 서비스를 이용하실 수 있습니다. 입실하신 후 호실 번호와 정확한 주소지를 전담 고객센터로 말씀해 주시면, 철저한 위생 수칙을 준수한 힐링 스태프가 예약 시간 20~30분 내외로 빠르게 방문 케어를 준비합니다."
  },
  {
    q: "시흥홈타이 예약 방법은 어떻게 되나요?",
    a: "시흥홈타이 예약은 별도의 가입 절차나 개인 정보 유출 우려 없이 빠르고 간편하게 진행됩니다. 24시간 실시간 전화상담 센터나 공식 카카오톡 채널을 통해 원하시는 날짜와 세션 코스, 성함 및 상세 주소지를 전달해 주시면 즉각적인 일정 조율을 거쳐 고객님만을 위한 전담 홈케어 관리사가 신속히 배차됩니다."
  },
  {
    q: "정왕동출장마사지 방문 시간은 얼마나 걸리나요?",
    a: "정왕동은 시흥의 가장 중추적인 거점으로, 정왕역 주변과 이마트 중심상가 인근 주택가에 전담 특급 매니저들이 상주하고 있습니다. 예약 즉시 쾌속 배차를 통해 지체 없이 20분 내외로 방문하여 가장 아늑하고 만족스러운 수기 테라피를 선사합니다."
  },
  {
    q: "배곧출장마사지 아파트 단지도 방문 하나요?",
    a: "네, 배곧은 당사의 고품격 웰니스 고객분들이 가장 많이 밀집한 핵심 구역입니다. 배곧 생명공원 주변 아파트 및 오피스텔 빌딩가 등에 상시 순환 기사조가 고정 배치되어 있어, 예약 즉시 위생적인 일회용 비품을 지참하고 신속하고도 안전하게 댁 앞으로 찾아갑니다."
  },
  {
    q: "월곶출장마사지 포구 근처 호텔도 가능한가요?",
    a: "네, 월곶 지역의 특수성을 고려하여 월곶역 인근과 포구 주변 호텔 및 아파트 단지에 전용 기동반이 상주하고 있습니다. 월곶출장마사지 예약 시 정체 구간을 피해 가장 빠른 경로로 이동하여 고객님의 소중한 휴식 시간을 지켜 드립니다."
  },
  {
    q: "오이도출장마사지 관광지에서도 부를 수 있나요?",
    a: "네, 오이도 빨강등대 인근 펜션이나 숙박시설 어디든 방문 가능합니다. 바다 여행 후 쌓인 피로를 나만의 프라이빗한 공간에서 편안하게 풀 수 있도록 오이도 전담 팀이 신속하게 배차되어 최상의 힐링을 제공합니다."
  },
  {
    q: "거북섬출장마사지 서핑 후 이용하기 좋은가요?",
    a: "거북섬 웨이브파크에서 해양 레저를 즐기신 후 뭉친 근육을 풀기에 최적화된 딥 티슈 코스가 준비되어 있습니다. 신축 오피스텔 단지 및 주변 숙박 시설 어디든 거북섬 전용 팀이 20분 내외로 방문하여 서핑 후의 노곤함을 완벽한 개운함으로 바꿔 드립니다."
  },
  {
    q: "시화출장마사지 공단 지역도 찾아오나요?",
    a: "시화공단 및 MTV 테크노밸리 내 모든 오피스텔과 기숙사, 주변 숙박 시설로 24시간 방문합니다. 장시간 업무로 지친 근로자분들을 위해 시화 전역을 아우르는 촘촘한 네트워크를 가동하여 언제 어디서든 프리미엄 수기 케어를 누리실 수 있습니다."
  },
  {
    q: "은행동/은계지구 신도시도 배차가 빠른가요?",
    a: "은계호수공원 및 은행동 대단지 아파트 밀집 구역은 저희의 주요 집중 관리 지역 중 하나입니다. 가족 단위 및 주부 고객님들이 많은 지역 특성에 맞춰 철저한 위생과 친절함을 겸비한 관리사가 실시간으로 대기 중이며, 예약 즉시 은계지구 전역으로 신속 배차됩니다."
  },
  {
    q: "목감출장마사지 새벽 시간에도 가능한가요?",
    a: "네, 간다출장마사지는 365일 24시간 연중무휴로 운영됩니다. 물왕호수 인근이나 목감 신도시 아파트 단지 등 새벽 시간대에도 동일한 퀄리티와 빠른 방문 서비스를 약속드리며, 지친 하루의 끝에서 가장 평온한 휴식을 보장합니다."
  },
  {
    q: "능곡동/장현지구 아파트 방문 시 프라이버시는요?",
    a: "고객님의 프라이버시 보호를 최우선으로 생각합니다. 관리사 방문 시 복장이나 소지품이 외부로 드러나지 않도록 철저히 교육받았으며, 조용하고 신속하게 이동하여 주변 이웃들에게 불편함을 주지 않고 오로지 고객님만의 프라이빗한 힐링 시간을 완성해 드립니다."
  },
  {
    q: "시흥출장마사지 결제는 현금만 가능한가요?",
    a: "아닙니다. 현금 결제는 물론, 현장에서 관리사에게 직접 계좌이체도 가능하여 고객님의 편의에 맞춰 선택하실 수 있습니다. 다시 한번 강조드리지만, 어떠한 경우에도 사전에 돈을 입금받지 않는 100% 후불제이니 안심하고 이용하시기 바랍니다."
  },
  {
    q: "간다출장마사지 관리사분들은 어떤 분들인가요?",
    a: "당사는 엄격한 면접과 체계적인 호텔식 에스테틱 교육을 수료한 정예 테라피스트들로만 구성됩니다. 실력은 물론 서비스 마인드와 용모까지 두루 갖춘 전문 스태프들이 고객님의 컨디션을 정밀하게 파악하여 수준 높은 맞춤 케어를 진행합니다."
  },
  {
    q: "출장안마 이용 시간 연장도 가능한가요?",
    a: "네, 세션 도중 연장을 원하실 경우 다음 예약 일정을 확인한 뒤 즉석에서 연장 이용이 가능합니다. 단, 예약이 몰리는 야간이나 주말 시간대에는 미리 여유 있는 코스를 선택하시거나 사전 상담 시 말씀해 주시면 더욱 원활한 진행이 가능합니다."
  },
  {
    q: "위생 관리는 어떻게 이루어지나요?",
    a: "고객님의 안전을 위해 모든 소모품은 일회용 사용을 원칙으로 하며, 타월 및 린넨은 고온 살균 처리된 청결한 비품만을 사용합니다. 관리사 또한 방문 전후로 철저한 개인 소독을 실시하여 가장 쾌적하고 위생적인 환경에서 테라피를 받으실 수 있도록 관리합니다."
  },
  {
    q: "시흥 전지역 24시간 운영인가요?",
    a: "네, 시흥시 전역(정왕, 배곧, 월곶, 은행, 신천, 대야, 능곡, 목감 등) 어디서든 24시간 365일 언제나 상담 및 방문이 가능합니다. 주말, 공휴일 관계없이 지친 일상에 휴식이 필요할 때 언제든 부담 없이 연락 주시기 바랍니다."
  },
  {
    q: "시흥출장마사지 후불제가 확실한가요?",
    a: "네, 100% 확실합니다. 저희는 업계의 고질적인 문제인 선입금 사기를 뿌리 뽑고자 창립 이래 줄곧 '선입금 제로' 원칙을 지켜오고 있습니다. 관리사를 직접 눈으로 확인하신 후 케어가 시작될 때 결제하시면 됩니다."
  },
  {
    q: "프리미엄 케어 코스의 특징은 무엇인가요?",
    a: "단순한 지압을 넘어 신체의 림프 순환을 돕는 스웨디시와 근육의 긴장을 해소하는 스포츠 테라피의 장점만을 결합한 최고급 프로그램입니다. 최고급 천연 오일과 전문적인 수기 기법을 통해 깊은 이완과 최상의 리프레시를 경험하실 수 있습니다."
  }
];

const formatParagraphs = (text: string) => {
  if (!text) return null;
  // Split by period followed by space
  const sentences = text.split(/(?<=\.)\s+/);
  const paragraphs: string[][] = [];
  let currentParagraph: string[] = [];
  
  sentences.forEach((sentence) => {
    currentParagraph.push(sentence);
    if (currentParagraph.length >= 2) {
      paragraphs.push(currentParagraph);
      currentParagraph = [];
    }
  });
  if (currentParagraph.length > 0) {
    paragraphs.push(currentParagraph);
  }
  
  return paragraphs.map((p, i) => (
    <p key={i} className="leading-[1.9] text-neutral-300 max-w-[900px] text-sm md:text-base">
      {p.join(' ')}
    </p>
  ));
};

export default function App() {
  const [activeRegionId, setActiveRegionId] = useState<string>("시흥출장마사지");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [routeError, setRouteError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 35]);

  useEffect(() => {
    const handlePathChange = () => {
      const path = window.location.pathname;
      const region = getRegionByPath(path);
      if (region) {
        setActiveRegionId(region.regionId);
        setRouteError(false);
      } else if (path !== '/' && path !== '') {
        setRouteError(true);
      } else {
        setActiveRegionId("시흥출장마사지");
        setRouteError(false);
      }
    };

    const handleHashChange = () => {
      if (!window.location.hash) return;
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    handlePathChange();
    window.addEventListener('popstate', handlePathChange);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const page = getPageById(activeRegionId);
  const activeRegionData = REGIONS_LIST.find(r => r.id === activeRegionId) || REGIONS_LIST[0];

  useEffect(() => {
    if (page && !routeError) {
      document.title = page.title;

      const setMetaTag = (propertyOrName: string, content: string, isProperty = false) => {
        const attribute = isProperty ? 'property' : 'name';
        let element = document.querySelector(`meta[${attribute}="${propertyOrName}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute(attribute, propertyOrName);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      };

      setMetaTag('description', page.description, false);
      setMetaTag('og:title', page.title, true);
      setMetaTag('og:description', page.description, true);
      setMetaTag('og:url', window.location.href, true);
      setMetaTag('og:image', `${window.location.origin}/logo.png`, true);

      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      const canonicalHref = `${window.location.origin}${getPathByRegionId(activeRegionId)}`;
      canonicalLink.setAttribute('href', canonicalHref);
    }
  }, [page, routeError, activeRegionId]);

  const navigateToRegion = (regionId: string) => {
    const newPath = getPathByRegionId(regionId);
    window.history.pushState(null, '', newPath);
    window.dispatchEvent(new Event('popstate'));
    setOpenFaqIndex(null);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  if (routeError) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex flex-col font-sans antialiased">
        <Header currentRegionId={activeRegionId} currentRegionName={activeRegionData.name} onNavigate={navigateToRegion} />
        <NotFoundPage onGoHome={() => navigateToRegion("시흥출장마사지")} />
        <Footer currentRegionId={activeRegionId} onNavigate={navigateToRegion} />
      </div>
    );
  }

  if (!page) return null;

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#111111] text-white flex flex-col font-sans antialiased"
    >
      <SchemaMarkup 
        page={page} 
        currentRegionId={activeRegionId} 
        currentRegionName={activeRegionData.name} 
      />
      
      <Header 
        currentRegionId={activeRegionId}
        currentRegionName={activeRegionData.name} 
        onNavigate={navigateToRegion} 
      />

      <div className="bg-[#111111] border-b border-white/5">
        <Breadcrumb 
          currentRegionId={activeRegionId} 
          currentRegionName={activeRegionData.name} 
          onNavigate={navigateToRegion} 
        />
      </div>

      {/* 2. Redesigned Premium Hero Section - 1440px Horizontal Premium Layout */}
      <section 
        className="w-full lg:h-[740px] flex items-center overflow-hidden relative bg-[#050505] py-[80px] lg:py-0" 
        id="hero-banner"
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-14 h-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* Left Column: Text & CTAs */}
          <div className="flex flex-col justify-center text-left order-1 h-full" id="hero-text-content">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="text-[#C8A04D] font-sans font-semibold tracking-[0.22em] text-[14px] uppercase leading-none">
                GANDA PREMIUM HOME CARE
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="text-[40px] lg:text-[60px] font-bold leading-[1.12] tracking-[-0.03em] text-white break-keep"
              style={{ wordBreak: 'keep-all', overflowWrap: 'normal' }}
              id="main-h1-header"
            >
              <span className="block">{activeRegionData.name}</span>
              <span className="block mt-1 lg:mt-2">당신만의</span>
              <span className="text-[#C8A04D] block mt-1 lg:mt-2">프리미엄 홈케어</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[17px] leading-[1.85] text-[#D7D7D7] mt-6 max-w-[500px]"
            >
              {page.description.length > 120 ? page.description : `간다출장마사지는 ${activeRegionData.name} 전문 브랜드입니다. 시흥 전지역에서 출장마사지, 출장안마, 홈타이 서비스를 24시간 후불제로 제공합니다.`}
            </motion.p>

            {/* Horizontal Trust Badges (3 items) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-0 mt-8 py-5 border-y border-[#C8A04D]/18 max-w-[600px]"
            >
              <div className="flex-1 flex items-start space-x-3 pr-4">
                <ShieldCheck className="w-5 h-5 text-[#C8A04D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white leading-none">100% 후불제</h4>
                  <p className="text-xs text-[#AAAAAA] mt-1.5 whitespace-nowrap">예약금 없는 후불 결제</p>
                </div>
              </div>
              <div className="hidden sm:block w-[1px] bg-[#C8A04D]/18 self-stretch my-1" />
              
              <div className="flex-1 flex items-start space-x-3 sm:px-6">
                <MapPin className="w-5 h-5 text-[#C8A04D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white leading-none">시흥 전지역 방문</h4>
                  <p className="text-xs text-[#AAAAAA] mt-1.5 whitespace-nowrap">30분 내 신속 방문</p>
                </div>
              </div>
              <div className="hidden sm:block w-[1px] bg-[#C8A04D]/18 self-stretch my-1" />
              
              <div className="flex-1 flex items-start space-x-3 sm:pl-6">
                <Clock3 className="w-5 h-5 text-[#C8A04D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white leading-none">24시간 예약 상담</h4>
                  <p className="text-xs text-[#AAAAAA] mt-1.5 whitespace-nowrap">전화·카카오 상담 가능</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Group Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-3 mt-8 w-full select-none" 
              id="hero-cta-group"
            >
              <button 
                onClick={() => handleScrollTo('contact-section')}
                className="w-full sm:w-[210px] h-[60px] rounded-full bg-[#C8A04D] text-[#111111] font-bold text-[16px] flex items-center justify-center cursor-pointer whitespace-nowrap hover:scale-[1.03] hover:-translate-y-[2px] transition-all duration-[250ms] ease-out shadow-[0_4px_15px_rgba(200,160,77,0.15)] hover:shadow-[0_8px_25px_rgba(200,160,77,0.35)]"
              >
                실시간 예약
              </button>

              <a 
                href="tel:010-8451-4040"
                className="w-full sm:w-[210px] h-[60px] rounded-full bg-transparent border border-[#C8A04D] text-[#C8A04D] font-bold text-[16px] flex items-center justify-center cursor-pointer whitespace-nowrap hover:bg-[#C8A04D]/10 hover:scale-[1.03] hover:-translate-y-[2px] transition-all duration-[250ms] ease-out hover:shadow-[0_6px_20px_rgba(200,160,77,0.25)]"
              >
                전화 빠른 상담
              </a>

              <a 
                href="https://open.kakao.com/o/sxxxxx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-[210px] h-[60px] rounded-full bg-transparent border border-[#C8A04D] text-[#C8A04D] font-bold text-[16px] flex items-center justify-center cursor-pointer whitespace-nowrap hover:bg-[#C8A04D]/10 hover:scale-[1.03] hover:-translate-y-[2px] transition-all duration-[250ms] ease-out hover:shadow-[0_6px_20px_rgba(200,160,77,0.25)]"
              >
                카카오 상담
              </a>
            </motion.div>
          </div>

          {/* Right Column: Premium Model Image Banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="order-2 relative h-[520px] lg:h-full lg:min-h-[690px] w-full overflow-hidden rounded-[18px] border border-[#C8A04D]/18 bg-[#050505]"
          >
            {/* Extremely tight fit banner focusing on her face and torso with scroll parallax */}
            <div className="w-full h-full overflow-hidden relative flex items-center justify-center">
              <motion.img 
                src={brandModelImg} 
                alt="시흥출장마사지 프리미엄 홈케어 간다" 
                style={!isMobile ? { y: yParallax } : undefined}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onLoad={() => setIsImgLoaded(true)}
                className={`w-full h-full object-cover origin-center object-[50%_25%] lg:object-[50%_8%] transition-opacity duration-700 ${isImgLoaded ? 'opacity-100' : 'opacity-0'}`}
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Left black gradient overlay (Desktop) */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none hidden lg:block" 
              style={{ background: 'linear-gradient(90deg, #050505 0%, rgba(5,5,5,0.92) 10%, rgba(5,5,5,0.2) 35%, transparent 55%)' }} 
            />
            {/* Bottom black gradient overlay (Mobile) */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none lg:hidden" 
              style={{ background: 'linear-gradient(0deg, #050505 0%, rgba(5,5,5,0.90) 25%, rgba(5,5,5,0.1) 60%, transparent 100%)' }} 
            />
          </motion.div>

        </div>
      </section>

      {/* 3. Hero Bottom Trust Information Area - 4 Columns */}
      <motion.section 
        initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-[#0a0a0a] border-t border-white/5 py-[80px] lg:py-[120px]" 
        id="hero-bottom-trust"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
            
            {/* Column 1 */}
            <div className="bg-[#161616] border border-[#C8A04D]/18 hover:border-[#C8A04D] rounded-[18px] p-8 flex flex-col items-center text-center transition-all duration-[350ms] ease-out hover:-translate-y-[6px] relative group/trust-card h-full justify-between shadow-none overflow-hidden min-h-[220px] md:min-h-[240px]">
              <div className="flex flex-col items-center w-full">
                <div className="w-16 h-16 rounded-full border border-[#C8A04D]/18 flex items-center justify-center text-[#C8A04D] bg-[#1a1a1a] group-hover/trust-card:text-[#F5D782] group-hover/trust-card:border-[#C8A04D]/40 transition-all duration-300 mb-5 shrink-0">
                  <Award className="w-8 h-8 transition-transform duration-300 group-hover/trust-card:scale-105 group-hover/trust-card:rotate-[2deg]" />
                </div>
                <span className="text-[19px] font-bold text-white tracking-tight font-serif mb-3 leading-none block">
                  프리미엄 관리사
                </span>
                <p className="text-[13px] text-[#9A9A9A] leading-[1.8] font-sans break-keep max-w-[220px] mx-auto">
                  전문 교육을 이수한<br className="hidden sm:block" />프리미엄 관리사가 방문합니다.
                </p>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-[#C8A04D] w-8 group-hover/trust-card:w-full transition-all duration-500 ease-out" />
            </div>

            {/* Column 2 */}
            <div className="bg-[#161616] border border-[#C8A04D]/18 hover:border-[#C8A04D] rounded-[18px] p-8 flex flex-col items-center text-center transition-all duration-[350ms] ease-out hover:-translate-y-[6px] relative group/trust-card h-full justify-between shadow-none overflow-hidden min-h-[220px] md:min-h-[240px]">
              <div className="flex flex-col items-center w-full">
                <div className="w-16 h-16 rounded-full border border-[#C8A04D]/18 flex items-center justify-center text-[#C8A04D] bg-[#1a1a1a] group-hover/trust-card:text-[#F5D782] group-hover/trust-card:border-[#C8A04D]/40 transition-all duration-300 mb-5 shrink-0">
                  <Heart className="w-8 h-8 transition-transform duration-300 group-hover/trust-card:scale-105 group-hover/trust-card:rotate-[2deg]" />
                </div>
                <span className="text-[19px] font-bold text-white tracking-tight font-serif mb-3 leading-none block">
                  맞춤 케어
                </span>
                <p className="text-[13px] text-[#9A9A9A] leading-[1.8] font-sans break-keep max-w-[220px] mx-auto">
                  고객님의 컨디션에 맞춘<br className="hidden sm:block" />1:1 맞춤 케어를 제공합니다.
                </p>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-[#C8A04D] w-8 group-hover/trust-card:w-full transition-all duration-500 ease-out" />
            </div>

            {/* Column 3 */}
            <div className="bg-[#161616] border border-[#C8A04D]/18 hover:border-[#C8A04D] rounded-[18px] p-8 flex flex-col items-center text-center transition-all duration-[350ms] ease-out hover:-translate-y-[6px] relative group/trust-card h-full justify-between shadow-none overflow-hidden min-h-[220px] md:min-h-[240px]">
              <div className="flex flex-col items-center w-full">
                <div className="w-16 h-16 rounded-full border border-[#C8A04D]/18 flex items-center justify-center text-[#C8A04D] bg-[#1a1a1a] group-hover/trust-card:text-[#F5D782] group-hover/trust-card:border-[#C8A04D]/40 transition-all duration-300 mb-5 shrink-0">
                  <Sparkles className="w-8 h-8 transition-transform duration-300 group-hover/trust-card:scale-105 group-hover/trust-card:rotate-[2deg]" />
                </div>
                <span className="text-[19px] font-bold text-white tracking-tight font-serif mb-3 leading-none block">
                  힐링 & 휴식
                </span>
                <p className="text-[13px] text-[#9A9A9A] leading-[1.8] font-sans break-keep max-w-[220px] mx-auto">
                  피로 회복과 편안한 휴식을 위한<br className="hidden sm:block" />프리미엄 힐링 케어
                </p>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-[#C8A04D] w-8 group-hover/trust-card:w-full transition-all duration-500 ease-out" />
            </div>

            {/* Column 4 */}
            <div className="bg-[#161616] border border-[#C8A04D]/18 hover:border-[#C8A04D] rounded-[18px] p-8 flex flex-col items-center text-center transition-all duration-[350ms] ease-out hover:-translate-y-[6px] relative group/trust-card h-full justify-between shadow-none overflow-hidden min-h-[220px] md:min-h-[240px]">
              <div className="flex flex-col items-center w-full">
                <div className="w-16 h-16 rounded-full border border-[#C8A04D]/18 flex items-center justify-center text-[#C8A04D] bg-[#1a1a1a] group-hover/trust-card:text-[#F5D782] group-hover/trust-card:border-[#C8A04D]/40 transition-all duration-300 mb-5 shrink-0">
                  <ShieldCheck className="w-8 h-8 transition-transform duration-300 group-hover/trust-card:scale-105 group-hover/trust-card:rotate-[2deg]" />
                </div>
                <span className="text-[19px] font-bold text-white tracking-tight font-serif mb-3 leading-none block">
                  안심 서비스
                </span>
                <p className="text-[13px] text-[#9A9A9A] leading-[1.8] font-sans break-keep max-w-[220px] mx-auto">
                  100% 후불제<br className="hidden sm:block" />예약금 없는 안전한 이용
                </p>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-[#C8A04D] w-8 group-hover/trust-card:w-full transition-all duration-500 ease-out" />
            </div>

          </div>
        </div>
      </motion.section>

      {/* 4. Service Process Section */}
      <ProcessSection regionName={activeRegionData.name} />

      {/* 5. Course Guide Section */}
      <CourseSection />

      {/* 6. Premium Customer Reviews */}
      <ReviewSection />

      {/* 5. Editorial Magazine Section */}
      <section className="py-[80px] lg:py-[120px] bg-[#111111] border-t border-white/5" id="editorial-insight-section">
        <div className="max-w-5xl mx-auto px-6">
          <article className="space-y-12">
            <div className="border-b border-white/8 pb-6 flex items-center justify-between">
              <span className="text-[10px] font-sans text-[#C8A04D] tracking-[0.2em] font-bold uppercase block">
                EDITORIAL INSIGHT
              </span>
              <span className="text-[10px] text-[#9A9A9A] font-mono tracking-wider">
                ADMINISTRATIVE FOCUS: {activeRegionData.name}
              </span>
            </div>

            <div className="space-y-6">
              <h2 
                className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight"
                style={{
                  wordBreak: 'keep-all',
                  overflowWrap: 'normal',
                  whiteSpace: 'normal',
                }}
                id="seo-h2-heading"
              >
                {/* Mobile layout: 3 lines */}
                <span className="block md:hidden">
                  <span className="block">{activeRegionData.name}</span>
                  <span className="block mt-1 text-[#C8A04D] text-xl font-sans font-medium">프리미엄</span>
                  <span className="block mt-1 text-[#C8A04D] text-xl font-sans font-medium">출장안마 · 홈타이 전문</span>
                </span>

                {/* Desktop layout: 2 lines */}
                <span className="hidden md:block">
                  <span className="block">{activeRegionData.name}</span>
                  <span className="block mt-3 text-[#C8A04D] text-3xl font-sans font-medium tracking-wide">
                    프리미엄 출장안마 · 홈타이 전문
                  </span>
                </span>
              </h2>

              {/* Thin gold line: width 80px, height 2px */}
              <div className="w-[80px] h-[2px] bg-[#C8A04D]" />
            </div>

            <div className="text-sm md:text-base leading-[1.9] text-[#D0D0D0] space-y-10 font-sans">
              <div className="space-y-6">
                <p className="text-white font-semibold text-base md:text-lg leading-[1.9] max-w-[900px]">
                  간다출장마사지는 {activeRegionData.name} 전문 프리미엄 홈케어 브랜드입니다.
                  바쁜 일상 속에서 누적된 스트레스와 깊은 고단함을 해소해 드리기 위해,
                  고객님이 계신 가장 안락한 사적 공간으로 직접 찾아가는 명품 테라피 서비스를 제공합니다.
                </p>
                <p className="leading-[1.9] text-neutral-300 max-w-[900px] text-sm md:text-base">
                  지친 하루의 끝에서 번거롭게 숍을 방문할 필요 없이, 전화 한 통으로 24시간출장마사지를 집이나 호텔출장 등 원하시는 장소에서 편안하게 이용하실 수 있습니다.
                  {activeRegionData.name}의 주거 단지뿐만 아니라 주요 숙박 거점까지 신속하게 방문하여, 정통 홈타이 테라피와 전문 스웨디시 기법을 결합한 최상의 힐링을 선보입니다.
                </p>
                <p className="leading-[1.9] text-neutral-300 max-w-[900px] text-sm md:text-base">
                  다년간 다듬어온 정교한 수기 기법과 엄격하게 교육받은 전문 관리사의 세심한 손길로 출장안마의 차원을 한 단계 높였습니다.
                  선입금이나 예약금 없는 100% 현장 후불제 출장마사지 서비스로 신뢰할 수 있는 안심 웰니스 케어를 약속드립니다.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif font-bold text-white tracking-tight flex items-center space-x-2">
                  <span className="text-[#C8A04D] font-mono text-xs">01</span>
                  <span>지역 친화형 프리미엄 케어 및 거점 안내</span>
                </h3>
                <div className="space-y-4">
                  {formatParagraphs(page.intro)}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif font-bold text-white tracking-tight flex items-center space-x-2">
                  <span className="text-[#C8A04D] font-mono text-xs">02</span>
                  <span>안심 신속 방문 가이드 및 후불 약속</span>
                </h3>
                <div className="space-y-4">
                  {formatParagraphs(page.guide)}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif font-bold text-white tracking-tight flex items-center space-x-2">
                  <span className="text-[#C8A04D] font-mono text-xs">03</span>
                  <span>현대인을 위한 맞춤형 테라피 추천 코스</span>
                </h3>
                <div className="space-y-4">
                  {formatParagraphs(page.recommendations)}
                </div>
                <div className="text-xs text-[#C8A04D] font-sans font-bold tracking-wider pt-2 flex items-center space-x-2">
                  <span className="inline-block w-1 h-1 rounded-full bg-[#C8A04D]" />
                  <span>추천 집중 프로그램 : {activeRegionData.recommendCourse}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-serif font-bold text-white tracking-tight flex items-center space-x-2">
                  <span className="text-[#C8A04D] font-mono text-xs">04</span>
                  <span>주변 지역 유기적 연계 네트워크</span>
                </h3>
                <div className="space-y-4">
                  {formatParagraphs(page.nearbyText)}
                </div>
              </div>

              {/* Major Landmarks Section (Premium Designed Box) */}
              <div className="py-8 my-16 border-y border-white/10 text-center max-w-[900px] mx-auto space-y-4" id="major-landmarks-container">
                <div className="flex items-center justify-center space-x-2 text-[#C8A04D] font-sans font-bold text-sm tracking-wider">
                  <MapPin className="w-4 h-4 text-[#C8A04D]" />
                  <span>📍 주요 방문지역</span>
                </div>
                <div className="text-neutral-300 text-sm md:text-base font-sans leading-loose max-w-2xl mx-auto px-4">
                  {activeRegionData.landmarks.map((landmark, idx) => (
                    <span key={idx} className="inline-block">
                      <span className="hover:text-white transition-colors duration-200 font-medium">{landmark}</span>
                      {idx < activeRegionData.landmarks.length - 1 && (
                        <span className="text-[#C8A04D]/60 mx-2 font-light">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/8">
                <h3 className="text-lg font-serif font-bold text-white tracking-tight flex items-center space-x-2">
                  <span className="text-[#C8A04D] font-mono text-xs">05</span>
                  <span>프리미엄 소통 가이드 및 마무리 안내</span>
                </h3>
                <div className="space-y-4 italic leading-[1.9] text-[#C8A04D]">
                  {formatParagraphs(page.cta)}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <FaqSection regionName={activeRegionData.name} />

      {/* 7. Contact/Reservation Section */}
      <CtaSection regionName={activeRegionData.name} />

      <Footer 
        currentRegionId={activeRegionId} 
        onNavigate={navigateToRegion} 
      />

      {/* Floating Action Buttons for Mobile */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-6 left-6 right-6 z-50 lg:hidden"
        id="mobile-floating-cta"
      >
        <div className="bg-[#1A1A1A]/90 backdrop-blur-lg border border-white/10 rounded-full p-2 flex items-center shadow-2xl space-x-2">
          <button 
            onClick={() => handleScrollTo('contact-section')}
            className="flex-1 h-12 bg-[#C8A04D] hover:bg-[#B38D3C] text-[#111111] rounded-full font-sans font-bold text-xs tracking-wider flex items-center justify-center transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(200,160,77,0.18)] cursor-pointer"
          >
            예약문의
          </button>
          <a 
            href="tel:010-8451-4040"
            className="flex-1 h-12 border border-white/30 bg-transparent hover:bg-white/5 text-white rounded-full font-sans font-bold text-xs tracking-wider flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer"
          >
            전화하기
          </a>
          <a 
            href="https://open.kakao.com/o/sxxxxx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-12 bg-[#1A1A1A] border border-white/8 text-[#C8A04D] rounded-full font-sans font-bold text-xs tracking-wider flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer"
          >
            카카오톡
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
