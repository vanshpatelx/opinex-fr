
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEventsStore } from "@/store/eventsStore";
import { AnimatedContainer } from "./shared/AnimatedContainer";
import { FilterIcon, GridIcon, ListIcon, Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function EventsFilter() {
  const { 
    searchQuery, 
    sortBy, 
    viewMode, 
    isFilterMenuOpen,
    actions 
  } = useEventsStore();
  
  const [searchFocused, setSearchFocused] = useState(false);
  
  return (
    <AnimatedContainer
      animationType="fadeInSlideUp"
      className="w-full flex flex-col gap-4 mb-6"
    >
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search Bar */}
        <div className="relative flex-grow">
          <motion.div
            className={cn(
              "absolute inset-0 bg-accent/50 rounded-md -z-10 transition-all",
              searchFocused ? "opacity-100 scale-[1.02] shadow-md" : "opacity-0 scale-100"
            )}
            layoutId="search-highlight"
          />
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => actions.setSearchQuery(e.target.value)}
              className="pl-9 bg-background/50 border-border/40 focus-visible:ring-primary/30 focus-visible:ring-offset-0"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>
        
        {/* Filter/Sort Controls */}
        <div className="flex gap-2">
          <motion.div className="flex gap-2" layout>
            <motion.div layout>
              <Select 
                value={sortBy} 
                onValueChange={(value) => actions.setSortBy(value as any)}
              >
                <SelectTrigger className="w-[140px] bg-background/50 border-border/40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="ending-soon">Ending Soon</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex bg-background/50 rounded-md border border-border/40 p-1"
            layout
          >
            <Button
              variant={viewMode === 'grid' ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => actions.setViewMode('grid')}
            >
              <GridIcon className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => actions.setViewMode('list')}
            >
              <ListIcon className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </motion.div>
          
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 sm:hidden bg-background/50 border-border/40"
            onClick={actions.toggleFilterMenu}
          >
            <FilterIcon className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile Filter Menu */}
      {isFilterMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="sm:hidden p-3 bg-card rounded-lg border border-border/40 shadow-sm overflow-hidden"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Filters</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2"
                onClick={actions.toggleFilterMenu}
              >
                Close
              </Button>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Sort by</p>
              <Select 
                value={sortBy} 
                onValueChange={(value) => {
                  actions.setSortBy(value as any);
                  actions.toggleFilterMenu();
                }}
              >
                <SelectTrigger className="w-full bg-background/50 border-border/40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="ending-soon">Ending Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatedContainer>
  );
}
