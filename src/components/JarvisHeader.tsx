import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  Power,
  Wifi,
  Shield,
  Brain,
  Activity,
  Zap,
  Settings,
  User
} from "lucide-react";

export const JarvisHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState("OPERATIONAL");
  const { user } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  };

  return (
    <header className="relative bg-gradient-card border-b border-ai-primary/20 backdrop-blur-md">
      {/* Matrix Grid Background */}
      <div className="absolute inset-0 matrix-bg opacity-30" />
      
      {/* Scan Line Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ai-primary to-transparent animate-scan-line" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side - JARVIS Branding */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center animate-pulse-glow">
                  <Brain className="w-5 h-5 text-ai-bg-start" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-ai-success rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-glow-primary font-tech">J.A.R.V.I.S</h1>
                <p className="text-xs text-muted-foreground">Just A Rather Very Intelligent System</p>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="hidden md:flex items-center space-x-4">
              <Badge variant="outline" className="border-ai-success/50 text-ai-success animate-circuit-flow">
                <Activity className="w-3 h-3 mr-1" />
                {systemStatus}
              </Badge>
              <Badge variant="outline" className="border-ai-primary/50 text-ai-primary">
                <Wifi className="w-3 h-3 mr-1" />
                CONNECTED
              </Badge>
              <Badge variant="outline" className="border-ai-accent/50 text-ai-accent">
                <Shield className="w-3 h-3 mr-1" />
                SECURE
              </Badge>
            </div>
          </div>

          {/* Center - Current Time & Date */}
          <div className="hidden lg:flex flex-col items-center">
            <div className="text-2xl font-mono text-glow-primary font-bold">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-muted-foreground">
              {formatDate(currentTime)}
            </div>
          </div>

          {/* Right Side - User & Controls */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-ai-bg-start" />
                  </div>
                  <div className="text-sm">
                    <div className="text-foreground font-medium">
                      {user.email?.split('@')[0]}
                    </div>
                    <div className="text-xs text-ai-primary">AUTHORIZED</div>
                  </div>
                </div>
                
                <Button variant="ai-ghost" size="icon" className="animate-hover-float">
                  <Settings className="w-4 h-4" />
                </Button>
                
                <Button variant="ai-outline" size="sm">
                  <Power className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">LOGOUT</span>
                </Button>
              </>
            ) : (
              <Button variant="ai" size="sm" asChild>
                <a href="/auth">
                  <Zap className="w-4 h-4 mr-2" />
                  INITIALIZE
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Status Row */}
        <div className="md:hidden mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-ai-success/50 text-ai-success text-xs">
              <Activity className="w-2 h-2 mr-1" />
              {systemStatus}
            </Badge>
            <Badge variant="outline" className="border-ai-primary/50 text-ai-primary text-xs">
              <Wifi className="w-2 h-2 mr-1" />
              ONLINE
            </Badge>
          </div>
          
          <div className="text-lg font-mono text-glow-primary">
            {formatTime(currentTime)}
          </div>
        </div>
      </div>

      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ai-primary/50 to-transparent" />
    </header>
  );
};