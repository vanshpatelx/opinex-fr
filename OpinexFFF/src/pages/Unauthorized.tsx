
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Lock, Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Layout className="flex items-center justify-center">
      <div className="w-full max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="relative flex justify-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1.5
              }}
              className="bg-destructive/10 p-8 rounded-full"
            >
              <Lock size={70} className="text-destructive" />
            </motion.div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-bold">Access Denied</h1>
            <p className="text-xl text-muted-foreground">
              You don't have permission to access this page.
            </p>
            <p className="text-muted-foreground max-w-lg mx-auto">
              This area requires additional authorization. Please log in with an account that has the appropriate permissions.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="gap-2" asChild>
              <a href="/">
                <Home size={18} />
                Go to Home
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={() => navigate(-1)}>
              <ArrowLeft size={18} />
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Unauthorized;
