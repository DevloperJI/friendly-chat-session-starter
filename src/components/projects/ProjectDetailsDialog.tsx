
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, Github, X } from "lucide-react";
import { ProjectType } from "./types";

interface ProjectDetailsDialogProps {
  selectedProject: ProjectType | null;
  onOpenChange: (open: boolean) => void;
}

const ProjectDetailsDialog = ({ selectedProject, onOpenChange }: ProjectDetailsDialogProps) => {
  if (!selectedProject) return null;
  
  return (
    <Dialog open={!!selectedProject} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            <span className={`bg-gradient-to-r ${selectedProject.color} bg-clip-text text-transparent`}>
              {selectedProject.title}
            </span>
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            {selectedProject.longDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedProject.technologies.map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {selectedProject.videoUrl && (
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
              onClick={() => window.open(selectedProject.demoUrl, '_blank')}
            >
              <Eye size={18} />
              <span>Live Demo</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={() => window.open(selectedProject.codeUrl, '_blank')}
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
  );
};

export default ProjectDetailsDialog;
