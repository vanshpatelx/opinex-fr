
import { Badge } from "@/components/shared/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock, InfoIcon, TrendingUpIcon, UsersIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Event3DIcon } from "./Event3DIcon";

interface EventDetailsProps {
  className?: string;
  title?: string;
  date?: string;
  closeDate?: string;
  consensus?: string;
  description?: string;
  logoId?: string;
}

export function EventDetails({ 
  className,
  title = "Will Apple release a new MacBook Pro with M3 chip before 2025?",
  date = "Nov 5, 2024",
  closeDate = "45 days",
  consensus = "65% Yes",
  description = "This market will resolve to YES if Apple officially announces and releases a MacBook Pro model featuring the M3 chip on or before December 31, 2024. The product must be available for purchase to qualify.",
  logoId = "info"
}: EventDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className={cn("w-full overflow-hidden border border-border/40 shadow-sm card-3d", className)}>
        <motion.div className="card-3d-content">
          <CardHeader className="pb-2">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 border-border/40">
                <CalendarIcon className="mr-1 h-3 w-3" />
                {date}
              </Badge>
              <Badge className="bg-accent text-accent-foreground flex items-center gap-1 px-3 py-1">
                <Clock className="mr-1 h-3 w-3" />
                Closes in {closeDate}
              </Badge>
            </div>
            <div className="flex items-start gap-4">
              {logoId && (
                <div className="hidden sm:block">
                  <Event3DIcon logoId={logoId} size={24} />
                </div>
              )}
              <CardTitle className="leading-tight text-balance text-2xl font-bold text-foreground/90">
                {title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <InfoIcon className="h-4 w-4 text-foreground/60" />
                <span>Current consensus: <span className="font-medium text-foreground">{consensus}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1 px-2 py-0.5 border-border/40">
                  <TrendingUpIcon className="h-3 w-3" />
                  <span>Trending</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 px-2 py-0.5 border-border/40">
                  <UsersIcon className="h-3 w-3" />
                  <span>184 traders</span>
                </Badge>
              </div>
            </div>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}
