
import { useEffect, useRef, useState } from "react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import ProjectCard from "./ProjectCard";
import ProjectDetailsDialog from "./ProjectDetailsDialog";
import projectsData from "./projectsData";
import { ProjectType } from "./types";

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  
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

  const openProjectDetails = (project: ProjectType) => {
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className="opacity-0 transform translate-y-10 transition-all duration-700"
        >
          <h2 className="text-3xl font-bold mb-2 text-center">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-12 rounded-full"></div>
          
          {isMobile ? (
            <Carousel className="w-full">
              <CarouselContent>
                {projectsData.map((project, index) => (
                  <CarouselItem key={project.title}>
                    <ProjectCard 
                      project={project} 
                      index={index}
                      isHovered={hoveredCard === index}
                      setHovered={setHoveredCard}
                      onSeeMore={() => openProjectDetails(project)}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-4">
                <CarouselPrevious className="relative static translate-y-0 left-0" />
                <CarouselNext className="relative static translate-y-0 right-0" />
              </div>
            </Carousel>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {projectsData.map((project, index) => (
                <ProjectCard 
                  key={project.title} 
                  project={project} 
                  index={index}
                  isHovered={hoveredCard === index}
                  setHovered={setHoveredCard}
                  onSeeMore={() => openProjectDetails(project)}
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <a 
              href="https://github.com/DevloperJI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transform transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Github className="h-5 w-5" />
              <span>View All Projects on GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <ProjectDetailsDialog 
        selectedProject={selectedProject} 
        onOpenChange={(open) => !open && setSelectedProject(null)} 
      />
    </section>
  );
};

export default Projects;
