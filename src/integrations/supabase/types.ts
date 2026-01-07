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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_settings: {
        Row: {
          ai_enabled: boolean | null
          ai_model: string | null
          business_id: string
          created_at: string
          gemini_api_key_encrypted: string | null
          id: string
          system_prompt: string | null
          updated_at: string
        }
        Insert: {
          ai_enabled?: boolean | null
          ai_model?: string | null
          business_id: string
          created_at?: string
          gemini_api_key_encrypted?: string | null
          id?: string
          system_prompt?: string | null
          updated_at?: string
        }
        Update: {
          ai_enabled?: boolean | null
          ai_model?: string | null
          business_id?: string
          created_at?: string
          gemini_api_key_encrypted?: string | null
          id?: string
          system_prompt?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_settings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          business_id: string
          created_at: string
          customer_name: string | null
          customer_number: string
          id: string
          notes: string | null
          scheduled_at: string
          service: string | null
          status: Database["public"]["Enums"]["appointment_status"]
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          customer_name?: string | null
          customer_number: string
          id?: string
          notes?: string | null
          scheduled_at: string
          service?: string | null
          status?: Database["public"]["Enums"]["appointment_status"]
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          customer_name?: string | null
          customer_number?: string
          id?: string
          notes?: string | null
          scheduled_at?: string
          service?: string | null
          status?: Database["public"]["Enums"]["appointment_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_configs: {
        Row: {
          appointment_enabled: boolean | null
          bot_id: string | null
          business_id: string
          created_at: string
          greeting_message: string | null
          id: string
          order_enabled: boolean | null
          static_replies: Json | null
          updated_at: string
        }
        Insert: {
          appointment_enabled?: boolean | null
          bot_id?: string | null
          business_id: string
          created_at?: string
          greeting_message?: string | null
          id?: string
          order_enabled?: boolean | null
          static_replies?: Json | null
          updated_at?: string
        }
        Update: {
          appointment_enabled?: boolean | null
          bot_id?: string | null
          business_id?: string
          created_at?: string
          greeting_message?: string | null
          id?: string
          order_enabled?: boolean | null
          static_replies?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bot_configs_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bot_configs_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      bots: {
        Row: {
          created_at: string
          description: string | null
          features: Json | null
          icon: string | null
          id: string
          name: string
          type: Database["public"]["Enums"]["bot_type"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: Json | null
          icon?: string | null
          id?: string
          name: string
          type: Database["public"]["Enums"]["bot_type"]
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: Json | null
          icon?: string | null
          id?: string
          name?: string
          type?: Database["public"]["Enums"]["bot_type"]
        }
        Relationships: []
      }
      businesses: {
        Row: {
          created_at: string
          id: string
          name: string
          timezone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          timezone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          timezone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          business_id: string
          created_at: string
          direction: Database["public"]["Enums"]["message_direction"]
          from_number: string
          id: string
          message_text: string
          source: Database["public"]["Enums"]["message_source"]
          to_number: string | null
          whatsapp_message_id: string | null
        }
        Insert: {
          business_id: string
          created_at?: string
          direction: Database["public"]["Enums"]["message_direction"]
          from_number: string
          id?: string
          message_text: string
          source: Database["public"]["Enums"]["message_source"]
          to_number?: string | null
          whatsapp_message_id?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string
          direction?: Database["public"]["Enums"]["message_direction"]
          from_number?: string
          id?: string
          message_text?: string
          source?: Database["public"]["Enums"]["message_source"]
          to_number?: string | null
          whatsapp_message_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          business_id: string
          created_at: string
          customer_name: string | null
          customer_number: string
          details: Json | null
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["order_status"]
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          customer_name?: string | null
          customer_number: string
          details?: Json | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          customer_name?: string | null
          customer_number?: string
          details?: Json | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_numbers: {
        Row: {
          access_token_encrypted: string | null
          business_account_id: string | null
          business_id: string
          created_at: string
          display_phone_number: string | null
          id: string
          phone_number_id: string | null
          updated_at: string
          verification_status: Database["public"]["Enums"]["verification_status"]
        }
        Insert: {
          access_token_encrypted?: string | null
          business_account_id?: string | null
          business_id: string
          created_at?: string
          display_phone_number?: string | null
          id?: string
          phone_number_id?: string | null
          updated_at?: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Update: {
          access_token_encrypted?: string | null
          business_account_id?: string | null
          business_id?: string
          created_at?: string
          display_phone_number?: string | null
          id?: string
          phone_number_id?: string | null
          updated_at?: string
          verification_status?: Database["public"]["Enums"]["verification_status"]
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_numbers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_business_id: { Args: { _user_id: string }; Returns: string }
    }
    Enums: {
      appointment_status: "pending" | "confirmed" | "cancelled"
      bot_type: "restaurant" | "salon" | "ecommerce" | "faq"
      message_direction: "inbound" | "outbound"
      message_source: "bot" | "human"
      order_status:
        | "pending"
        | "accepted"
        | "rejected"
        | "completed"
        | "cancelled"
      verification_status: "not_connected" | "verifying" | "connected"
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
      appointment_status: ["pending", "confirmed", "cancelled"],
      bot_type: ["restaurant", "salon", "ecommerce", "faq"],
      message_direction: ["inbound", "outbound"],
      message_source: ["bot", "human"],
      order_status: [
        "pending",
        "accepted",
        "rejected",
        "completed",
        "cancelled",
      ],
      verification_status: ["not_connected", "verifying", "connected"],
    },
  },
} as const
