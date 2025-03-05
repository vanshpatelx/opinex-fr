
import { Button } from "@/components/ui/button";
import { useTradeStore } from "@/hooks/useTradeStore";
import { PlusCircleIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function MobileTradeButton() {
  const { actions } = useTradeStore();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="fixed bottom-4 left-0 right-0 px-4 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="perspective-[800px]">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Button 
            onClick={actions.openTradePopup}
            className="w-full py-6 shadow-xl bg-gradient-to-r from-primary/90 to-primary/80 hover:from-primary hover:to-primary/90 transition-all duration-300 rounded-xl relative"
            size="lg"
            style={{
              transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
              transition: "transform 0.3s ease-out"
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ 
                scale: 1,
                rotateZ: isHovered ? [0, -5, 5, 0] : 0
              }}
              transition={{ 
                scale: { repeat: Infinity, repeatType: "reverse", duration: 1.5 },
                rotateZ: { duration: 0.5 }
              }}
            >
              <PlusCircleIcon className="mr-2 h-5 w-5" />
            </motion.div>
            <span className="font-medium">Place Trade</span>

            {/* Subtle glow effect */}
            <motion.div 
              className="absolute inset-0 rounded-xl opacity-0 bg-white/20 blur-md"
              animate={{ opacity: isHovered ? 0.5 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </Button>
        </motion.div>
        
        {/* Shadow effect */}
        <motion.div 
          className="bg-black/20 h-1 mx-auto rounded-full mt-1 blur-md"
          initial={{ width: "80%" }}
          animate={{ width: isHovered ? "90%" : "80%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
