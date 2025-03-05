import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { EventDetails } from "@/components/EventDetails";
import { OrderBook } from "@/components/OrderBook";
import { TradeBox } from "@/components/TradeBox";
import { TradePopup } from "@/components/TradePopup";
import { MobileTradeButton } from "@/components/MobileTradeButton";
import { useWindowSize } from "@/hooks/useWindowSize";
import { AnimatedContainer } from "@/components/shared/AnimatedContainer";
import { useEffect } from "react";
import { toast } from "sonner";
import { AlertCircleIcon } from "lucide-react";

// Mock data for events (in a real app, this would be fetched from an API)
const events = [
  {
    id: "1",
    title: "Will Apple release a new MacBook Pro with M3 chip before 2025?",
    date: "Nov 5, 2024",
    closeDate: "45 days",
    consensus: "65% Yes",
    logoId: "info",
    description: "This market will resolve to YES if Apple officially announces and releases a MacBook Pro model featuring the M3 chip on or before December 31, 2024. The product must be available for purchase to qualify."
  },
  {
    id: "2",
    title: "Will Democrats win the 2024 US Presidential Election?",
    date: "Oct 15, 2024",
    closeDate: "30 days",
    consensus: "48% Yes",
    logoId: "calendar",
    description: "This market will resolve to YES if the Democratic party candidate wins the 2024 US Presidential Election."
  },
  {
    id: "3",
    title: "Will SpaceX successfully land humans on Mars before 2030?",
    date: "Dec 1, 2024",
    closeDate: "60 days",
    consensus: "32% Yes",
    logoId: "trending",
    description: "This market will resolve to YES if SpaceX successfully lands at least one human on the surface of Mars before January 1, 2030."
  },
  {
    id: "4",
    title: "Will Bitcoin price exceed $100,000 before 2025?", 
    date: "Sep 20, 2024",
    closeDate: "90 days",
    consensus: "73% Yes",
    logoId: "trending",
    description: "This market will resolve to YES if the price of Bitcoin (BTC) exceeds $100,000 USD on any major exchange before January 1, 2025."
  }
  // Other events would be here...
];

const Event = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { isMobile } = useWindowSize();
  const navigate = useNavigate();
  
  // Find the event by ID (in a real app, this would be a query to an API)
  const event = events.find(e => e.id === eventId);
  
  useEffect(() => {
    // Show alert if event is not found
    if (!event) {
      toast.error("Event not found", {
        description: "The event you're looking for doesn't exist or has been removed.",
        action: {
          label: "Browse Events",
          onClick: () => navigate("/events")
        }
      });
      return;
    }

    // Show toast notification for event view
    toast.success(`Viewing: ${event.title}`, {
      description: `Current consensus: ${event.consensus}`,
      icon: <AlertCircleIcon />,
      duration: 4000,
    });
    
    // Show alert when event is close to ending (for demo purposes)
    if (event.closeDate.includes("30 days")) {
      toast.warning("Event closing soon", {
        description: "This event will close in 30 days. Make your predictions now!",
        duration: 5000,
      });
    }
  }, [event, navigate]);
  
  if (!event) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h2 className="text-2xl font-bold mb-4">Event not found</h2>
          <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate("/events")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Browse Events
          </button>
        </div>
      </Layout>
    );
  }
  
  return (
    <>
      <Layout>
        <div className="flex flex-col md:flex-row gap-5 md:gap-8">
          {/* Left column - Event details and order book */}
          <div className={`flex-1 ${isMobile ? "" : "max-w-[640px]"} space-y-5 md:space-y-8`}>
            <AnimatedContainer animationType="fadeInSlideUp">
              <EventDetails 
                title={event.title}
                date={event.date}
                closeDate={event.closeDate}
                consensus={event.consensus}
                description={event.description}
                logoId={event.logoId}
              />
            </AnimatedContainer>
            
            <AnimatedContainer animationType="fadeInSlideUp" delay={0.1}>
              <OrderBook />
            </AnimatedContainer>
          </div>
          
          {/* Right column - Trade box (hidden on mobile) */}
          {!isMobile && (
            <div className="w-full md:w-[320px] lg:w-[380px] xl:w-[420px]">
              <div className="sticky top-24">
                <AnimatedContainer animationType="fadeInSlideUp" delay={0.2}>
                  <TradeBox />
                </AnimatedContainer>
              </div>
            </div>
          )}
        </div>
      </Layout>
      
      {/* Mobile trade button and popup */}
      {isMobile && (
        <>
          <MobileTradeButton />
          <TradePopup />
        </>
      )}
    </>
  );
};

export default Event;
