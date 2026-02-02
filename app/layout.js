import { Inter, Montserrat, Open_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://maurya-tech.com'),
  title: {
    default: "Maurya Technologies | Quality Software Solutions",
    template: "%s | Maurya Technologies"
  },
  description: "Maurya Technologies & Services: Your trusted partner for Scalable Software, Web Development, Mobile Apps, and Enterprise Solutions. We build risk-free with our Pilot Model.",
  keywords: [
    "Maurya Technologies", "Maurya Tech", "Morya Tech", "Software Development Company",
    "Web Development", "Mobile App Development", "React Native", "Next.js",
    "IT Services", "Digital Transformation", "Software Pilot Model",
    "Hire Developers", "Freelance Developers", "B2B Software Partnership",
    "Custom Software", "Enterprise Solutions", "Cloud Services"
  ],
  authors: [{ name: "Kuldeep Maurya" }, { name: "Maurya Technologies Team" }],
  creator: "Maurya Technologies",
  publisher: "Maurya Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Maurya Technologies | Quality Software Solutions",
    description: "Expert Software Development Services. We build scalable, high-performance web and mobile applications using modern technologies.",
    url: 'https://maurya-tech.com',
    siteName: 'Maurya Technologies',
    images: [
      {
        url: '/og-image.png', // You should create this image or use a placeholder
        width: 1200,
        height: 630,
        alt: 'Maurya Technologies & Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Maurya Technologies",
    description: "Innovative software solutions. From Idea to Production. Start your risk-free pilot today.",
    images: ['/og-image.png'],
    creator: '@mauryatech', // Placeholder handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  category: 'technology',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} ${openSans.variable} ${firaCode.variable} antialiased`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
