
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const ContactInfoItem = ({ icon, title, content }: ContactInfoItemProps) => (
  <div className="flex items-start">
    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
      {icon}
    </div>
    <div>
      <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-1">{title}</h4>
      {content}
    </div>
  </div>
);

const ContactInfo = () => {
  return (
    <div className="space-y-6 transform transition duration-500 hover:scale-105">
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Contact Information</h3>
      
      <div className="space-y-6">
        <ContactInfoItem 
          icon={<Mail size={20} className="text-blue-600 dark:text-blue-400" />}
          title="Email"
          content={
            <a href="mailto:mji041854@gmail.com" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              mji041854@gmail.com
            </a>
          }
        />
        
        <ContactInfoItem 
          icon={<Phone size={20} className="text-blue-600 dark:text-blue-400" />}
          title="Phone"
          content={
            <a href="tel:+919140919036" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              +91 9140919036
            </a>
          }
        />
        
        <ContactInfoItem 
          icon={<MapPin size={20} className="text-blue-600 dark:text-blue-400" />}
          title="Location"
          content={
            <p className="text-slate-600 dark:text-slate-400">
              Lucknow (226002), Uttar Pradesh, India
            </p>
          }
        />
        
        <ContactInfoItem 
          icon={<Github size={20} className="text-blue-600 dark:text-blue-400" />}
          title="GitHub"
          content={
            <a 
              href="https://github.com/DevloperJI" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              github.com/DevloperJI
            </a>
          }
        />
        
        <ContactInfoItem 
          icon={<Linkedin size={20} className="text-blue-600 dark:text-blue-400" />}
          title="LinkedIn"
          content={
            <a 
              href="https://www.linkedin.com/in/prashant-mishra-2035301b0/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              linkedin.com/in/prashant-mishra
            </a>
          }
        />
      </div>
    </div>
  );
};

export default ContactInfo;
