import AwardFixedImage from "@/components/award-toast";
import Footer from "@/components/footer";
import AboutSection from "@/modules/home/components/about-section";
import ContactSection from "@/modules/home/components/contact-section";
import FloatingButtons from "@/modules/home/components/floating-buttons";
import HeroV2 from "@/modules/home/components/hero-v2";
import { PackagesSection } from "@/modules/home/components/package-section";
import { ServicesSectionV2 } from "@/modules/home/components/service-sectionV2";
import TeamSection from "@/modules/home/components/teams-section";
import TestimonialsCarouselSection from "@/modules/home/components/testimonial-card";

export default function Home() {
  return (
    <main className="w-full">
      <HeroV2 />
      <AboutSection />
      <TeamSection />
      <TestimonialsCarouselSection />
      {/* <ServicesSection /> */}
      <ServicesSectionV2 />
      <PackagesSection />
      <FloatingButtons />
      <AwardFixedImage />
      <ContactSection />
      <Footer />
    </main>
  );
}
