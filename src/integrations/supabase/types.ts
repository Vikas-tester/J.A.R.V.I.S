export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      code_generations: {
        Row: {
          created_at: string
          error_message: string | null
          explanation: string | null
          framework: string | null
          generated_code: string | null
          id: string
          language: string | null
          prompt: string
          request_metadata: Json | null
          response_metadata: Json | null
          status: Database["public"]["Enums"]["request_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          explanation?: string | null
          framework?: string | null
          generated_code?: string | null
          id?: string
          language?: string | null
          prompt: string
          request_metadata?: Json | null
          response_metadata?: Json | null
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          explanation?: string | null
          framework?: string | null
          generated_code?: string | null
          id?: string
          language?: string | null
          prompt?: string
          request_metadata?: Json | null
          response_metadata?: Json | null
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          capability: string | null
          created_at: string | null
          id: string
          message: string | null
          metadata: Json | null
          response: string | null
          response_metadata: Json | null
          user_id: string | null
        }
        Insert: {
          capability?: string | null
          created_at?: string | null
          id?: string
          message?: string | null
          metadata?: Json | null
          response?: string | null
          response_metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          capability?: string | null
          created_at?: string | null
          id?: string
          message?: string | null
          metadata?: Json | null
          response?: string | null
          response_metadata?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      image_generations: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          image_url: string | null
          prompt: string
          quality: string | null
          request_metadata: Json | null
          response_metadata: Json | null
          size: string | null
          status: Database["public"]["Enums"]["request_status"]
          style: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          image_url?: string | null
          prompt: string
          quality?: string | null
          request_metadata?: Json | null
          response_metadata?: Json | null
          size?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          style?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          image_url?: string | null
          prompt?: string
          quality?: string | null
          request_metadata?: Json | null
          response_metadata?: Json | null
          size?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          style?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      voice_syntheses: {
        Row: {
          audio_url: string | null
          created_at: string
          error_message: string | null
          id: string
          model: string | null
          request_metadata: Json | null
          response_metadata: Json | null
          status: Database["public"]["Enums"]["request_status"]
          text: string
          updated_at: string
          user_id: string
          voice: string | null
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          model?: string | null
          request_metadata?: Json | null
          response_metadata?: Json | null
          status?: Database["public"]["Enums"]["request_status"]
          text: string
          updated_at?: string
          user_id: string
          voice?: string | null
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          model?: string | null
          request_metadata?: Json | null
          response_metadata?: Json | null
          status?: Database["public"]["Enums"]["request_status"]
          text?: string
          updated_at?: string
          user_id?: string
          voice?: string | null
        }
        Relationships: []
      }
      voice_transcriptions: {
        Row: {
          audio_filename: string | null
          created_at: string
          error_message: string | null
          id: string
          language: string | null
          request_metadata: Json | null
          response_metadata: Json | null
          status: Database["public"]["Enums"]["request_status"]
          transcription: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          audio_filename?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          language?: string | null
          request_metadata?: Json | null
          response_metadata?: Json | null
          status?: Database["public"]["Enums"]["request_status"]
          transcription?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          audio_filename?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          language?: string | null
          request_metadata?: Json | null
          response_metadata?: Json | null
          status?: Database["public"]["Enums"]["request_status"]
          transcription?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      web_research_requests: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          query: string
          request_metadata: Json | null
          response_metadata: Json | null
          results: Json | null
          search_type: string | null
          sources: string[] | null
          status: Database["public"]["Enums"]["request_status"]
          summary: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          query: string
          request_metadata?: Json | null
          response_metadata?: Json | null
          results?: Json | null
          search_type?: string | null
          sources?: string[] | null
          status?: Database["public"]["Enums"]["request_status"]
          summary?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          query?: string
          request_metadata?: Json | null
          response_metadata?: Json | null
          results?: Json | null
          search_type?: string | null
          sources?: string[] | null
          status?: Database["public"]["Enums"]["request_status"]
          summary?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      request_status: "pending" | "completed" | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      request_status: ["pending", "completed", "failed"],
    },
  },
} as const
