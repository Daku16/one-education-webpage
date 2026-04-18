import AboutHero from "../../components/about/AboutHero";
import VisionSection from "../../components/about/VisionSection";
import InnovationSection from "../../components/about/InnovationSection";
import AboutReaCta from "../../components/about/AboutReaCta";

export default function SobrePage() {
  return (
    <main className="text-stone-800 pt-10 md:pt-16 lg:pt-24">
      <AboutHero />
      <VisionSection />
      <InnovationSection />
      <AboutReaCta />
    </main>
  );
}