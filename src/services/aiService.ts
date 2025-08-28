import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export const aiService = {
  async chat(message: string, capability?: string): Promise<string> {
    const { data, error } = await supabase.functions.invoke('chat', {
      body: { message, capability }
    });

    if (error) throw new Error(error.message);
    return data.response;
  },

  async generateImage(prompt: string, options?: {
    size?: string;
    quality?: string;
    style?: string;
  }): Promise<string> {
    const { data, error } = await supabase.functions.invoke('image-generation', {
      body: { prompt, ...options }
    });

    if (error) throw new Error(error.message);
    return data.imageUrl;
  },

  async generateCode(prompt: string, language?: string, framework?: string): Promise<{
    code: string;
    explanation: string;
    language: string;
    framework?: string;
  }> {
    const { data, error } = await supabase.functions.invoke('code-generation', {
      body: { prompt, language, framework }
    });

    if (error) throw new Error(error.message);
    return data;
  },

  async synthesizeVoice(text: string, voice?: string, model?: string): Promise<string> {
    const { data, error } = await supabase.functions.invoke('voice-synthesis', {
      body: { text, voice, model }
    });

    if (error) throw new Error(error.message);
    return data.audioUrl;
  },

  async transcribeVoice(audioBlob: Blob): Promise<string> {
    // Convert blob to base64
    const arrayBuffer = await audioBlob.arrayBuffer();
    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    
    const { data, error } = await supabase.functions.invoke('voice-transcription', {
      body: { audio: base64Audio }
    });

    if (error) throw new Error(error.message);
    return data.text;
  },

  async webResearch(query: string, searchType?: string): Promise<{
    summary: string;
    results: any[];
    sources: string[];
  }> {
    const { data, error } = await supabase.functions.invoke('web-research', {
      body: { query, searchType }
    });

    if (error) throw new Error(error.message);
    return data;
  }
};