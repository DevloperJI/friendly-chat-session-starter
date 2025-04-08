
import { useEffect, useRef, useState } from "react";
import { Code, Database, Code2, Laptop, GitBranch, CheckCircle2, BrainCircuit } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <Code size={24} className="text-blue-600 dark:text-blue-400" />,
    skills: [
      { name: "Java", level: 85 },
      { name: "Python", level: 80 },
      { name: "C++", level: 70 },
      { name: "SQL", level: 75 }
    ],
    iconBg: "bg-blue-100 dark:bg-blue-900/30"
  },
  {
    title: "Web Development",
    icon: <Code2 size={24} className="text-green-600 dark:text-green-400" />,
    skills: [
      { name: "Django", level: 75 },
      { name: "Flask", level: 70 },
      { name: "HTML/CSS", level: 80 }
    ],
    iconBg: "bg-green-100 dark:bg-green-900/30"
  },
  {
    title: "Databases & ML",
    icon: <Database size={24} className="text-purple-600 dark:text-purple-400" />,
    skills: [
      { name: "SQL", level: 75 },
      { name: "Machine Learning", level: 65 },
      { name: "Data Analysis", level: 70 }
    ],
    iconBg: "bg-purple-100 dark:bg-purple-900/30"
  },
  {
    title: "Tools & Practices",
    icon: <Laptop size={24} className="text-orange-600 dark:text-orange-400" />,
    skills: [
      { name: "Git", level: 80 },
      { name: "JIRA", level: 65 },
      { name: "Trello", level: 75 },
      { name: "Google Workspace", level: 90 }
    ],
    iconBg: "bg-orange-100 dark:bg-orange-900/30"
  },
  {
    title: "Development Practices",
    icon: <GitBranch size={24} className="text-red-600 dark:text-red-400" />,
    skills: [
      { name: "Unit Testing", level: 75 },
      { name: "Code Optimization", level: 80 },
      { name: "Integration Testing", level: 70 }
    ],
    iconBg: "bg-red-100 dark:bg-red-900/30"
  },
  {
    title: "Soft Skills",
    icon: <BrainCircuit size={24} className="text-cyan-600 dark:text-cyan-400" />,
    skills: [
      { name: "Problem Solving", level: 90 },
      { name: "Critical Thinking", level: 85 },
      { name: "Communication", level: 80 },
      { name: "Teamwork", level: 85 }
    ],
    iconBg: "bg-cyan-100 dark:bg-cyan-900/30"
  }
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animateSkills, setAnimateSkills] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            setAnimateSkills(true);
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
    <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-900">
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
                className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-full mr-4 ${category.iconBg}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    {category.title}
                  </h3>
                </div>
                
                <ul className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skill.name} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-300 text-sm">{skill.name}</span>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={animateSkills ? skill.level : 0} 
                        className="h-2 bg-slate-200 dark:bg-slate-700"
                        style={{ 
                          transition: "all 1s ease-out", 
                          transitionDelay: `${(index * 0.1) + (skillIndex * 0.15)}s`
                        }}
                      />
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
