import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserProfile } from '@/components/UserProfile';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatInterface } from "@/components/ChatInterface";
import { CapabilityCard } from "@/components/CapabilityCard";
import { TaskManager } from "@/components/TaskManager";
import { SystemMonitor } from "@/components/SystemMonitor";
import { 
  MessageCircle, 
  Mic, 
  Image, 
  Code, 
  Search, 
  CheckSquare, 
  Shield, 
  Brain,
  Sparkles,
  Zap,
  Globe,
  FileText,
  Bot
} from "lucide-react";
import { toast } from "sonner";
import aiHeroBg from "@/assets/ai-hero-bg.jpg";

const capabilities = [
  {
    id: "chat",
    title: "Conversational AI",
    description: "Natural language conversations powered by advanced AI models",
    icon: MessageCircle,
    gradient: "bg-gradient-primary",
  },
  {
    id: "voice",
    title: "Voice Assistant",
    description: "Speech-to-text and text-to-speech for seamless voice interaction",
    icon: Mic,
    gradient: "bg-ai-secondary",
  },
  {
    id: "image",
    title: "Image Generation",
    description: "Create stunning visuals with AI-powered image generation",
    icon: Image,
    gradient: "bg-ai-accent",
  },
  {
    id: "code",
    title: "Code Generation",
    description: "Write, explain, and execute code dynamically",
    icon: Code,
    gradient: "bg-gradient-primary",
  },
  {
    id: "search",
    title: "Web Research",
    description: "Deep web and document search with intelligent analysis",
    icon: Search,
    gradient: "bg-ai-secondary",
  },
  {
    id: "analysis",
    title: "Data Analysis",
    description: "Parse and analyze PDFs, CSVs, and structured documents",
    icon: FileText,
    gradient: "bg-ai-accent",
  },
];

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Bot className="h-8 w-8 text-primary animate-pulse" />
          <span className="text-lg text-foreground">Loading J.A.R.V.I.S...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }
  const [activeCapability, setActiveCapability] = useState("chat");
  const [isConnected, setIsConnected] = useState(false);

  const handleCapabilityClick = (capabilityId: string) => {
    setActiveCapability(capabilityId);
    if (capabilityId !== "chat") {
      toast.info("This capability requires API integration through Supabase");
    }
  };

  const connectSupabase = () => {
    toast.info("Visit your Lovable project settings to connect Supabase for full AI capabilities");
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-border/20">
        <div className="flex items-center space-x-3">
          <Bot className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">J.A.R.V.I.S</h1>
            <p className="text-sm text-muted-foreground">Your AI Personal Assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">System Online</span>
          <UserProfile />
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${aiHeroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ai-card border border-ai-primary/20">
              <Sparkles className="w-4 h-4 text-ai-primary" />
              <span className="text-sm font-medium text-foreground">Comprehensive AI Assistant</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Omni Mind Bot
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your intelligent companion for conversations, creativity, coding, research, and task management. 
              Powered by advanced AI models with multi-modal capabilities.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <Button 
                variant="ai" 
                size="lg" 
                onClick={connectSupabase}
                className="animate-pulse-glow"
              >
                <Zap className="w-5 h-5 mr-2" />
                Connect AI Services
              </Button>
              <Button variant="ai-outline" size="lg">
                <Globe className="w-5 h-5 mr-2" />
                View Documentation
              </Button>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center justify-center gap-6 pt-6">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-yellow-500"} animate-pulse`} />
                <span className="text-sm text-muted-foreground">
                  {isConnected ? "AI Connected" : "Setup Required"}
                </span>
              </div>
              <Badge variant="outline" className="border-ai-primary/30 text-ai-primary">
                <Brain className="w-3 h-3 mr-1" />
                Advanced AI
              </Badge>
              <Badge variant="outline" className="border-ai-primary/30 text-ai-primary">
                <Shield className="w-3 h-3 mr-1" />
                Secure
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Capabilities */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-card border-ai-primary/20">
              <h2 className="text-xl font-semibold text-foreground mb-4">AI Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {capabilities.map((capability) => (
                  <CapabilityCard
                    key={capability.id}
                    title={capability.title}
                    description={capability.description}
                    icon={capability.icon}
                    gradient={capability.gradient}
                    isActive={activeCapability === capability.id}
                    onClick={() => handleCapabilityClick(capability.id)}
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* Center - Main Interface */}
          <div className="lg:col-span-1">
            {activeCapability === "chat" ? (
              <div className="h-[600px]">
                <ChatInterface />
              </div>
            ) : (
              <Card className="h-[600px] p-6 bg-gradient-card border-ai-primary/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-primary w-fit mx-auto">
                    {(() => {
                      const capability = capabilities.find(c => c.id === activeCapability);
                      const IconComponent = capability?.icon;
                      return IconComponent ? <IconComponent className="w-8 h-8 text-white" /> : null;
                    })()}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {capabilities.find(c => c.id === activeCapability)?.title}
                  </h3>
                  <p className="text-muted-foreground">
                    Connect to Supabase to activate this capability
                  </p>
                  <Button variant="ai" onClick={connectSupabase}>
                    Setup Integration
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Right Sidebar - Management */}
          <div className="space-y-6">
            <TaskManager />
            <SystemMonitor />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-ai-primary/20 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Omni Mind Bot - Your Comprehensive AI Assistant</p>
          <p className="text-sm mt-2">Built with React, TypeScript, and Advanced AI</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;