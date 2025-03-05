
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "login" | "signup";
  setMode: (mode: "login" | "signup") => void;
}

// Mock user data for the demo
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "user@gmail.com", // Updated for easy login
    password: "12345678", // Updated for easy login
    balance: 5000,
    role: "user" as const,
    avatar: "https://i.pravatar.cc/150?u=john"
  },
  {
    id: "2", 
    name: "Jane Smith",
    email: "admin@gmail.com", // Updated for easy login
    password: "12345678", // Updated for easy login
    balance: 8500,
    role: "admin" as const,
    avatar: "https://i.pravatar.cc/150?u=jane"
  }
];

export function AuthDialog({ open, onOpenChange, mode, setMode }: AuthDialogProps) {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "login") {
      // Check if the user exists in our mock data
      const user = mockUsers.find(
        u => u.email === email && u.password === password
      );
      
      if (user) {
        // Call login function from UserContext
        login({
          id: user.id,
          name: user.name,
          email: user.email,
          balance: user.balance,
          role: user.role,
          avatar: user.avatar
        });
        
        toast.success("Login successful!", {
          description: `Welcome back, ${user.name}!`,
        });
        
        // Reset form and close dialog
        resetForm();
        onOpenChange(false);
      } else {
        toast.error("Login failed", {
          description: "Invalid email or password. Try again.",
        });
      }
    } else {
      // In a real app, you would create a new user in your backend
      toast.success("Account created successfully!", {
        description: "Your new account has been created.",
      });
      
      // Reset form and close dialog
      resetForm();
      onOpenChange(false);
    }
  };
  
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
  };
  
  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };
  
  // Add quick login function for demonstration
  const handleQuickLogin = (userType: "user" | "admin") => {
    const demoUser = mockUsers.find(u => u.role === userType);
    if (demoUser) {
      setEmail(demoUser.email);
      setPassword(demoUser.password);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {mode === "login" ? "Login to your account" : "Create an account"}
          </DialogTitle>
          <DialogDescription>
            {mode === "login" 
              ? "Enter your credentials to access your account" 
              : "Fill in your details to create a new account"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full mt-4">
            {mode === "login" ? "Login" : "Sign Up"}
          </Button>
          
          {mode === "login" && (
            <div className="flex gap-2 mt-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="flex-1 text-xs" 
                onClick={() => handleQuickLogin("user")}
              >
                Login as User
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="flex-1 text-xs" 
                onClick={() => handleQuickLogin("admin")}
              >
                Login as Admin
              </Button>
            </div>
          )}
          
          <div className="text-center text-sm mt-4">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            <Button 
              variant="link" 
              className="px-1 text-sm" 
              onClick={toggleMode}
              type="button"
            >
              {mode === "login" ? "Sign up" : "Login"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
