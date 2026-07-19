import { GeneratedPage, getNeighborsForRegion } from '../data/regions';
import { getPathByRegionId } from '../data/slugs';
import { SHARED_FAQS } from '../data/sharedFaqs';

interface SchemaMarkupProps {
  page: GeneratedPage;
  currentRegionId: string;
  currentRegionName: string;
}

export default function SchemaMarkup({ page, currentRegionId, currentRegionName }: SchemaMarkupProps) {
  const origin = 'https://ganda-massage.com';
  const isMain = currentRegionId === "시흥출장마사지";
  const currentUrl = `${origin}${getPathByRegionId(currentRegionId)}`;

  // 1. Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${origin}/#organization`,
    "name": "간다출장마사지",
    "alternateName": "GANDA Massage",
    "url": origin,
    "logo": `${origin}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+82-10-7497-2653",
      "contactType": "customer service",
      "areaServed": "KR",
      "availableLanguage": "Korean"
    }
  };

  // 2. WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    "name": "간다출장마사지",
    "url": origin,
    "publisher": {
      "@id": `${origin}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${origin}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // 3. LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${currentUrl}#localbusiness`,
    "name": `간다출장마사지 ${currentRegionName}`,
    "image": [
      `${origin}/logo.png`
    ],
    "telephone": "010-7497-2653",
    "priceRange": "₩70,000 - ₩180,000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "정왕대로 233",
      "addressLocality": "시흥시",
      "addressRegion": "경기도",
      "addressCountry": "KR",
      "postalCode": "15073"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.3801,
      "longitude": 126.8026
    },
    "url": currentUrl,
    "telephone_alternative": "+82-10-7497-2653",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "description": page.description,
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "경기도"
      },
      {
        "@type": "AdministrativeArea",
        "name": "시흥시"
      },
      {
        "@type": "AdministrativeArea",
        "name": currentRegionName
      },
      ...getNeighborsForRegion(currentRegionId).map(neighbor => ({
        "@type": "AdministrativeArea",
        "name": neighbor.name
      }))
    ]
  };

  // 4. FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": SHARED_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  // 5. BreadcrumbList Schema
  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "홈",
        "item": `${origin}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "시흥출장마사지",
        "item": `${origin}${getPathByRegionId("시흥출장마사지")}`
      },
      ...(!isMain ? [{
        "@type": "ListItem",
        "position": 3,
        "name": currentRegionName,
        "item": `${origin}${getPathByRegionId(currentRegionId)}`
      }] : [])
    ]
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbListSchema)}
      </script>
    </>
  );
}
