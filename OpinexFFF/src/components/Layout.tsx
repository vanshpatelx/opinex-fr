import { useWindowSize } from "@/hooks/useWindowSize";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Taskbar } from "./Taskbar";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  const { isMobile, isTablet } = useWindowSize();
  
  // Calculate responsive side spacing
  const sideSpacing = isMobile 
    ? "px-3" 
    : isTablet 
    ? "px-6" 
    : "px-[10%]"; // 20% total (10% on each side)
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Taskbar />
      <motion.main 
        className={cn(
          "flex-1 w-full pt-20 pb-20 bg-background", // Adjusted pt-20 for taskbar
          sideSpacing,
          className
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.main>
    </div>
  );
}
