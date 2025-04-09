
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LockKeyhole, User } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const AdminLogin = () => {
  const { login } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setIsLoggingIn(true);
    
    setTimeout(() => {
      const success = login(values.username, values.password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
        navigate("/admin");
      } else {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "Invalid username or password",
        });
      }
      
      setIsLoggingIn(false);
    }, 1000); // Simulated delay for better UX
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Please sign in to access the admin dashboard
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
                      <span className="pl-3 text-slate-400">
                        <User size={18} />
                      </span>
                      <Input
                        placeholder="Enter username"
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
                      <span className="pl-3 text-slate-400">
                        <LockKeyhole size={18} />
                      </span>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </Form>

        <div className="pt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>This is a protected area</p>
          <p className="mt-1">
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={() => navigate("/")}
            >
              Return to homepage
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
