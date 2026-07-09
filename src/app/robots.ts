import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/super-admin/', '/login', '/signup'],
    },
    sitemap: 'https://bilugtravelskashmir.com/sitemap.xml',
  };
}
