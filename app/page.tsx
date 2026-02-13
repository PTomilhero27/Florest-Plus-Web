import HeroSection from "./components/hero/hero.section";
import ProblemSection from "./components/problem/problem.section";
import { ImpactSection } from "./components/impact/impact.section";

export default function Home() {
  return (
    <main className="min-h-dvh bg-black text-white">
      <HeroSection />
      <ProblemSection />
      <ImpactSection />
    </main>
  );
}
