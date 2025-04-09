
import { ReactNode } from "react";

export interface ProjectType {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  learnings: string;
  color: string;
  icon: ReactNode;
  demoUrl: string;
  codeUrl: string;
  videoUrl: string | null;
}
