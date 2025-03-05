
import { 
    CalendarIcon, 
    Clock, 
    InfoIcon, 
    TrendingUpIcon, 
    TrophyIcon, 
    Ticket, 
    Star, 
    Gift, 
    Mic, 
    Music, 
    Camera
  } from "lucide-react";
  
  interface EventLogoProps {
    logoId: string;
    className?: string;
    size?: number;
  }
  
  export function EventLogo({ logoId, className = "", size = 24 }: EventLogoProps) {
    const logos = {
      "calendar": <CalendarIcon size={size} className={className} />,
      "info": <InfoIcon size={size} className={className} />,
      "clock": <Clock size={size} className={className} />,
      "trending": <TrendingUpIcon size={size} className={className} />,
      "trophy": <TrophyIcon size={size} className={className} />,
      "ticket": <Ticket size={size} className={className} />,
      "star": <Star size={size} className={className} />,
      "gift": <Gift size={size} className={className} />,
      "mic": <Mic size={size} className={className} />,
      "music": <Music size={size} className={className} />,
      "camera": <Camera size={size} className={className} />
    };
    
    const defaultLogo = <TrendingUpIcon size={size} className={className} />;
    
    return logos[logoId as keyof typeof logos] || defaultLogo;
  }
  