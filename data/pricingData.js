export const pricingData = {
    title: "Simple, Transparent Pricing",
    subtitle: "Choose the perfect plan for your business needs. No hidden fees.",
    currency: "₹",
    disclaimer: "Pricing Note: All products listed are available as ready-made solutions or can be custom-built based on business needs. Prices are indicative and depend on features, integrations, scale, and customization. Final pricing is negotiable and may vary.",

    categories: [
        {
            id: "crm",
            name: "CRM Solutions",
            plans: [
                {
                    name: "Startup",
                    price: "599",
                    period: "user/month",
                    description: "Essential features for small teams",
                    features: ["Lead Management", "Contact Database", "Email Integration", "Mobile App Access", "Standard Support"]
                },
                {
                    name: "Business",
                    price: "1,299",
                    period: "user/month",
                    description: "Advanced automation for growing sales",
                    features: ["Sales Automation", "Workflow Rules", "Multiple Pipelines", "Advanced Reporting", "Role-based Access"],
                    popular: true
                },
                {
                    name: "Enterprise",
                    price: "2,499",
                    period: "user/month",
                    description: "Scale with custom integrations and security",
                    features: ["Custom Modules", "API Access", "Dedicated Account Manager", "SSO & Security", "Unlimited Storage"]
                }
            ]
        },
        {
            id: "hrms",
            name: "HRMS Suite",
            plans: [
                {
                    name: "Essential",
                    price: "99",
                    period: "employee/month",
                    description: "Core HR functions for startups",
                    features: ["Employee Database", "Leave Management", "Attendance Tracking", "Document Storage"]
                },
                {
                    name: "Professional",
                    price: "199",
                    period: "employee/month",
                    description: "Comprehensive HR management",
                    features: ["Payroll Processing", "Mobile App", "Helpdesk", "Asset Management", "Statutory Reports"],
                    popular: true
                },
                {
                    name: "Enterprise",
                    price: "399",
                    period: "employee/month",
                    description: "Full lifecycle management",
                    features: ["Performance Appraisal", "Timesheets", "Onboarding/Exit", "Reimbursements", "AI Analytics"]
                }
            ]
        },
        {
            id: "web_dev",
            name: "Web Development",
            plans: [
                {
                    name: "Basic Website",
                    price: "24,999",
                    period: "one-time",
                    description: "Perfect for personal profiles or small info sites",
                    features: ["5-7 Pages", "Responsive Design", "Contact Form", "Basic SEO", "1 Month Support"]
                },
                {
                    name: "Business / CMS",
                    price: "49,999",
                    period: "one-time",
                    description: "Dynamic website with content management",
                    features: ["Admin Dashboard", "Blog Section", "Social Integration", "Google Analytics", "Speed Optimization"],
                    popular: true
                },
                {
                    name: "E-Commerce",
                    price: "89,999",
                    period: "starts at",
                    description: "Complete online store solution",
                    features: ["Product Management", "Payment Gateway", "Cart & Checkout", "Order Management", "User Accounts"]
                }
            ]
        },
        {
            id: "mobile_app",
            name: "Mobile App Development",
            plans: [
                {
                    name: "Hybrid MVP",
                    price: "1,49,999",
                    period: "starts at",
                    description: "Cross-platform app (Flutter/React Native) for fast launch",
                    features: ["Android & iOS", "Basic Features", "Standard UI/UX", "API Integration", "3 Months Support"]
                },
                {
                    name: "Native App",
                    price: "3,99,999",
                    period: "starts at",
                    description: "High-performance native development",
                    features: ["Kotline/Swift Code", "Advanced Animations", "Device Hardware Access", "Offline Mode", "App Store Submission"],
                    popular: true
                },
                {
                    name: "Enterprise Solution",
                    price: "Custom",
                    period: "quote",
                    description: "Complex apps like Uber, Zomato, or FinTech",
                    features: ["Microservices Architecture", "Real-time Scale", "Advanced Security", "Custom Backend", "Ongoing AMC"]
                }
            ]
        },
        {
            id: "marketing",
            name: "Marketing & AI Tools",
            plans: [
                {
                    name: "AI Chatbot",
                    price: "1,999",
                    period: "month",
                    description: "Automated support for your website",
                    features: ["1000 Conversations", "Lead Capture", "Basic FAQ", "Scripted Flows"]
                },
                {
                    name: "Marketing Auto",
                    price: "4,999",
                    period: "month",
                    description: "Email and WhatsApp automation",
                    features: ["5000 Contacts", "Email Campaigns", "WhatsApp API Access", "Drip Sequence"]
                }
            ]
        }
    ],
    faq: [
        {
            question: "Do you offer custom pricing for large enterprises?",
            answer: "Yes, for large-scale deployments and enterprise requirements, we offer tailored custom pricing models that include volume discounts and dedicated support."
        },
        {
            question: "Is there a setup fee?",
            answer: "For most SaaS subscriptions, there is no setup fee. However, for custom development projects (Web/App), there is a one-time development cost."
        },
        {
            question: "Can I switch plans later?",
            answer: "Absolutely. You can upgrade or downgrade your SaaS subscription plans at any time based on your business growth."
        },
        {
            question: "What is your refund policy?",
            answer: "We offer a 7-day money-back guarantee for our monthly SaaS subscriptions. For custom development, terms are defined in the project contract."
        }
    ]
};
