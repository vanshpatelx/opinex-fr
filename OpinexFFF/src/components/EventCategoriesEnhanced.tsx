
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCategoryStore } from "@/stores/categoryStore";
import { useEventsStore } from "@/stores/eventsStore";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Event3DIcon } from "./Event3DIcon";
import { AnimatedContainer } from "./shared/AnimatedContainer";

export function EventCategoriesEnhanced() {
  const { categories } = useCategoryStore();
  const { selectedCategory, actions } = useEventsStore();
  
  const handleSelectCategory = (category: string) => {
    actions.setSelectedCategory(category as any);
  };
  
  // AI-inspired glow animation
  const glowVariants = {
    hover: {
      boxShadow: "0 0 15px 2px rgba(var(--primary-rgb), 0.3)",
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 0 5px 1px rgba(var(--primary-rgb), 0.3)",
      transition: { duration: 0.1 }
    }
  };
  
  return (
    <AnimatedContainer
      animationType="fadeInSlideUp"
      className="w-full mb-6"
      delay={0.1}
    >
      <ScrollArea className="pb-4 w-full">
        <div className="flex space-x-2 pb-3">
          {categories.map((category, i) => (
            <motion.div
              key={category.id}
              variants={glowVariants}
              whileHover="hover"
              whileTap="tap"
              className="perspective-[800px]"
              style={{ 
                transformStyle: "preserve-3d",
                "--primary-rgb": "var(--primary-rgb, 124, 58, 237)"
              } as any}
            >
              <Button
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={cn(
                  "h-auto py-2 px-3 rounded-lg flex items-center gap-2 border transition-all duration-300",
                  selectedCategory === category.id 
                    ? "bg-primary text-primary-foreground border-primary/30" 
                    : "hover:bg-primary/10 border-border/40 bg-background/50"
                )}
                onClick={() => handleSelectCategory(category.id)}
              >
                <div className="flex items-center justify-center h-8 w-8">
                  <Event3DIcon 
                    logoId={category.id === 'all' ? 'globe' : category.id} 
                    size={18}
                    animationDelay={i * 0.05}
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
                  <span className="text-xs opacity-70">{category.count} events</span>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </AnimatedContainer>
  );
}
