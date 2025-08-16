import AwardFixedImage from "@/components/award-toast";
import Footer from "@/components/footer";
import AboutSection from "@/modules/homev2/components/about-section";
import ContactSection from "@/modules/homev2/components/contact-section";
import FloatingButtons from "@/modules/homev2/components/floating-buttons";
import HeroV2 from "@/modules/homev2/components/hero-v2";
import { PackagesSection } from "@/modules/homev2/components/package-section";
import { ServicesSection } from "@/modules/homev2/components/service-section";
import { ServicesSectionV2 } from "@/modules/homev2/components/service-sectionV2";
import TeamSection from "@/modules/homev2/components/teams-section";

export default function Home() {
  return (
    <main className="w-full">
      <HeroV2 />
      <AboutSection />
      <TeamSection />
      <ServicesSection />
      <ServicesSectionV2 />
      <PackagesSection />
      <FloatingButtons />
      <AwardFixedImage />
      <ContactSection />
      <Footer />
    </main>
  );
}
