export const projects = {
  hero: {
    title: "Engineering Impact",
    subtitle: "A Portfolio of Scalable Solutions",
    description: "From aerospace fleet management to educational platforms and social impact initiatives—explore how we build systems that solve real-world problems.",
  },
  categories: ["All", "SaaS Platforms", "Business Applications", "Startups", "E-Commerce", "IoT & AI"],
  projects: [
    {
      id: "pushpako2",
      slug: "pushpako2-aerospace-innovation",
      title: "PushpakO2 - Aerospace Innovation",
      category: "Startups",
      role: "Full Stack Development & Digital Strategy",
      shortDescription: "India's premier indigenous aerospace company manufacturing intelligent aerial systems and autonomous drones.",
      fullDescription: "PushpakO2 is revolutionizing the Indian aviation sector with indigenous unmanned aerial systems (UAS). We partnered with them to build a comprehensive digital ecosystem that not only showcases their cutting-edge technology—like Hydrogen-powered drones and Vertical Takeoff systems—but also serves as the operational backbone for their client interactions and investor relations.",
      problem: "PushpakO2 needed to translate complex aerospace engineering concepts (hydrogen propulsion, autonomous navigation) into an accessible digital narrative for investors and defense partners. They also required a scalable platform to handle high-resolution 3D assets and video data without compromising performance.",
      solution: "We engineered a high-performance Next.js application optimized for media-heavy content. The platform features interactive 3D models of aircraft, detailed technical glossaries for 'Smart Charging' and 'Automated Hangars', and a roadmap visualization module. Behind the scenes, we built a custom CMS to allow their engineering team to update technical specs in real-time.",
      keyFeatures: [
        {
          title: "Interactive Aircraft Showcase",
          description: "3D model viewers and detailed spec sheets for various drone models.",
          icon: "Plane"
        },
        {
          title: "Technology Deep Dives",
          description: "Dedicated modules explaining Hydrogen Fuel Cells and VTOL systems.",
          icon: "Zap"
        },
        {
          title: "Global CDN Delivery",
          description: "Optimized asset delivery ensuring sub-second load times worldwide.",
          icon: "Globe"
        },
        {
          title: "Investor Portal",
          description: "Secure section for sharing roadmaps and financial projections.",
          icon: "Shield"
        }
      ],
      techStack: {
        frontend: ["Next.js 14", "React", "Tailwind CSS", "Framer Motion", "Three.js"],
        backend: ["Node.js", "Express", "PostgreSQL"],
        infrastructure: ["AWS S3", "CloudFront", "Vercel"],
        tools: ["Blender (for 3D assets)", "Figma"]
      },
      results: [
        "Established PushpakO2 as a digital leader in the Indian Aerospace sector.",
        "Facilitated key partnerships with defense contractors through clear technical presentation.",
        "Achieved 99.9% uptime during high-traffic launch events."
      ],
      thumbnail: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&h=600&fit=crop",
      liveLink: "https://www.pushpako2.com/",
      desktopImages: [
        "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=1920&h=1080&fit=crop",
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1920&h=1080&fit=crop",
        "https://images.unsplash.com/photo-1508614589041-895b8c9d7ef5?w=1920&h=1080&fit=crop"
      ],
      mobileImages: [
        "https://images.unsplash.com/photo-1506947411487-a56738267384?w=400&h=800&fit=crop",
        "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?w=400&h=800&fit=crop"
      ],
      featured: true,
      client: "PushpakO2",
      duration: "Ongoing",
      year: "2024",
    },
    {
      id: "pushpako2-crm",
      slug: "pushpako2-crm-system",
      title: "PushpakO2 CRM & Fleet Ops",
      category: "Business Applications",
      role: "System Architecture & Development",
      shortDescription: "A mission-critical CRM and Fleet Management dashboard for drone operations.",
      fullDescription: "To support their expanding fleet, PushpakO2 needed a centralized command center. We built a bespoke CRM and Fleet Management System that integrates real-time communications, task delegation, and personnel management. This system bridges the gap between ground control teams, maintenance engineers, and administrative staff.",
      problem: "Managing a distributed fleet of drones and a growing team of pilots and engineers was becoming chaotic. They needed a unified platform to track attendance, assign missions (tasks), and communicate securely in real-time.",
      solution: "We developed a secure, role-based dashboard using Next.js and Prisma. The system features a real-time chat module for instant communication between ground teams, a Kanban-style task board for maintenance schedules, and a comprehensive HR module for attendance and team management.",
      keyFeatures: [
        {
          title: "Real-time Ops Chat",
          description: "Secure, internal messaging system for mission-critical communication.",
          icon: "MessageSquare"
        },
        {
          title: "Task & Mission Management",
          description: "Kanban boards for tracking drone maintenance and flight missions.",
          icon: "LayoutDashboard"
        },
        {
          title: "Team & HR Module",
          description: "Attendance tracking, profile management, and role-based access control.",
          icon: "Users"
        },
        {
          title: "Fleet Analytics",
          description: "Visual data on fleet status, maintenance cycles, and operational readiness.",
          icon: "BarChart3"
        }
      ],
      techStack: {
        frontend: ["Next.js", "Recoil (State)", "Tailwind CSS", "Recharts"],
        backend: ["Next.js API Routes", "Prisma ORM", "PostgreSQL"],
        security: ["NextAuth.js", "Role-Based Access Control (RBAC)", "BCrypt"],
        realtime: ["Socket.io (for Chat)"]
      },
      results: [
        "Reduced mission planning time by 40% through centralized task management.",
        "Eliminated communication silos between engineering and flight ops teams.",
        "Provided executive leadership with real-time visibility into workforce productivity."
      ],
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      liveLink: "#",
      desktopImages: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1920&h=1080&fit=crop"
      ],
      mobileImages: [
        "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400&h=800&fit=crop",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop"
      ],
      featured: true,
      client: "PushpakO2 Internal",
      duration: "6 months",
      year: "2024",
    },
    {
      id: "sarvtralab-lms",
      slug: "sarvtralab-learning-management",
      title: "SarvtraLab LMS",
      category: "SaaS Platforms",
      role: "Lead Product Development",
      shortDescription: "A scalable Learning Management System empowering schools and government bodies.",
      fullDescription: "SarvtraLab is democratizing education with a robust LMS designed for Indian schools and government educational programs. The platform supports a hierarchical structure—managing States, Districts, Schools, Teachers, and Students—making it ideal for large-scale deployments.",
      problem: "Traditional LMS platforms were too rigid to handle the multi-tier administrative structure required by government school networks (State -> District -> School). They also lacked offline-first capabilities for remote areas.",
      solution: "We architected a hierarchical SaaS platform where content can be distributed from the top down. The system includes specific dashboards for 'School Admin', 'Teacher', and 'Student'. It features video course modules, automated quizzes, and a certificate generation engine.",
      keyFeatures: [
        {
          title: "Multi-Tier Administration",
          description: "Hierarchical control for Govt, District, and School-level admins.",
          icon: "Building"
        },
        {
          title: "Course Management",
          description: "Video hosting, assignment submission, and automated grading.",
          icon: "School"
        },
        {
          title: "Public & Private Sectors",
          description: "Dedicated modules for 'Govt' programs and private 'Schools'.",
          icon: "Globe"
        },
        {
          title: "Student Analytics",
          description: "Detailed progress tracking and performance reports.",
          icon: "BarChart3"
        }
      ],
      techStack: {
        frontend: ["Next.js 14", "Radix UI", "React Hook Form", "Zod"],
        backend: ["Next.js Server Actions", "MongoDB (Mongoose)"],
        media: ["Cloudinary (Video/Image Optimization)"],
        auth: ["JWT", "Custom Auth Provider"]
      },
      results: [
        "Successfully deployed in pilot program across 50+ schools.",
        "Streamlined the distribution of government educational curriculum.",
        "Reduced administrative workload for teachers by automating attendance and grading."
      ],
      thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
      liveLink: "https://sarvtralab.com",
      desktopImages: [
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1920&h=1080&fit=crop",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&h=1080&fit=crop",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop"
      ],
      mobileImages: [
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=800&fit=crop"
      ],
      featured: true,
      client: "SarvtraLab",
      duration: "8 months",
      year: "2024",
    },
    {
      id: "erohan",
      slug: "erohan-foundation",
      title: "EROHAN Foundation",
      category: "Startups",
      role: "Frontend Engineering & UI/UX",
      shortDescription: "A digital impact platform for extensive social welfare initiatives.",
      fullDescription: "EROHAN Foundation works on the ground to improve lives through education, healthcare, and skill development. We built their digital face—a platform that not only tells their story but facilitates their operations through Volunteer Management and CSR partner showcasing.",
      problem: "The foundation struggled to showcase their diverse 'Programs' (CSR, Volunteering) effectively. They needed a site that was fast, accessible on low-end devices, and emotionally enabling to drive donations.",
      solution: "We built a lightning-fast React application using Vite and Lenis for smooth browsing. The site is structured around their core pillars: 'Programs', 'CSR', and 'Donate'. We integrated a specialized 'Programs' module to highlight specific ongoing camps and initiatives.",
      keyFeatures: [
        {
          title: "Program Showcase",
          description: "Dynamic filtering and detailed views for ongoing social programs.",
          icon: "Heart"
        },
        {
          title: "CSR Partnership Portal",
          description: "Dedicated section for corporate partners to view impact reports.",
          icon: "Building"
        },
        {
          title: "Smooth Experience",
          description: "Lenis scrolling and Framer Motion for a premium, engaging feel.",
          icon: "Activity"
        },
        {
          title: "Volunteer Registration",
          description: "Streamlined forms for onboarding new volunteers.",
          icon: "Users"
        }
      ],
      techStack: {
        frontend: ["React (Vite)", "Shadcn UI", "Tailwind CSS"],
        animations: ["Framer Motion", "Lenis Scroll"],
        backend: ["Node.js (for form handling)"],
        hosting: ["Vercel"]
      },
      results: [
        "Increased volunteer inquiries by 40% in the first quarter.",
        "Improved site performance score to 98/100 on mobile devices.",
        "Successfully raised awareness for 10+ major CSR campaigns."
      ],
      thumbnail: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop",
      liveLink: "https://erohan.org",
      desktopImages: [
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&h=1080&fit=crop",
        "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1920&h=1080&fit=crop",
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop"
      ],
      mobileImages: [
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=800&fit=crop"
      ],
      featured: false,
      client: "EROHAN Foundation",
      duration: "3 months",
      year: "2024",
    },
    {
      id: "yantraq",
      slug: "yantraq-industrial-iot",
      title: "Yantraq - Industrial IoT",
      category: "IoT & AI",
      role: "Full Stack Developer",
      shortDescription: "AI-powered IoT dashboard for industrial machine monitoring.",
      fullDescription: "Yantraq allows factories to monitor their machines in real-time. By collecting data from sensors and processing it with AI (Generative AI), the platform predicts breakdowns before they happen. Our dashboard provides a birds-eye view of floor operations.",
      problem: "Factory managers had no visibility into machine health until a breakdown occurred. They needed a system to ingest sensor data, visualize it continuously, and alert them to anomalies.",
      solution: "We built a MERN stack application capable of handling high-frequency data streams. We integrated Google's Generative AI to analyze unstructured maintenance logs and sensor patterns to provide readable insights for operators.",
      keyFeatures: [
        {
          title: "Real-time Monitoring",
          description: "Live charts and status indicators for connected machinery.",
          icon: "Activity"
        },
        {
          title: "AI Insights",
          description: "Google GenAI integration to interpret sensor anomalies.",
          icon: "Cpu"
        },
        {
          title: "Secure Data Ingestion",
          description: "Robust API endpoints for edge devices to push sensor data.",
          icon: "Server"
        },
        {
          title: "Role Management",
          description: "Multi-tenant access for Factory Admins vs Machine Operators.",
          icon: "Shield"
        }
      ],
      techStack: {
        frontend: ["React", "Vite", "Recharts"],
        backend: ["Node.js", "Express", "Mongoose"],
        ai: ["Google Generative AI SDK"],
        security: ["JWT Auth", "Helmet", "Rate Limiting"]
      },
      results: [
        "Deployed in beta for industrial equipment monitoring.",
        "Demonstrated capability to handle concurrent data streams from 100+ sensors.",
        "Simplifies complex technician data into actionable AI summaries."
      ],
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      liveLink: "#",
      desktopImages: [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop",
        "https://images.unsplash.com/photo-1563770095-39d468f9a51d?w=1920&h=1080&fit=crop"
      ],
      mobileImages: [
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=800&fit=crop"
      ],
      featured: false,
      client: "Yantraq",
      duration: "5 months",
      year: "2024",
    },
    {
      id: "fakhri-it",
      slug: "fakhri-it-services",
      title: "Fakhri IT Services",
      category: "Business Applications",
      role: "Lead Developer",
      shortDescription: "Professional portfolio and service showcase.",
      fullDescription: "A comprehensive digital portfolio for Fakhri IT Services, highlighting their expertise in software development and consultancy. The site features dynamic service cards, a rolling client marquee, and a clear conversion funnel.",
      problem: "Fakhri IT needed a unified platform to showcase their wide range of services and portfolio projects in a way that builds trust with enterprise clients.",
      solution: "Implementing a clean corporate design with high-performance animations using Framer Motion. The site includes a dynamic client marquee, detailed service pages, and an optimized contact flow.",
      keyFeatures: [
        {
          title: "Dynamic Service Cards",
          description: "Interactive cards detailing various IT services.",
          icon: "Code"
        },
        {
          title: "Client Marquee",
          description: "Seamless scrolling showcase of client logos.",
          icon: "Users"
        },
        {
          title: "Fast Load Times",
          description: "Optimized Next.js build for instant page navigation.",
          icon: "Zap"
        }
      ],
      techStack: {
        frontend: ["Next.js", "Tailwind CSS", "Framer Motion"],
        components: ["Marquee", "Lucide Icons"],
        deployment: ["Vercel"]
      },
      results: [
        "Increased new client inquiries by 25%.",
        "Reduced page load time by 50% compared to previous site.",
        "Professionalized brand image attracting larger contracts."
      ],
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      desktopImages: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop",
        "https://images.unsplash.com/photo-1504384308090-c54be3852dad?w=1920&h=1080&fit=crop"
      ],
      mobileImages: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop"
      ],
      featured: false,
      client: "Fakhri IT",
      duration: "4 months",
      year: "2024"
    }
  ],
  pilot: {
    title: "The Maurya Pilot",
    subtitle: "Our Signature Model",
    description: "Build First. Decide Later. We develop a live working version of your product. You evaluate performance, code quality, UX & design, and business fit. Then you decide whether to continue. No pressure. No risk. Only results.",
    features: [
      "Performance evaluation",
      "Code quality review",
      "UX & design assessment",
      "Business fit analysis",
    ],
    ctaText: "Start Your Pilot",
    ctaLink: "/contact",
  },
};
