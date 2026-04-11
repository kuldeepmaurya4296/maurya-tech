export const seoData = {
    brands: [
        'Maurya Technologies', 'Maurya Tech', 'Maurya Technology',
        'Maurya Technologies and Services', 'Maurya Tech Solutions',
        'Maurya Software', 'Maurya IT Services', 'Maurya Digital',
        'Maurya Dev', 'Maurya Systems'
    ],

    typos: [
        'maurya', 'morya', 'moriya', 'mourya', 'mauraya', 'mauryah',
        'maurya-teach', 'maurya tech', 'maurya technologies', 'maurya technologigies',
        'maurya technolgies', 'maurya technolgy', 'maurya techonologies',
        'morya tech', 'morya technologies', 'moriya tech', 'moriya technologies',
        'mourya tech', 'mourya technologies', 'mauri tech', 'mouri tech',
        'maurya dev', 'maurya development', 'maurya software',
        'maurya it company', 'maurya it services', 'maurya solutions',
        'maurya startup tech', 'maurya digital company',
        'maurya technologies india', 'maurya technologies bhopal',
        'maurya technologies mp', 'maurya tech india'
    ],

    services: [
        // core
        'software development', 'web development', 'mobile app development',
        'mobile development', 'saas development', 'custom software development',
        'enterprise software development', 'product development',

        // frontend/backend
        'frontend development', 'backend development', 'full stack development',
        'react js development', 'next js development', 'node js development',
        'angular development', 'vue js development',

        // mobile
        'android app development', 'ios app development',
        'react native development', 'flutter app development',
        'cross platform app development',

        // advanced
        'ai development', 'machine learning development',
        'chatbot development', 'automation software',
        'crm development', 'erp development',

        // cloud/devops
        'cloud solutions', 'aws development', 'devops services',
        'serverless development', 'microservices architecture',

        // business focused
        'startup mvp development', 'b2b software development',
        'b2c software development', 'digital transformation',
        'it consulting services', 'software consultation',

        // long tail (generated style)
        'affordable software development company',
        'low cost web development services',
        'hire software developers',
        'hire dedicated developers',
        'outsource software development',
        'custom saas platform development',
        'on demand app development',
        'scalable backend development',
        'high performance web apps',
        'secure software development services'
    ],

    locations: [
        // India cities
        'Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain',
        'Delhi', 'Noida', 'Gurgaon', 'Mumbai', 'Pune',
        'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',

        // states & country
        'Madhya Pradesh', 'India',

        // global
        'USA', 'UK', 'Canada', 'Australia', 'Germany',
        'Dubai', 'Singapore', 'Remote', 'Global'
    ],

    intent: [
        'near me', 'company near me', 'agency near me',
        'best', 'top rated', 'affordable', 'cheap',
        'hire', 'hire developers', 'developers for hire',
        'outsource', 'expert', 'professional',
        'services near me', 'solutions near me',
        'trusted company', 'leading company'
    ],

    trending: [
        'chatgpt', 'openai', 'gemini ai', 'google ai',
        'ai tools', 'automation tools', 'no code tools',
        'low code platforms', 'saas tools',
        'facebook', 'instagram', 'whatsapp',
        'startup india', 'digital india',
        'ipl', 'cricket', 'world cup',
        'bhopal tech', 'mp startup ecosystem'
    ],
}

// Generate a massive array of permutations
export const generateKeywords = () => {
    let keywords = new Set([...seoData.brands, ...seoData.typos, ...seoData.services, ...seoData.trending]);

    // Near Me Intent
    seoData.services.forEach(service => {
        keywords.add(`${service}`);
        seoData.intent.forEach(intent => {
            keywords.add(`${service} ${intent}`);
            keywords.add(`${intent} ${service}`);
        });
    });

    // Brand + Service (especially with typo variations)
    seoData.typos.slice(0, 5).forEach(typo => {
        seoData.services.slice(0, 5).forEach(service => {
            keywords.add(`${typo} ${service}`);
        });
    });

    // Locations
    seoData.locations.slice(0, 6).forEach(loc => {
        seoData.services.slice(0, 10).forEach(service => {
            keywords.add(`${service} in ${loc}`);
            keywords.add(`hire ${service} company in ${loc}`);
            keywords.add(`best ${service} agency ${loc}`);
        });
    });

    return Array.from(keywords);
};

export const globalKeywordsList = generateKeywords();
