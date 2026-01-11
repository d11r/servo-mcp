import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { UseCase } from "@/components/UseCase";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { OpenSource } from "@/components/OpenSource";
import { QuickSetup } from "@/components/QuickSetup";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <UseCase />
        <Features />
        <HowItWorks />
        <OpenSource />
        <QuickSetup />
      </main>
      <Footer />
    </div>
  );
}
