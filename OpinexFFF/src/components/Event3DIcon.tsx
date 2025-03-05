
import { motion } from "framer-motion";
import { EventLogo } from "./EventLogo";
import { cn } from "@/lib/utils";
import { AnimatedContainer } from "./shared/AnimatedContainer";

interface Event3DIconProps {
  logoId: string;
  size?: number;
  className?: string;
  animationDelay?: number;
}

export function Event3DIcon({ 
  logoId, 
  size = 24, 
  className,
  animationDelay = 0
}: Event3DIconProps) {
  return (
    <AnimatedContainer 
      delay={animationDelay} 
      animationType="scale"
      className={cn(
        "relative group perspective-[1000px]",
        className
      )}
    >
      <motion.div
        className="p-3 bg-primary/10 rounded-lg transform-gpu transition-all duration-300 shadow-sm"
        whileHover={{ 
          rotateX: 10, 
          rotateY: -10,
          z: 10,
          boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)"
        }}
      >
        <EventLogo 
          logoId={logoId} 
          className="text-primary relative z-10" 
          size={size} 
        />
        
        {/* Shadow effect */}
        <div className="absolute inset-0 rounded-lg bg-primary/5 blur-sm transform translate-y-1 translate-x-1 -z-10 opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
      </motion.div>
    </AnimatedContainer>
  );
}
