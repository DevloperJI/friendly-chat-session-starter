
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { ProjectType } from "@/components/projects/types";
import projectsData from "@/components/projects/projectsData";

interface ProjectsContextType {
  projects: ProjectType[];
  addProject: (project: ProjectType) => void;
  updateProject: (title: string, updatedProject: ProjectType) => void;
  deleteProject: (title: string) => void;
  getProject: (title: string) => ProjectType | undefined;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  // Load projects from localStorage on mount, or use default data
  useEffect(() => {
    const storedProjects = localStorage.getItem("portfolio_projects");
    if (storedProjects) {
      try {
        const parsedProjects = JSON.parse(storedProjects);
        // Reconstruct the React elements for icons
        const projectsWithIcons = parsedProjects.map((project: any) => {
          // Find the matching project in the default data to get the icon
          const matchingDefaultProject = projectsData.find(
            (defaultProject) => defaultProject.title === project.title
          );
          
          return {
            ...project,
            icon: matchingDefaultProject ? matchingDefaultProject.icon : null,
          };
        });
        setProjects(projectsWithIcons);
      } catch (error) {
        console.error("Error parsing projects:", error);
        setProjects(projectsData);
      }
    } else {
      setProjects(projectsData);
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    if (projects.length > 0) {
      // We need to remove the icon React element before saving to localStorage
      const projectsForStorage = projects.map((project) => {
        const { icon, ...projectWithoutIcon } = project;
        return projectWithoutIcon;
      });
      
      localStorage.setItem("portfolio_projects", JSON.stringify(projectsForStorage));
    }
  }, [projects]);

  const addProject = (project: ProjectType) => {
    setProjects((prevProjects) => [...prevProjects, project]);
  };

  const updateProject = (title: string, updatedProject: ProjectType) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.title === title ? updatedProject : project
      )
    );
  };

  const deleteProject = (title: string) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.title !== title)
    );
  };

  const getProject = (title: string) => {
    return projects.find((project) => project.title === title);
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, updateProject, deleteProject, getProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = (): ProjectsContextType => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};
