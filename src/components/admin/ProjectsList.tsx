
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Eye, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ProjectType } from "@/components/projects/types";
import { useProjects } from "@/hooks/use-projects";

const ProjectsList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { projects, deleteProject } = useProjects();
  const [deletingProject, setDeletingProject] = useState<ProjectType | null>(null);

  const handleDelete = () => {
    if (deletingProject) {
      deleteProject(deletingProject.title);
      toast({
        title: "Project deleted",
        description: `${deletingProject.title} has been removed`,
      });
      setDeletingProject(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <Button 
          onClick={() => navigate("/admin/add-project")}
          className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
        >
          Add New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-8 text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No projects found</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            You haven't added any projects yet. Start by creating your first project.
          </p>
          <Button 
            onClick={() => navigate("/admin/add-project")}
            className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
          >
            Add Your First Project
          </Button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Technologies</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
                {projects.map((project) => (
                  <tr key={project.title} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 p-2 rounded-md bg-slate-100 dark:bg-slate-700">
                          {project.icon}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">{project.title}</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                            {project.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span 
                            key={tech} 
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 gap-1"
                          onClick={() => window.open(project.demoUrl, '_blank')}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span className="sr-only md:not-sr-only md:inline-block">View</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 gap-1"
                          onClick={() => navigate(`/admin/edit-project/${encodeURIComponent(project.title)}`)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          <span className="sr-only md:not-sr-only md:inline-block">Edit</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 gap-1 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300"
                          onClick={() => setDeletingProject(project)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="sr-only md:not-sr-only md:inline-block">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AlertDialog open={!!deletingProject} onOpenChange={(open) => !open && setDeletingProject(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project <strong>{deletingProject?.title}</strong> from your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProjectsList;
