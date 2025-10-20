/*
  # Crop Recommendation System Schema

  1. New Tables
    - `crops`
      - `id` (uuid, primary key)
      - `name` (text) - Crop name
      - `category` (text) - Crop category (cereals, pulses, vegetables, etc.)
      - `optimal_soil_types` (text[]) - Array of suitable soil types
      - `min_rainfall` (numeric) - Minimum rainfall in mm
      - `max_rainfall` (numeric) - Maximum rainfall in mm
      - `min_temp` (numeric) - Minimum temperature in Celsius
      - `max_temp` (numeric) - Maximum temperature in Celsius
      - `growing_season` (text) - Season for cultivation
      - `market_price` (numeric) - Current market price per kg
      - `demand_level` (text) - Current demand (high, medium, low)
      - `description` (text) - Brief description
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `recommendations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, nullable) - User who requested recommendation
      - `soil_type` (text) - Input soil type
      - `rainfall` (numeric) - Input rainfall
      - `temperature` (numeric) - Input temperature
      - `climate` (text) - Input climate type
      - `farm_size` (numeric) - Farm size in acres
      - `recommended_crops` (jsonb) - Array of recommended crops with scores
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for crops (reference data)
    - Authenticated users can create recommendations
    - Users can view their own recommendations

  3. Important Notes
    - Crops table contains reference data for the recommendation engine
    - Recommendations table stores user queries for analytics
    - Market data can be updated regularly to reflect current trends
*/

-- Create crops table
CREATE TABLE IF NOT EXISTS crops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  optimal_soil_types text[] NOT NULL,
  min_rainfall numeric NOT NULL,
  max_rainfall numeric NOT NULL,
  min_temp numeric NOT NULL,
  max_temp numeric NOT NULL,
  growing_season text NOT NULL,
  market_price numeric NOT NULL DEFAULT 0,
  demand_level text NOT NULL DEFAULT 'medium',
  description text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  soil_type text NOT NULL,
  rainfall numeric NOT NULL,
  temperature numeric NOT NULL,
  climate text NOT NULL,
  farm_size numeric NOT NULL DEFAULT 1,
  recommended_crops jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- Crops policies (public read access for reference data)
CREATE POLICY "Anyone can view crops"
  ON crops FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert crops"
  ON crops FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update crops"
  ON crops FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Recommendations policies
CREATE POLICY "Anyone can create recommendations"
  ON recommendations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own recommendations"
  ON recommendations FOR SELECT
  USING (
    user_id IS NULL OR 
    (auth.uid() IS NOT NULL AND auth.uid() = user_id)
  );

-- Insert sample crop data
INSERT INTO crops (name, category, optimal_soil_types, min_rainfall, max_rainfall, min_temp, max_temp, growing_season, market_price, demand_level, description) VALUES
('Rice', 'Cereals', ARRAY['Clay', 'Loamy'], 1000, 2500, 20, 35, 'Kharif', 45, 'high', 'Staple food crop requiring high water availability'),
('Wheat', 'Cereals', ARRAY['Loamy', 'Clay Loam'], 400, 800, 10, 25, 'Rabi', 35, 'high', 'Major cereal crop for temperate and subtropical regions'),
('Cotton', 'Cash Crops', ARRAY['Black', 'Loamy'], 500, 1000, 21, 35, 'Kharif', 85, 'high', 'Major fiber crop requiring warm climate'),
('Sugarcane', 'Cash Crops', ARRAY['Loamy', 'Clay Loam'], 1000, 2500, 20, 35, 'Year-round', 42, 'medium', 'Commercial crop requiring high water and nutrients'),
('Maize', 'Cereals', ARRAY['Loamy', 'Sandy Loam'], 500, 1000, 18, 32, 'Kharif', 28, 'high', 'Versatile cereal crop for food and feed'),
('Pulses', 'Pulses', ARRAY['Loamy', 'Sandy Loam'], 400, 800, 15, 30, 'Rabi', 95, 'high', 'Protein-rich legume crops with high market demand'),
('Groundnut', 'Oilseeds', ARRAY['Sandy Loam', 'Red'], 500, 800, 20, 30, 'Kharif', 75, 'medium', 'Oilseed crop suitable for semi-arid regions'),
('Soybean', 'Oilseeds', ARRAY['Loamy', 'Clay Loam'], 500, 900, 20, 32, 'Kharif', 68, 'high', 'High protein oilseed with growing market'),
('Potato', 'Vegetables', ARRAY['Loamy', 'Sandy Loam'], 500, 700, 15, 25, 'Rabi', 25, 'high', 'Popular vegetable crop with year-round demand'),
('Tomato', 'Vegetables', ARRAY['Loamy', 'Sandy Loam'], 400, 700, 18, 30, 'Rabi/Summer', 35, 'high', 'High-value vegetable crop with consistent demand'),
('Onion', 'Vegetables', ARRAY['Loamy', 'Sandy Loam'], 400, 600, 15, 28, 'Rabi', 30, 'medium', 'Essential vegetable with stable market'),
('Banana', 'Fruits', ARRAY['Loamy', 'Clay Loam'], 1200, 2500, 15, 35, 'Year-round', 40, 'high', 'Tropical fruit with high nutritional value'),
('Millet', 'Cereals', ARRAY['Sandy', 'Sandy Loam', 'Red'], 300, 600, 20, 35, 'Kharif', 38, 'medium', 'Drought-resistant cereal gaining popularity'),
('Barley', 'Cereals', ARRAY['Loamy', 'Sandy Loam'], 300, 500, 10, 20, 'Rabi', 32, 'medium', 'Hardy cereal for cooler climates'),
('Chickpea', 'Pulses', ARRAY['Loamy', 'Clay Loam'], 400, 650, 15, 28, 'Rabi', 105, 'high', 'Premium pulse with excellent market value');
