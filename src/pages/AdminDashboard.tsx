
import { useState, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { 
  Layout, 
  LogOut, 
  FileEdit, 
  PlusCircle, 
  Home, 
  BookOpen,
  FileUp,
  User,
  Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("projects");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Layout className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <Home size={16} />
              <span className="hidden sm:inline">View Site</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="gap-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-slate-800 shadow-sm hidden md:block">
          <nav className="p-4">
            <div className="space-y-1">
              <Link to="/admin" onClick={() => setActiveTab("projects")}>
                <Button 
                  variant={activeTab === "projects" ? "secondary" : "ghost"} 
                  className="w-full justify-start gap-2"
                >
                  <FileEdit size={18} />
                  Manage Projects
                </Button>
              </Link>
              <Link to="/admin/add-project" onClick={() => setActiveTab("add-project")}>
                <Button 
                  variant={activeTab === "add-project" ? "secondary" : "ghost"} 
                  className="w-full justify-start gap-2"
                >
                  <PlusCircle size={18} />
                  Add New Project
                </Button>
              </Link>
              <Separator className="my-2" />
              <Link to="/admin/resume" onClick={() => setActiveTab("resume")}>
                <Button 
                  variant={activeTab === "resume" ? "secondary" : "ghost"} 
                  className="w-full justify-start gap-2"
                >
                  <FileUp size={18} />
                  Update Resume
                </Button>
              </Link>
              <Link to="/admin/profile" onClick={() => setActiveTab("profile")}>
                <Button 
                  variant={activeTab === "profile" ? "secondary" : "ghost"} 
                  className="w-full justify-start gap-2"
                >
                  <User size={18} />
                  Edit Profile
                </Button>
              </Link>
              <Link to="/admin/skills" onClick={() => setActiveTab("skills")}>
                <Button 
                  variant={activeTab === "skills" ? "secondary" : "ghost"} 
                  className="w-full justify-start gap-2"
                >
                  <Wrench size={18} />
                  Update Skills
                </Button>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Mobile navigation */}
        <div className="md:hidden bg-white dark:bg-slate-800 p-2 w-full">
          <div className="flex overflow-x-auto space-x-2 pb-2">
            <Link to="/admin">
              <Button 
                size="sm" 
                variant={activeTab === "projects" ? "secondary" : "outline"} 
                onClick={() => setActiveTab("projects")}
                className="whitespace-nowrap"
              >
                <FileEdit size={16} className="mr-1" />
                Projects
              </Button>
            </Link>
            <Link to="/admin/add-project">
              <Button 
                size="sm" 
                variant={activeTab === "add-project" ? "secondary" : "outline"} 
                onClick={() => setActiveTab("add-project")}
                className="whitespace-nowrap"
              >
                <PlusCircle size={16} className="mr-1" />
                Add Project
              </Button>
            </Link>
            <Link to="/admin/resume">
              <Button 
                size="sm" 
                variant={activeTab === "resume" ? "secondary" : "outline"} 
                onClick={() => setActiveTab("resume")}
                className="whitespace-nowrap"
              >
                <FileUp size={16} className="mr-1" />
                Resume
              </Button>
            </Link>
            <Link to="/admin/profile">
              <Button 
                size="sm" 
                variant={activeTab === "profile" ? "secondary" : "outline"} 
                onClick={() => setActiveTab("profile")}
                className="whitespace-nowrap"
              >
                <User size={16} className="mr-1" />
                Profile
              </Button>
            </Link>
            <Link to="/admin/skills">
              <Button 
                size="sm" 
                variant={activeTab === "skills" ? "secondary" : "outline"} 
                onClick={() => setActiveTab("skills")}
                className="whitespace-nowrap"
              >
                <Wrench size={16} className="mr-1" />
                Skills
              </Button>
            </Link>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
