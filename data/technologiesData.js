export const technologiesData = {
    hero: {
        badge: "Technology Stack",
        title: "Modern Tools for Modern Solutions",
        description: "We use battle-tested technologies to build scalable, secure, and high-performance applications."
    },
    categories: [
        {
            id: "frontend",
            title: "Frontend",
            description: "Building beautiful, responsive user interfaces",
            technologies: [
                { name: "React", icon: "react", description: "Component-based UI library", proficiency: 95 },
                { name: "Next.js", icon: "nextjs", description: "React framework for production", proficiency: 90 },
                { name: "TypeScript", icon: "typescript", description: "Type-safe JavaScript", proficiency: 95 },
                { name: "Tailwind CSS", icon: "tailwind", description: "Utility-first CSS framework", proficiency: 95 },
                { name: "Framer Motion", icon: "framer", description: "Production-ready animations", proficiency: 85 }
            ]
        },
        {
            id: "backend",
            title: "Backend",
            description: "Powering applications with robust server-side logic",
            technologies: [
                { name: "Node.js", icon: "nodejs", description: "JavaScript runtime", proficiency: 95 },
                { name: "Express.js", icon: "express", description: "Fast, minimal web framework", proficiency: 90 },
                { name: "Python", icon: "python", description: "Versatile programming language", proficiency: 85 },
                { name: "GraphQL", icon: "graphql", description: "Query language for APIs", proficiency: 80 },
                { name: "REST API", icon: "api", description: "Standard API architecture", proficiency: 95 }
            ]
        },
        {
            id: "database",
            title: "Database",
            description: "Storing and managing data efficiently",
            technologies: [
                { name: "PostgreSQL", icon: "postgresql", description: "Advanced relational database", proficiency: 95 },
                { name: "MongoDB", icon: "mongodb", description: "Flexible document database", proficiency: 90 },
                { name: "Redis", icon: "redis", description: "In-memory data store", proficiency: 85 },
                { name: "Elasticsearch", icon: "elasticsearch", description: "Search and analytics engine", proficiency: 80 }
            ]
        },
        {
            id: "infrastructure",
            title: "Infrastructure",
            description: "Deploying and scaling with confidence",
            technologies: [
                { name: "AWS", icon: "aws", description: "Cloud computing platform", proficiency: 90 },
                { name: "Vercel", icon: "vercel", description: "Frontend deployment platform", proficiency: 95 },
                { name: "Docker", icon: "docker", description: "Container platform", proficiency: 85 },
                { name: "GitHub Actions", icon: "github", description: "CI/CD automation", proficiency: 90 }
            ]
        },
        {
            id: "tools",
            title: "Tools & Design",
            description: "Streamlining development and design workflows",
            technologies: [
                { name: "Figma", icon: "figma", description: "Collaborative design tool", proficiency: 90 },
                { name: "Git", icon: "git", description: "Version control", proficiency: 95 },
                { name: "Stripe", icon: "stripe", description: "Payment processing", proficiency: 90 },
                { name: "SendGrid", icon: "sendgrid", description: "Email delivery", proficiency: 85 }
            ]
        }
    ]
};
