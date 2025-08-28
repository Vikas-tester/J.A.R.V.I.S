import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User, Settings } from "lucide-react";
import { toast } from "sonner";

export const UserProfile = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Failed to sign out");
    } else {
      toast.success("Signed out successfully");
    }
  };

  if (!user) {
    return (
      <Card className="p-4 bg-gradient-card border-ai-primary/20">
        <div className="text-center space-y-3">
          <div className="p-3 rounded-lg bg-ai-card w-fit mx-auto">
            <User className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Not signed in</p>
          <Button variant="ai-outline" size="sm" asChild>
            <a href="/auth">Sign In</a>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-gradient-card border-ai-primary/20">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-primary text-white">
              {user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user.email}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs border-ai-primary/30 text-ai-primary">
                Active
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="ai-outline" size="sm" className="flex-1">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="ai-outline" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};