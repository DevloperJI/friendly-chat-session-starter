
import { useEffect, useRef } from "react";
import { Code, Database, Code2, Laptop, GitBranch, CheckCircle2, BrainCircuit } from "lucide-react";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <Code size={24} className="text-blue-600" />,
    skills: ["Java", "Python", "C++", "SQL"],
    iconBg: "bg-blue-100"
  },
  {
    title: "Web Development",
    icon: <Code2 size={24} className="text-green-600" />,
    skills: ["Django", "Flask", "HTML/CSS"],
    iconBg: "bg-green-100"
  },
  {
    title: "Databases & ML",
    icon: <Database size={24} className="text-purple-600" />,
    skills: ["SQL", "Machine Learning", "Data Analysis"],
    iconBg: "bg-purple-100"
  },
  {
    title: "Tools & Practices",
    icon: <Laptop size={24} className="text-orange-600" />,
    skills: ["Git", "JIRA", "Trello", "Google Workspace"],
    iconBg: "bg-orange-100"
  },
  {
    title: "Development Practices",
    icon: <GitBranch size={24} className="text-red-600" />,
    skills: ["Unit Testing", "Code Optimization", "Integration Testing"],
    iconBg: "bg-red-100"
  },
  {
    title: "Soft Skills",
    icon: <BrainCircuit size={24} className="text-cyan-600" />,
    skills: ["Problem Solving", "Critical Thinking", "Communication", "Teamwork"],
    iconBg: "bg-cyan-100"
  }
];

const Skills = () => {
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
    <section id="skills" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className="opacity-0 transform translate-y-10 transition-all duration-700"
        >
          <h2 className="text-3xl font-bold mb-2 text-center">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              My Skills
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-12 rounded-full"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <div 
                key={category.title}
                className="bg-white rounded-xl shadow-md border border-slate-100 p-6 hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full mr-4 ${category.iconBg}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {category.title}
                  </h3>
                </div>
                
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-slate-600">
                      <CheckCircle2 size={16} className="text-blue-500" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
