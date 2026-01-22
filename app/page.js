import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { ProblemsSection, PilotModelSection, WhyUsSection } from '@/components/HomeSections';
import { TestimonialsSection, ClientLogosSection } from '@/components/TestimonialsSection';
import { CTASection } from '@/components/CTASection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ClientLogosSection />
        <ProblemsSection />
        <PilotModelSection />
        <WhyUsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
