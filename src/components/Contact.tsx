
import { useEffect, useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, Github, Linkedin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFocused, setFormFocused] = useState(false);
  const { toast } = useToast();
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  // Animation for form fields
  const animationClass = (index: number) => {
    return `transition-all duration-300 ease-out ${
      formFocused ? `opacity-100 transform translate-y-0 delay-${index * 100}` : 'opacity-0 transform translate-y-4'
    }`;
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className="opacity-0 transform translate-y-10 transition-all duration-700"
        >
          <h2 className="text-3xl font-bold mb-2 text-center">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-12 rounded-full"></div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6 transform transition duration-500 hover:scale-105">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
                    <Mail size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-1">Email</h4>
                    <a href="mailto:mji041854@gmail.com" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      mji041854@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
                    <Phone size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</h4>
                    <a href="tel:+919140919036" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      +91 9140919036
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
                    <MapPin size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-1">Location</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Lucknow (226002), Uttar Pradesh, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
                    <Github size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-1">GitHub</h4>
                    <a 
                      href="https://github.com/DevloperJI" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      github.com/DevloperJI
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
                    <Linkedin size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-1">LinkedIn</h4>
                    <a 
                      href="https://www.linkedin.com/in/prashant-mishra-2035301b0/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      linkedin.com/in/prashant-mishra
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-700 rounded-lg shadow-lg p-8 transform transition duration-500 hover:shadow-xl">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Send a Message</h3>
              
              <form 
                onSubmit={handleSubmit} 
                className="space-y-4"
                onFocus={() => setFormFocused(true)}
              >
                <div className={animationClass(1)}>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                    placeholder="Your name"
                  />
                </div>
                
                <div className={animationClass(2)}>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                    placeholder="Your email"
                  />
                </div>
                
                <div className={animationClass(3)}>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  className={`w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 ease-in-out transform hover:scale-105 ${animationClass(4)}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message
                      <Send size={16} className="ml-2" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4">
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
        </div>
      </div>
    </section>
  );
};

export default Contact;
