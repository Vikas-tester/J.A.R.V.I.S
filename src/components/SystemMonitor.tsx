import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Shield, 
  AlertTriangle,
  CheckCircle 
} from "lucide-react";

interface SystemMetric {
  label: string;
  value: number;
  status: "good" | "warning" | "critical";
  icon: React.ReactNode;
}

export const SystemMonitor = () => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    {
      label: "CPU Usage",
      value: 45,
      status: "good",
      icon: <Cpu className="w-4 h-4" />,
    },
    {
      label: "Memory",
      value: 68,
      status: "warning",
      icon: <Activity className="w-4 h-4" />,
    },
    {
      label: "Storage",
      value: 23,
      status: "good",
      icon: <HardDrive className="w-4 h-4" />,
    },
    {
      label: "Network",
      value: 89,
      status: "good",
      icon: <Wifi className="w-4 h-4" />,
    },
  ]);

  const [alerts] = useState([
    {
      id: "1",
      message: "AI model API quota at 75%",
      type: "warning" as const,
      timestamp: new Date(),
    },
    {
      id: "2",
      message: "System security scan completed",
      type: "success" as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 10)),
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-500";
      case "warning": return "text-yellow-500";
      case "critical": return "text-red-500";
      default: return "text-ai-primary";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "critical": return "bg-red-500";
      default: return "bg-ai-primary";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "success": return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Shield className="w-4 h-4 text-ai-primary" />;
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-ai-primary/20">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">System Monitor</h3>
            <p className="text-sm text-muted-foreground">Real-time system status</p>
          </div>
        </div>

        {/* System Metrics */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Performance Metrics</h4>
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={getStatusColor(metric.status)}>
                    {metric.icon}
                  </span>
                  <span className="text-sm text-foreground">{metric.label}</span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {metric.value.toFixed(0)}%
                </span>
              </div>
              <Progress 
                value={metric.value} 
                className="h-2"
              />
            </div>
          ))}
        </div>

        {/* System Status */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">System Status</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-foreground">AI Services</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-foreground">Security</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-foreground">API Limits</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-foreground">Backup</span>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Recent Alerts</h4>
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3 rounded-lg bg-ai-card border border-ai-primary/20"
              >
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {alert.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};