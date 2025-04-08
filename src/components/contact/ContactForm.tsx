
import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFocused, setFormFocused] = useState(false);
  const { toast } = useToast();

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
  );
};

export default ContactForm;
