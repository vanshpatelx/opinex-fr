
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTradeStore } from "@/hooks/useTradeStore";
import { cn } from "@/lib/utils";
import { DollarSign, TrendingUpIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface TradeBoxProps {
  className?: string;
  isPopup?: boolean;
}

export function TradeBox({ className, isPopup = false }: TradeBoxProps) {
  const { 
    selectedType, 
    orderType, 
    price,
    quantity,
    actions 
  } = useTradeStore();
  
  const [priceValue, setPriceValue] = useState(price);
  const [quantityValue, setQuantityValue] = useState(quantity);
  
  const handlePriceChange = (val: number) => {
    setPriceValue(val);
    actions.setPrice(val);
  };
  
  const handleQuantityChange = (val: number) => {
    setQuantityValue(val);
    actions.setQuantity(val);
  };
  
  const handleTypeChange = (value: string) => {
    actions.setSelectedType(value as 'yes' | 'no');
  };
  
  const handleOrderTypeChange = (value: string) => {
    actions.setOrderType(value as 'buy' | 'sell');
  };
  
  const totalCost = (priceValue * quantityValue).toFixed(2);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("w-full overflow-hidden border border-border/40 shadow-sm", 
        isPopup ? "shadow-none border-0 border-t rounded-none rounded-t-xl" : "",
        className
      )}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-foreground/90">
            <TrendingUpIcon className="h-5 w-5 text-primary/80" />
            Place Order
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Yes/No Selection */}
          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium">Prediction</Label>
            <Tabs 
              defaultValue={selectedType} 
              className="w-full" 
              onValueChange={handleTypeChange}
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger 
                  value="yes"
                  className={`transition-all duration-200 data-[state=active]:shadow-md ${selectedType === 'yes' ? "data-[state=active]:bg-success data-[state=active]:text-success-foreground" : ""}`}
                >
                  Yes
                </TabsTrigger>
                <TabsTrigger 
                  value="no"
                  className={`transition-all duration-200 data-[state=active]:shadow-md ${selectedType === 'no' ? "data-[state=active]:bg-warning data-[state=active]:text-warning-foreground" : ""}`}
                >
                  No
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Buy/Sell Selection */}
          <div className="space-y-2">
            <Label htmlFor="orderType" className="text-sm font-medium">Order Type</Label>
            <Tabs 
              defaultValue={orderType} 
              className="w-full"
              onValueChange={handleOrderTypeChange}
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="buy" className="transition-all duration-200 data-[state=active]:shadow-md">Buy</TabsTrigger>
                <TabsTrigger value="sell" className="transition-all duration-200 data-[state=active]:shadow-md">Sell</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Price */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label htmlFor="price" className="text-sm font-medium">Price</Label>
              <motion.div 
                className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm font-medium"
                key={priceValue}
                initial={{ scale: 0.9, y: -5 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <DollarSign className="h-3 w-3 mr-1" />
                {priceValue.toFixed(2)}
              </motion.div>
            </div>
            <Slider
              id="price"
              min={0.01}
              max={0.99}
              step={0.01}
              defaultValue={[priceValue]}
              onValueChange={(value) => handlePriceChange(value[0])}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$0.01</span>
              <span>$0.99</span>
            </div>
          </div>
          
          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium">Quantity</Label>
            <div className="relative">
              <Input
                id="quantity"
                type="number"
                min={1}
                value={quantityValue}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="pr-16 bg-background/50 border-border/40 focus:border-primary/30"
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-sm text-muted-foreground">
                shares
              </div>
            </div>
          </div>
          
          {/* Total */}
          <div className="bg-secondary/70 p-4 rounded-lg flex justify-between items-center shadow-sm">
            <span className="text-sm font-medium">Total Cost</span>
            <motion.span 
              className="text-lg font-bold"
              key={totalCost}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              ${totalCost}
            </motion.span>
          </div>
          
          {/* Submit Button */}
          <Button 
            className={cn(
              "w-full gap-2 font-medium shadow-sm transition-all duration-300",
              selectedType === 'yes' ? "bg-success hover:bg-success/90" : "",
              selectedType === 'no' ? "bg-warning hover:bg-warning/90" : ""
            )}
            onClick={actions.placeOrder}
          >
            {orderType === 'buy' ? 'Buy' : 'Sell'} {selectedType.toUpperCase()} for ${priceValue.toFixed(2)}
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
