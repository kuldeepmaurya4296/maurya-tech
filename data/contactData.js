export const contactData = {
    hero: {
        badge: "Contact Us",
        title: "Let's Build Something That Works",
        description: "You bring the idea. We bring the execution. Start your risk-free pilot today."
    },
    info: {
        email: "contact@maurya-tech.com",
        phone: "+91 6263638053",
        website: "https://maurya-tech.com",
        location: "India (Serving Globally)",
        workingHours: "Mon - Fri, 9:00 AM - 6:00 PM IST"
    },
    process: {
        title: "The Maurya 3-Step Process",
        steps: [
            { number: "1", title: "Share your idea", description: "Tell us about your vision and goals" },
            { number: "2", title: "Get expert consultation", description: "We'll analyze and provide recommendations" },
            { number: "3", title: "See your product live", description: "Risk-free pilot development" }
        ]
    },
    form: {
        title: "Send us a message",
        fields: [
            { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
            { name: "email", label: "Email Address", type: "email", placeholder: "john@company.com", required: true },
            { name: "company", label: "Company Name", type: "text", placeholder: "Acme Inc.", required: false },
            { name: "budget", label: "Project Budget", type: "select", options: ["< $10K", "$10K - $25K", "$25K - $50K", "$50K - $100K", "$100K+"], required: false },
            { name: "message", label: "Project Details", type: "textarea", placeholder: "Tell us about your project...", required: true }
        ],
        submitText: "Start Your Risk-Free Pilot"
    },
    social: [
        { name: "LinkedIn", url: "https://linkedin.com/company/maurya-tech", icon: "Linkedin" },
        { name: "Twitter", url: "https://twitter.com/maurya_tech", icon: "Twitter" },
        { name: "GitHub", url: "https://github.com/maurya-tech", icon: "Github" }
    ]
};
