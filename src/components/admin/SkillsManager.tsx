
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Plus, X, AlertCircle, Save } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

const defaultSkills = [
  { name: "React", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Tailwind CSS", level: 88 },
  { name: "Node.js", level: 75 },
  { name: "MongoDB", level: 70 },
  { name: "UI/UX Design", level: 65 },
  { name: "Git", level: 85 },
  { name: "Python", level: 80 },
  { name: "Docker", level: 60 },
  { name: "AWS", level: 65 },
];

interface Skill {
  name: string;
  level: number;
}

const SkillsManager = () => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<Skill[]>(() => {
    const savedSkills = localStorage.getItem("portfolio_skills");
    return savedSkills ? JSON.parse(savedSkills) : defaultSkills;
  });
  const [newSkill, setNewSkill] = useState<string>("");
  const [newLevel, setNewLevel] = useState<number>(75);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddSkill = () => {
    if (!newSkill.trim()) {
      toast({
        variant: "destructive", 
        title: "Error",
        description: "Please enter a skill name",
      });
      return;
    }

    // Check if skill already exists
    if (skills.some(skill => skill.name.toLowerCase() === newSkill.toLowerCase())) {
      toast({
        variant: "destructive",
        title: "Duplicate skill",
        description: "This skill already exists in your list",
      });
      return;
    }

    const updatedSkills = [
      ...skills,
      { name: newSkill, level: newLevel }
    ];
    
    setSkills(updatedSkills);
    setNewSkill("");
    setNewLevel(75);
    
    toast({
      title: "Skill added",
      description: `"${newSkill}" has been added to your skills`,
    });
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...skills];
    const removedSkill = updatedSkills[index].name;
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
    
    toast({
      title: "Skill removed",
      description: `"${removedSkill}" has been removed from your skills`,
    });
  };

  const handleSaveSkills = () => {
    setIsSaving(true);
    
    // Save to localStorage
    localStorage.setItem("portfolio_skills", JSON.stringify(skills));
    
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Skills saved",
        description: "Your skills have been updated successfully",
      });
    }, 800);
  };

  const handleLevelChange = (index: number, level: number) => {
    const updatedSkills = [...skills];
    updatedSkills[index].level = level;
    setSkills(updatedSkills);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Manage Skills</h2>
        <p className="text-slate-500 dark:text-slate-400">
          Add, remove, or update your skills and proficiency levels
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Skill</CardTitle>
          <CardDescription>
            Add a new skill with a proficiency level (0-100%)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="skill-name" className="text-sm font-medium mb-1 block">
                Skill Name
              </label>
              <Input
                id="skill-name"
                placeholder="e.g., JavaScript, React, Docker"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <label htmlFor="skill-level" className="text-sm font-medium mb-1 block">
                Proficiency Level: {newLevel}%
              </label>
              <div className="flex items-center gap-2">
                <Input
                  id="skill-level"
                  type="range"
                  min="0"
                  max="100"
                  value={newLevel}
                  onChange={(e) => setNewLevel(parseInt(e.target.value))}
                  className="h-2"
                />
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <Button 
                onClick={handleAddSkill}
                className="gap-2 w-full md:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
              >
                <Plus size={16} />
                Add Skill
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Skills</CardTitle>
          <CardDescription>
            Manage your existing skills and proficiency levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          {skills.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-4 text-lg font-medium">No skills added yet</h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Add your first skill using the form above
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-slate-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-2">
                      <div 
                        className="h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <Input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) => handleLevelChange(index, parseInt(e.target.value))}
                      className="h-2 flex-1 md:w-32"
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300"
                      onClick={() => handleRemoveSkill(index)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 && (
              <>
                <Badge variant="outline" className="bg-slate-100 dark:bg-slate-700">
                  {skills.length} skills
                </Badge>
                <Badge variant="outline" className="bg-slate-100 dark:bg-slate-700">
                  Avg: {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
                </Badge>
              </>
            )}
          </div>
          <Button 
            onClick={handleSaveSkills}
            className="gap-2"
            disabled={isSaving || skills.length === 0}
          >
            {isSaving ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </div>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SkillsManager;
