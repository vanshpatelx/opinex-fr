
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useUser } from "@/contexts/UserContext";
import { AnimatedContainer } from "@/components/shared/AnimatedContainer";
import { CalendarIcon, Clock, InfoIcon, Plus, X, Save } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Event3DIcon } from "@/components/Event3DIcon";

// Available logos for events
const eventLogos = [
  { id: "calendar", name: "Calendar", icon: <CalendarIcon className="h-5 w-5" /> },
  { id: "info", name: "Info", icon: <InfoIcon className="h-5 w-5" /> },
  { id: "clock", name: "Clock", icon: <Clock className="h-5 w-5" /> },
];

// Available categories
const categories = [
  { id: "tech", name: "Technology" },
  { id: "politics", name: "Politics" },
  { id: "sports", name: "Sports" },
  { id: "entertainment", name: "Entertainment" },
  { id: "finance", name: "Finance" },
];

// Form data interface for type safety
interface EventFormData {
  title: string;
  description: string;
  category: string;
  closeDate: string;
  logoId: string;
}

const AdminCreateEvent = () => {
  const { user, isAdmin } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    category: "",
    closeDate: "",
    logoId: ""
  });
  
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLogoSelect = (logoId: string) => {
    setSelectedLogo(logoId);
    setFormData(prev => ({ ...prev, logoId }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.title || !formData.description || !formData.category || !formData.closeDate) {
      toast.error("Please fill in all required fields", {
        description: "Title, description, category and close date are required."
      });
      return;
    }
    
    // Here you would normally connect to your API to create the event
    console.log("Creating event:", formData);
    
    // Show success message
    toast.success("Event created successfully!", {
      description: "Your new event has been created and published.",
      action: {
        label: "View Events",
        onClick: () => navigate("/events"),
      },
    });
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      closeDate: "",
      logoId: ""
    });
    setSelectedLogo(null);
  };
  
  // Redirect if not admin
  if (!user || !isAdmin) {
    toast.error("Access Denied", {
      description: "You need admin permissions to access this page."
    });
    
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh]">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 text-center">
              <p>You need admin permissions to access this page.</p>
              <Button 
                className="mt-4" 
                onClick={() => navigate("/")}
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <AnimatedContainer animationType="fadeInSlideUp">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* 3D background effects */}
            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-3xl blur-xl transform rotate-3 scale-105 opacity-70"></div>
            
            <Card className="border border-border/40 shadow-sm overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <div className="p-2 bg-primary/10 rounded-lg mr-3 card-3d">
                    <motion.div
                      className="card-3d-content"
                      initial={{ rotateX: 10, rotateY: -10 }}
                      animate={{ rotateX: 0, rotateY: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Plus className="h-6 w-6 text-primary" />
                    </motion.div>
                  </div>
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Create New Event
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title</Label>
                      <Input 
                        id="title"
                        name="title"
                        placeholder="e.g., Will Apple release a new MacBook Pro before 2025?"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Event Description</Label>
                      <Textarea 
                        id="description"
                        name="description"
                        placeholder="Describe the event and resolution criteria..."
                        value={formData.description}
                        onChange={handleInputChange}
                        className="min-h-[120px] w-full"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleSelectChange("category", value)}
                          required
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="closeDate">Close Date</Label>
                        <Input 
                          id="closeDate"
                          name="closeDate"
                          type="date"
                          value={formData.closeDate}
                          onChange={handleInputChange}
                          className="w-full"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Event Logo</Label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-4">
                        {eventLogos.map(logo => (
                          <motion.button
                            key={logo.id}
                            type="button"
                            onClick={() => handleLogoSelect(logo.id)}
                            className={`p-4 rounded-xl border ${
                              selectedLogo === logo.id 
                                ? "border-primary bg-primary/10" 
                                : "border-border/40 hover:border-primary/30 hover:bg-accent/50"
                            } flex flex-col items-center justify-center gap-2 transition-all duration-200 card-3d`}
                            whileHover={{ 
                              scale: 1.05,
                              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.div className="card-3d-content">
                              {logo.icon}
                              <span className="text-xs font-medium mt-1">{logo.name}</span>
                            </motion.div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-end pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/events")}
                      className="flex items-center gap-1 button-3d"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex items-center gap-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary button-3d"
                    >
                      <Save className="h-4 w-4" />
                      Create Event
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </AnimatedContainer>
    </Layout>
  );
};

export default AdminCreateEvent;
