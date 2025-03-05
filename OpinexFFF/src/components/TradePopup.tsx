
import { TradeBox } from "@/components/TradeBox";
import { Button } from "@/components/ui/button";
import { useTradeStore } from "@/hooks/useTradeStore";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TradePopup() {
  const { isTradePopupOpen, actions } = useTradeStore();
  
  // Close popup on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') actions.closeTradePopup();
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [actions]);
  
  // Prevent scrolling when popup is open
  useEffect(() => {
    if (isTradePopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isTradePopupOpen]);
  
  return (
    <AnimatePresence>
      {isTradePopupOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={actions.closeTradePopup}
          />
          
          {/* Popup */}
          <motion.div 
            className={cn(
              "relative bg-card rounded-t-3xl shadow-2xl w-full max-h-[85vh] overflow-auto"
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="sticky top-0 flex justify-end p-2 bg-card/95 backdrop-blur-sm z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={actions.closeTradePopup}
                className="h-8 w-8 rounded-full hover:bg-accent/70 transition-colors"
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            
            <div className="px-4 pb-8 pt-2">
              <TradeBox isPopup />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
