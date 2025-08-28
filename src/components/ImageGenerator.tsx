import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { aiService } from "@/services/aiService";

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [size, setSize] = useState("1024x1024");
  const [quality, setQuality] = useState("standard");
  const [style, setStyle] = useState("vivid");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt for image generation");
      return;
    }

    setIsGenerating(true);
    try {
      const imageUrl = await aiService.generateImage(prompt, { size, quality, style });
      setGeneratedImage(imageUrl);
      toast.success("Image generated successfully!");
    } catch (error) {
      console.error('Image generation error:', error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `ai-generated-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <Card className="h-full bg-gradient-card border-ai-primary/20 backdrop-blur-sm">
      <div className="flex flex-col h-full p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <ImageIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Image Generator</h3>
            <p className="text-sm text-muted-foreground">Create stunning visuals with AI</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="prompt">Image Prompt</Label>
            <Input
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              className="bg-ai-card border-ai-primary/20 focus:border-ai-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="size">Size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger className="bg-ai-card border-ai-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1024x1024">1024x1024</SelectItem>
                  <SelectItem value="1024x1792">1024x1792</SelectItem>
                  <SelectItem value="1792x1024">1792x1024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quality">Quality</Label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger className="bg-ai-card border-ai-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="hd">HD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="style">Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="bg-ai-card border-ai-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vivid">Vivid</SelectItem>
                  <SelectItem value="natural">Natural</SelectItem>
                </SelectContent>
              </Select>
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
                Generating Image...
              </>
            ) : (
              "Generate Image"
            )}
          </Button>
        </div>

        <div className="flex-1 border border-ai-primary/20 rounded-lg bg-ai-card/50 flex items-center justify-center">
          {generatedImage ? (
            <div className="relative w-full h-full">
              <img
                src={generatedImage}
                alt="Generated image"
                className="w-full h-full object-contain rounded-lg"
              />
              <Button
                onClick={downloadImage}
                className="absolute top-2 right-2"
                size="sm"
                variant="ai"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="p-4 rounded-lg bg-gradient-primary w-fit mx-auto opacity-50">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <p className="text-muted-foreground">
                Generated images will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};