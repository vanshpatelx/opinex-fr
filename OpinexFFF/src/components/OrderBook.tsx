
import { Badge } from "@/components/shared/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon, BookOpenIcon, RefreshCwIcon } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedContainer } from "./shared/AnimatedContainer";

interface OrderBookProps {
  className?: string;
}

// Initial mock data for the order book
const initialBuyOrders = [
  { id: "b1", price: 0.68, size: 250 },
  { id: "b2", price: 0.65, size: 120 },
  { id: "b3", price: 0.62, size: 500 },
  { id: "b4", price: 0.60, size: 300 },
  { id: "b5", price: 0.58, size: 450 },
];

const initialSellOrders = [
  { id: "s1", price: 0.72, size: 200 },
  { id: "s2", price: 0.75, size: 180 },
  { id: "s3", price: 0.78, size: 320 },
  { id: "s4", price: 0.80, size: 150 },
  { id: "s5", price: 0.83, size: 400 },
];

// Utility function to generate a random number between min and max
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Utility function to generate a random price change
const getRandomPriceChange = () => {
  return (Math.random() * 0.06 - 0.03).toFixed(2);
};

export function OrderBook({ className }: OrderBookProps) {
  // State for orders and price data
  const [buyOrders, setBuyOrders] = useState(initialBuyOrders);
  const [sellOrders, setSellOrders] = useState(initialSellOrders);
  const [currentPrice, setCurrentPrice] = useState(0.70);
  const [priceChange, setPriceChange] = useState(0.02);
  const [updateTime, setUpdateTime] = useState(new Date());
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Max size to normalize bar widths
  const maxSize = Math.max(
    ...buyOrders.map(o => o.size),
    ...sellOrders.map(o => o.size)
  );

  // Function to update a random order
  const updateRandomOrder = useCallback(() => {
    setIsUpdating(true);
    
    // Update a random buy order
    const randomBuyIndex = getRandomNumber(0, buyOrders.length - 1);
    const newBuyOrders = [...buyOrders];
    const sizeChange = getRandomNumber(-50, 100);
    newBuyOrders[randomBuyIndex] = {
      ...newBuyOrders[randomBuyIndex],
      size: Math.max(50, newBuyOrders[randomBuyIndex].size + sizeChange),
      id: newBuyOrders[randomBuyIndex].id + "-" + Date.now() // Force re-render
    };
    
    // Update a random sell order
    const randomSellIndex = getRandomNumber(0, sellOrders.length - 1);
    const newSellOrders = [...sellOrders];
    const sellSizeChange = getRandomNumber(-50, 100);
    newSellOrders[randomSellIndex] = {
      ...newSellOrders[randomSellIndex],
      size: Math.max(50, newSellOrders[randomSellIndex].size + sellSizeChange),
      id: newSellOrders[randomSellIndex].id + "-" + Date.now() // Force re-render
    };
    
    // Update price data
    const priceChangeValue = parseFloat(getRandomPriceChange());
    const newPrice = Math.max(0.50, Math.min(0.90, currentPrice + priceChangeValue));
    
    // Apply updates
    setBuyOrders(newBuyOrders);
    setSellOrders(newSellOrders);
    setCurrentPrice(parseFloat(newPrice.toFixed(2)));
    setPriceChange(priceChangeValue);
    setUpdateTime(new Date());
    
    setTimeout(() => setIsUpdating(false), 300);
  }, [buyOrders, sellOrders, currentPrice]);

  // Set up interval for random updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRandomOrder();
    }, 3000); // Update every 3 seconds
    
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [updateRandomOrder]);

  // Format the last updated time
  const getTimeAgo = () => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - updateTime.getTime()) / 1000);
    
    if (diffInSeconds < 5) return "just now";
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  };

  return (
    <AnimatedContainer animationType="fadeInSlideUp">
      <Card className={cn("w-full overflow-hidden card-3d", className)}>
        <motion.div className="card-3d-content">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpenIcon className="h-4 w-4 text-primary" />
                </div>
                Live Order Book
                <motion.div 
                  animate={isUpdating ? { rotate: 180 } : { rotate: 0 }}
                  transition={{ duration: 0.5 }}
                  className="ml-2"
                >
                  <RefreshCwIcon className="h-3 w-3 text-muted-foreground" />
                </motion.div>
              </CardTitle>
              <Badge 
                variant={priceChange >= 0 ? "success" : "warning"}
                className="flex items-center"
              >
                {priceChange >= 0 ? (
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-3 w-3" />
                )}
                {Math.abs(parseFloat(priceChange.toString())).toFixed(2)}
              </Badge>
            </div>
            <motion.div 
              className="mt-2"
              key={currentPrice}
              initial={{ opacity: 0.8, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl font-bold tracking-tight">
                ${currentPrice.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Last update: {getTimeAgo()}
              </p>
            </motion.div>
          </CardHeader>
          <CardContent>
            {/* Sell orders (in reverse order to show highest at top) */}
            <div className="space-y-1 mb-4">
              {[...sellOrders].reverse().map((order, i) => (
                <motion.div 
                  key={order.id} 
                  className="flex items-center text-sm"
                  initial={{ opacity: 0.7, x: -3 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 text-muted-foreground font-mono">
                    ${order.price.toFixed(2)}
                  </div>
                  <motion.div 
                    key={order.size}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="w-16 text-right pr-2 font-medium text-muted-foreground"
                  >
                    {order.size}
                  </motion.div>
                  <div className="flex-1 h-5 relative">
                    <motion.div 
                      className="absolute top-0 right-0 h-full bg-warning/10 rounded-sm"
                      initial={{ width: 0 }}
                      animate={{ width: `${(order.size / maxSize) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Spread indicator */}
            <motion.div 
              className="w-full py-1 px-2 bg-accent rounded mb-4 flex justify-between text-xs text-muted-foreground"
              key={`${sellOrders[0].price}-${buyOrders[0].price}`}
              initial={{ opacity: 0.7, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span>Spread: ${(sellOrders[0].price - buyOrders[0].price).toFixed(2)}</span>
              <span>{((sellOrders[0].price - buyOrders[0].price) / buyOrders[0].price * 100).toFixed(1)}%</span>
            </motion.div>

            {/* Buy orders */}
            <div className="space-y-1">
              {buyOrders.map((order, i) => (
                <motion.div 
                  key={order.id} 
                  className="flex items-center text-sm"
                  initial={{ opacity: 0.7, x: -3 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 text-muted-foreground font-mono">
                    ${order.price.toFixed(2)}
                  </div>
                  <motion.div 
                    key={order.size}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="w-16 text-right pr-2 font-medium text-muted-foreground"
                  >
                    {order.size}
                  </motion.div>
                  <div className="flex-1 h-5 relative">
                    <motion.div 
                      className="absolute top-0 right-0 h-full bg-success/10 rounded-sm"
                      initial={{ width: 0 }}
                      animate={{ width: `${(order.size / maxSize) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </motion.div>
      </Card>
    </AnimatedContainer>
  );
}
