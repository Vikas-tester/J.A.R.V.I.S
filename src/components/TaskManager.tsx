import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: Date;
}

export const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Set up AI API integrations",
      completed: false,
      priority: "high",
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    {
      id: "2",
      title: "Configure voice recognition",
      completed: false,
      priority: "medium",
    },
    {
      id: "3",
      title: "Test image generation pipeline",
      completed: true,
      priority: "low",
    },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      priority: "medium",
    };

    setTasks(prev => [...prev, task]);
    setNewTask("");
    toast.success("Task added successfully!");
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "low": return "bg-green-500/10 text-green-500 border-green-500/20";
      default: return "bg-ai-primary/10 text-ai-primary border-ai-primary/20";
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <Card className="p-6 bg-gradient-card border-ai-primary/20">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Task Management</h3>
            <p className="text-sm text-muted-foreground">
              {completedTasks}/{totalTasks} tasks completed
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium">{Math.round((completedTasks / totalTasks) * 100)}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-ai-card rounded-full h-2">
          <div
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
          />
        </div>

        {/* Add Task */}
        <div className="flex gap-2">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            className="bg-ai-card border-ai-primary/20 focus:border-ai-primary"
          />
          <Button onClick={addTask} variant="ai" size="icon">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                task.completed
                  ? "bg-ai-card/50 border-ai-primary/10 opacity-60"
                  : "bg-ai-card border-ai-primary/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <div className="flex-1">
                  <p className={`text-sm ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {task.title}
                  </p>
                  {task.dueDate && (
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Due {task.dueDate.toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-ai-primary/20">
          <div className="text-center">
            <div className="text-lg font-semibold text-ai-primary">{totalTasks}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-green-500">{completedTasks}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-yellow-500">{totalTasks - completedTasks}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
        </div>
      </div>
    </Card>
  );
};