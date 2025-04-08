
import { Github, Linkedin } from "lucide-react";

const SocialLinks = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <a 
        href="https://github.com/DevloperJI"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-full text-white flex items-center gap-2 transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg"
      >
        <Github size={18} />
        <span>Follow on GitHub</span>
      </a>
      <a 
        href="https://www.linkedin.com/in/prashant-mishra-2035301b0/"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 rounded-full text-white flex items-center gap-2 transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg"
      >
        <Linkedin size={18} />
        <span>Connect on LinkedIn</span>
      </a>
    </div>
  );
};

export default SocialLinks;
