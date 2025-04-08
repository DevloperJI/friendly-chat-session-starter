
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add keyframe animations to the document
const style = document.createElement('style');
style.textContent = `
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-slide-in-right {
  animation: slide-in-right 0.8s ease-out forwards;
}
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
