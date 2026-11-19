import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import CinematicSection from "@/components/sections/CinematicSection";
import DefumadosBand from "@/components/sections/DefumadosBand";

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] btn btn--cta">Pular para o conteúdo</a>
      <Navbar />
      <div className="page pt-[var(--header-h)]">
        <main id="conteudo">
          <Hero />
          <CinematicSection />
          <DefumadosBand />
        </main>
        <Footer />
      </div>
    </>
  );
}
