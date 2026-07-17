import { CUSTOM_SEO_DATA } from './seoData';
import { RegionData, GeneratedPage } from './regions_types';
import { REGIONS_GROUP1 } from './regions_group1';
import { REGIONS_GROUP2 } from './regions_group2';
import { REGIONS_GROUP3 } from './regions_group3';

export type { RegionData, GeneratedPage };

export const REGIONS_LIST: RegionData[] = [
  ...REGIONS_GROUP1,
  ...REGIONS_GROUP2,
  ...REGIONS_GROUP3
];

// Helper to calculate closest neighbors for proximity internal linking
export function getNeighborsForRegion(regionId: string): RegionData[] {
  const proximityMap: Record<string, string[]> = {
    "시흥출장마사지": ["정왕동출장마사지", "배곧출장마사지", "은행동출장마사지", "목감출장마사지", "신천동출장마사지"],
    "시흥출장안마": ["신천동출장마사지", "대야동출장마사지", "은행동출장마사지", "장곡동출장마사지", "시흥출장마사지"],
    "시흥홈타이": ["정왕동출장마사지", "배곧출장마사지", "목감출장마사지", "능곡동출장마사지", "시흥출장마사지"],
    "정왕동출장마사지": ["배곧출장마사지", "오이도출장마사지", "월곶출장마사지", "시화출장마사지", "시흥출장마사지"],
    "배곧출장마사지": ["정왕동출장마사지", "오이도출장마사지", "월곶출장마사지", "거북섬출장마사지", "시흥출장마사지"],
    "월곶출장마사지": ["배곧출장마사지", "오이도출장마사지", "정왕동출장마사지", "목감출장마사지", "시흥출장마사지"],
    "오이도출장마사지": ["거북섬출장마사지", "배곧출장마사지", "정왕동출장마사지", "월곶출장마사지", "시흥출장마사지"],
    "거북섬출장마사지": ["오이도출장마사지", "시화MTV출장마사지", "배곧출장마사지", "정왕동출장마사지", "시화출장마사지"],
    "시화MTV출장마사지": ["거북섬출장마사지", "오이도출장마사지", "시화출장마사지", "정왕동출장마사지", "배곧출장마사지"],
    "은행동출장마사지": ["대야동출장마사지", "신천동출장마사지", "매화동출장마사지", "목감출장마사지", "시흥출장마사지"],
    "신천동출장마사지": ["대야동출장마사지", "은행동출장마사지", "매화동출장마사지", "하상동출장마사지", "시흥출장마사지"],
    "대야동출장마사지": ["신천동출장마사지", "은행동출장마사지", "매화동출장마사지", "하중동출장마사지", "시흥출장마사지"],
    "목감출장마사지": ["능곡동출장마사지", "하중동출장마사지", "은행동출장마사지", "장곡동출장마사지", "시흥출장마사지"],
    "능곡동출장마사지": ["장곡동출장마사지", "목감출장마사지", "연성동출장마사지", "군자동출장마사지", "시흥출장마사지"],
    "장곡동출장마사지": ["능곡동출장마사지", "연성동출장마사지", "하중동출장마사지", "하상동출장마사지", "시흥출장마사지"],
    "하중동출장마사지": ["하상동출장마사지", "연성동출장마사지", "장곡동출장마사지", "대야동출장마사지", "매화동출장마사지"],
    "하상동출장마사지": ["하중동출장마사지", "연성동출장마사지", "장곡동출장마사지", "신천동출장마사지", "매화동출장마사지"],
    "연성동출장마사지": ["장곡동출장마사지", "하중동출장마사지", "하상동출장마사지", "능곡동출장마사지", "군자동출장마사지"],
    "군자동출장마사지": ["정왕동출장마사지", "능곡동출장마사지", "연성동출장마사지", "배곧출장마사지", "시화출장마사지"],
    "매화동출장마사지": ["은행동출장마사지", "신천동출장마사지", "대야동출장마사지", "하상동출장마사지", "하중동출장마사지"],
    "시화출장마사지": ["정왕동출장마사지", "거북섬출장마사지", "시화MTV출장마사지", "배곧출장마사지", "군자동출장마사지"]
  };
  
  const neighborIds = proximityMap[regionId] || [];
  return neighborIds
    .map(id => REGIONS_LIST.find(r => r.id === id))
    .filter((r): r is RegionData => r !== undefined);
}

