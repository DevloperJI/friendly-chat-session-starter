
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AdminProvider } from "@/contexts/AdminContext";
import { ProjectsProvider } from "@/hooks/use-projects";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProjectsList from "./components/admin/ProjectsList";
import ProjectForm from "./components/admin/ProjectForm";
import ResumeUpload from "./components/admin/ResumeUpload";
import ProfileSettings from "./components/admin/ProfileSettings";
import SkillsManager from "./components/admin/SkillsManager";
import "./index.css";

const queryClient = new QueryClient();

// Separate component for theme initialization
const ThemeInitializer = () => {
  useEffect(() => {
    const isDarkMode = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <ProjectsProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ThemeInitializer />
              <Routes>
                <Route path="/" element={<Index />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />}>
                  <Route index element={<ProjectsList />} />
                  <Route path="add-project" element={<ProjectForm />} />
                  <Route path="edit-project/:projectTitle" element={<ProjectForm />} />
                  <Route path="resume" element={<ResumeUpload />} />
                  <Route path="profile" element={<ProfileSettings />} />
                  <Route path="skills" element={<SkillsManager />} />
                </Route>
                
                {/* 404 Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ProjectsProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
};

export default App;
