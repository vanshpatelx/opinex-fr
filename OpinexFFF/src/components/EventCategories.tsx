
import { Badge } from "@/components/shared/Badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
}

interface EventCategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

export function EventCategories({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: EventCategoriesProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-3 p-1">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className="focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={cn(
                "px-3 py-1.5 text-sm cursor-pointer transition-colors rounded-full",
                selectedCategory === category.id 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" 
                  : "hover:bg-accent hover:text-accent-foreground border-border/30"
              )}
            >
              {category.name}
            </Badge>
          </motion.button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
