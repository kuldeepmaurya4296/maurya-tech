export const productsData = {
    title: "Our Enterprise Solutions",
    subtitle: "Comprehensive suite of business software, web platforms, and mobile applications designed to scale your operations.",
    categories: [
        {
            id: "core_saas",
            title: "Core SaaS Products",
            description: "Essential business tools for daily operations",
            icon: "LayoutGrid",
            products: [
                {
                    id: "crm",
                    slug: "crm-software",
                    title: "CRM Software",
                    description: "Manage leads, customers, sales pipelines, and follow-ups efficiently.",
                    shortDesc: "Complete customer relationship management solution",
                    features: ["Lead Management", "Sales Funnel", "Auto-followups", "Reports & Analytics", "Email Integration", "Mobile Access"],
                    pricingType: "Subscription",
                    benefits: [
                        "Increase sales conversion by 35%",
                        "Reduce customer response time by 60%",
                        "Centralize all customer data in one place",
                        "Automate repetitive sales tasks"
                    ],
                    useCases: [
                        "Sales teams managing B2B/B2C leads",
                        "Service companies tracking customer interactions",
                        "Growing businesses needing sales automation"
                    ],
                    techStack: ["React", "Node.js", "MongoDB", "AWS"],
                    deployment: "Cloud-based SaaS",
                    integrations: ["Gmail", "WhatsApp", "Payment Gateways", "Zapier"]
                },
                {
                    id: "erp",
                    slug: "erp-software",
                    title: "ERP Software",
                    description: "Integrated management of main business processes like HR, accounts, and inventory.",
                    shortDesc: "All-in-one enterprise resource planning",
                    features: ["Finance & Accounting", "HR & Payroll", "Inventory Management", "Supply Chain", "Multi-location Support", "Compliance Management"],
                    pricingType: "Module-based",
                    benefits: [
                        "Unify all departments on one platform",
                        "Real-time visibility into operations",
                        "Reduce operational costs by 25%",
                        "Improve decision-making with analytics"
                    ],
                    useCases: [
                        "Manufacturing companies managing production",
                        "Retail businesses with multiple locations",
                        "Service enterprises needing integrated operations"
                    ],
                    techStack: ["Java", "Spring Boot", "PostgreSQL", "microservices"],
                    deployment: "Cloud / On-premise",
                    integrations: ["GST Portal", "Banking APIs", "E-commerce platforms"]
                },
                {
                    id: "hrms",
                    slug: "hrms-suite",
                    title: "HRMS Suite",
                    description: "Complete human resource management from on-boarding to exit.",
                    shortDesc: "End-to-end HR automation platform",
                    features: ["Attendance Tracking", "Payroll Processing", "Leave Management", "Performance Appraisals", "Employee Self-Service", "Recruitment Module"],
                    pricingType: "Per Employee",
                    benefits: [
                        "Save 15+ hours per week on HR tasks",
                        "Ensure 100% payroll accuracy",
                        "Improve employee satisfaction",
                        "Maintain statutory compliance"
                    ],
                    useCases: [
                        "Companies with 50+ employees",
                        "Organizations with remote teams",
                        "Businesses needing payroll automation"
                    ],
                    techStack: ["Angular", "Django", "MySQL", "Docker"],
                    deployment: "Cloud-based",
                    integrations: ["Biometric devices", "Banking", "Tax portals"]
                },
                {
                    id: "job_portal",
                    slug: "job-portal-software",
                    title: "Job Portal Software",
                    description: "Platform for recruiters to post jobs and candidates to apply.",
                    shortDesc: "Complete recruitment and job marketplace",
                    features: ["Resume Parsing", "Candidate Database", "Application Tracking", "Email Alerts", "Advanced Search", "Interview Scheduling"],
                    pricingType: "Subscription",
                    benefits: [
                        "Reduce hiring time by 40%",
                        "Access larger talent pool",
                        "Streamline recruitment process",
                        "Better candidate matching"
                    ],
                    useCases: [
                        "Recruitment agencies",
                        "HR departments in large companies",
                        "Job aggregator platforms"
                    ],
                    techStack: ["Next.js", "Express", "MongoDB", "Redis"],
                    deployment: "Cloud SaaS",
                    integrations: ["LinkedIn", "Indeed", "Email services"]
                },
                {
                    id: "project_tool",
                    slug: "project-management-tool",
                    title: "Project Management Tool",
                    description: "Collaborate, track tasks, and manage sprints effectively.",
                    shortDesc: "Agile project and team management",
                    features: ["Task Boards", "Gantt Charts", "Time Tracking", "Collaboration", "File Sharing", "Sprint Planning"],
                    pricingType: "Per User",
                    benefits: [
                        "Improve team productivity by 30%",
                        "Better project visibility",
                        "Meet deadlines consistently",
                        "Enhanced team collaboration"
                    ],
                    useCases: [
                        "Software development teams",
                        "Marketing agencies",
                        "Construction project management"
                    ],
                    techStack: ["React", "GraphQL", "PostgreSQL", "WebSocket"],
                    deployment: "Cloud-based",
                    integrations: ["Slack", "GitHub", "Jira", "Google Drive"]
                },
                {
                    id: "accounting",
                    slug: "accounting-billing-software",
                    title: "Accounting & Billing",
                    description: "GST compliant invoicing and financial reporting.",
                    shortDesc: "Smart accounting and GST billing",
                    features: ["GST Invoicing", "Expense Tracking", "Balance Sheet", "Tax Reports", "Bank Reconciliation", "Multi-currency"],
                    pricingType: "License / Subscription",
                    benefits: [
                        "Ensure GST compliance",
                        "Real-time financial insights",
                        "Reduce accounting errors",
                        "Fast invoice generation"
                    ],
                    useCases: [
                        "SMEs needing GST billing",
                        "Accountants managing multiple clients",
                        "E-commerce businesses"
                    ],
                    techStack: ["Vue.js", "Laravel", "MySQL"],
                    deployment: "Cloud / Desktop",
                    integrations: ["GST Portal", "Payment gateways", "Banking"]
                },
                {
                    id: "inventory",
                    slug: "inventory-management-software",
                    title: "Inventory Management",
                    description: "Track stock levels, orders, sales and deliveries.",
                    shortDesc: "Complete inventory and warehouse control",
                    features: ["Stock Tracking", "Barcode Scanning", "Warehousing", "Supplier Management", "Low Stock Alerts", "Multi-location"],
                    pricingType: "Location / SKU based",
                    benefits: [
                        "Reduce stock-outs by 70%",
                        "Optimize inventory levels",
                        "Improve order fulfillment",
                        "Better supplier management"
                    ],
                    useCases: [
                        "Retail chains",
                        "Wholesale distributors",
                        "E-commerce warehouses"
                    ],
                    techStack: ["React", "Node.js", "MongoDB"],
                    deployment: "Cloud-based",
                    integrations: ["Barcode scanners", "E-commerce", "Accounting"]
                },
                {
                    id: "subs_mgmt",
                    slug: "subscription-management-software",
                    title: "Subscription Management",
                    description: "Automate recurring billing and manage customer subscriptions.",
                    shortDesc: "Recurring billing and subscription automation",
                    features: ["Recurring Billing", "Invoicing", "Payment Gateway Integration", "Dunning Management", "Analytics", "Customer Portal"],
                    pricingType: "% of Revenue",
                    benefits: [
                        "Reduce churn by 25%",
                        "Automate billing completely",
                        "Improve revenue predictability",
                        "Better customer retention"
                    ],
                    useCases: [
                        "SaaS companies",
                        "Membership-based businesses",
                        "Subscription box services"
                    ],
                    techStack: ["React", "Node.js", "Stripe", "PostgreSQL"],
                    deployment: "Cloud SaaS",
                    integrations: ["Stripe", "Razorpay", "PayPal", "QuickBooks"]
                }
            ]
        },
        {
            id: "web_platforms",
            title: "Web-Based Platforms",
            description: "Scalable platforms for digital businesses",
            icon: "Globe",
            products: [
                {
                    id: "ecommerce_web",
                    slug: "ecommerce-platform",
                    title: "E-Commerce Platform",
                    description: "Full-featured online store for B2B and B2C sales.",
                    shortDesc: "Complete online store solution",
                    features: ["Product Catalog", "Shopping Cart", "Payment Gateways", "Order Management"],
                    pricingType: "One-time / Commission"
                },
                {
                    id: "cms",
                    slug: "content-management-system",
                    title: "Content Management System",
                    description: "Custom CMS to manage your website content easily.",
                    shortDesc: "Easy content management platform",
                    features: ["Drag & Drop Editor", "SEO Tools", "Media Library", "User Roles"],
                    pricingType: "One-time"
                },
                {
                    id: "lms",
                    slug: "learning-management-system",
                    title: "Learning Management System",
                    description: "Platform for online education, training, and courses.",
                    shortDesc: "Complete e-learning platform",
                    features: ["Course Builder", "Student Dashboard", "Quizzes & Certificates", "Live Classes"],
                    pricingType: "Per Student / Subscription"
                },
                {
                    id: "booking",
                    slug: "booking-system",
                    title: "Booking System",
                    description: "Appointment scheduling for clinics, salons, and consultants.",
                    shortDesc: "Smart appointment scheduling",
                    features: ["Calendar View", "Slot Booking", "Reminders", "Online Payments"],
                    pricingType: "Monthly"
                },
                {
                    id: "membership",
                    slug: "membership-software",
                    title: "Membership Software",
                    description: "Manage communities, gyms, and clubs.",
                    shortDesc: "Community and club management",
                    features: ["Member Profiles", "Subscription Plans", "Event Management", "Access Control"],
                    pricingType: "Per Member"
                }
            ]
        },
        {
            id: "mobile_apps",
            title: "Mobile App Products",
            description: "Native and cross-platform mobile solutions",
            icon: "Smartphone",
            products: [
                {
                    id: "business_app",
                    slug: "internal-business-apps",
                    title: "Internal Business Apps",
                    description: "Apps for field force, operations, and internal reporting.",
                    shortDesc: "Field force and operations mobile apps",
                    features: ["Offline Form Submission", "GPS Tracking", "Task Assignment", "real-time Sync"],
                    pricingType: "One-time + AMC"
                },
                {
                    id: "ecommerce_app",
                    slug: "ecommerce-mobile-app",
                    title: "E-Commerce App",
                    description: "Mobile shopping experience for your customers.",
                    shortDesc: "Mobile shopping app solution",
                    features: ["Push Notifications", "Mobile Payments", "Wishlist", "Order Tracking"],
                    pricingType: "One-time / Subscription"
                },
                {
                    id: "delivery_app",
                    slug: "delivery-logistics-app",
                    title: "Delivery & Logistics",
                    description: "Apps for food delivery, courier, and hyperlocal services.",
                    shortDesc: "Complete delivery management solution",
                    features: ["Live Tracking", "Route Optimization", "Driver App", "Customer App"],
                    pricingType: "Platform Fee"
                },
                {
                    id: "taxi_app",
                    slug: "ride-taxi-app",
                    title: "Ride & Taxi App",
                    description: "Transportation booking solution similar to Uber/Ola.",
                    shortDesc: "Ride-hailing platform like Uber",
                    features: ["Ride Booking", "Driver Dispatch", "Fare Calculation", "Safety Features"],
                    pricingType: "Revenue Share"
                },
                {
                    id: "ondemand_app",
                    slug: "ondemand-services-app",
                    title: "On-Demand Services",
                    description: "Marketplace for services like plumbing, cleaning, etc.",
                    shortDesc: "Service marketplace platform",
                    features: ["Service Listing", "Provider App", "Booking Management", "Reviews"],
                    pricingType: "Commission"
                }
            ]
        },
        {
            id: "ai_automation",
            title: "AI & Automation",
            description: "Next-gen AI solutions for business efficiency",
            icon: "Bot",
            products: [
                {
                    id: "chatbot",
                    slug: "ai-chatbot",
                    title: "AI Chatbot",
                    description: "Smart chatbots for Web and WhatsApp customer support.",
                    shortDesc: "Intelligent chatbot for customer support",
                    features: ["NLP Support", "Automated Replies", "Lead Capture", "Human Handover"],
                    pricingType: "Per Conversation"
                },
                {
                    id: "resume_ai",
                    slug: "resume-screening-ai",
                    title: "Resume Screening AI",
                    description: "Automate hiring with AI-powered resume parsing.",
                    shortDesc: "AI-powered resume screening tool",
                    features: ["Skill Matching", "Ranking System", "Bias Reduction", "Integration"],
                    pricingType: "Per Resume"
                },
                {
                    id: "rec_engine",
                    slug: "recommendation-engine",
                    title: "Recommendation Engine",
                    description: "Personalize user experience for e-commerce.",
                    shortDesc: "AI-powered product recommendations",
                    features: ["Product Recommendations", "User Behavior Analysis", "Cross-selling", "Upselling"],
                    pricingType: "Usage-based"
                },
                {
                    id: "vision_ocr",
                    slug: "ocr-document-processing",
                    title: "OCR & Document Processing",
                    description: "Extract data from invoices, KYC docs automatically.",
                    shortDesc: "Automated document data extraction",
                    features: ["Text Recognition", "Data Extraction", "Format Support", "API Integration"],
                    pricingType: "Per Document"
                }
            ]
        },
        {
            id: "industry_specific",
            title: "Industry Specific",
            description: "Tailored software for education, healthcare, and hospitality",
            icon: "Building",
            products: [
                {
                    id: "school_erp",
                    slug: "school-college-erp",
                    title: "School / College ERP",
                    description: "Complete educational institution management system.",
                    shortDesc: "School and college management ERP",
                    features: ["Student Info", "Fee Management", "Exam Results", "Transport"],
                    pricingType: "Per Student"
                },
                {
                    id: "hospital_mgmt",
                    slug: "hospital-management",
                    title: "Hospital Management",
                    description: "Comprehensive hospital and clinic management solution.",
                    shortDesc: "Complete hospital management system",
                    features: ["OPD/IPD", "Pharmacy", "Lab Reports", "Billing"],
                    pricingType: "Module-based"
                },
                {
                    id: "realestate_crm",
                    slug: "real-estate-crm",
                    title: "Real Estate CRM",
                    description: "Specialized CRM for real estate businesses and brokers.",
                    shortDesc: "Real estate sales and broker CRM",
                    features: ["Lead Management", "Site Visit Tracking", "Booking Management", "Broker Module"],
                    pricingType: "Per user"
                },
                {
                    id: "restaurant_pos",
                    slug: "restaurant-pos",
                    title: "Restaurant POS",
                    description: "Point of sale system for restaurants and food businesses.",
                    shortDesc: "Complete restaurant POS solution",
                    features: ["Table Booking", "KOT", "Billing", "Inventory"],
                    pricingType: "Monthly + Hardware"
                },
                {
                    id: "hotel_pms",
                    slug: "hotel-management-pms",
                    title: "Hotel Management (PMS)",
                    description: "Property management system for hotels and resorts.",
                    shortDesc: "Hotel property management system",
                    features: ["Room Booking", "Housekeeping", "Guest Records", "Check-in/out"],
                    pricingType: "Per Room"
                }
            ]
        },
        {
            id: "marketing_tools",
            title: "Marketing & Sales",
            description: "Tools to grow your business reach",
            icon: "Megaphone",
            products: [
                { id: "marketing_auto", slug: "marketing-automation", title: "Marketing Automation", description: "Email & WhatsApp campaigns", shortDesc: "Multi-channel marketing automation", features: ["Email Campaigns", "WhatsApp Marketing", "Automation Workflows", "Analytics"], pricingType: "Per Contact" },
                { id: "seo_tool", slug: "seo-analytics-tool", title: "SEO Analytics Tool", description: "Website optimization insights", shortDesc: "Complete SEO analysis platform", features: ["Keyword Research", "Backlink Analysis", "Competitor Tracking", "Reports"], pricingType: "Monthly" },
                { id: "lead_gen", slug: "lead-generation-tool", title: "Lead Generation Tool", description: "Forms and funnels builder", shortDesc: "Landing pages and lead capture", features: ["Form Builder", "Landing Pages", "A/B Testing", "Integrations"], pricingType: "Monthly" },
                { id: "social_mgmt", slug: "social-media-manager", title: "Social Media Manager", description: "Scheduling and analytics", shortDesc: "Social media management platform", features: ["Post Scheduling", "Analytics", "Multi-platform", "Team Collaboration"], pricingType: "Per Account" }
            ]
        },
        {
            id: "infra_security",
            title: "Cloud & Security",
            description: "Robust infrastructure and protection",
            icon: "Shield",
            products: [
                { id: "hosting_panel", slug: "hosting-management", title: "Hosting Management", description: "Server control panel", shortDesc: "Complete server management panel", features: ["Server Monitoring", "Resource Management", "Domain Control", "SSL Management"], pricingType: "Per Server" },
                { id: "backup_tool", slug: "backup-recovery", title: "Backup & Recovery", description: "Automated data protection", shortDesc: "Automated backup and recovery", features: ["Scheduled Backups", "Cloud Storage", "Quick Restore", "Encryption"], pricingType: "Per GB" },
                { id: "security_suite", slug: "website-security", title: "Website Security", description: "Malware scanner & firewall", shortDesc: "Complete website protection suite", features: ["Malware Scanning", "Firewall", "DDoS Protection", "SSL Certificates"], pricingType: "Monthly" },
                { id: "iam", slug: "access-control-iam", title: "Access Control (IAM)", description: "User permission management", shortDesc: "Identity and access management", features: ["Role Management", "Permissions", "SSO", "Audit Logs"], pricingType: "Per User" }
            ]
        }
    ]
};
