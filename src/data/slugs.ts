export interface CityConfig {
  cityId: string;
  cityName: string;
  slugPrefix: string; // e.g. "siheung"
  regions: {
    slug: string;
    regionId: string;
    name: string;
  }[];
}

export const CITIES_CONFIG: CityConfig[] = [
  {
    cityId: "siheung",
    cityName: "시흥",
    slugPrefix: "siheung",
    regions: [
      { slug: "", regionId: "시흥출장마사지", name: "시흥출장마사지" },
      { slug: "anma", regionId: "시흥출장안마", name: "시흥출장안마" },
      { slug: "hometai", regionId: "시흥홈타이", name: "시흥홈타이" },
      { slug: "jeongwang", regionId: "정왕동출장마사지", name: "정왕동출장마사지" },
      { slug: "baegot", regionId: "배곧출장마사지", name: "배곧출장마사지" },
      { slug: "wolgot", regionId: "월곶출장마사지", name: "월곶출장마사지" },
      { slug: "oido", regionId: "오이도출장마사지", name: "오이도출장마사지" },
      { slug: "geobukseom", regionId: "거북섬출장마사지", name: "거북섬출장마사지" },
      { slug: "sihwa-mtv", regionId: "시화MTV출장마사지", name: "시화MTV출장마사지" },
      { slug: "eunhaeng", regionId: "은행동출장마사지", name: "은행동출장마사지" },
      { slug: "sincheon", regionId: "신천동출장마사지", name: "신천동출장마사지" },
      { slug: "daeya", regionId: "대야동출장마사지", name: "대야동출장마사지" },
      { slug: "mokgam", regionId: "목감출장마사지", name: "목감출장마사지" },
      { slug: "neunggok", regionId: "능곡동출장마사지", name: "능곡동출장마사지" },
      { slug: "janggok", regionId: "장곡동출장마사지", name: "장곡동출장마사지" },
      { slug: "hajung", regionId: "하중동출장마사지", name: "하중동출장마사지" },
      { slug: "hasang", regionId: "하상동출장마사지", name: "하상동출장마사지" },
      { slug: "yeonseong", regionId: "연성동출장마사지", name: "연성동출장마사지" },
      { slug: "gunja", regionId: "군자동출장마사지", name: "군자동출장마사지" },
      { slug: "maehwa", regionId: "매화동출장마사지", name: "매화동출장마사지" },
      { slug: "sihwa", regionId: "시화출장마사지", name: "시화출장마사지" }
    ]
  }
  // Future extensions (Incheon, Bucheon, etc.) can be seamlessly added here:
  // {
  //   cityId: "incheon",
  //   cityName: "인천",
  //   slugPrefix: "incheon",
  //   regions: [...]
  // }
];

export function getRegionByPath(pathname: string): { regionId: string; cityId: string; slug: string } | null {
  // Clean up pathname (remove trailing slashes, leading slashes)
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    // Root / maps to siheung core
    return { regionId: "시흥출장마사지", cityId: "siheung", slug: "" };
  }

  const firstSeg = segments[0]; // e.g. "siheung"
  const secondSeg = segments[1] || ""; // e.g. "jeongwang"

  // Find city config matching first segment or cityPrefix
  const city = CITIES_CONFIG.find(c => c.slugPrefix === firstSeg);
  if (!city) {
    return null;
  }

  // Find region matching second segment (slug)
  const region = city.regions.find(r => r.slug === secondSeg);
  if (!region) {
    return null;
  }

  return {
    regionId: region.regionId,
    cityId: city.cityId,
    slug: region.slug
  };
}

export function getPathByRegionId(regionId: string): string {
  for (const city of CITIES_CONFIG) {
    const region = city.regions.find(r => r.regionId === regionId);
    if (region) {
      if (region.slug === "") {
        return `/${city.slugPrefix}`;
      }
      return `/${city.slugPrefix}/${region.slug}`;
    }
  }
  return "/";
}
