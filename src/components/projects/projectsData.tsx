
import { Calendar, Code, ExternalLink, ArrowRight } from "lucide-react";
import { ProjectType } from "./types";

const projectsData: ProjectType[] = [
  {
    title: "Task Management System",
    description: "Developed a task management app using Python and OOP principles.",
    longDescription: "A comprehensive task management system built with Python that leverages object-oriented programming principles to create a flexible and maintainable codebase. This application enables users to create, organize, and track tasks with features like priority levels, due dates, and task categories. The project demonstrates strong debugging skills and collaborative development practices.",
    technologies: ["Python", "OOP", "Git", "Unit Testing"],
    learnings: "Code optimization, debugging, and collaboration",
    color: "from-blue-500 to-cyan-400",
    icon: <Calendar className="h-10 w-10 text-blue-500 dark:text-blue-400" />,
    demoUrl: "#",
    codeUrl: "https://github.com/DevloperJI/task-management-system",
    videoUrl: null
  },
  {
    title: "Weather Forecast Application",
    description: "Built a real-time weather app with Java, integrating external APIs.",
    longDescription: "An intuitive weather forecast application developed in Java that provides real-time weather data by integrating with external weather APIs. The application features a clean user interface built with JavaFX, displaying current conditions, hourly forecasts, and 5-day predictions. It includes features like location detection, favorite locations saving, and weather alerts for severe conditions.",
    technologies: ["Java", "APIs", "JavaFX", "Integration Testing"],
    learnings: "API integration, data handling, and UI development with JavaFX",
    color: "from-purple-500 to-pink-400",
    icon: <Code className="h-10 w-10 text-purple-500 dark:text-purple-400" />,
    demoUrl: "#",
    codeUrl: "https://github.com/DevloperJI/weather-forecast-app",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Sample video URL
  },
  {
    title: "E-Commerce Frontend",
    description: "Designed a responsive e-commerce website as part of Reliance Frontend Certification.",
    longDescription: "A modern e-commerce frontend developed for the Reliance Frontend Certification, featuring a responsive design that works seamlessly across all devices. The website includes product listings, detailed product pages, shopping cart functionality, user authentication, and a streamlined checkout process. The project demonstrates advanced CSS techniques, JavaScript DOM manipulation, and attention to user experience design principles.",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    learnings: "Frontend development, user experience design, and web optimization",
    color: "from-orange-500 to-amber-400",
    icon: <ExternalLink className="h-10 w-10 text-orange-500 dark:text-orange-400" />,
    demoUrl: "#",
    codeUrl: "https://github.com/DevloperJI/ecommerce-frontend",
    videoUrl: null
  },
  {
    title: "Digital Marketing Automation Tool",
    description: "Created a tool for automating social media posts with platform API integration.",
    longDescription: "An advanced digital marketing automation tool that streamlines social media management by scheduling and publishing posts across multiple platforms. The tool integrates with various social media APIs (Twitter, Facebook, Instagram, LinkedIn) to provide a unified interface for content planning, scheduling, and analytics. It includes features like content calendar, performance tracking, and audience engagement metrics.",
    technologies: ["Python", "APIs", "Data Analysis", "Automation"],
    learnings: "Automation, data analysis, and API interaction",
    color: "from-green-500 to-emerald-400",
    icon: <ArrowRight className="h-10 w-10 text-green-500 dark:text-green-400" />,
    demoUrl: "#",
    codeUrl: "https://github.com/DevloperJI/marketing-automation",
    videoUrl: null
  },
  {
    title: "React Portfolio Website",
    description: "Developed a modern, responsive portfolio website using React, TypeScript and Tailwind CSS.",
    longDescription: "A modern portfolio website built with React, TypeScript, and Tailwind CSS that showcases professional skills, projects, and experience. The site features smooth animations, dark mode support, responsive design for all devices, and interactive UI components. The architecture follows best practices with modular components, custom hooks, and efficient state management.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    learnings: "Modern frontend development, component architecture, and responsive design principles",
    color: "from-blue-600 to-indigo-500",
    icon: <Code className="h-10 w-10 text-blue-600 dark:text-blue-500" />,
    demoUrl: "https://devloper-ji.vercel.app",
    codeUrl: "https://github.com/DevloperJI/portfolio-website",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Sample video URL
  }
];

export default projectsData;
