
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      // If user scrolls down more than 300px, show the button
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", toggleVisibility);
    
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <Button
      onClick={scrollToTop}
      className={`fixed bottom-6 left-6 z-50 rounded-full shadow-lg bg-white dark:bg-slate-800 hover:scale-110 transition-all duration-300 
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      size="icon"
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
    </Button>
  );
};

export default BackToTop;
