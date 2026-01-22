export const projectsData = {
    hero: {
        badge: "Our Work",
        title: "From Idea to Production",
        description: "We don't build demos. We build systems designed to scale. Here's a selection of projects we've delivered."
    },
    categories: [
        { id: "all", name: "All Projects" },
        { id: "saas", name: "SaaS Platforms" },
        { id: "business", name: "Business Apps" },
        { id: "ecommerce", name: "E-Commerce" },
        { id: "startup", name: "Startups" }
    ],
    projects: [
        {
            id: "1",
            slug: "analytics-dashboard",
            title: "Enterprise Analytics Dashboard",
            shortDescription: "Real-time analytics platform for a Fortune 500 company",
            description: "We built a comprehensive analytics dashboard that processes millions of data points daily. The platform features real-time visualizations, custom report generation, and predictive analytics powered by machine learning.",
            category: "saas",
            client: "Fortune 500 Company",
            duration: "6 months",
            technologies: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
            features: [
                "Real-time data visualization",
                "Custom report builder",
                "Role-based access control",
                "API integrations",
                "Mobile responsive"
            ],
            results: [
                { metric: "Data Processing", value: "10M+", label: "events/day" },
                { metric: "Load Time", value: "<2s", label: "average" },
                { metric: "User Adoption", value: "95%", label: "within 3 months" }
            ],
            image: "",
            featured: true
        },
        {
            id: "2",
            slug: "saas-crm",
            title: "Multi-Tenant CRM Platform",
            shortDescription: "Complete CRM solution for B2B sales teams",
            description: "A full-featured CRM platform with pipeline management, email automation, and advanced analytics. Built with multi-tenant architecture to serve hundreds of businesses.",
            category: "saas",
            client: "SaaS Startup",
            duration: "8 months",
            technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "SendGrid"],
            features: [
                "Pipeline management",
                "Email automation",
                "Activity tracking",
                "Custom fields",
                "Team collaboration"
            ],
            results: [
                { metric: "Active Users", value: "5K+", label: "monthly" },
                { metric: "Revenue", value: "$500K", label: "ARR" },
                { metric: "Uptime", value: "99.9%", label: "reliability" }
            ],
            image: "",
            featured: true
        },
        {
            id: "3",
            slug: "ecommerce-marketplace",
            title: "B2B E-Commerce Marketplace",
            shortDescription: "Wholesale marketplace connecting manufacturers and retailers",
            description: "A sophisticated B2B marketplace with bulk ordering, price negotiations, and logistics integration. The platform handles complex pricing rules and multi-vendor inventory.",
            category: "ecommerce",
            client: "Manufacturing Industry",
            duration: "10 months",
            technologies: ["React", "Node.js", "PostgreSQL", "Elasticsearch", "Stripe"],
            features: [
                "Multi-vendor management",
                "Bulk ordering system",
                "Price negotiation",
                "Inventory sync",
                "Logistics integration"
            ],
            results: [
                { metric: "GMV", value: "$2M+", label: "monthly" },
                { metric: "Vendors", value: "500+", label: "active" },
                { metric: "Orders", value: "10K+", label: "monthly" }
            ],
            image: "",
            featured: false
        },
        {
            id: "4",
            slug: "hr-automation",
            title: "HR Workflow Automation",
            shortDescription: "Internal tool automating HR processes for 2000+ employees",
            description: "Custom HR automation platform handling onboarding, leave management, performance reviews, and payroll integration. Saved hundreds of hours monthly.",
            category: "business",
            client: "Enterprise Client",
            duration: "5 months",
            technologies: ["React", "Python", "PostgreSQL", "AWS Lambda"],
            features: [
                "Automated onboarding",
                "Leave management",
                "Performance tracking",
                "Payroll integration",
                "Document management"
            ],
            results: [
                { metric: "Time Saved", value: "200+", label: "hours/month" },
                { metric: "Employees", value: "2000+", label: "managed" },
                { metric: "Processes", value: "15+", label: "automated" }
            ],
            image: "",
            featured: false
        },
        {
            id: "5",
            slug: "fintech-mvp",
            title: "FinTech Payment Platform",
            shortDescription: "MVP for a fintech startup that raised $2M seed funding",
            description: "We built an MVP payment platform that helped the startup demonstrate product-market fit and secure seed funding. The platform included P2P payments, merchant integration, and fraud detection.",
            category: "startup",
            client: "FinTech Startup",
            duration: "4 months",
            technologies: ["React Native", "Node.js", "PostgreSQL", "Plaid", "Stripe"],
            features: [
                "P2P payments",
                "Merchant dashboard",
                "Fraud detection",
                "KYC integration",
                "Real-time notifications"
            ],
            results: [
                { metric: "Funding Raised", value: "$2M", label: "seed round" },
                { metric: "Beta Users", value: "1K+", label: "active" },
                { metric: "Time to Market", value: "4", label: "months" }
            ],
            image: "",
            featured: true
        },
        {
            id: "6",
            slug: "logistics-platform",
            title: "Logistics Management System",
            shortDescription: "End-to-end logistics platform for a delivery company",
            description: "Comprehensive logistics solution with route optimization, real-time tracking, driver management, and customer notifications. Integrated with existing ERP systems.",
            category: "business",
            client: "Logistics Company",
            duration: "7 months",
            technologies: ["React", "Node.js", "MongoDB", "Google Maps", "Firebase"],
            features: [
                "Route optimization",
                "Real-time tracking",
                "Driver app",
                "Customer notifications",
                "Analytics dashboard"
            ],
            results: [
                { metric: "Efficiency", value: "35%", label: "improvement" },
                { metric: "Deliveries", value: "50K+", label: "monthly" },
                { metric: "Cost Savings", value: "$100K+", label: "annually" }
            ],
            image: "",
            featured: false
        }
    ]
};
