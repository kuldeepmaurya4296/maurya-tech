export const seoData = {
    brands: ['Maurya Technologies', 'Maurya Tech'],
    typos: [
        'maurya', 'morya', 'moriya', 'mourya', 'maurya-teach', 
        'mouri tech', 'mauri tech', 'maurya technologigies', 
        'morya tech', 'moriya technologies', 'mauraya', 'mauryatech7'
    ],
    services: [
        'software development', 'web development', 'mobile app development', 
        'mobile development', 'saas development', 'low rate development', 
        'custom software', 'react native development', 'nextjs development', 
        'cloud solutions', 'enterprise software', 'IT services', 
        'b2b software development', 'software consultation', 'digital transformation',
        'backend development', 'frontend development', 'full stack development',
        'API development', 'startup MVP development', 'product development'
    ],
    locations: [
        'India', 'USA', 'UK', 'Australia', 'Bangalore', 'Pune', 'Mumbai', 'Delhi', 'Hyderabad', 
        'Gurgaon', 'Noida', 'Chennai', 'Remote', 'Global'
    ],
    intent: ['near me', 'company near me', 'agency near me', 'expert', 'top rated', 'affordable', 'best', 'hire', 'developers for hire'],
    trending: [
        'pushpako2', 'pushapk o2', 'pushpa2', 'pushpakotwo', 
        'yantra', 'yantraq', 'tntra', 'yntrq', 
        'sarvatralabs', 'fakhriit', 'fakhri it', 'fakhri it services', 
        'facebook', 'instagram', 'whatsapp', 'chatgpt', 'gemini', 'cloude', 'lovable', 'antigravity', 
        'laptop', 'mobile', 'shoes', 'bhopal', 'madhya pradesh', 
        'virat kohali', 'virat kohli', 'anushka sharma', 'virushka', 'rohit sharma', 
        'vaibhav sooryavanshi', 'vaibhav', 'india', 'cricket', 'ipl', 'world cup'
    ]
};

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
