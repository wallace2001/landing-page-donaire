import Footer from "@/components/footer";
import AboutSection from "@/modules/homev2/components/about-section";
import FloatingButtons from "@/modules/homev2/components/floating-buttons";
import HeroV2 from "@/modules/homev2/components/hero-v2";
import { ServicesSection } from "@/modules/homev2/components/service-section";
import TeamSection from "@/modules/homev2/components/teams-section";

export default function Home() {
  return (
    <main className="w-full">
      {/* <Hero /> */}
      <HeroV2 />
      <AboutSection />
      <TeamSection />
      {/* <TeamSection /> */}
      <ServicesSection />
      <FloatingButtons />
      <Footer />
    </main>
  );
}
