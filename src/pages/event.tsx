import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Trade from "@/components/event/trade";
import { OrderBook } from "@/components/event/orderbook";
import { motion } from "framer-motion";

export default function EventPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [showTradePopup, setShowTradePopup] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-gray-100">
      {/* Left Section: Event Details + OrderBook */}
      <motion.div
        className={`flex flex-col transition-all space-y-4 ${
          isMobile ? "w-full p-4" : "w-[60%] lg:w-[60%] px-[20%]"
        }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card title="Event Details">
          <EventDetails />
        </Card>
        <Card title="Order Book">
          <OrderBook />
        </Card>
      </motion.div>

      {/* Right Section: Trade Component */}
      {isMobile ? (
        // Mobile: Trade Button that opens Popup
        <>
          <motion.div
            className="fixed bottom-6 left-0 right-0 flex justify-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={() => setShowTradePopup(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700"
            >
              Trade
            </Button>
          </motion.div>
          <Dialog open={showTradePopup} onOpenChange={setShowTradePopup}>
            <DialogContent className="fixed bottom-0 w-full max-w-lg p-4 rounded-t-2xl bg-white shadow-lg">
              <Card title="Trade">
                <Trade />
              </Card>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        // Desktop: Trade Component on the right
        <motion.div
          className="w-[40%] lg:w-[20%] p-4"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card title="Trade">
            <Trade />
          </Card>
        </motion.div>
      )}
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
      {children}
    </div>
  );
}

function EventDetails() {
  return <div className="text-gray-600">Details about the event...</div>;
}
