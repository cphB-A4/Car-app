export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];

export interface Database {
    graphql_public: {
        Tables: {
            [_ in never]: never;
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            graphql: {
                Args: {
                    operationName?: string;
                    query?: string;
                    variables?: Json;
                    extensions?: Json;
                };
                Returns: Json;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
    public: {
        Tables: {
            cars: {
                Row: {
                    color: string | null;
                    coupling: boolean | null;
                    created_at: string | null;
                    doors: number | null;
                    engine_power: number | null;
                    engine_volume: number | null;
                    favourite: boolean | null;
                    fuel_type: string | null;
                    id: number;
                    img_url: string | null;
                    make: string | null;
                    model: string | null;
                    model_year: number | null;
                    nickname: string | null;
                    profile_id: string | null;
                    registration_number: string | null;
                    seats: number | null;
                    total_weight: number | null;
                    variant: string | null;
                };
                Insert: {
                    color?: string | null;
                    coupling?: boolean | null;
                    created_at?: string | null;
                    doors?: number | null;
                    engine_power?: number | null;
                    engine_volume?: number | null;
                    favourite?: boolean | null;
                    fuel_type?: string | null;
                    id?: number;
                    img_url?: string | null;
                    make?: string | null;
                    model?: string | null;
                    model_year?: number | null;
                    nickname?: string | null;
                    profile_id?: string | null;
                    registration_number?: string | null;
                    seats?: number | null;
                    total_weight?: number | null;
                    variant?: string | null;
                };
                Update: {
                    color?: string | null;
                    coupling?: boolean | null;
                    created_at?: string | null;
                    doors?: number | null;
                    engine_power?: number | null;
                    engine_volume?: number | null;
                    favourite?: boolean | null;
                    fuel_type?: string | null;
                    id?: number;
                    img_url?: string | null;
                    make?: string | null;
                    model?: string | null;
                    model_year?: number | null;
                    nickname?: string | null;
                    profile_id?: string | null;
                    registration_number?: string | null;
                    seats?: number | null;
                    total_weight?: number | null;
                    variant?: string | null;
                };
            };
            profiles: {
                Row: {
                    created_at: string | null;
                    id: string;
                    name: string | null;
                };
                Insert: {
                    created_at?: string | null;
                    id: string;
                    name?: string | null;
                };
                Update: {
                    created_at?: string | null;
                    id?: string;
                    name?: string | null;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
    storage: {
        Tables: {
            buckets: {
                Row: {
                    allowed_mime_types: string[] | null;
                    avif_autodetection: boolean | null;
                    created_at: string | null;
                    file_size_limit: number | null;
                    id: string;
                    name: string;
                    owner: string | null;
                    public: boolean | null;
                    updated_at: string | null;
                };
                Insert: {
                    allowed_mime_types?: string[] | null;
                    avif_autodetection?: boolean | null;
                    created_at?: string | null;
                    file_size_limit?: number | null;
                    id: string;
                    name: string;
                    owner?: string | null;
                    public?: boolean | null;
                    updated_at?: string | null;
                };
                Update: {
                    allowed_mime_types?: string[] | null;
                    avif_autodetection?: boolean | null;
                    created_at?: string | null;
                    file_size_limit?: number | null;
                    id?: string;
                    name?: string;
                    owner?: string | null;
                    public?: boolean | null;
                    updated_at?: string | null;
                };
            };
            migrations: {
                Row: {
                    executed_at: string | null;
                    hash: string;
                    id: number;
                    name: string;
                };
                Insert: {
                    executed_at?: string | null;
                    hash: string;
                    id: number;
                    name: string;
                };
                Update: {
                    executed_at?: string | null;
                    hash?: string;
                    id?: number;
                    name?: string;
                };
            };
            objects: {
                Row: {
                    bucket_id: string | null;
                    created_at: string | null;
                    id: string;
                    last_accessed_at: string | null;
                    metadata: Json | null;
                    name: string | null;
                    owner: string | null;
                    path_tokens: string[] | null;
                    updated_at: string | null;
                    version: string | null;
                };
                Insert: {
                    bucket_id?: string | null;
                    created_at?: string | null;
                    id?: string;
                    last_accessed_at?: string | null;
                    metadata?: Json | null;
                    name?: string | null;
                    owner?: string | null;
                    path_tokens?: string[] | null;
                    updated_at?: string | null;
                    version?: string | null;
                };
                Update: {
                    bucket_id?: string | null;
                    created_at?: string | null;
                    id?: string;
                    last_accessed_at?: string | null;
                    metadata?: Json | null;
                    name?: string | null;
                    owner?: string | null;
                    path_tokens?: string[] | null;
                    updated_at?: string | null;
                    version?: string | null;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            can_insert_object: {
                Args: {
                    bucketid: string;
                    name: string;
                    owner: string;
                    metadata: Json;
                };
                Returns: undefined;
            };
            extension: {
                Args: {
                    name: string;
                };
                Returns: string;
            };
            filename: {
                Args: {
                    name: string;
                };
                Returns: string;
            };
            foldername: {
                Args: {
                    name: string;
                };
                Returns: unknown;
            };
            get_size_by_bucket: {
                Args: Record<PropertyKey, never>;
                Returns: {
                    size: number;
                    bucket_id: string;
                }[];
            };
            search: {
                Args: {
                    prefix: string;
                    bucketname: string;
                    limits?: number;
                    levels?: number;
                    offsets?: number;
                    search?: string;
                    sortcolumn?: string;
                    sortorder?: string;
                };
                Returns: {
                    name: string;
                    id: string;
                    updated_at: string;
                    created_at: string;
                    last_accessed_at: string;
                    metadata: Json;
                }[];
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
