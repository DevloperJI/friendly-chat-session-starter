
import { useEffect, useRef } from "react";
import { GraduationCap, Award, CalendarDays, BadgeCheck } from "lucide-react";

const timelineItems = [
  {
    year: "2021-2025",
    title: "Bachelor of Technology in Information Technology",
    institution: "Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow",
    description: "Focusing on Information Technology with courses in Programming, Data Structures, and Software Development.",
    icon: <GraduationCap size={20} />
  },
  {
    year: "2022",
    title: "Python Certification",
    institution: "HackerRank",
    description: "Completed certification in Python programming with focus on data structures and algorithms.",
    icon: <BadgeCheck size={20} />
  },
  {
    year: "2023",
    title: "Frontend Development Certification",
    institution: "Reliance Foundation",
    description: "Learned modern web development techniques and responsive design principles.",
    icon: <Award size={20} />
  },
  {
    year: "2023",
    title: "Digital Marketing Certification",
    institution: "Google",
    description: "Gained skills in digital marketing strategies and analytics.",
    icon: <Award size={20} />
  }
];

const Timeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            
            // Animate each timeline item sequentially
            const items = entry.target.querySelectorAll(".timeline-item");
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("animate-fade-in");
              }, index * 300);
            });
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }
    
    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={timelineRef}
      className="opacity-0 max-w-3xl mx-auto mt-12"
    >
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-400 ml-6 md:ml-8"></div>
        
        {timelineItems.map((item, index) => (
          <div 
            key={index}
            className="timeline-item opacity-0 mb-8 relative pl-16 md:pl-20"
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white dark:bg-slate-800 shadow-md border-2 border-blue-500 flex items-center justify-center z-10">
              <div className="text-blue-500">
                {item.icon}
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-100 dark:border-slate-700 p-5 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-2">
                <CalendarDays size={16} />
                <span>{item.year}</span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{item.title}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">{item.institution}</p>
              <p className="text-slate-600 dark:text-slate-300">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
