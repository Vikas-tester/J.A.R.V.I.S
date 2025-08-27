import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface CapabilityCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  onClick?: () => void;
  isActive?: boolean;
}

export const CapabilityCard = ({
  title,
  description,
  icon: Icon,
  gradient,
  onClick,
  isActive = false,
}: CapabilityCardProps) => {
  return (
    <Card 
      className={`p-6 bg-gradient-card border-ai-primary/20 hover:border-ai-primary/40 transition-all duration-300 cursor-pointer group ${
        isActive ? "ring-2 ring-ai-primary shadow-lg shadow-ai-glow/25" : ""
      }`}
      onClick={onClick}
    >
      <div className="space-y-4">
        <div className={`p-3 rounded-lg w-fit ${gradient} group-hover:animate-pulse-glow`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground group-hover:text-ai-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        
        <Button variant="ai-outline" size="sm" className="w-full">
          Activate
        </Button>
      </div>
    </Card>
  );
};