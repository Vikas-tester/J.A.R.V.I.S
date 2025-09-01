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
import { JarvisHeader } from "@/components/JarvisHeader";
import { JarvisMatrix } from "@/components/JarvisMatrix";
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
  FileText,
  Cpu,
  Network,
  User
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
    <div className="min-h-screen bg-gradient-bg relative">
      {/* Matrix Background Effect */}
      <JarvisMatrix />
      
      {/* JARVIS Header */}
      <JarvisHeader />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${aiHeroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Circuit Board Background */}
        <div className="absolute inset-0 matrix-bg opacity-20" />
        
        <div className="relative z-10 container mx-auto px-6 py-16">
          <div className="text-center space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full jarvis-panel animate-hover-float">
              <div className="w-2 h-2 bg-ai-success rounded-full animate-pulse" />
              <Cpu className="w-4 h-4 text-ai-primary animate-circuit-flow" />
              <span className="text-sm font-tech text-foreground">ARTIFICIAL INTELLIGENCE SYSTEM</span>
              <Network className="w-4 h-4 text-ai-accent animate-circuit-flow" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-glow-primary font-tech tracking-wider">
                J.A.R.V.I.S
              </h1>
              <p className="text-lg text-glow-accent font-tech">
                Just A Rather Very Intelligent System
              </p>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Advanced artificial intelligence with multi-modal capabilities. 
              Conversational AI, code generation, image synthesis, voice processing, and real-time analysis.
            </p>
            
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {user ? (
                <>
                  <Button 
                    variant="ai" 
                    size="lg" 
                    onClick={connectSupabase}
                    className="font-tech text-base"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    ALL SYSTEMS OPERATIONAL
                  </Button>
                  <Button variant="ai-outline" size="lg" className="font-tech">
                    <Globe className="w-5 h-5 mr-2" />
                    SYSTEM DOCS
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ai" size="lg" asChild className="font-tech text-base">
                    <a href="/auth">
                      <Zap className="w-5 h-5 mr-2" />
                      INITIALIZE SYSTEM
                    </a>
                  </Button>
                  <Button variant="ai-outline" size="lg" className="font-tech">
                    <Globe className="w-5 h-5 mr-2" />
                    DOCUMENTATION
                  </Button>
                </>
              )}
            </div>

            {/* Enhanced Status Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-2xl mx-auto">
              <div className="jarvis-panel p-4 text-center">
                <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${user ? "bg-ai-success" : "bg-ai-warning"} animate-pulse`} />
                <div className="text-xs font-tech text-muted-foreground">AI STATUS</div>
                <div className="text-sm font-tech text-ai-primary">{user ? "ONLINE" : "STANDBY"}</div>
              </div>
              
              <div className="jarvis-panel p-4 text-center">
                <Brain className="w-4 h-4 mx-auto mb-2 text-ai-primary animate-circuit-flow" />
                <div className="text-xs font-tech text-muted-foreground">NEURAL NET</div>
                <div className="text-sm font-tech text-ai-accent">GPT-5</div>
              </div>
              
              <div className="jarvis-panel p-4 text-center">
                <Shield className="w-4 h-4 mx-auto mb-2 text-ai-success" />
                <div className="text-xs font-tech text-muted-foreground">SECURITY</div>
                <div className="text-sm font-tech text-ai-success">SECURE</div>
              </div>
              
              <div className="jarvis-panel p-4 text-center">
                <Network className="w-4 h-4 mx-auto mb-2 text-ai-primary animate-pulse" />
                <div className="text-xs font-tech text-muted-foreground">NETWORK</div>
                <div className="text-sm font-tech text-ai-primary">CONNECTED</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - AI Capabilities */}
          <div className="space-y-6">
            <div className="jarvis-panel p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-ai-bg-start" />
                </div>
                <h2 className="text-xl font-tech text-glow-primary">AI MODULES</h2>
              </div>
              
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
            </div>
          </div>

          {/* Center - Main Interface */}
          <div className="lg:col-span-1">
            <div className="jarvis-panel h-[700px] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-gradient-accent rounded flex items-center justify-center">
                  <Zap className="w-3 h-3 text-ai-bg-start" />
                </div>
                <h3 className="font-tech text-glow-accent">
                  {capabilities.find(c => c.id === activeCapability)?.title.toUpperCase() || "MAIN TERMINAL"}
                </h3>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-ai-success rounded-full animate-pulse" />
                  <span className="text-xs font-tech text-ai-success">ACTIVE</span>
                </div>
              </div>
              
              <div className="h-[calc(100%-3rem)] bg-ai-bg-start/50 rounded-lg border border-ai-primary/20 overflow-hidden">
                {activeCapability === "chat" && <ChatInterface capability="chat" />}
                {activeCapability === "voice" && <ChatInterface capability="voice" />}
                {activeCapability === "image" && <ImageGenerator />}
                {activeCapability === "code" && <CodeGenerator />}
                {activeCapability === "search" && <ChatInterface capability="search" />}
                {activeCapability === "analysis" && <ChatInterface capability="analysis" />}
              </div>
            </div>
          </div>

          {/* Right Sidebar - System Management */}
          <div className="space-y-6">
            <div className="jarvis-panel p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-gradient-secondary rounded flex items-center justify-center">
                  <User className="w-3 h-3 text-ai-bg-start" />
                </div>
                <h3 className="font-tech text-glow-primary">USER PROFILE</h3>
              </div>
              <UserProfile />
            </div>
            
            <div className="jarvis-panel p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-gradient-warning rounded flex items-center justify-center">
                  <CheckSquare className="w-3 h-3 text-ai-bg-start" />
                </div>
                <h3 className="font-tech text-glow-accent">TASK MANAGER</h3>
              </div>
              <TaskManager />
            </div>
            
            <div className="jarvis-panel p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 bg-gradient-accent rounded flex items-center justify-center">
                  <Shield className="w-3 h-3 text-ai-bg-start" />
                </div>
                <h3 className="font-tech text-glow-primary">SYSTEM MONITOR</h3>
              </div>
              <SystemMonitor />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-ai-primary/20 py-12 mt-16 bg-gradient-card">
        <div className="absolute inset-0 matrix-bg opacity-10" />
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-ai-bg-start" />
                </div>
                <span className="font-tech text-glow-primary text-lg">J.A.R.V.I.S</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Advanced AI System for comprehensive digital assistance
              </p>
            </div>
            
            <div>
              <h4 className="font-tech text-ai-primary mb-4">CAPABILITIES</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Neural Language Processing</li>
                <li>Computer Vision & Image Generation</li>
                <li>Code Analysis & Synthesis</li>
                <li>Real-time Web Research</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-tech text-ai-primary mb-4">SYSTEM INFO</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Built with React & TypeScript</li>
                <li>Powered by GPT-5 Neural Network</li>
                <li>Secure Supabase Backend</li>
                <li>Real-time Processing</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-ai-primary/20 mt-8 pt-8 text-center">
            <p className="text-muted-foreground text-sm font-tech">
              © 2025 J.A.R.V.I.S • ARTIFICIAL INTELLIGENCE SYSTEM • ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;