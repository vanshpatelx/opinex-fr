import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useId, useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export function AlertDestructive({ message }: { message: string }) {
  return (
    <Alert variant="destructive" className="border border-red-500 p-4 flex items-center gap-2">
      <div>
        <AlertTitle className="text-red-500">Error</AlertTitle>
        <AlertDescription className="text-red-500">{message}</AlertDescription>
      </div>
    </Alert>
  );
}

function AuthTabs() {
  const id = useId();
  const { login, signup } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  useEffect(() => {
    if (isDialogOpen) setError(null);
  }, [isDialogOpen]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signup(name, email, password);
      setIsDialogOpen(false);
    } catch (err) {
      setError("Signup failed. Please try again."); 
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login(email, password);
      setIsDialogOpen(false);
    } catch (err) {
      setError("Login failed. Please check your credentials and try again."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Sign up</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Welcome to Origin UI</DialogTitle>
            <DialogDescription>
              We just need a few details to get you started.
            </DialogDescription>
          </DialogHeader>

          {error && <AlertDestructive message={error} />} {/* Display error message */}

          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <form className="space-y-5" onSubmit={handleSignup}>
                <div className="space-y-4">
                  <Label htmlFor={`${id}-name`}>Full name</Label>
                  <Input id={`${id}-name`} name="name" placeholder="John Doe" type="text" required />
                  <Label htmlFor={`${id}-email`}>Email</Label>
                  <Input id={`${id}-email`} name="email" placeholder="you@example.com" type="email" required />
                  <Label htmlFor={`${id}-password`}>Password</Label>
                  <Input id={`${id}-password`} name="password" placeholder="Enter your password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing up..." : "Sign up"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signin">
              <form className="space-y-5" onSubmit={handleLogin}>
                <div className="space-y-4">
                  <Label htmlFor={`${id}-signin-email`}>Email</Label>
                  <Input id={`${id}-signin-email`} name="email" placeholder="you@example.com" type="email" required />
                  <Label htmlFor={`${id}-signin-password`}>Password</Label>
                  <Input id={`${id}-signin-password`} name="password" placeholder="Enter your password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { AuthTabs };