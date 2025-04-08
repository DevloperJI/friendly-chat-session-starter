
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ResumeDownload = () => {
  const { toast } = useToast();
  
  const handleDownload = () => {
    // In a real implementation, this would point to an actual resume file
    // For demo purposes, we'll just show a toast notification
    toast({
      title: "Resume download started",
      description: "Your download should begin shortly.",
      duration: 3000,
    });
    
    // Simulate a resume download (in production, replace with actual file path)
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/resume-prashant-mishra.pdf'; // This would be the actual path to the resume
      link.download = 'Prashant-Mishra-Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 500);
  };
  
  return (
    <Button 
      onClick={handleDownload}
      className="group gap-2 animate-pulse hover:animate-none"
      variant="outline"
    >
      <FileDown className="h-4 w-4 group-hover:animate-bounce" />
      <span>Download Resume</span>
    </Button>
  );
};

export default ResumeDownload;
