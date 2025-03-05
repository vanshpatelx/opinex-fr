
import { Button } from "@/components/ui/button";
import { Taskbar } from "@/components/Taskbar";
import { motion } from "framer-motion";
import { ArrowRightIcon, BarChart3Icon, TrendingUpIcon, TargetIcon, BriefcaseIcon, AwardIcon, SparklesIcon, BarChart2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// 3D hover effect component
const HoverCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative h-full"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotate({ x: 0, y: 0 });
      }}
    >
      <motion.div
        className="h-full transform-gpu"
        animate={{
          rotateX: isHovered ? rotate.x : 0,
          rotateY: isHovered ? rotate.y : 0,
          scale: isHovered ? 1.05 : 1,
          boxShadow: isHovered 
            ? "0 20px 30px -10px rgba(0, 0, 0, 0.2)" 
            : "0 10px 20px -10px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Background gradient with animation
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -inset-[100px] opacity-40 blur-3xl"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 0%", "100% 100%", "0% 100%", "0% 0%"] 
        }}
        transition={{ 
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          backgroundImage: "radial-gradient(circle at center, rgba(139, 92, 246, 0.8), rgba(217, 70, 239, 0.6), rgba(14, 165, 233, 0.5), rgba(139, 92, 246, 0.7))",
          backgroundSize: "200% 200%",
        }}
      />
    </div>
  );
};

