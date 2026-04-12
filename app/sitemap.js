import { jobs } from '@/data/jobs';

export default function sitemap() {
    const baseUrl = 'https://maurya-tech.com';
    const currentDate = new Date().toISOString();

    const routes = [
        '',
        '/about',
        '/services',
        '/projects',
        '/products',
        '/pricing',
        '/technologies',
        '/careers',
        '/blog',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));

    const dynamicJobRoutes = jobs.jobs.filter(j => j.isActive).map(job => ({
        url: `${baseUrl}/careers/${job.id}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    return [...routes, ...dynamicJobRoutes];
}
