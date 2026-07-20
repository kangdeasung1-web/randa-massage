import { useState, useEffect } from 'react';
import { REGIONS_LIST, getPageById, GeneratedPage, getNeighborsForRegion } from './data/regions';
import Header from './components/Header';
import Footer from './components/Footer';
import CourseSection from './components/CourseSection';
import ProcessSection from './components/ProcessSection';
import ReviewSection from './components/ReviewSection';
import FaqSection from './components/FaqSection';
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

const MASTER_FAQS = [
  {
    q: "시흥출장마사지 예약금을 먼저 내야 하나요?",
    a: "간다출장마사지는 선입금이나 예약금을 절대로 받지 않는 100% 현장 후불제 시스템입니다. 예약금 없는 안심 후불 결제를 통해 악성 선입금 사기로부터 고객님의 자산과 신뢰를 철저하게 보호하고 있으니, 반드시 현장에서 관리사를 직접 대면하신 후에 결제해 주시기 바랍니다."
  },
  {
    q: "시흥출장마사지는 어디까지 방문하나요?",
    a: "경기도 시흥시 전 지역을 대상으로 촘촘한 방문망을 구성하고 있습니다. 배곧, 정왕동, 월곶동, 은계지구, 목감동, 장현지구 등 대단지 아파트와 오피스텔 같은 주택가는 물론, 관내에 정식 등록된 모든 호텔이나 모텔 등의 숙박시설까지 고객님이 머무시는 사적 공간이라면 언제든지 신속하고 정확하게 찾아갑니다."
  },
  {
    q: "호텔이나 모텔에서도 이용 가능한가요?",
    a: "네, 시흥 관내 모든 숙박업소에서도 안전하고 편리하게 출장마사지 서비스를 이용하실 수 있습니다. 입실하신 후 호실 번호와 정확한 주소지를 전담 고객센터로 말씀해 주시면, 철저한 위생 수칙을 준수한 힐링 스태프가 예약 시간 20~30분 내외로 빠르게 방문 케어를 준비합니다."
  },
  {
    q: "예약 방법은 어떻게 되나요?",
    a: "예약은 별도의 가입 절차나 개인 정보 유출 우려 없이 빠르고 간편하게 진행됩니다. 24시간 실시간 전화상담 센터나 공식 카카오톡 채널을 통해 원하시는 날짜와 세션 코스, 성함 및 상세 주소지를 전달해 주시면 즉각적인 일정 조율을 거쳐 고객님만을 위한 전담 홈케어 관리사가 신속히 배차됩니다."
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
    q: "출장마사지 이용 시간 연장도 가능한가요?",
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

const MAJOR_REGIONS_MAP = [
  { label: "정왕동", regionId: "정왕동출장마사지" },
  { label: "배곧신도시", regionId: "배곧출장마사지" },
  { label: "월곶동", regionId: "월곶출장마사지" },
  { label: "오이도", regionId: "오이도출장마사지" },
  { label: "거북섬", regionId: "거북섬출장마사지" },
  { label: "시화MTV", regionId: "시화MTV출장마사지" },
  { label: "목감동", regionId: "목감출장마사지" },
  { label: "은행동", regionId: "은행동출장마사지" },
  { label: "대야동", regionId: "대야동출장마사지" },
  { label: "신천동", regionId: "신천동출장마사지" }
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

export default function App({ initialPath }: { initialPath?: string }) {
  const getInitialRegion = () => {
    const path = initialPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
    const region = getRegionByPath(path);
    if (region) return region.regionId;
    return "시흥출장마사지";
  };

  const getInitialRouteError = () => {
    const path = initialPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
    const region = getRegionByPath(path);
    if (!region && path !== '/' && path !== '') return true;
    return false;
  };

  const [activeRegionId, setActiveRegionId] = useState<string>(getInitialRegion());
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [routeError, setRouteError] = useState(getInitialRouteError());
  const [isMobile, setIsMobile] = useState(false);
  const [isRegionsExpanded, setIsRegionsExpanded] = useState(false);

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
      setMetaTag('og:image', `${window.location.origin}/favicon-192x192.png`, true);
      setMetaTag('twitter:card', 'summary_large_image', false);
      setMetaTag('twitter:title', page.title, false);
      setMetaTag('twitter:description', page.description, false);

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
      <div className="min-h-screen bg-[#121212] text-white flex flex-col font-sans antialiased">
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
      className="min-h-screen bg-[#121212] text-white flex flex-col font-sans antialiased"
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

      <div className="bg-[#0B0B0B] border-b border-[#2C2C2C]">
        <Breadcrumb 
          currentRegionId={activeRegionId} 
          currentRegionName={activeRegionData.name} 
          onNavigate={navigateToRegion} 
        />
      </div>

      {/* 2. Redesigned Premium Hero Section - 1440px Horizontal Premium Layout */}
      <section 
        className="w-full relative bg-[#0B0B0B] py-8 lg:py-0 overflow-hidden" 
        id="hero-banner"
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-14 h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          
          {/* Right Column: Premium Model Image Banner - Displayed on top for mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="order-1 lg:order-2 relative h-[380px] xs:h-[440px] sm:h-[480px] lg:h-[690px] w-full max-w-[480px] lg:max-w-none mx-auto overflow-hidden rounded-[20px] border border-[#2C2C2C] bg-[#0B0B0B] group hover:border-[#E63946] hover:shadow-[0_8px_30px_rgba(193,18,31,0.18)] hover:-translate-y-1 transition-all duration-300"
          >
            {/* Extremely tight fit banner focusing on her face and torso */}
            <div className="w-full h-full overflow-hidden relative flex items-center justify-center bg-[#121212]">
              <img
                src="/images/ganda-hero-woman.webp"
                alt={`${activeRegionData.name} 출장마사지 - 24시 홈타이, 타이마사지`}
                width="1200"
                height="1400"
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out select-none filter brightness-105 saturate-105"
                style={{ objectPosition: 'center 12%' }}
                id="ganda-hero-woman"
              />
            </div>
            
            {/* Left black gradient overlay (Desktop) */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none hidden lg:block" 
              style={{ background: 'linear-gradient(90deg, transparent 0%, transparent 100%)' }} 
            />
            {/* Bottom black gradient overlay (Mobile) */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none lg:hidden" 
              style={{ background: 'linear-gradient(0deg, transparent 0%, transparent 100%)' }} 
            />
          </motion.div>

          {/* Left Column: Text & CTAs - Placed below image on mobile */}
          <div 
            className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left lg:justify-center order-2 lg:order-1 h-full w-full px-[20px] lg:px-0 box-border" 
            id="hero-text-content"
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 mx-auto lg:mx-0"
            >
              <span className="text-[#C1121F] font-sans font-semibold tracking-wider text-xs uppercase leading-none">
                GANDA HOME CARE
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="w-full max-w-full mx-auto lg:mx-0 text-center lg:text-left text-2xl xs:text-3xl lg:text-5xl font-sans font-bold leading-[1.25] tracking-tight text-[#F8F8F8] break-keep"
              style={{ wordBreak: 'keep-all', overflowWrap: 'normal' }}
              id="main-h1-header"
            >
              <span className="block whitespace-nowrap">{activeRegionData.name}</span>
              <span className="block mt-1 lg:mt-2 whitespace-nowrap">당신만의</span>
              <span className="text-[#C1121F] block mt-1 lg:mt-2 whitespace-nowrap">24시 홈케어</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center lg:text-left text-[#A8A8A8] text-sm md:text-base leading-[1.7] mt-6 w-full max-w-[340px] lg:max-w-[500px] mx-auto lg:mx-0 break-keep font-light"
            >
              {activeRegionData.name}와 {activeRegionData.name.replace("출장마사지", "출장안마")}를<br />
              24시간 운영합니다.
              <br /><br />
              예약금 없는 후불제로<br />
              호텔·자택 어디서나<br />
              편하게 이용할 수 있습니다.
            </motion.p>

            {/* CTA Group Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-[16px] mt-8 w-full max-w-[340px] sm:max-w-none mx-auto lg:mx-0 select-none" 
              id="hero-cta-group"
            >
              <a 
                href="tel:010-7497-2653"
                className="w-full sm:w-[210px] h-[60px] px-6 rounded-[16px] bg-transparent border-[1.5px] border-[#C1121F] text-[#FFFFFF] font-bold text-base flex items-center justify-center cursor-pointer whitespace-nowrap hover:bg-[#C1121F] hover:border-[#C1121F] hover:text-[#FFFFFF] transition-all duration-200"
              >
                전화 상담
              </a>

              <a 
                href="https://open.kakao.com/o/se8MdBEi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-[210px] h-[60px] px-6 rounded-[16px] bg-[#C1121F] border-[1.5px] border-[#C1121F] text-[#FFFFFF] font-bold text-base flex items-center justify-center cursor-pointer whitespace-nowrap hover:bg-[#D62839] hover:border-[#D62839] hover:text-[#FFFFFF] transition-all duration-200"
              >
                카카오 상담
              </a>
            </motion.div>

            {/* Horizontal Trust Badges (3 items) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center sm:items-stretch justify-center lg:justify-start gap-6 sm:gap-0 mt-8 py-5 border-y border-[#2C2C2C] w-full max-w-[600px] mx-auto lg:mx-0"
            >
              <div className="flex flex-col sm:flex-row flex-1 items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 sm:pr-4">
                <span className="premium-icon-wrapper shrink-0">
                  <ShieldCheck className="premium-icon" />
                </span>
                <div className="text-center sm:text-left">
                  <h4 className="text-sm font-bold text-[#F8F8F8] leading-none">예약금 없는 후불제</h4>
                  <p className="text-xs text-[#A8A8A8] mt-1.5 whitespace-nowrap">안심하고 이용하세요</p>
                </div>
              </div>
              <div className="hidden sm:block w-[1px] bg-[#2C2C2C] self-stretch my-1" />
              
              <div className="flex flex-col sm:flex-row flex-1 items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 sm:px-6">
                <span className="premium-icon-wrapper shrink-0">
                  <Clock3 className="premium-icon" />
                </span>
                <div className="text-center sm:text-left">
                  <h4 className="text-sm font-bold text-[#F8F8F8] leading-none">24시간 상담</h4>
                  <p className="text-xs text-[#A8A8A8] mt-1.5 whitespace-nowrap">언제든지 편안하게</p>
                </div>
              </div>
              <div className="hidden sm:block w-[1px] bg-[#2C2C2C] self-stretch my-1" />
              
              <div className="flex flex-col sm:flex-row flex-1 items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 sm:pl-6">
                <span className="premium-icon-wrapper shrink-0">
                  <MapPin className="premium-icon" />
                </span>
                <div className="text-center sm:text-left">
                  <h4 className="text-sm font-bold text-[#F8F8F8] leading-none">{activeRegionData.name.replace("출장마사지", "") || "시흥"} 전지역 방문</h4>
                  <p className="text-xs text-[#A8A8A8] mt-1.5 whitespace-nowrap">신속하고 친절하게</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 3. Hero Bottom Trust Information Area - 4 Columns */}
      <motion.section 
        initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-[#121212] border-t border-[#2C2C2C] py-16 md:py-24" 
        id="hero-bottom-trust"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
            
            {/* Column 1 */}
            <div className="bg-[#181818] border border-[#2C2C2C] hover:border-[#C1121F] rounded-[20px] p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-[4px] relative group/trust-card h-full justify-between shadow-sm overflow-hidden min-h-[220px] md:min-h-[245px]">
              <div className="flex flex-col items-center w-full">
                <div className="w-12 h-12 rounded-full border border-[#2C2C2C] flex items-center justify-center text-[#A8A8A8] bg-transparent group-hover/trust-card:text-[#C1121F] group-hover/trust-card:border-[#C1121F] group-hover/trust-card:bg-[rgba(193,18,31,0.05)] transition-all duration-300 mb-5 shrink-0">
                  <Award className="w-6 h-6 transition-transform duration-300 group-hover/trust-card:scale-105" />
                </div>
                <span className="text-base sm:text-lg font-bold text-[#F8F8F8] tracking-tight mb-2 leading-none block">
                  프리미엄 관리사
                </span>
                <p className="text-xs sm:text-sm text-[#A8A8A8] leading-relaxed font-sans break-keep max-w-[220px] mx-auto group-hover/trust-card:text-[#F8F8F8] transition-colors">
                  전문 교육을 이수한<br className="hidden sm:block" />프리미엄 관리사가 방문합니다.
                </p>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#2C2C2C] w-8 group-hover/trust-card:w-full group-hover/trust-card:bg-[#C1121F] transition-all duration-300 ease-out" />
            </div>

            {/* Column 2 */}
            <div className="bg-[#181818] border border-[#2C2C2C] hover:border-[#C1121F] rounded-[20px] p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-[4px] relative group/trust-card h-full justify-between shadow-sm overflow-hidden min-h-[220px] md:min-h-[245px]">
              <div className="flex flex-col items-center w-full">
                <div className="w-12 h-12 rounded-full border border-[#2C2C2C] flex items-center justify-center text-[#A8A8A8] bg-transparent group-hover/trust-card:text-[#C1121F] group-hover/trust-card:border-[#C1121F] group-hover/trust-card:bg-[rgba(193,18,31,0.05)] transition-all duration-300 mb-5 shrink-0">
                  <Heart className="w-6 h-6 transition-transform duration-300 group-hover/trust-card:scale-105" />
                </div>
                <span className="text-base sm:text-lg font-bold text-[#F8F8F8] tracking-tight mb-2 leading-none block">
                  맞춤 케어
                </span>
                <p className="text-xs sm:text-sm text-[#A8A8A8] leading-relaxed font-sans break-keep max-w-[220px] mx-auto group-hover/trust-card:text-[#F8F8F8] transition-colors">
                  고객님의 컨디션에 맞춘<br className="hidden sm:block" />1:1 맞춤 케어를 제공합니다.
                </p>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#2C2C2C] w-8 group-hover/trust-card:w-full group-hover/trust-card:bg-[#C1121F] transition-all duration-300 ease-out" />
            </div>

            {/* Column 3 */}
            <div className="bg-[#181818] border border-[#2C2C2C] hover:border-[#C1121F] rounded-[20px] p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-[4px] relative group/trust-card h-full justify-between shadow-sm overflow-hidden min-h-[220px] md:min-h-[245px]">
              <div className="flex flex-col items-center w-full">
                <div className="w-12 h-12 rounded-full border border-[#2C2C2C] flex items-center justify-center text-[#A8A8A8] bg-transparent group-hover/trust-card:text-[#C1121F] group-hover/trust-card:border-[#C1121F] group-hover/trust-card:bg-[rgba(193,18,31,0.05)] transition-all duration-300 mb-5 shrink-0">
                  <Sparkles className="w-6 h-6 transition-transform duration-300 group-hover/trust-card:scale-105" />
                </div>
                <span className="text-base sm:text-lg font-bold text-[#F8F8F8] tracking-tight mb-2 leading-none block">
                  힐링 & 휴식
                </span>
                <p className="text-xs sm:text-sm text-[#A8A8A8] leading-relaxed font-sans break-keep max-w-[220px] mx-auto group-hover/trust-card:text-[#F8F8F8] transition-colors">
                  피로 회복과 편안한 휴식을 위한<br className="hidden sm:block" />프리미엄 힐링 케어
                </p>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#2C2C2C] w-8 group-hover/trust-card:w-full group-hover/trust-card:bg-[#C1121F] transition-all duration-300 ease-out" />
            </div>

            {/* Column 4 */}
            <div className="bg-[#181818] border border-[#2C2C2C] hover:border-[#C1121F] rounded-[20px] p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-[4px] relative group/trust-card h-full justify-between shadow-sm overflow-hidden min-h-[220px] md:min-h-[245px]">
              <div className="flex flex-col items-center w-full">
                <div className="w-12 h-12 rounded-full border border-[#2C2C2C] flex items-center justify-center text-[#A8A8A8] bg-transparent group-hover/trust-card:text-[#C1121F] group-hover/trust-card:border-[#C1121F] group-hover/trust-card:bg-[rgba(193,18,31,0.05)] transition-all duration-300 mb-5 shrink-0">
                  <ShieldCheck className="w-6 h-6 transition-transform duration-300 group-hover/trust-card:scale-105" />
                </div>
                <span className="text-base sm:text-lg font-bold text-[#F8F8F8] tracking-tight mb-2 leading-none block">
                  안심 서비스
                </span>
                <p className="text-xs sm:text-sm text-[#A8A8A8] leading-relaxed font-sans break-keep max-w-[220px] mx-auto group-hover/trust-card:text-[#F8F8F8] transition-colors">
                  100% 후불제<br className="hidden sm:block" />예약금 없는 안전한 이용
                </p>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#2C2C2C] w-8 group-hover/trust-card:w-full group-hover/trust-card:bg-[#C1121F] transition-all duration-300 ease-out" />
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
      <section className="pt-16 md:pt-24 pb-8 md:pb-10 bg-[#0B0B0B] border-t border-[#2C2C2C]" id="editorial-insight-section">
        <div className="max-w-5xl mx-auto px-6">
          <article className="space-y-12">
            <div className="border-b border-[#2C2C2C] pb-6 flex items-center justify-between">
              <span className="text-xs font-sans text-[#C1121F] tracking-wide font-bold uppercase block">
                간다 웰니스 스페셜 가이드
              </span>
              <span className="text-xs text-[#A8A8A8] font-mono tracking-wider">
                ADMINISTRATIVE FOCUS: {activeRegionData.name}
              </span>
            </div>

            <div className="space-y-6">
              <h2 
                className="text-2xl md:text-4xl font-sans font-bold text-[#F8F8F8] tracking-tight leading-tight"
                style={{
                  wordBreak: 'keep-all',
                  overflowWrap: 'normal',
                  whiteSpace: 'normal',
                }}
                id="seo-h2-heading"
              >
                {/* Mobile layout: 3 lines */}
                <span className="block md:hidden">
                  <span className="block whitespace-nowrap">{activeRegionData.name}</span>
                  <span className="block mt-1 text-[#C1121F] text-lg font-sans font-semibold whitespace-nowrap">프리미엄</span>
                  <span className="block mt-1 text-[#C1121F] text-lg font-sans font-semibold whitespace-nowrap">프리미엄 출장마사지 전문</span>
                </span>

                {/* Desktop layout: 2 lines */}
                <span className="hidden md:block">
                  <span className="block">{activeRegionData.name}</span>
                  <span className="block mt-3 text-[#C1121F] text-2xl font-sans font-semibold tracking-wide">
                    프리미엄 출장마사지 전문
                  </span>
                </span>
              </h2>

              {/* Thin red line: width 80px, height 2px */}
              <div className="w-[80px] h-[2px] bg-[#C1121F]" />
            </div>

            <div className="text-sm md:text-base leading-relaxed text-[#A8A8A8] space-y-10 font-sans">
              <div className="space-y-6">
                <p className="text-[#F8F8F8] font-semibold text-base md:text-lg leading-relaxed max-w-[900px]">
                  간다출장마사지는 {activeRegionData.name} 전문 프리미엄 홈케어 브랜드입니다.
                  바쁜 일상 속에서 누적된 스트레스와 깊은 고단함을 해소해 드리기 위해,
                  고객님이 계신 가장 안락한 사적 공간으로 직접 찾아가는 명품 테라피 서비스를 제공합니다.
                </p>
                <p className="leading-relaxed text-[#A8A8A8] max-w-[900px] text-sm md:text-base">
                  지친 하루의 끝에서 번거롭게 숍을 방문할 필요 없이, 전화 한 통으로 24시간출장마사지를 집이나 호텔출장 등 원하시는 장소에서 편안하게 이용하실 수 있습니다.
                  {activeRegionData.name}의 주거 단지뿐만 아니라 주요 숙박 거점까지 신속하게 방문하여, 정통 홈타이 테라피와 전문 스웨디시 기법을 결합한 최상의 힐링을 선보입니다.
                </p>
                <p className="leading-relaxed text-[#A8A8A8] max-w-[900px] text-sm md:text-base">
                  다년간 다듬어온 정교한 수기 기법과 엄격하게 교육받은 전문 관리사의 세심한 손길로 출장마사지의 차원을 한 단계 높였습니다.
                  선입금이나 예약금 없는 100% 현장 후불제 출장마사지 서비스로 신뢰할 수 있는 안심 웰니스 케어를 약속드립니다.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-sans font-bold text-[#F8F8F8] tracking-tight flex items-center space-x-2">
                  <span className="text-[#C1121F] font-mono text-xs">01</span>
                  <span>지역 친화형 프리미엄 케어 및 거점 안내</span>
                </h3>
                <div className="space-y-4">
                  {formatParagraphs(page.intro)}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-sans font-bold text-[#F8F8F8] tracking-tight flex items-center space-x-2">
                  <span className="text-[#C1121F] font-mono text-xs">02</span>
                  <span>안심 신속 방문 가이드 및 후불 약속</span>
                </h3>
                <div className="space-y-4">
                  {formatParagraphs(page.guide)}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-sans font-bold text-[#F8F8F8] tracking-tight flex items-center space-x-2">
                  <span className="text-[#C1121F] font-mono text-xs">03</span>
                  <span>현대인을 위한 맞춤형 테라피 추천 코스</span>
                </h3>
                <div className="space-y-4">
                  {formatParagraphs(page.recommendations)}
                </div>
                <div className="text-xs text-[#C1121F] font-sans font-bold tracking-wider pt-2 flex items-center space-x-2">
                  <span className="inline-block w-1 h-1 rounded-full bg-[#C1121F]" />
                  <span>추천 집중 프로그램 : {activeRegionData.recommendCourse}</span>
                </div>
              </div>

            </div>
          </article>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <FaqSection regionName={activeRegionData.name} />

      {/* 7. Premium Area Map */}
      <section className="bg-[#121212] border-t border-[#232323] relative overflow-hidden" id="premium-area-map">
        {/* Subtle background red glow behind the section */}
        <div className="absolute right-0 bottom-0 w-[450px] h-[450px] bg-[#E63946]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute left-1/3 top-12 w-[300px] h-[300px] bg-[#E63946]/3 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-[20px] md:px-[24px] py-[72px] relative z-10">
          
          {/* Bento-grid horizontal layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Premium Brand Text & Fast Tags (col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 md:p-10 bg-[#181818]/80 backdrop-blur-md rounded-[24px] border border-white/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden group">
              {/* Decorative internal glass highlights */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#E63946]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#E63946]/15 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                <div>
                  <span className="text-xs text-[#E63946] font-sans font-semibold tracking-[0.25em] uppercase block mb-2">
                    Area Map
                  </span>
                  <h2 className="text-2xl md:text-3.5xl font-bold text-[#F8F8F8] tracking-tight flex items-center gap-3 break-keep whitespace-nowrap">
                    <span className="premium-map-pin-wrapper shrink-0 shadow-[0_0_20px_rgba(230,57,70,0.25)]">
                      <MapPin className="premium-icon" />
                    </span>
                    주요 방문지역
                  </h2>
                </div>

                <div className="space-y-2.5">
                  <h3 className="text-lg md:text-xl font-bold text-[#F8F8F8] tracking-tight leading-snug break-keep">
                    시흥 전지역 및 인근 지역 <span className="text-[#E63946]">30분 내</span> 신속 방문
                  </h3>
                  <p className="text-xs md:text-sm text-[#A8A8A8] leading-relaxed break-keep font-light">
                    고객이 계신 자택, 호텔, 오피스텔 등 원하는 장소로 30분 내 신속하게 방문해 편안한 케어를 제공합니다. 예약금 없이 현장 후불제로 부담 없이 이용하실 수 있습니다.
                  </p>
                </div>

                {/* Grid Density: Quick visual reference chips of major regions */}
                <div className="pt-2">
                  <span className="text-[11px] font-sans font-bold text-[#C1121F] tracking-wider uppercase block mb-2.5">
                    핵심 서비스 주요 거점
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-5 gap-2">
                    {MAJOR_REGIONS_MAP.map((item, idx) => (
                      <a 
                        key={idx}
                        href={getPathByRegionId(item.regionId)}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToRegion(item.regionId);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="h-[38px] flex items-center justify-center rounded-[10px] bg-white/[0.02] border border-white/[0.06] text-xs font-sans font-medium text-[#D0D0D0] hover:text-[#E63946] hover:border-[#E63946]/30 hover:bg-[#E63946]/5 hover:shadow-[0_4px_12px_rgba(230,57,70,0.12)] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Toggle expansion button nested in the card for perfect alignment */}
              <div className="pt-5 mt-5 border-t border-white/[0.05] relative z-10">
                <button
                  onClick={() => setIsRegionsExpanded(!isRegionsExpanded)}
                  className="w-full h-[52px] rounded-[14px] bg-gradient-to-r from-[#C1121F] to-[#E63946] text-[#FFFFFF] font-sans font-bold text-sm tracking-wide hover:shadow-[0_12px_30px_rgba(193,18,31,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="whitespace-nowrap">{isRegionsExpanded ? "전체 지역 목록 닫기 ▲" : "시흥시 전체 세부 지역 보기 ▼"}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Premium High-End Map frame (col-span-7) */}
            <div className="lg:col-span-7 h-[350px] lg:h-auto rounded-[24px] overflow-hidden border border-white/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group">
              <div className="absolute inset-0 border border-transparent group-hover:border-[#E63946]/25 rounded-[24px] pointer-events-none transition-colors duration-500 z-10" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202570.62768594246!2d126.68536735234567!3d37.40422998393529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b6f6f9fb1978b%3A0xc3af3bb2337d4f9!2sSiheung-si%2C%20Gyeonggi-do!5e0!3m2!1sen!2skr!4v1714457718000!5m2!1sen!2skr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Premium Service Area Map"
                className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
              ></iframe>
            </div>

          </div>

          {/* Expanded detailed region list wrapper */}
          <div
            style={{
              transition: 'max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, transform 0.3s ease',
              maxHeight: isRegionsExpanded ? '2000px' : '0px',
              opacity: isRegionsExpanded ? 1 : 0,
              transform: isRegionsExpanded ? 'translateY(0)' : 'translateY(-12px)',
              overflow: 'hidden'
            }}
            className="relative z-20"
          >
            <div className="mt-8 bg-[#181818]/90 backdrop-blur-md rounded-[24px] py-8 px-8 border border-[#E63946]/30 shadow-[0_15px_45px_rgba(193,18,31,0.15)]">
              <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
                <div>
                  <h4 className="text-[#F8F8F8] font-bold text-base font-sans">시흥시 전체 서비스 동·지역명</h4>
                  <p className="text-xs text-[#A8A8A8] mt-0.5">원하시는 동을 선택하시면 해당 지역 전용 테라피 가이드로 이동합니다.</p>
                </div>
                <span className="text-[10px] text-[#E63946] font-sans font-bold tracking-widest uppercase bg-[#E63946]/10 px-2.5 py-1 rounded-full border border-[#E63946]/20 self-start sm:self-auto">
                  24시간 신속배차 진행
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[
                  "시흥출장마사지", "정왕동출장마사지", "배곧출장마사지", "월곶출장마사지",
                  "오이도출장마사지", "거북섬출장마사지", "시화MTV출장마사지", "능곡동출장마사지",
                  "은행동출장마사지", "목감출장마사지", "신천동출장마사지", "대야동출장마사지",
                  "장곡동출장마사지", "하중동출장마사지", "하상동출장마사지", "연성동출장마사지",
                  "군자동출장마사지", "매화동출장마사지", "시화출장마사지"
                ].map((regionId) => {
                  const r = REGIONS_LIST.find(reg => reg.id === regionId);
                  if (!r) return null;
                  const displayName = r.id === "능곡동출장마사지" ? "능곡출장마사지" : r.id;
                  return (
                    <a
                      key={r.id}
                      href={getPathByRegionId(r.id)}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToRegion(r.id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="block bg-[#121212] border border-white/[0.05] rounded-[12px] py-3.5 px-4 text-center text-[#D0D0D0] hover:border-[#E63946] hover:text-[#E63946] hover:bg-[#E63946]/5 hover:shadow-[0_4px_15px_rgba(193,18,31,0.15)] transition-all duration-300 font-sans text-sm font-medium"
                    >
                      {displayName}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer 
         currentRegionId={activeRegionId} 
         onNavigate={navigateToRegion} 
      />

      {/* Floating Action Consultation Buttons for Mobile (Reservation buttons removed) */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-6 left-6 right-6 z-50 lg:hidden"
        id="mobile-floating-cta"
      >
        <div className="bg-[#181818]/95 backdrop-blur-lg border border-[#2C2C2C] rounded-[24px] p-2.5 flex items-center justify-between shadow-2xl gap-[16px]">
          <a 
            href="tel:010-7497-2653"
            className="flex-1 h-[60px] bg-transparent border-[1.5px] border-[#C1121F] text-[#FFFFFF] hover:bg-[#C1121F] hover:border-[#C1121F] hover:text-[#FFFFFF] rounded-[16px] font-sans font-bold text-base flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer shadow-md px-6"
          >
            전화 상담
          </a>
          <a 
            href="https://open.kakao.com/o/se8MdBEi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-[60px] bg-[#C1121F] border-[1.5px] border-[#C1121F] hover:bg-[#D62839] hover:border-[#D62839] text-[#FFFFFF] hover:text-[#FFFFFF] rounded-[16px] font-sans font-bold text-base flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer shadow-md px-6"
          >
            카카오 상담
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
