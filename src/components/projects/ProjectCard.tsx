
import { useState } from "react";
import { Calendar, Code, ExternalLink, ArrowRight, CheckCircle, Github, Eye, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectType } from "./types";

interface ProjectCardProps {
  project: ProjectType;
  index: number;
  isHovered: boolean;
  setHovered: (index: number | null) => void;
  onSeeMore: () => void;
}

const ProjectCard = ({ 
  project, 
  index,
  isHovered, 
  setHovered,
  onSeeMore
}: ProjectCardProps) => {
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

export default ProjectCard;
