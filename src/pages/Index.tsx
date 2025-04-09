
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";
import BackToTop from "@/components/BackToTop";
import Testimonials from "@/components/Testimonials";
import ResumeDownload from "@/components/ResumeDownload";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Determine active section for navbar highlighting
      const sections = document.querySelectorAll("section");
      const scrollPosition = currentScrollY + 200;
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax effect calculation
  const parallaxOffset = scrollY * 0.1;

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen transition-colors duration-500">
      <Header activeSection={activeSection} />
      <main className="pt-16">
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div 
            style={{ 
              transform: `translateY(${parallaxOffset * 0.5}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <Hero />
          </div>
        </div>
        <About />
        <Skills />
        <Projects />
        <Education />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <DarkModeToggle />
      <BackToTop />
      <div className="fixed bottom-6 right-6 z-40">
        <ResumeDownload />
      </div>
    </div>
  );
};

export default Index;
