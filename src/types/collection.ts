import { Database } from "./supabase";

export type CarType = Database['public']['Tables']['cars']['Row'];