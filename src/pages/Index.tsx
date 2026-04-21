import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ArchitectureScene from "@/components/ArchitectureScene";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";

const MicroservicesScene = lazy(() =>
  import("@/components/three/MicroservicesScene").then((m) => ({
    default: m.MicroservicesScene,
  }))
);

const Index = () => (
  <>
    <Suspense fallback={null}>
      <MicroservicesScene />
    </Suspense>
    <Navbar />
    <main>
      <HeroSection />
      <AboutSection />
      <ArchitectureScene />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <BlogSection />
      <ContactSection />
    </main>
  </>
);

export default Index;
