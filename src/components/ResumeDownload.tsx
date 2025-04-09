
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const ResumeDownload = () => {
  const { toast } = useToast();
  const [pdfUrl, setPdfUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Get PDF URL from localStorage when component mounts
  useEffect(() => {
    const resumePath = localStorage.getItem("resume_path");
    // If resume path exists in localStorage, use it, otherwise use default
    const resumeUrl = resumePath || "/resume-prashant-mishra.pdf";
    setPdfUrl(resumeUrl);
  }, []);
  
  const handleDownload = () => {
    setIsGenerating(true);
    
    // Show toast notification
    toast({
      title: "Resume download started",
      description: "Your download should begin shortly.",
      duration: 3000,
    });
    
    // Simulate a slight delay for PDF generation
    setTimeout(() => {
      if (pdfUrl) {
        // Create an invisible anchor link and click it programmatically
        const link = document.createElement('a');
        link.href = pdfUrl;
        
        // Get resume name from localStorage or use default
        const resumeName = localStorage.getItem("resume_name") || "Prashant-Mishra-Resume.pdf";
        link.download = resumeName;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Handle the case where PDF generation failed
        toast({
          title: "Download failed",
          description: "Please try again later or contact me directly for a resume.",
          variant: "destructive",
        });
      }
      
      setIsGenerating(false);
    }, 1000);
  };
  
  return (
    <Button 
      onClick={handleDownload}
      className={`group gap-2 ${isGenerating ? "" : "animate-pulse hover:animate-none"}`}
      variant="outline"
      disabled={isGenerating}
    >
      {isGenerating ? (
        <>
          <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating...
        </>
      ) : (
        <>
          <FileDown className="h-4 w-4 group-hover:animate-bounce" />
          <span>Download Resume</span>
        </>
      )}
    </Button>
  );
};

export default ResumeDownload;
