
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Mail, MapPin, Phone, Upload } from "lucide-react";

const ProfileSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  // Form would be implemented with useForm in a real application
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate saving data
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
      });
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Edit Profile</h2>
        <p className="text-slate-500 dark:text-slate-400">
          Update your personal information displayed on your portfolio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Photo Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
            <CardDescription>
              This will be displayed on your about section
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                <User className="h-16 w-16 text-slate-400" />
              </div>
              <button className="absolute bottom-0 right-0 rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 shadow-lg">
                <Upload className="h-4 w-4" />
              </button>
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              Change Photo
            </Button>
          </CardContent>
        </Card>

        {/* Personal Information Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your basic information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium mb-1 block">
                  Full Name
                </label>
                <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
                  <span className="pl-3 text-slate-400">
                    <User size={18} />
                  </span>
                  <Input 
                    id="name" 
                    placeholder="Prashant Mishra" 
                    defaultValue="Prashant Mishra" 
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium mb-1 block">
                  Email Address
                </label>
                <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
                  <span className="pl-3 text-slate-400">
                    <Mail size={18} />
                  </span>
                  <Input 
                    id="email" 
                    placeholder="your.email@example.com" 
                    defaultValue="contact@prashantmishra.com" 
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="location" className="text-sm font-medium mb-1 block">
                  Location
                </label>
                <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
                  <span className="pl-3 text-slate-400">
                    <MapPin size={18} />
                  </span>
                  <Input 
                    id="location" 
                    placeholder="City, Country" 
                    defaultValue="Mumbai, India" 
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-medium mb-1 block">
                  Phone Number
                </label>
                <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
                  <span className="pl-3 text-slate-400">
                    <Phone size={18} />
                  </span>
                  <Input 
                    id="phone" 
                    placeholder="+XX XXXXXXXXXX" 
                    defaultValue="+91 98765 43210" 
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="bio" className="text-sm font-medium mb-1 block">
                Bio
              </label>
              <Textarea 
                id="bio" 
                placeholder="Tell us about yourself" 
                className="min-h-32" 
                defaultValue="Passionate developer specializing in building modern web applications with React, TypeScript, and other cutting-edge technologies. Committed to creating intuitive, responsive user experiences."
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button variant="outline">Cancel</Button>
            <Button 
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
              disabled={isSaving}
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
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;
