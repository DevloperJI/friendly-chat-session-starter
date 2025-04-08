
import { useEffect, useRef } from "react";
import { ExternalLink, Calendar, Code, ArrowRight, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const projects = [
  {
    title: "Task Management System",
    description: "Developed a task management app using Python and OOP principles.",
    technologies: ["Python", "OOP", "Git", "Unit Testing"],
    learnings: "Code optimization, debugging, and collaboration",
    color: "from-blue-500 to-cyan-400",
    icon: <Calendar className="h-10 w-10 text-blue-500" />
  },
  {
    title: "Weather Forecast Application",
    description: "Built a real-time weather app with Java, integrating external APIs.",
    technologies: ["Java", "APIs", "JavaFX", "Integration Testing"],
    learnings: "API integration, data handling, and UI development with JavaFX",
    color: "from-purple-500 to-pink-400",
    icon: <Code className="h-10 w-10 text-purple-500" />
  },
  {
    title: "E-Commerce Frontend",
    description: "Designed a responsive e-commerce website as part of Reliance Frontend Certification.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    learnings: "Frontend development, user experience design, and web optimization",
    color: "from-orange-500 to-amber-400",
    icon: <ExternalLink className="h-10 w-10 text-orange-500" />
  },
  {
    title: "Digital Marketing Automation Tool",
    description: "Created a tool for automating social media posts with platform API integration.",
    technologies: ["Python", "APIs", "Data Analysis", "Automation"],
    learnings: "Automation, data analysis, and API interaction",
    color: "from-green-500 to-emerald-400",
    icon: <ArrowRight className="h-10 w-10 text-green-500" />
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
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
    <section id="projects" className="py-20 bg-white">
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
                {projects.map((project) => (
                  <CarouselItem key={project.title}>
                    <ProjectCard project={project} />
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
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  return (
    <Card className="overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
      <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="p-2 rounded-md bg-slate-100">
          {project.icon}
        </div>
        <div>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription className="text-slate-600 mt-1">
            {project.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h4 className="text-sm font-medium text-slate-500 mb-2">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <div className="flex items-start gap-2 text-sm text-slate-600 mb-4">
          <CheckCircle size={18} className="text-green-500 mt-0.5" />
          <span>
            <span className="font-medium">Learned: </span>
            {project.learnings}
          </span>
        </div>
        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0">
          Learn more
          <ArrowRight size={14} className="ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Projects;
