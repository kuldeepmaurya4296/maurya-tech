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

    return routes;
}
