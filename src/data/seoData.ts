import { SEO_GROUP1 } from './seo_group1';
import { SEO_GROUP2 } from './seo_group2';
import { SEO_GROUP3 } from './seo_group3';

export interface CustomSEOContent {
  intro: string;
  guide: string;
  recommendations: string;
  nearbyText: string;
  cta: string;
  faqs: { q: string; a: string }[];
  title?: string;
  description?: string;
  h1?: string;
}

export const CUSTOM_SEO_DATA: Record<string, CustomSEOContent> = {
  ...SEO_GROUP1,
  ...SEO_GROUP2,
  ...SEO_GROUP3,
};
