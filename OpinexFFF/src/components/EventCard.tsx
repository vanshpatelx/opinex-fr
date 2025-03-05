
import { Badge } from "@/components/shared/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock, InfoIcon, ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Event3DIcon } from "./Event3DIcon";

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  closeDate: string;
  consensus: string;
  description: string;
  logoId?: string;
}

interface EventCardProps {
  event: Event;
  className?: string;
  index?: number;
}

export function EventCard({ event, className, index = 0 }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1, 
        type: "spring", 
        stiffness: 200, 
        damping: 25 
      }}
    >
      <Card className={cn(
        "w-full overflow-hidden border-border/30 card-3d",
        className
      )}>
        <motion.div className="card-3d-content h-full">
          <Link to={`/event/${event.id}`} className="block h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <Badge variant="outline" className="mb-2 border-border/30 px-3 py-0.5 text-xs font-medium">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {event.date}
                </Badge>
                <Badge className="bg-accent/80 text-accent-foreground mb-2 px-3 py-0.5 text-xs font-medium">
                  <Clock className="mr-1 h-3 w-3" />
                  Closes in {event.closeDate}
                </Badge>
              </div>
              <div className="flex items-start gap-3">
                {event.logoId && (
                  <div className="shrink-0 hidden sm:block">
                    <Event3DIcon logoId={event.logoId} size={20} />
                  </div>
                )}
                <CardTitle className="leading-tight text-balance text-lg font-semibold text-foreground/90">
                  {event.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {event.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center text-xs text-muted-foreground">
                  <InfoIcon className="mr-1 h-3 w-3" />
                  <span>Consensus: <span className="font-medium text-foreground">{event.consensus}</span></span>
                </div>
                <motion.div 
                  className="bg-primary/10 rounded-full p-1.5 group"
                  whileHover={{ scale: 1.1, x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <ChevronRightIcon className="h-4 w-4 text-primary" />
                </motion.div>
              </div>
            </CardContent>
          </Link>
        </motion.div>
      </Card>
    </motion.div>
  );
}
