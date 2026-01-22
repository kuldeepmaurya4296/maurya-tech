/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
        "./app/**/*.{js,jsx}",
        "./lib/**/*.{js,jsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                display: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['Fira Code', 'Consolas', 'monospace'],
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                success: {
                    DEFAULT: "hsl(var(--success))",
                    foreground: "hsl(var(--success-foreground))",
                },
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "fade-in": {
                    from: { opacity: "0", transform: "translateY(20px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in-up": {
                    from: { opacity: "0", transform: "translateY(40px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in-down": {
                    from: { opacity: "0", transform: "translateY(-20px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in-left": {
                    from: { opacity: "0", transform: "translateX(-20px)" },
                    to: { opacity: "1", transform: "translateX(0)" },
                },
                "fade-in-right": {
                    from: { opacity: "0", transform: "translateX(20px)" },
                    to: { opacity: "1", transform: "translateX(0)" },
                },
                "scale-in": {
                    from: { opacity: "0", transform: "scale(0.95)" },
                    to: { opacity: "1", transform: "scale(1)" },
                },
                "slide-up": {
                    from: { opacity: "0", transform: "translateY(100%)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "slide-down": {
                    from: { opacity: "0", transform: "translateY(-100%)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "bounce-subtle": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-5px)" },
                },
                "pulse-glow": {
                    "0%, 100%": { opacity: "0.5" },
                    "50%": { opacity: "1" },
                },
                "shimmer": {
                    from: { backgroundPosition: "200% center" },
                    to: { backgroundPosition: "-200% center" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "spin-slow": {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(360deg)" },
                },
                "gradient-shift": {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                "counter": {
                    from: { "--num": "0" },
                    to: { "--num": "var(--target)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fade-in": "fade-in 0.5s ease-out forwards",
                "fade-in-up": "fade-in-up 0.6s ease-out forwards",
                "fade-in-down": "fade-in-down 0.5s ease-out forwards",
                "fade-in-left": "fade-in-left 0.5s ease-out forwards",
                "fade-in-right": "fade-in-right 0.5s ease-out forwards",
                "scale-in": "scale-in 0.3s ease-out forwards",
                "slide-up": "slide-up 0.4s ease-out forwards",
                "slide-down": "slide-down 0.4s ease-out forwards",
                "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "shimmer": "shimmer 3s linear infinite",
                "float": "float 6s ease-in-out infinite",
                "float-delayed": "float 6s ease-in-out infinite 2s",
                "spin-slow": "spin-slow 20s linear infinite",
                "gradient-shift": "gradient-shift 3s ease infinite",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "hero-gradient": "linear-gradient(135deg, hsl(222 47% 4%) 0%, hsl(222 47% 8%) 50%, hsl(222 47% 4%) 100%)",
                "card-gradient": "linear-gradient(135deg, hsl(222 30% 8% / 0.8), hsl(222 30% 12% / 0.6))",
                "primary-gradient": "linear-gradient(135deg, hsl(192 91% 55%), hsl(220 91% 60%))",
                "accent-gradient": "linear-gradient(135deg, hsl(24 95% 53%), hsl(40 95% 55%))",
            },
            boxShadow: {
                "glow": "0 0 40px hsl(192 91% 55% / 0.3)",
                "glow-accent": "0 0 30px hsl(24 95% 53% / 0.3)",
                "glow-sm": "0 0 20px hsl(192 91% 55% / 0.2)",
                "premium": "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
