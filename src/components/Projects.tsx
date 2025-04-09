
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Calendar, Code, ArrowRight, CheckCircle, Github, Eye, Video, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const projects = [
  {
    title: "Task Management System",
    description: "Developed a task management app using Python and OOP principles.",
    longDescription: "A comprehensive task management system built with Python that leverages object-oriented programming principles to create a flexible and maintainable codebase. This application enables users to create, organize, and track tasks with features like priority levels, due dates, and task categories. The project demonstrates strong debugging skills and collaborative development practices.",
    technologies: ["Python", "OOP", "Git", "Unit Testing"],
    learnings: "Code optimization, debugging, and collaboration",
    color: "from-blue-500 to-cyan-400",
    icon: <Calendar className="h-10 w-10 text-blue-500 dark:text-blue-400" />,
    demoUrl: "#",
    codeUrl: "https://github.com/DevloperJI/task-management-system",
    videoUrl: null
  },
  {
    title: "Weather Forecast Application",
    description: "Built a real-time weather app with Java, integrating external APIs.",
    longDescription: "An intuitive weather forecast application developed in Java that provides real-time weather data by integrating with external weather APIs. The application features a clean user interface built with JavaFX, displaying current conditions, hourly forecasts, and 5-day predictions. It includes features like location detection, favorite locations saving, and weather alerts for severe conditions.",
    technologies: ["Java", "APIs", "JavaFX", "Integration Testing"],
    learnings: "API integration, data handling, and UI development with JavaFX",
    color: "from-purple-500 to-pink-400",
    icon: <Code className="h-10 w-10 text-purple-500 dark:text-purple-400" />,
    demoUrl: "#",
    codeUrl: "https://github.com/DevloperJI/weather-forecast-app",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Sample video URL
  },
  {
    title: "E-Commerce Frontend",
    description: "Designed a responsive e-commerce website as part of Reliance Frontend Certification.",
    longDescription: "A modern e-commerce frontend developed for the Reliance Frontend Certification, featuring a responsive design that works seamlessly across all devices. The website includes product listings, detailed product pages, shopping cart functionality, user authentication, and a streamlined checkout process. The project demonstrates advanced CSS techniques, JavaScript DOM manipulation, and attention to user experience design principles.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    learnings: "Frontend development, user experience design, and web optimization",
    color: "from-orange-500 to-amber-400",
    icon: <ExternalLink className="h-10 w-10 text-orange-500 dark:text-orange-400" />,
    demoUrl: "#",
    codeUrl: "https://github.com/DevloperJI/ecommerce-frontend",
    videoUrl: null
  },
  {
    title: "Digital Marketing Automation Tool",
    description: "Created a tool for automating social media posts with platform API integration.",
    longDescription: "An advanced digital marketing automation tool that streamlines social media management by scheduling and publishing posts across multiple platforms. The tool integrates with various social media APIs (Twitter, Facebook, Instagram, LinkedIn) to provide a unified interface for content planning, scheduling, and analytics. It includes features like content calendar, performance tracking, and audience engagement metrics.",
    technologies: ["Python", "APIs", "Data Analysis", "Automation"],
    learnings: "Automation, data analysis, and API interaction",
    color: "from-green-500 to-emerald-400",
    icon: <ArrowRight className="h-10 w-10 text-green-500 dark:text-green-400" />,
    demoUrl: "#",
    codeUrl: "https://github.com/DevloperJI/marketing-automation",
    videoUrl: null
  },
  {
    title: "React Portfolio Website",
    description: "Developed a modern, responsive portfolio website using React, TypeScript and Tailwind CSS.",
    longDescription: "A modern portfolio website built with React, TypeScript, and Tailwind CSS that showcases professional skills, projects, and experience. The site features smooth animations, dark mode support, responsive design for all devices, and interactive UI components. The architecture follows best practices with modular components, custom hooks, and efficient state management.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    learnings: "Modern frontend development, component architecture, and responsive design principles",
    color: "from-blue-600 to-indigo-500",
    icon: <Code className="h-10 w-10 text-blue-600 dark:text-blue-500" />,
    demoUrl: "https://devloper-ji.vercel.app",
    codeUrl: "https://github.com/DevloperJI/portfolio-website",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Sample video URL
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  
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

  const openProjectDetails = (project: typeof projects[0]) => {
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
                {projects.map((project, index) => (
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
              {projects.map((project, index) => (
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

      {/* Project Details Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              <span className={`bg-gradient-to-r ${selectedProject?.color} bg-clip-text text-transparent`}>
                {selectedProject?.title}
              </span>
            </DialogTitle>
            <DialogDescription className="text-base mt-2">
              {selectedProject?.longDescription}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject?.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            {selectedProject?.videoUrl && (
              <div className="my-6">
                <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3">Project Demo:</h4>
                <AspectRatio ratio={16/9} className="bg-muted rounded-lg overflow-hidden">
                  <iframe 
                    src={selectedProject.videoUrl} 
                    className="w-full h-full" 
                    allowFullScreen
                    title={`${selectedProject.title} Demo`}
                  ></iframe>
                </AspectRatio>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <Button 
                className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                onClick={() => window.open(selectedProject?.demoUrl, '_blank')}
              >
                <Eye size={18} />
                <span>Live Demo</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 gap-2"
                onClick={() => window.open(selectedProject?.codeUrl, '_blank')}
              >
                <Github size={18} />
                <span>View Code</span>
              </Button>
            </div>
          </div>

          <DialogClose className="absolute top-4 right-4 rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-700">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </section>
  );
};

const ProjectCard = ({ 
  project, 
  index,
  isHovered, 
  setHovered,
  onSeeMore
}: { 
  project: typeof projects[0]; 
  index: number;
  isHovered: boolean; 
  setHovered: (index: number | null) => void;
  onSeeMore: () => void;
}) => {
  return (
    <Card 
      className={`overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl
        ${isHovered ? 'shadow-lg scale-[1.02]' : 'shadow-md'}`}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
    >
      <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="p-2 rounded-md bg-slate-100 dark:bg-slate-700">
          {project.icon}
        </div>
        <div>
          <CardTitle className="dark:text-white">{project.title}</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400 mt-1">
            {project.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
          <CheckCircle size={18} className="text-green-500 dark:text-green-400 mt-0.5" />
          <span>
            <span className="font-medium">Learned: </span>
            {project.learnings}
          </span>
        </div>
        <div className="flex gap-3 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 gap-2"
            onClick={() => window.open(project.codeUrl, '_blank')}
          >
            <Github size={14} />
            <span>Code</span>
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
            onClick={() => window.open(project.demoUrl, '_blank')}
          >
            <Eye size={14} />
            <span>Live Demo</span>
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 p-0 h-auto w-full justify-start gap-1"
          onClick={onSeeMore}
        >
          <span>See More</span>
          {project.videoUrl && <Video size={14} className="ml-1" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Projects;
