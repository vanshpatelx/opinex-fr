
import { Button } from "@/components/ui/button";
import { useWindowSize } from "@/hooks/useWindowSize";
import { LogInIcon, UserPlusIcon, MenuIcon, TrendingUpIcon, PlusIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { AuthDialog } from "./AuthDialog";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserBalance } from "./UserBalance";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/contexts/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Taskbar() {
  const { isMobile } = useWindowSize();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useUser();
  
  const handleOpenLogin = () => {
    setAuthMode("login");
    setAuthDialogOpen(true);
    setMobileMenuOpen(false);
  };
  
  const handleOpenSignup = () => {
    setAuthMode("signup");
    setAuthDialogOpen(true);
    setMobileMenuOpen(false);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-16 z-50 glass-morphism border-b border-border/30 px-4 md:px-8 flex items-center justify-between"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Event Trader
            </h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors duration-300 ${location.pathname === '/' 
                ? 'text-foreground after:content-[""] after:block after:w-full after:h-0.5 after:bg-primary after:scale-x-100 after:transition-transform' 
                : 'text-muted-foreground hover:text-foreground after:content-[""] after:block after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform'}`}
            >
              Home
            </Link>
            <Link 
              to="/events" 
              className={`text-sm font-medium transition-colors duration-300 ${location.pathname === '/events' 
                ? 'text-foreground after:content-[""] after:block after:w-full after:h-0.5 after:bg-primary after:scale-x-100 after:transition-transform' 
                : 'text-muted-foreground hover:text-foreground after:content-[""] after:block after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform'}`}
            >
              Events
            </Link>
            {isAdmin && (
              <Link 
                to="/admin/create-event" 
                className={`text-sm font-medium transition-colors duration-300 ${location.pathname === '/admin/create-event' 
                  ? 'text-foreground after:content-[""] after:block after:w-full after:h-0.5 after:bg-primary after:scale-x-100 after:transition-transform' 
                  : 'text-muted-foreground hover:text-foreground after:content-[""] after:block after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform'}`}
              >
                Create Event
              </Link>
            )}
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          {isAuthenticated && <UserBalance />}
          
          {isMobile ? (
            <>
              <Button
                variant="ghost" 
                size="icon"
                onClick={toggleMobileMenu}
                className="md:hidden rounded-full w-9 h-9 hover:bg-accent/60"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
              
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div 
                    className="absolute top-16 right-0 w-56 bg-card/95 backdrop-blur-md shadow-lg rounded-bl-2xl border border-border/30 py-3 px-1 z-50"
                    initial={{ opacity: 0, y: -10, x: 10 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: -10, x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <nav className="flex flex-col space-y-1">
                      <Link 
                        to="/" 
                        className={`text-sm py-2 px-4 rounded-lg transition-colors ${location.pathname === '/' 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'text-foreground hover:bg-accent/50'}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Home
                      </Link>
                      <Link 
                        to="/events" 
                        className={`text-sm py-2 px-4 rounded-lg transition-colors ${location.pathname === '/events' 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'text-foreground hover:bg-accent/50'}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Events
                      </Link>
                      
                      {isAdmin && (
                        <Link 
                          to="/admin/create-event" 
                          className={`text-sm py-2 px-4 rounded-lg transition-colors ${location.pathname === '/admin/create-event' 
                            ? 'bg-primary/10 text-primary font-medium' 
                            : 'text-foreground hover:bg-accent/50'}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="flex items-center gap-1.5">
                            <PlusIcon className="h-4 w-4" />
                            Create Event
                          </div>
                        </Link>
                      )}
                      
                      <hr className="my-2 border-border/20" />
                      
                      {isAuthenticated ? (
                        <>
                          <Link 
                            to="/profile" 
                            className="text-sm py-2 px-4 rounded-lg flex items-center gap-2 text-foreground hover:bg-accent/50 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <UserIcon className="h-4 w-4" />
                            Profile
                          </Link>
                          <button
                            className="text-sm py-2 px-4 rounded-lg text-left flex items-center gap-2 text-foreground hover:bg-accent/50 transition-colors"
                            onClick={handleLogout}
                          >
                            <LogInIcon className="h-4 w-4" />
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            className="justify-start text-sm py-2 px-4 rounded-lg text-left flex items-center gap-2 text-foreground hover:bg-accent/50 transition-colors h-auto"
                            onClick={handleOpenLogin}
                          >
                            <LogInIcon className="h-4 w-4" />
                            Login
                          </Button>
                          <Button
                            variant="ghost"
                            className="justify-start text-sm py-2 px-4 rounded-lg text-left flex items-center gap-2 text-foreground hover:bg-accent/50 transition-colors h-auto"
                            onClick={handleOpenSignup}
                          >
                            <UserPlusIcon className="h-4 w-4" />
                            Sign Up
                          </Button>
                        </>
                      )}
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <>
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-full p-0 w-9 h-9 flex items-center justify-center hover:bg-accent/60"
                    >
                      <Avatar className="h-8 w-8 border border-border/30">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {user?.name ? getInitials(user.name) : 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-4 py-2 space-y-1">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <UserIcon className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin/create-event" className="cursor-pointer">
                          <PlusIcon className="mr-2 h-4 w-4" />
                          Create Event
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogInIcon className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="ghost" 
                    size="sm"
                    onClick={handleOpenLogin}
                    className="flex items-center gap-1 hover:bg-accent/50 transition-colors duration-300 rounded-full"
                  >
                    <LogInIcon className="h-4 w-4" />
                    Login
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleOpenSignup}
                    className="flex items-center gap-1 bg-primary/90 hover:bg-primary transition-colors duration-300 rounded-full shadow-sm"
                  >
                    <UserPlusIcon className="h-4 w-4" />
                    Sign Up
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </motion.div>
      
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
        mode={authMode}
        setMode={setAuthMode}
      />
    </>
  );
}
