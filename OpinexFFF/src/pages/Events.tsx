
import { Layout } from "@/components/Layout";
import { EventCard } from "@/components/EventCard";
import { EventCategories } from "@/components/EventCategories";
import { useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useUser } from "@/contexts/UserContext";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Mock data for categories
const categories = [
  { id: "all", name: "All Categories" },
  { id: "tech", name: "Technology" },
  { id: "politics", name: "Politics" },
  { id: "sports", name: "Sports" },
  { id: "entertainment", name: "Entertainment" },
  { id: "finance", name: "Finance" },
];

// Mock data for events
const allEvents = [
  {
    id: "1",
    title: "Will Apple release a new MacBook Pro with M3 chip before 2025?",
    category: "tech",
    date: "Nov 5, 2024",
    closeDate: "45 days",
    consensus: "65% Yes",
    description: "This market will resolve to YES if Apple officially announces and releases a MacBook Pro model featuring the M3 chip on or before December 31, 2024.",
    logoId: "info"
  },
  {
    id: "2",
    title: "Will Democrats win the 2024 US Presidential Election?",
    category: "politics",
    date: "Oct 15, 2024",
    closeDate: "30 days",
    consensus: "48% Yes",
    description: "This market will resolve to YES if the Democratic party candidate wins the 2024 US Presidential Election.",
    logoId: "star"
  },
  {
    id: "3",
    title: "Will the Lakers win the 2025 NBA Championship?",
    category: "sports",
    date: "Dec 10, 2024",
    closeDate: "200 days",
    consensus: "35% Yes",
    description: "This market will resolve to YES if the Los Angeles Lakers win the 2025 NBA Championship.",
    logoId: "trophy"
  },
  {
    id: "4",
    title: "Will Bitcoin reach $100,000 before 2025?",
    category: "finance",
    date: "Dec 20, 2024",
    closeDate: "60 days",
    consensus: "70% Yes",
    description: "This market will resolve to YES if the price of Bitcoin reaches or exceeds $100,000 USD on any major exchange before January 1, 2025.",
    logoId: "trending"
  },
  {
    id: "5",
    title: "Will Dune: Part Three be announced in 2024?",
    category: "entertainment",
    date: "Sep 30, 2024",
    closeDate: "90 days",
    consensus: "80% Yes",
    description: "This market will resolve to YES if Warner Bros. officially announces Dune: Part Three on or before December 31, 2024.",
    logoId: "camera"
  },
];

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { isMobile } = useWindowSize();
  const { isAdmin } = useUser();

  // Filter events based on selected category
  const filteredEvents = selectedCategory === "all"
    ? allEvents
    : allEvents.filter(event => event.category === selectedCategory);

  return (
    <Layout>
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Event Markets
          </h1>
          
          {isAdmin && (
            <Link to="/admin/create-event">
              <Button 
                size="sm" 
                className="rounded-full shadow-sm flex items-center gap-1.5"
              >
                <PlusIcon className="h-4 w-4" />
                Create Event
              </Button>
            </Link>
          )}
        </div>
        
        <EventCategories 
          categories={categories} 
          selectedCategory={selectedCategory}
          onSelectCategory={(categoryId) => setSelectedCategory(categoryId)}
        />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`grid grid-cols-1 ${isMobile ? "" : "md:grid-cols-2 lg:grid-cols-3"} gap-3 md:gap-4`}
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <EventCard 
                  key={event.id}
                  event={event}
                  index={index}
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground">No events found in this category.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Events;
