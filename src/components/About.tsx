
import { useEffect, useRef, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CheckCircle2, Brain, Rocket, Users, Heart } from "lucide-react";

const aboutTabs = [
  {
    id: "profile",
    label: "Profile",
    icon: <CheckCircle2 className="h-4 w-4" />,
    content: (
      <div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
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
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "philosophy",
    label: "Philosophy",
    icon: <Brain className="h-4 w-4" />,
    content: (
      <div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          I believe that software development is not just about writing code, but about solving real-world problems and making people's lives easier. 
          My approach to development combines technical excellence with user-centric thinking. I'm passionate about clean, maintainable code that 
          stands the test of time, and I continuously strive to improve my skills and learn new technologies.
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          {[
            "Clean Code", 
            "Test-Driven Development", 
            "Continuous Learning", 
            "User-Centric Design"
          ].map((philosophy) => (
            <div key={philosophy} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-slate-700 dark:text-slate-300">{philosophy}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "goals",
    label: "Goals",
    icon: <Rocket className="h-4 w-4" />,
    content: (
      <div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          My short-term goal is to secure a position as a software developer apprentice where I can apply my skills and continue learning.
          Long-term, I aim to become an expert developer who can architect complex systems and contribute to impactful projects that make a difference.
          I'm committed to continuous growth, both technically and professionally.
        </p>
        
        <ul className="space-y-2">
          {[
            "Secure a software development apprenticeship",
            "Master full-stack development",
            "Contribute to open-source projects",
            "Eventually lead development teams"
          ].map((goal, index) => (
            <li key={index} className="flex items-start gap-2">
              <Rocket className="h-4 w-4 text-blue-500 mt-1" />
              <span className="text-slate-700 dark:text-slate-300">{goal}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  },
  {
    id: "interests",
    label: "Interests",
    icon: <Heart className="h-4 w-4" />,
    content: (
      <div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          Beyond coding, I have diverse interests that help me maintain a balanced life and bring fresh perspectives to my work.
          I believe that well-rounded individuals make better problem solvers and more creative developers.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Artificial Intelligence", icon: <Brain className="h-5 w-5 text-purple-500" /> },
            { label: "Web Development", icon: <CheckCircle2 className="h-5 w-5 text-blue-500" /> },
            { label: "Open Source", icon: <Users className="h-5 w-5 text-green-500" /> },
            { label: "Problem Solving", icon: <Rocket className="h-5 w-5 text-orange-500" /> }
          ].map((interest, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              {interest.icon}
              <span className="text-slate-700 dark:text-slate-300">{interest.label}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("profile");
  
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
    <section id="about" className="py-20 bg-white dark:bg-slate-800">
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
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-700">
              <div className="flex justify-center mb-6">
                <ToggleGroup type="single" value={activeTab} onValueChange={(value) => value && setActiveTab(value)} className="border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                  {aboutTabs.map((tab) => (
                    <ToggleGroupItem 
                      key={tab.id} 
                      value={tab.id} 
                      className={`flex items-center gap-1.5 ${
                        activeTab === tab.id 
                          ? "bg-white dark:bg-slate-800 shadow-sm" 
                          : "hover:bg-slate-100 dark:hover:bg-slate-800/50"
                      }`}
                      aria-label={tab.label}
                    >
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              
              <div className="min-h-[200px]">
                {aboutTabs.find(tab => tab.id === activeTab)?.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
