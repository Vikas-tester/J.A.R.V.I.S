import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatInterface } from "@/components/ChatInterface";
import { CapabilityCard } from "@/components/CapabilityCard";
import { TaskManager } from "@/components/TaskManager";
import { SystemMonitor } from "@/components/SystemMonitor";
import { ImageGenerator } from "@/components/ImageGenerator";
import { CodeGenerator } from "@/components/CodeGenerator";
import { UserProfile } from "@/components/UserProfile";
import { useAuth } from "@/hooks/useAuth";
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
  FileText
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
  const [activeCapability, setActiveCapability] = useState("chat");
  const [isConnected, setIsConnected] = useState(true); // Now connected via Supabase
  const { user } = useAuth();

  const handleCapabilityClick = (capabilityId: string) => {
    setActiveCapability(capabilityId);
    toast.success(`Switched to ${capabilities.find(c => c.id === capabilityId)?.title} mode`);
  };

  const connectSupabase = () => {
    toast.success("J.A.R.V.I.S is now fully connected and operational!");
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
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
              {user ? (
                <>
                  <Button 
                    variant="ai" 
                    size="lg" 
                    onClick={connectSupabase}
                    className="animate-pulse-glow"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    All Systems Operational
                  </Button>
                  <Button variant="ai-outline" size="lg">
                    <Globe className="w-5 h-5 mr-2" />
                    View Documentation
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ai" size="lg" asChild>
                    <a href="/auth">
                      <Zap className="w-5 h-5 mr-2" />
                      Sign In to Access AI
                    </a>
                  </Button>
                  <Button variant="ai-outline" size="lg">
                    <Globe className="w-5 h-5 mr-2" />
                    View Documentation
                  </Button>
                </>
              )}
            </div>

            {/* Status Indicators */}
            <div className="flex items-center justify-center gap-6 pt-6">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${user ? "bg-green-500" : "bg-yellow-500"} animate-pulse`} />
                <span className="text-sm text-muted-foreground">
                  {user ? "AI Connected" : "Sign In Required"}
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
            <div className="h-[600px]">
              {activeCapability === "chat" && <ChatInterface capability="chat" />}
              {activeCapability === "voice" && <ChatInterface capability="voice" />}
              {activeCapability === "image" && <ImageGenerator />}
              {activeCapability === "code" && <CodeGenerator />}
              {activeCapability === "search" && <ChatInterface capability="search" />}
              {activeCapability === "analysis" && <ChatInterface capability="analysis" />}
            </div>
          </div>

          {/* Right Sidebar - Management */}
          <div className="space-y-6">
            <UserProfile />
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