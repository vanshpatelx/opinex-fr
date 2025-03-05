
import { EventDetails } from "@/components/EventDetails";
import { Layout } from "@/components/Layout";
import { MobileTradeButton } from "@/components/MobileTradeButton";
import { OrderBook } from "@/components/OrderBook";
import { TradeBox } from "@/components/TradeBox";
import { TradePopup } from "@/components/TradePopup";
import { AnimatedContainer } from "@/components/shared/AnimatedContainer";
import { useWindowSize } from "@/hooks/useWindowSize";

const Index = () => {
  const { isMobile } = useWindowSize();
  
  return (
    <>
      <Layout>
        <div className="flex flex-col md:flex-row gap-5 md:gap-8">
          {/* Left column - Event details and order book */}
          <div className={`flex-1 ${isMobile ? "" : "max-w-[640px]"} space-y-5 md:space-y-8`}>
            <AnimatedContainer animationType="fadeInSlideUp">
              <EventDetails />
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

export default Index;
