import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Copy, Code2 } from "lucide-react";
import { toast } from "sonner";
import { aiService } from "@/services/aiService";

export const CodeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [framework, setFramework] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt for code generation");
      return;
    }

    setIsGenerating(true);
    try {
      const result = await aiService.generateCode(prompt, language, framework);
      setGeneratedCode(result.code);
      setExplanation(result.explanation);
      toast.success("Code generated successfully!");
    } catch (error) {
      console.error('Code generation error:', error);
      toast.error("Failed to generate code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success("Code copied to clipboard!");
  };

  return (
    <Card className="h-full bg-gradient-card border-ai-primary/20 backdrop-blur-sm">
      <div className="flex flex-col h-full p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Code Generator</h3>
            <p className="text-sm text-muted-foreground">Generate code with AI assistance</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="prompt">Code Prompt</Label>
            <Input
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the code you want to generate..."
              className="bg-ai-card border-ai-primary/20 focus:border-ai-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-ai-card border-ai-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="csharp">C#</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="framework">Framework (Optional)</Label>
              <Input
                id="framework"
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
                placeholder="React, Express, Django..."
                className="bg-ai-card border-ai-primary/20 focus:border-ai-primary"
              />
            </div>
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !prompt.trim()}
            className="w-full"
            variant="ai"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Code...
              </>
            ) : (
              "Generate Code"
            )}
          </Button>
        </div>

        <div className="flex-1 space-y-4">
          {generatedCode && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Generated Code</Label>
                <Button onClick={copyCode} size="sm" variant="ai-outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={generatedCode}
                readOnly
                className="font-mono text-sm bg-ai-card border-ai-primary/20 min-h-[200px] resize-none"
              />
            </div>
          )}

          {explanation && (
            <div className="space-y-2">
              <Label>Explanation</Label>
              <div className="p-4 bg-ai-card border border-ai-primary/20 rounded-lg">
                <p className="text-sm text-foreground whitespace-pre-wrap">{explanation}</p>
              </div>
            </div>
          )}

          {!generatedCode && !explanation && (
            <div className="flex-1 border border-ai-primary/20 rounded-lg bg-ai-card/50 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="p-4 rounded-lg bg-gradient-primary w-fit mx-auto opacity-50">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <p className="text-muted-foreground">
                  Generated code will appear here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};