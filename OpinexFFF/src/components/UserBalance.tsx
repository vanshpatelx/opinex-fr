
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { WalletIcon, PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function UserBalance() {
  const { user, isAuthenticated, isAdmin, addBalance } = useUser();
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(100);
  
  // Don't show balance for admin or unauthenticated users
  if (!isAuthenticated || isAdmin) return null;
  
  const handleTopUp = () => {
    if (topUpAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    addBalance(topUpAmount);
    toast.success(`Added $${topUpAmount.toLocaleString()} to your balance!`);
    setIsTopUpOpen(false);
    setTopUpAmount(100);
  };
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2"
      >
        <Link to="/profile">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 border-primary/20 bg-primary/5 text-foreground hover:bg-primary/10 transition-all duration-300 rounded-full"
          >
            <WalletIcon className="w-4 h-4 text-primary" />
            <span className="font-medium">${user.balance.toLocaleString()}</span>
          </Button>
        </Link>
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-8 w-8 bg-primary/5 hover:bg-primary/10"
          onClick={() => setIsTopUpOpen(true)}
        >
          <PlusIcon className="h-4 w-4 text-primary" />
        </Button>
      </motion.div>
      
      <Dialog open={isTopUpOpen} onOpenChange={setIsTopUpOpen}>
        <DialogContent className="sm:max-w-[425px] animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-xl">Add Balance</DialogTitle>
            <DialogDescription>
              Enter the amount you'd like to add to your wallet.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(Number(e.target.value))}
                className="col-span-3"
                min={1}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTopUpOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleTopUp}>
              Add Funds
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