// Floating elements
const FloatingElement = ({ children, x = 20, y = 20, delay = 0 }: { 
  children: React.ReactNode; 
  x?: number;
  y?: number;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay }}
    >
      <motion.div
        animate={{
          y: [0, y, 0],
          x: [0, x, 0],
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const Landing = () => {
  const [mounted, setMounted] = useState(false);
  
  // Used to trigger animations after mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <AnimatedBackground />
      <Taskbar />
      
      {/* Hero Section */}
      <section className="w-full pt-24 md:pt-32 px-4 md:px-10 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-10 md:gap-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full md:w-1/2 space-y-6 text-left relative">
              {/* Floating elements */}
              <div className="absolute -top-20 -left-20 opacity-30">
                <FloatingElement x={15} y={10} delay={0.5}>
                  <BarChart2Icon className="text-primary w-12 h-12" />
                </FloatingElement>
              </div>
              <div className="absolute top-40 -right-10 opacity-20">
                <FloatingElement x={-20} y={15} delay={0.8}>
                  <TrendingUpIcon className="text-purple-500 w-16 h-16" />
                </FloatingElement>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                  <SparklesIcon className="inline-block h-4 w-4 mr-1" />
                  The Future of Event Trading
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-primary via-purple-600 to-blue-500 bg-clip-text text-transparent">
                    Predict Markets, 
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-500 via-primary to-purple-600 bg-clip-text text-transparent">
                    Trade Outcomes
                  </span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-md">
                  Trade on the outcomes of future events and earn rewards for your predictions with our innovative 3D trading platform.
                </p>
              </motion.div>
              
              <motion.div
                className="flex flex-wrap gap-4 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link to="/events">
                  <Button size="lg" className="rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    Browse Events
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5">
                    Create Account
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                className="flex items-center gap-3 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-background overflow-hidden">
                      <img 
                        src={`https://i.pravatar.cc/100?u=${i}`} 
                        alt="User avatar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p>Join 10,000+ traders</p>
              </motion.div>
            </div>
            
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                {/* 3D-like glow effects */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-blue-500/20 rounded-3xl transform rotate-6 scale-95 opacity-60 blur-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-primary/30 to-transparent rounded-3xl transform -rotate-2 scale-105 opacity-50 blur-xl"></div>
                
                <motion.div 
                  className="relative glass-morphism rounded-3xl shadow-xl overflow-hidden border border-white/20"
                  initial={{ rotate: -5 }}
                  animate={{ 
                    rotate: mounted ? 0 : -5,
                    y: mounted ? [0, -10, 0] : 0
                  }}
                  transition={{ 
                    duration: 1.5, 
                    ease: "easeOut",
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <img 
                    src="/placeholder.svg" 
                    alt="Event Trading Platform" 
                    className="w-full h-auto rounded-3xl"
                  />
                  
                  {/* Overlay with glassy UI elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-8">
                    <div className="w-full bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-white font-semibold">BTC to $100k by EOY</div>
                        <div className="text-green-400 font-bold">↑ 32%</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white rounded-lg flex-1">Yes</Button>
                        <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white rounded-lg flex-1">No</Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="w-full py-20 md:py-32 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-500 bg-clip-text text-transparent inline-block">
              Why Trade on Event Trader
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              A modern platform with cutting-edge 3D visualization for predicting outcomes of real-world events
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <TargetIcon className="h-10 w-10 text-purple-500" />,
                title: "AI-Powered Predictions",
                description: "Make informed predictions on event outcomes using our advanced AI algorithms and real-time market data.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <BarChart3Icon className="h-10 w-10 text-blue-500" />,
                title: "3D Visualization",
                description: "Experience market trends through immersive 3D visualizations that bring data to life like never before.",
                gradient: "from-blue-500 to-cyan-400"
              },
              {
                icon: <BriefcaseIcon className="h-10 w-10 text-emerald-500" />,
                title: "Diverse Event Categories",
                description: "Trade across multiple categories including tech, politics, sports, and entertainment in our 3D marketplace.",
                gradient: "from-emerald-500 to-green-400"
              },
              {
                icon: <AwardIcon className="h-10 w-10 text-amber-500" />,
                title: "Rewards & Leaderboards",
                description: "Earn rewards for accurate predictions and compete on our immersive 3D global leaderboards.",
                gradient: "from-amber-500 to-yellow-400"
              },
              {
                icon: <TrendingUpIcon className="h-10 w-10 text-rose-500" />,
                title: "Advanced Trading Tools",
                description: "Access sophisticated 3D trading tools including limit orders and portfolio balancing visualizations.",
                gradient: "from-rose-500 to-red-400"
              },
              {
                icon: <SparklesIcon className="h-10 w-10 text-indigo-500" />,
                title: "Interactive Experience",
                description: "Enjoy a fully interactive 3D trading experience that makes financial predictions fun and engaging.",
                gradient: "from-indigo-500 to-purple-400"
              }
            ].map((feature, index) => (
              <HoverCard key={index} delay={index * 0.1}>
                <div className="h-full bg-card border border-border/30 rounded-xl p-8 hover:shadow-md transition-all duration-300 hover:border-primary/20 backdrop-blur-sm bg-white/5 overflow-hidden relative group">
                  {/* Gradient background that appears on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10" 
                    style={{ backgroundImage: `linear-gradient(to bottom right, ${feature.gradient})` }}></div>
                  
                  <div className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-lg flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300 text-white`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-16 px-4 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-600/5 -z-10"></div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <FloatingElement x={30} y={20} delay={0.2}>
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-purple-600 blur-xl"></div>
          </FloatingElement>
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <FloatingElement x={-20} y={-20} delay={0.5}>
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 blur-xl"></div>
          </FloatingElement>
        </div>
        
        <motion.div 
          className="max-w-6xl mx-auto rounded-2xl bg-gradient-to-br from-black/60 to-black/40 border border-white/10 p-10 md:p-16 shadow-lg text-center backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience the Future of Trading in 3D
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-300 max-w-xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Join thousands of traders predicting the future and earning rewards in our immersive 3D trading platform.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/events">
              <Button size="lg" className="rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 border-0 px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 text-white">
                Start Trading Now
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="w-full py-12 px-4 md:px-10 mt-auto border-t border-border/10 backdrop-blur-sm bg-background/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <TrendingUpIcon className="h-7 w-7 text-primary mr-2" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Event Trader
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">FAQ</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          
          <div className="mt-6 md:mt-0 text-sm text-muted-foreground">
            © 2023 Event Trader. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
