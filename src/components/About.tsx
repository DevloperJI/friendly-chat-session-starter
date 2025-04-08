
import { useEffect, useRef } from "react";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className="opacity-0 transform translate-y-10 transition-all duration-700"
        >
          <h2 className="text-3xl font-bold mb-2 text-center">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-12 rounded-full"></div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-50 rounded-2xl p-8 shadow-lg border border-slate-100">
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Professional Profile</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Aspiring software developer with experience in Java and Python, and back-end, seeking to leverage
                my skills in Google's Software Application Development Apprenticeship. Proficient in unit testing,
                code optimization, and integration testing. Strong communication, problem-solving, and collaborative
                skills. Eager to contribute to real-world projects and build a long-term career in software
                development in a diverse and inclusive environment.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {["Collaborative", "Problem Solver", "Self-motivated", "Adaptable", "Eager to Learn"].map((trait) => (
                  <span 
                    key={trait}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
