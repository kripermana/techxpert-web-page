import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SHOW_PORTFOLIO } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="konten">
        <Hero />
        <Services />
        <HowItWorks />
        <About />
        {/* Sembunyikan Portofolio dengan mengubah SHOW_PORTFOLIO menjadi false di lib/content.ts */}
        {SHOW_PORTFOLIO && <Portfolio />}
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
