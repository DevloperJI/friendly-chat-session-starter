
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjects } from "@/hooks/use-projects";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProjectType } from "@/components/projects/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar, Code, ExternalLink, ArrowRight } from "lucide-react";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Short description is required"),
  longDescription: z.string().min(1, "Detailed description is required"),
  technologies: z.string().min(1, "At least one technology is required"),
  learnings: z.string().min(1, "Learnings are required"),
  color: z.string().min(1, "Color scheme is required"),
  demoUrl: z.string().url("Must be a valid URL"),
  codeUrl: z.string().url("Must be a valid URL"),
  videoUrl: z.string().nullable().transform(val => val === "" ? null : val),
  iconType: z.enum(["calendar", "code", "externalLink", "arrowRight"])
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const ProjectForm = () => {
  const { projectTitle } = useParams();
  const { getProject, addProject, updateProject } = useProjects();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!projectTitle;
  
  const project = isEditMode ? getProject(decodeURIComponent(projectTitle)) : undefined;

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      longDescription: project?.longDescription || "",
      technologies: project?.technologies.join(", ") || "",
      learnings: project?.learnings || "",
      color: project?.color || "from-blue-500 to-cyan-400",
      demoUrl: project?.demoUrl || "https://",
      codeUrl: project?.codeUrl || "https://github.com/",
      videoUrl: project?.videoUrl || "",
      iconType: "code", // Default icon
    },
  });

  useEffect(() => {
    if (isEditMode && !project) {
      toast({
        variant: "destructive",
        title: "Project not found",
        description: "The project you're trying to edit could not be found.",
      });
      navigate("/admin");
    }
  }, [isEditMode, project, navigate, toast]);

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case "calendar":
        return <Calendar className="h-10 w-10 text-blue-500 dark:text-blue-400" />;
      case "externalLink":
        return <ExternalLink className="h-10 w-10 text-orange-500 dark:text-orange-400" />;
      case "arrowRight":
        return <ArrowRight className="h-10 w-10 text-green-500 dark:text-green-400" />;
      case "code":
      default:
        return <Code className="h-10 w-10 text-purple-500 dark:text-purple-400" />;
    }
  };

  const onSubmit = (values: ProjectFormValues) => {
    setIsSubmitting(true);
    
    // Create project object
    const projectData: ProjectType = {
      title: values.title,
      description: values.description,
      longDescription: values.longDescription,
      technologies: values.technologies.split(",").map(tech => tech.trim()),
      learnings: values.learnings,
      color: values.color,
      icon: getIconComponent(values.iconType),
      demoUrl: values.demoUrl,
      codeUrl: values.codeUrl,
      videoUrl: values.videoUrl
    };
    
    setTimeout(() => {
      if (isEditMode && project) {
        updateProject(project.title, projectData);
        toast({
          title: "Project updated",
          description: `${values.title} has been updated successfully.`
        });
      } else {
        addProject(projectData);
        toast({
          title: "Project added",
          description: `${values.title} has been added to your portfolio.`
        });
      }
      setIsSubmitting(false);
      navigate("/admin");
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          {isEditMode ? "Edit Project" : "Add New Project"}
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          {isEditMode
            ? "Update the details of your existing project"
            : "Add a new project to showcase in your portfolio"}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Task Management System" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief overview of the project" {...field} />
                    </FormControl>
                    <FormDescription>
                      A concise summary (shown in the card)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="longDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Comprehensive explanation of the project, its features, and implementation details" 
                      className="min-h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Detailed information shown when viewing project details
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="technologies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technologies Used</FormLabel>
                    <FormControl>
                      <Input placeholder="React, TypeScript, Tailwind CSS, etc." {...field} />
                    </FormControl>
                    <FormDescription>
                      Comma-separated list of technologies
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="learnings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Learnings</FormLabel>
                    <FormControl>
                      <Input placeholder="What you learned from this project" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="demoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Demo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="codeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code Repository URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/username/repo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Demo URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://youtube.com/embed/videoId" {...field} />
                    </FormControl>
                    <FormDescription>
                      YouTube embed URL (leave empty if none)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="iconType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Icon</FormLabel>
                    <div className="grid grid-cols-4 gap-2">
                      {["calendar", "code", "externalLink", "arrowRight"].map((iconType) => (
                        <div 
                          key={iconType}
                          className={`flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer transition-all ${
                            field.value === iconType 
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                              : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                          }`}
                          onClick={() => form.setValue("iconType", iconType as any)}
                        >
                          {iconType === "calendar" && <Calendar className="h-6 w-6 text-blue-500" />}
                          {iconType === "code" && <Code className="h-6 w-6 text-purple-500" />}
                          {iconType === "externalLink" && <ExternalLink className="h-6 w-6 text-orange-500" />}
                          {iconType === "arrowRight" && <ArrowRight className="h-6 w-6 text-green-500" />}
                          <span className="mt-2 text-xs">{iconType}</span>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Scheme</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      "from-blue-500 to-cyan-400",
                      "from-purple-500 to-pink-400",
                      "from-orange-500 to-amber-400",
                      "from-green-500 to-emerald-400",
                      "from-red-500 to-pink-500",
                      "from-blue-600 to-indigo-500",
                      "from-yellow-500 to-orange-400",
                      "from-teal-500 to-green-400"
                    ].map((color) => (
                      <div 
                        key={color}
                        className={`h-12 rounded-md cursor-pointer transition-all bg-gradient-to-r ${color} ${
                          field.value === color ? "ring-2 ring-offset-2 ring-blue-500" : ""
                        }`}
                        onClick={() => form.setValue("color", color)}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEditMode ? "Updating..." : "Saving..."}
                  </div>
                ) : (
                  isEditMode ? "Update Project" : "Save Project"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProjectForm;
