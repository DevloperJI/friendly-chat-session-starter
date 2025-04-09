
import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileData } from "@/types/admin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, Upload, Trash2 } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
});

const ProfileSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      location: "",
      phone: "",
      bio: "",
    },
  });

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("profile_data");
    const savedProfilePic = localStorage.getItem("profile_pic");
    
    if (savedProfile) {
      try {
        const profileData = JSON.parse(savedProfile) as ProfileData;
        form.reset(profileData);
      } catch (error) {
        console.error("Error parsing profile data:", error);
      }
    }
    
    if (savedProfilePic) {
      setProfilePic(savedProfilePic);
    }
  }, [form]);

  const onSubmit = (data: ProfileData) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      // Save to localStorage
      localStorage.setItem("profile_data", JSON.stringify(data));
      
      toast({
        title: "Profile updated",
        description: "Your profile settings have been saved successfully.",
      });
      
      setIsSaving(false);
    }, 1000);
  };

  const handleProfilePicUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image file.",
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Profile picture must be less than 5MB.",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Read the file as a data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        setProfilePic(dataUrl);
        
        // Save to localStorage
        localStorage.setItem("profile_pic", dataUrl);
        
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been updated successfully.",
        });
        
        setIsUploading(false);
      }
    };
    
    reader.onerror = () => {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Failed to upload profile picture. Please try again.",
      });
      setIsUploading(false);
    };
    
    reader.readAsDataURL(file);
  };

  const removeProfilePic = () => {
    setProfilePic(null);
    localStorage.removeItem("profile_pic");
    
    toast({
      title: "Profile picture removed",
      description: "Your profile picture has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Edit Profile</h2>
        <p className="text-slate-500 dark:text-slate-400">
          Update your personal information and profile settings
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Picture Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
              Upload a profile picture for your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative mb-6">
              <Avatar className="w-32 h-32 border-4 border-white dark:border-slate-800 shadow-lg">
                {profilePic ? (
                  <AvatarImage src={profilePic} alt="Profile" />
                ) : (
                  <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">
                    <UserRound className="w-16 h-16" />
                  </AvatarFallback>
                )}
              </Avatar>
              
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="gap-2"
                onClick={() => document.getElementById("profile-pic-upload")?.click()}
                disabled={isUploading}
              >
                <Upload size={16} />
                Upload
                <input 
                  id="profile-pic-upload"
                  type="file" 
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicUpload}
                  disabled={isUploading}
                />
              </Button>
              
              {profilePic && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-2 text-red-500"
                  onClick={removeProfilePic}
                  disabled={isUploading}
                >
                  <Trash2 size={16} />
                  Remove
                </Button>
              )}
            </div>
            
          </CardContent>
        </Card>

        {/* Profile Info Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Bio</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Write a short bio about yourself..." 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
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
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;
