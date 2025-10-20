import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Crop {
  id: string;
  name: string;
  category: string;
  optimal_soil_types: string[];
  min_rainfall: number;
  max_rainfall: number;
  min_temp: number;
  max_temp: number;
  growing_season: string;
  market_price: number;
  demand_level: string;
  description: string;
}

export interface RecommendationInput {
  soil_type: string;
  rainfall: number;
  temperature: number;
  climate: string;
  farm_size: number;
}

export interface RecommendedCrop extends Crop {
  score: number;
  reasons: string[];
}
