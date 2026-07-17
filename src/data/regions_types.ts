export interface RegionData {
  id: string; // URL-safe or Korean ID
  name: string; // Name of the region (e.g. '정왕동출장마사지')
  type: 'city_core' | 'industrial' | 'tourist' | 'residential' | 'new_town';
  landmarks: string[]; // Specific landmarks for this area (e.g. ['정왕역', '시화공단', '시흥시청'])
  features: string[]; // Keywords characterizing the neighborhood (e.g. ['30분 신속 방문', '100% 후불제', '스트레스 완화'])
  recommendCourse: string; // Recommended course (e.g. '스웨디시 테라피', '타이 스트레칭')
  targetAudience: string; // Main target audience (e.g. '직장인', '인근 주민', '관광객', '신혼부부')
  localVibe: string; // Brief visual/atmosphere description
  geoContext: string; // Geographical placement within Siheung
}

export interface GeneratedPage {
  name: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  guide: string;
  nearbyText: string;
  faqText: string;
  faqs: { q: string; a: string }[];
  cta: string;
  recommendations: string;
  fullContent: string; // 1,500 ~ 2,000 chars of unified high-quality SEO text
  charCount: number;
}
