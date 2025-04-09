
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { FileUp, File, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ResumeUpload = () => {
  const { toast } = useToast();
  const [resumeName, setResumeName] = useState<string>(() => {
    return localStorage.getItem("resume_name") || "";
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF file.",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Resume file size must be less than 5MB.",
      });
      return;
    }

    setIsUploading(true);

    // Simulating upload process
    setTimeout(() => {
      setResumeName(file.name);
      localStorage.setItem("resume_name", file.name);
      localStorage.setItem("resume_path", "/resume-prashant-mishra.pdf"); // For demo, just setting a static path
      
      toast({
        title: "Resume uploaded",
        description: "Your resume has been updated successfully.",
      });
      setIsUploading(false);
    }, 1500);
  };

  const handleRemoveResume = () => {
    setResumeName("");
    localStorage.removeItem("resume_name");
    localStorage.removeItem("resume_path");
    
    toast({
      title: "Resume removed",
      description: "Your resume has been removed.",
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Update Resume</h2>
        <p className="text-slate-500 dark:text-slate-400">
          Upload or update your resume for visitors to download
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resume Document</CardTitle>
          <CardDescription>
            Upload your resume as a PDF file. This will be available for visitors to download from your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-12">
            {resumeName ? (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <File className="h-16 w-16 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">{resumeName}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-4">
                  Your resume is ready for download
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2"
                  >
                    <FileUp size={16} />
                    Replace
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRemoveResume}
                    className="gap-2 text-red-500"
                  >
                    <Trash2 size={16} />
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <FileUp className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Your Resume</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md">
                  Drag and drop your PDF file here, or click to browse
                </p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </div>
                  ) : (
                    <>
                      <FileUp size={16} />
                      Upload Resume
                    </>
                  )}
                </Button>
              </div>
            )}
            <Input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleResumeUpload}
              disabled={isUploading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Accepted file types: PDF only (max 5MB)
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResumeUpload;
