
import { useEffect, useRef, useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    position: "Senior Developer at TechCorp",
    text: "Prashant is an exceptional talent with solid programming fundamentals. His dedication to learning and problem-solving abilities make him a valuable asset to any team.",
    rating: 5
  },
  {
    name: "Sarah Johnson",
    position: "Project Manager at InnovateTech",
    text: "Working with Prashant was a pleasure. He's a quick learner and delivered quality code before deadlines. His communication skills made collaboration seamless.",
    rating: 5
  },
  {
    name: "Alex Kumar",
    position: "CTO at StartupNext",
    text: "Prashant's approach to problem-solving is methodical and effective. His Java and Python skills are impressive for someone at his career stage.",
    rating: 4
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
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
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 8000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className="opacity-0 transform translate-y-10 transition-all duration-700"
        >
          <h2 className="text-3xl font-bold mb-2 text-center">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              What People Say
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-12 rounded-full"></div>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="relative h-[280px] md:h-[220px] overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out p-6 ${
                    index === currentIndex 
                      ? "opacity-100 translate-x-0" 
                      : index < currentIndex 
                        ? "opacity-0 -translate-x-full" 
                        : "opacity-0 translate-x-full"
                  }`}
                >
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 relative">
                    <Quote className="absolute top-6 left-6 text-blue-100 dark:text-slate-700 h-24 w-24 opacity-40" />
                    <div className="relative z-10">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                            fill={i < testimonial.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mb-4 italic relative z-10">"{testimonial.text}"</p>
                      <div className="flex items-center">
                        <div className="bg-blue-100 dark:bg-slate-700 h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-400">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold text-slate-800 dark:text-white">{testimonial.name}</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-6 gap-2">
              <button 
                onClick={goToPrevious} 
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-2 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <span 
                    key={index}
                    className={`inline-block h-2 w-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-blue-500 w-6" : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  ></span>
                ))}
              </div>
              <button 
                onClick={goToNext} 
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full p-2 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