// Helper to calculate string similarity or generate deterministic text to fit 1,500 ~ 2,000 characters
export function generateSEOPage(region: RegionData): GeneratedPage {
  const name = region.name;
  const customData = CUSTOM_SEO_DATA[region.id] || CUSTOM_SEO_DATA[region.name];

  let title = `${name} | 출장안마 · 홈타이 전문 간다출장마사지`;
  let description = `간다출장마사지는 ${name} 전문 브랜드입니다. 시흥출장안마, 출장마사지, 홈타이 서비스를 정왕동, 배곧, 월곶, 오이도, 거북섬, 시화MTV 등 시흥 전지역에서 24시간 후불제로 제공합니다.`;
  let h1 = `${name} | 출장안마 · 홈타이 전문 간다출장마사지`;

  if (customData) {
    if (customData.title) title = customData.title;
    if (customData.description) description = customData.description;
    if (customData.h1) h1 = customData.h1;
  }

  let intro = "";
  let guide = "";
  let recommendations = "";
  let nearbyText = "";
  let faqs: { q: string; a: string }[] = [];
  let cta = "";

  if (customData) {
    intro = customData.intro;
    guide = customData.guide;
    recommendations = customData.recommendations;
    
    const neighborsList = getNeighborsForRegion(region.id);
    const neighborNames = neighborsList.map(r => r.name);
    nearbyText = `${customData.nearbyText} 저희 간다의 유기적인 거점 교차 배차 시스템 덕분에 인접 생활권인 ${neighborNames.join(', ')} 등의 이웃 지역에서도 딜레이 없는 완벽한 홈 스파를 연속적으로 제공받으실 수 있습니다.`;
    
    faqs = customData.faqs;
    cta = customData.cta;
  } else {
    // Dynamic fallback
    intro = `${name}를 찾아주신 소중한 고객 여러분, 환영합니다. 본 서비스는 시흥시 ${region.geoContext} 일대를 중심으로, 바쁜 현대사회 속에서 깊은 육체적 고단함과 심리적 피로를 겪고 계신 분들을 위해 설계된 '명품 찾아가는 테라피'입니다. ${region.localVibe}라는 콘셉트에 걸맞게, 일상의 소음과 스트레스로 가득 찬 외부 활동을 마친 후 가장 아늑하고 안전한 나만의 사적 공간(자택, 오피스텔, 호텔 등)에서 최고 수준의 힐링을 누릴 수 있도록 돕습니다. 특별히 ${name}는 해당 지역의 특징에 맞춤 설계되어, 다른 곳에서는 느낄 수 없었던 섬세함과 깊이를 선사합니다. 주거 중심의 안락한 환경부터 최첨단 비즈니스 현장까지, 지친 하루의 끝에 찾아오는 완벽한 마침표가 될 것을 약속드립니다. 전문 교육을 수료한 특급 케어 스태프가 고객님을 직접 찾아가 세심하게 보살펴 드립니다.`;

    guide = `저희 ${name}의 가장 큰 매력은 '신속성'과 '절대적 안전성'입니다. ${region.landmarks.join(', ')} 등 지역 주요 거점 및 랜드마크 주변에 항시 힐링 마스터 스태프가 상주하고 있어, 예약 상담 접수 후 평균 20~30분 이내에 고객님이 지정하신 장소로 한달음에 도착하는 시스템을 구축하고 있습니다. 또한 최근 기승을 부리는 예약금 및 선입금 사기 행위로부터 고객님들을 철저히 보호하기 위해, 저희는 오직 '100% 후불제 안전 시스템'만을 고집합니다. 관리사가 직접 방문하여 코스가 시작되기 전까지 그 어떠한 명목의 사전 입금도 요구하지 않으므로 마음 놓고 안심하고 이용하실 수 있습니다. 최고급 유기농 에센셜 오일과 정밀 소독된 프라이빗 타월 및 위생 비품을 항시 지참하여 방문하므로 위생적인 부분에서도 엄격한 관리를 제공받으실 수 있습니다.`;

    recommendations = `해당 구역의 성향에 어울리는 최적의 코스로 저희는 [${region.recommendCourse}] 코스를 가장 추천해 드립니다. 주로 ${region.targetAudience} 분들이 많이 상주하고 계시는 만큼, 장시간 업무나 가사, 레저 활동으로 인해 척추 라인과 목 어깨가 굳어 있는 경우가 많습니다. 이에 따라 림프 순환을 촉진하고 모세혈관의 흐름을 개선하는 부드러운 스웨디시 감성 케어와, 경직된 근막 깊숙이 침투하여 깊은 피로 물질을 제거하는 스포츠 수기 마사지를 적절히 하이브리드하여 진행합니다. 특히 저자극 천연 아로마 향료를 더해 테라피가 진행되는 내내 신경계의 긴장을 이완시키고 뇌 피로를 적극적으로 해소해 드립니다. 60분 베이직 코스부터 90분 리프레시 코스, 그리고 전신을 정교하게 다스리는 120분 VIP 명품 코스까지 다양한 프로그램이 준비되어 있어 원하시는 컨디션에 맞춰 맞춤 설계가 가능합니다.`;

    const neighborsList = getNeighborsForRegion(region.id);
    const neighborNames = neighborsList.map(r => r.name);
    nearbyText = `${name}가 자랑하는 넓은 커버리지는 시흥 전 지역을 촘촘한 그물망 형태로 아우르고 있습니다. 인근의 대표적인 연계 지역인 ${neighborNames.join(', ')} 등지에서도 완벽히 동일한 프리미엄 품질의 웰니스 서비스를 일관되게 제공받으실 수 있습니다. 만약 주거지나 업무지가 행정구역 경계선에 걸쳐 있거나, 타 지역으로 급작스럽게 이동하시더라도 걱정하실 필요가 없습니다. 각 행정동마다 유기적으로 연결된 전문 드라이버 및 관리사 네트워크를 구축하여 실시간으로 고객님의 동선을 지원하기 때문입니다. 특히 ${region.landmarks[0]} 주변에서 약속을 마치신 후 자택으로 귀가하시기 전 예약하시면, 집에 도착하시는 타이밍에 맞춰 관리사가 동시 입실하는 스피드 매칭 서비스도 폭넓은 사랑을 받고 있습니다.`;

    faqs = [
      {
        q: `${name} 이용 시 예약금이나 선입금을 먼저 내야 하나요?`,
        a: `절대 아닙니다. 저희는 선입금 사기로 피해를 입는 고객님이 없도록 100% 완전 후불제 방식을 준수합니다. 관리사가 직접 현장에 도착하여 안내해 드린 뒤 결제가 진행되므로, 어떠한 선입금 요구에도 응하지 마시고 안전한 케어를 누리시기 바랍니다.`
      },
      {
        q: `${region.landmarks[0]} 근처 오피스텔이나 아파트, 호텔에서도 예약할 수 있나요?`,
        a: `네, 물론입니다. 고객님이 프라이빗하게 휴식을 취하실 수 있는 공간(아파트, 원룸, 빌라, 오피스텔 등 주거 공간 및 정식 등록된 호텔, 모텔 등의 숙박 공간)이라면 시흥 어디든지 30분 이내로 전문 스태프가 완벽히 찾아갑니다.`
      },
      {
        q: `추천하시는 [${region.recommendCourse}]의 주된 효능은 무엇인가요?`,
        a: `이 코스는 신체 순환에 초점을 맞춘 맞춤형 관리입니다. 만성 근골격계 결림을 부드러운 순환 압으로 풀어주어 부종을 제거하고 잠자리에 들기 전 깊은 숙면을 유도합니다. 특히 장시간 앉아 근무하시는 분들의 하체 부종 해소에 탁월합니다.`
      }
    ];

    cta = `${name}는 365일 24시간 연중무휴로 운영되며, 새벽 시간대에도 동일한 친절함과 퀄리티로 대기 중입니다. 지금 예약 상담센터로 문의해 주시면, 맞춤형 코스 상담과 함께 실시간 방문 예상 시간을 친절히 알려드리겠습니다.`;
  }

  const faqText = faqs.map((f, i) => `Q${i+1}. ${f.q}\nA${i+1}. ${f.a}`).join('\n\n');

  const neighborsList = getNeighborsForRegion(region.id);

  let fullContent = `[ ${h1} ]

■ 시흥 대표 100% 후불제 프리미엄 테라피 브랜드에 오신 것을 환영합니다.

바쁜 현대 사회 속에서 고단한 일상을 살아가시는 고객님들을 위한 고품격 출장 케어 서비스입니다. 고객님이 가장 아늑하게 느끼시는 자택, 오피스텔, 호텔 등 사적인 공간에서 최고의 웰니스를 경험해 보세요.

---

1. 지역 친화형 프리미엄 케어 및 지역 안내
${intro}

2. 신속하고 안전한 안심 방문 가이드 및 후불 약속
${guide}

3. 현대인을 위한 맞춤형 테라피 추천 코스
${recommendations}

4. 주변 지역 유기적 연계 네트워크 (Topic Cluster)
${nearbyText}

5. 신뢰를 더하는 밀착형 Q&A FAQ
${faqText}

6. 프리미엄 고객 소통 예약 및 마무리 안내 (CTA)
${cta}

---

■ [간다출장마사지 인근 연동 지점 다이렉트 링크]
고객님의 편의를 위해 시흥시 내 인접한 주요 케어 거점 지점을 공유해 드립니다. 클릭하시면 각 지역의 생생한 생활 밀착형 힐링 가이드와 세부 혜택을 확인하실 수 있습니다:
${neighborsList.map(n => `- ${n.name}: 실시간 예약 및 도착 시간 (${n.landmarks[0]} 거점)`).join('\n')}

■ [위생 및 감염 안전 약속]
당사는 청결한 환경에서 완벽한 피로 복원을 즐기실 수 있도록 초고온 소독 세탁이 완료된 위생 린넨과 1회용 해면 비품, 마사지 전문 소독 용품을 필수 지참하여 고객 공간을 방문합니다. 선입금이 단 1원도 없는 100% 안전 거래 구역인 간다에서 지친 삶의 여유를 마음껏 누려 보시기 바랍니다.`.trim();

  const MIN_CHARS = 1600;
  const MAX_CHARS = 1950;

  if (fullContent.length > MAX_CHARS) {
    fullContent = fullContent.substring(0, MAX_CHARS - 100);
    const lastPeriod = fullContent.lastIndexOf('.');
    if (lastPeriod > 1000) {
      fullContent = fullContent.substring(0, lastPeriod + 1) + "\n\n■ 저희 브랜드는 언제나 안전과 위생, 그리고 고객 만족을 최우선 가치로 여기며 시흥 전역을 수호합니다. 감사합니다.";
    }
  } else if (fullContent.length < MIN_CHARS) {
    const extraContent = `\n\n■ [추가 안내 및 위생 약속]\n저희 브랜드는 철저한 소독 예방 수칙을 준수합니다. 매회 사용되는 전용 린넨포 및 타월은 초고온 살균 처리를 거치며, 오직 일회용 해면과 소독 필터링이 완료된 천연 저자극 비품만을 적용해 쾌적함을 선물합니다. 시흥 최고의 전문성과 윤리 의식을 겸비한 한국인 및 다국적 정예 여성 테라피진이 격이 다른 프리미엄 세션을 완성할 것입니다. 언제든지 부담 없이 예약 센터의 문을 두드려 주시기 바랍니다.`;
    fullContent += extraContent;
  }

  const charCount = fullContent.length;

  return {
    name,
    title,
    description,
    h1,
    intro,
    guide,
    nearbyText,
    faqText,
    faqs,
    cta,
    recommendations,
    fullContent,
    charCount
  };
}

// Global helper to retrieve a generated page by ID
export function getPageById(id: string): GeneratedPage | undefined {
  const decodedId = decodeURIComponent(id);
  const found = REGIONS_LIST.find(r => r.id === decodedId || r.name === decodedId);
  if (found) {
    return generateSEOPage(found);
  }
  // Default to main if not found
  const main = REGIONS_LIST.find(r => r.id === "시흥출장마사지");
  if (main) {
    return generateSEOPage(main);
  }
  return undefined;
}
