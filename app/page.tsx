import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Research from "@/components/Research";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import GitHubActivity from "@/components/GitHubActivity";
import Education from "@/components/Education";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-ground"
      >
        Skip to content
      </a>

      <Header />

      <div id="top" />

      <main id="main">
        <Hero />
        <Research />
        <Projects />
        <Skills />
        <GitHubActivity />
        <Education />
        <Achievements />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
