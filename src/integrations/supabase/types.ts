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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      conversations: {
        Row: {
          ai_analysis: string | null
          created_at: string
          id: string
          lead_id: string | null
          message: string
          message_type: string
          user_id: string
        }
        Insert: {
          ai_analysis?: string | null
          created_at?: string
          id?: string
          lead_id?: string | null
          message: string
          message_type: string
          user_id: string
        }
        Update: {
          ai_analysis?: string | null
          created_at?: string
          id?: string
          lead_id?: string | null
          message?: string
          message_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      drip_campaigns: {
        Row: {
          created_at: string
          day: number
          enabled: boolean | null
          id: string
          message_template: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          day: number
          enabled?: boolean | null
          id?: string
          message_template: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          day?: number
          enabled?: boolean | null
          id?: string
          message_template?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          area: string | null
          created_at: string
          drip_day: number | null
          drip_paused: boolean | null
          id: string
          lead_score: string | null
          name: string
          phone: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          area?: string | null
          created_at?: string
          drip_day?: number | null
          drip_paused?: boolean | null
          id?: string
          lead_score?: string | null
          name: string
          phone: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          area?: string | null
          created_at?: string
          drip_day?: number | null
          drip_paused?: boolean | null
          id?: string
          lead_score?: string | null
          name?: string
          phone?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          metadata: Json | null
          paystack_reference: string | null
          reference: string
          status: string
          updated_at: string
          upsell_selected: boolean | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          paystack_reference?: string | null
          reference: string
          status?: string
          updated_at?: string
          upsell_selected?: boolean | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          paystack_reference?: string | null
          reference?: string
          status?: string
          updated_at?: string
          upsell_selected?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          calendar_link: string | null
          created_at: string
          full_name: string | null
          id: string
          is_active: boolean | null
          phone_number: string | null
          plan_expiry_date: string | null
          updated_at: string
          user_id: string
          white_glove_setup_purchased: boolean | null
        }
        Insert: {
          calendar_link?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          phone_number?: string | null
          plan_expiry_date?: string | null
          updated_at?: string
          user_id: string
          white_glove_setup_purchased?: boolean | null
        }
        Update: {
          calendar_link?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          phone_number?: string | null
          plan_expiry_date?: string | null
          updated_at?: string
          user_id?: string
          white_glove_setup_purchased?: boolean | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string
          google_connected: boolean | null
          id: string
          notification_phone: string | null
          openai_api_key_configured: boolean | null
          updated_at: string
          user_id: string
          wasender_api_key_configured: boolean | null
        }
        Insert: {
          created_at?: string
          google_connected?: boolean | null
          id?: string
          notification_phone?: string | null
          openai_api_key_configured?: boolean | null
          updated_at?: string
          user_id: string
          wasender_api_key_configured?: boolean | null
        }
        Update: {
          created_at?: string
          google_connected?: boolean | null
          id?: string
          notification_phone?: string | null
          openai_api_key_configured?: boolean | null
          updated_at?: string
          user_id?: string
          wasender_api_key_configured?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_white_glove_users: {
        Args: never
        Returns: {
          created_at: string
          full_name: string
          phone_number: string
          plan_expiry_date: string
          user_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
