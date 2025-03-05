
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";
import { AnimatedContainer } from "@/components/shared/AnimatedContainer";
import { motion } from "framer-motion";
import { RefreshCwIcon, HistoryIcon, BarChart2Icon, WalletIcon, UserIcon, PlusIcon } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Mock transaction data
const transactions = [
  { id: "1", event: "Apple M3 MacBook", type: "buy", amount: 250, price: 0.65, date: "2023-09-15" },
  { id: "2", event: "Democrats 2024", type: "sell", amount: 100, price: 0.48, date: "2023-09-12" },
  { id: "3", event: "Bitcoin $100k", type: "buy", amount: 300, price: 0.72, date: "2023-09-10" },
  { id: "4", event: "Lakers Championship", type: "buy", amount: 150, price: 0.35, date: "2023-09-08" }
];

// Mock holdings data
const holdings = [
  { id: "1", event: "Apple M3 MacBook", position: "yes", shares: 250, avgPrice: 0.65, currentPrice: 0.70 },
  { id: "2", event: "Bitcoin $100k", position: "yes", shares: 300, avgPrice: 0.72, currentPrice: 0.71 },
  { id: "3", event: "Lakers Championship", position: "yes", shares: 150, avgPrice: 0.35, currentPrice: 0.32 }
];

const Profile = () => {
  const { user, addBalance } = useUser();
  const [topUpAmount, setTopUpAmount] = useState(100);
  
  if (!user) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh]">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 text-center">
              <p>Please log in to view your profile.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }
  
  const handleTopUp = () => {
    if (topUpAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    addBalance(topUpAmount);
    toast.success(`Added $${topUpAmount.toLocaleString()} to your balance!`);
    setTopUpAmount(100);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <AnimatedContainer animationType="fadeInSlideUp">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <motion.div 
              className="w-full md:w-1/3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border border-border/40 shadow-sm overflow-hidden card-3d">
                <div className="card-3d-content">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold">Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center border border-primary/20 shadow-md">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                          <UserIcon className="h-8 w-8 text-primary" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <Badge variant={user.role === 'admin' ? 'default' : 'outline'} className="mt-1">
                          {user.role === 'admin' ? 'Admin' : 'User'}
                        </Badge>
                      </div>
                    </div>
                    
                    {user.role !== 'admin' && (
                      <div className="pt-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Account Balance</span>
                          <span className="flex items-center gap-1">
                            <RefreshCwIcon className="h-3 w-3" />
                            Updated just now
                          </span>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <div className="flex items-center">
                            <WalletIcon className="h-5 w-5 mr-2 text-primary" />
                            <span className="text-2xl font-bold">${user.balance.toLocaleString()}</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1 border-primary/30 hover:bg-primary/5 text-primary"
                            onClick={handleTopUp}
                          >
                            <PlusIcon className="h-4 w-4" />
                            Add Funds
                          </Button>
                        </div>
                        
                        <div className="mt-4 grid gap-3">
                          <Label htmlFor="topup">Top up amount</Label>
                          <div className="flex gap-2">
                            <Input
                              id="topup"
                              type="number"
                              value={topUpAmount}
                              onChange={(e) => setTopUpAmount(Number(e.target.value))}
                              min={1}
                              className="flex-1"
                            />
                            <Button onClick={handleTopUp} className="button-3d">
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </div>
              </Card>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-2/3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Tabs defaultValue="transactions" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="transactions" className="flex items-center gap-1.5">
                    <HistoryIcon className="h-4 w-4" />
                    Transactions
                  </TabsTrigger>
                  <TabsTrigger value="holdings" className="flex items-center gap-1.5">
                    <BarChart2Icon className="h-4 w-4" />
                    Holdings
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="transactions" className="mt-4">
                  <Card className="border border-border/40 card-3d overflow-hidden">
                    <div className="card-3d-content">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {transactions.map((tx, index) => (
                            <motion.div 
                              key={tx.id}
                              className="border-b border-border/20 last:border-0 pb-3 last:pb-0"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">{tx.event}</h4>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{new Date(tx.date).toLocaleDateString()}</span>
                                    <span>•</span>
                                    <span>{tx.amount} shares</span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                  <Badge 
                                    variant={tx.type === "buy" ? "outline" : "default"}
                                    className={tx.type === "buy" ? "border-green-200 text-green-700 bg-green-50" : "bg-orange-100 text-orange-700"}
                                  >
                                    {tx.type === "buy" ? "Buy" : "Sell"}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground mt-1">
                                    @ ${tx.price}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="holdings" className="mt-4">
                  <Card className="border border-border/40 card-3d overflow-hidden">
                    <div className="card-3d-content">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-semibold">Current Holdings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {holdings.map((holding, index) => {
                            const pnl = holding.shares * (holding.currentPrice - holding.avgPrice);
                            const pnlPercent = ((holding.currentPrice - holding.avgPrice) / holding.avgPrice) * 100;
                            const isProfitable = pnl >= 0;
                            
                            return (
                              <motion.div 
                                key={holding.id}
                                className="border-b border-border/20 last:border-0 pb-3 last:pb-0"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-medium">{holding.event}</h4>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">
                                        {holding.position.toUpperCase()}
                                      </Badge>
                                      <span>•</span>
                                      <span>{holding.shares} shares</span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <div className={`text-sm font-medium ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                                      {isProfitable ? '+' : ''}{pnl.toFixed(2)} ({isProfitable ? '+' : ''}{pnlPercent.toFixed(1)}%)
                                    </div>
                                    <div className="flex gap-2 text-xs mt-1">
                                      <span className="text-muted-foreground">Avg: ${holding.avgPrice}</span>
                                      <span className="text-muted-foreground">Current: ${holding.currentPrice}</span>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </AnimatedContainer>
      </div>
    </Layout>
  );
};

export default Profile;
