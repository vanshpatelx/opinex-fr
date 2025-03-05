
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { AlertTriangle, Home, Search } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout className="flex items-center justify-center">
      <div className="w-full max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 2
                }}
              >
                <AlertTriangle size={80} className="text-warning mb-2" />
              </motion.div>
              <motion.div
                className="absolute -right-2 -top-2 bg-card px-3 py-1 rounded-full border-2 border-background font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
              >
                404
              </motion.div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-bold">Page Not Found</h1>
            <p className="text-xl text-muted-foreground">
              We couldn't find the page you were looking for.
            </p>
            <p className="text-muted-foreground max-w-md mx-auto">
              The page at <span className="font-mono bg-secondary/50 px-2 py-0.5 rounded">{location.pathname}</span> might have been moved or deleted.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="gap-2" asChild>
              <a href="/">
                <Home size={18} />
                Go to Home
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href="/events">
                <Search size={18} />
                Browse Events
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;
