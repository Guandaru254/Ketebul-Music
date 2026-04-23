import { MetadataRoute } from 'next';
import { client } from '@/lib/api';

const SITE_URL = 'https://ketebulmusic.org';

// Static routes — always included
const staticRoutes: MetadataRoute.Sitemap = [
  { url: SITE_URL,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${SITE_URL}/about`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${SITE_URL}/artists`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${SITE_URL}/projects`,lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${SITE_URL}/updates`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${SITE_URL}/gallery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/team`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  { url: `${SITE_URL}/shop`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Pull published updates from Sanity
    const updates = await client.fetch<{ slug: { current: string }; date: string }[]>(
      `*[_type == "update" && published != false && defined(slug.current)]{ slug, date } | order(date desc)`
    );

    const updateRoutes: MetadataRoute.Sitemap = updates.map(u => ({
      url: `${SITE_URL}/updates/${u.slug.current}`,
      lastModified: u.date ? new Date(u.date) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...updateRoutes];
  } catch {
    // If Sanity is unreachable during build, return static routes only
    return staticRoutes;
  }
}