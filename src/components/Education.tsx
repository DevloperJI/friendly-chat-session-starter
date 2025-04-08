
import { useEffect, useRef } from "react";
import { GraduationCap, Calendar, Award } from "lucide-react";

const Education = () => {
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
    <section id="education" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className="opacity-0 transform translate-y-10 transition-all duration-700"
        >
          <h2 className="text-3xl font-bold mb-2 text-center">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Education & Certifications
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-12 rounded-full"></div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative border-l-2 border-blue-200 pl-8 pb-8">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <GraduationCap size={16} className="text-white" />
              </div>
              
              <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 mb-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-800">Bachelor of Technology in Information Technology</h3>
                  <div className="flex items-center text-slate-500 font-medium mt-2 md:mt-0">
                    <Calendar size={16} className="mr-1" />
                    July 2021 - July 2025
                  </div>
                </div>
                
                <p className="text-slate-600 mb-4">
                  Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Relevant Coursework:</h4>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Object-Oriented Programming</li>
                      <li>• Data Structures & Algorithms</li>
                      <li>• Software Development</li>
                      <li>• Database Management Systems</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Technical Skills:</h4>
                    <ul className="text-slate-600 space-y-1">
                      <li>• Java</li>
                      <li>• Python</li>
                      <li>• C++</li>
                      <li>• Unit Testing, Code Optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="absolute -left-3 top-[13rem] w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <Award size={16} className="text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-4">Certifications</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Python Certification",
                    issuer: "HackerRank",
                    color: "bg-green-100 border-green-200"
                  },
                  {
                    title: "Frontend Development Certification",
                    issuer: "Reliance Foundation",
                    color: "bg-blue-100 border-blue-200"
                  },
                  {
                    title: "Digital Marketing Certification",
                    issuer: "Google",
                    color: "bg-yellow-100 border-yellow-200"
                  },
                  {
                    title: "Python Programming Certification",
                    issuer: "N/A",
                    color: "bg-purple-100 border-purple-200"
                  }
                ].map((cert, index) => (
                  <div 
                    key={index}
                    className={`${cert.color} border rounded-lg p-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
                  >
                    <h4 className="font-medium text-slate-800">{cert.title}</h4>
                    <p className="text-slate-600 text-sm">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
