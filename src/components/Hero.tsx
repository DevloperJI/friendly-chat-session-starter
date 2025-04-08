
import { useEffect, useRef } from "react";
import { ArrowDown, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (imageRef.current && contentRef.current) {
      imageRef.current.classList.add("animate-fade-in");
      contentRef.current.classList.add("animate-slide-in-right");
    }
  }, []);
  
  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center pt-16 pb-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div 
            ref={imageRef} 
            className="flex justify-center opacity-0 transform translate-y-10 transition-all duration-700"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
              <div className="relative overflow-hidden rounded-full border-4 border-white shadow-xl w-64 h-64 md:w-80 md:h-80">
                <img 
                  src="/lovable-uploads/625abfea-aac1-4f3b-9bc7-2bf74dbd0a79.png" 
                  alt="Prashant Mishra" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div 
            ref={contentRef}
            className="opacity-0 transform translate-x-10 transition-all duration-700 delay-300"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Prashant Mishra</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-slate-700 mb-6">Aspiring Software Developer</h2>
            
            <div className="flex flex-col gap-3 mb-8 text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-600" />
                <span>Lucknow (226002), Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-blue-600" />
                <span>+91 9140919036</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-blue-600" />
                <span>mji041854@gmail.com</span>
              </div>
            </div>
            
            <p className="text-slate-700 mb-8 max-w-lg">
              Aspiring software developer with experience in Java and Python, seeking to leverage
              my skills in software application development. Proficient in unit testing,
              code optimization, and integration testing.
            </p>
            
            <div className="flex gap-4">
              <Button onClick={scrollToContact}>
                Contact Me
              </Button>
              <Button variant="outline" className="group" onClick={() => {
                document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
              }}>
                Learn More
                <ArrowDown size={16} className="ml-2 group-hover:animate-bounce" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
