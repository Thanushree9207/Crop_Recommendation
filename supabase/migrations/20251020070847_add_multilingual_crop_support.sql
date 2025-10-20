/*
  # Add Multilingual Support for Crops

  1. Changes
    - Add `name_hi` column for Hindi crop names
    - Add `name_te` column for Telugu crop names
    - Add `name_ta` column for Tamil crop names
    - Add `name_mr` column for Marathi crop names
    - Add `description_hi` column for Hindi crop descriptions
    - Add `description_te` column for Telugu crop descriptions
    - Add `description_ta` column for Tamil crop descriptions
    - Add `description_mr` column for Marathi crop descriptions
    - Add `category_hi` column for Hindi crop categories
    - Add `category_te` column for Telugu crop categories
    - Add `category_ta` column for Tamil crop categories
    - Add `category_mr` column for Marathi crop categories

  2. Important Notes
    - This migration adds regional language support for the crops table
    - The English columns (name, description, category) remain as the default
    - These columns are optional and default to empty strings
    - Can be updated later with proper translations
*/

-- Add Hindi columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crops' AND column_name = 'name_hi'
  ) THEN
    ALTER TABLE crops ADD COLUMN name_hi text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crops' AND column_name = 'description_hi'
  ) THEN
    ALTER TABLE crops ADD COLUMN description_hi text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crops' AND column_name = 'category_hi'
  ) THEN
    ALTER TABLE crops ADD COLUMN category_hi text DEFAULT '';
  END IF;
END $$;

-- Add Telugu columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crops' AND column_name = 'name_te'
  ) THEN
    ALTER TABLE crops ADD COLUMN name_te text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crops' AND column_name = 'description_te'
  ) THEN
    ALTER TABLE crops ADD COLUMN description_te text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crops' AND column_name = 'category_te'
  ) THEN
    ALTER TABLE crops ADD COLUMN category_te text DEFAULT '';
  END IF;
END $$;

-- Add Tamil columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crops' AND column_name = 'name_ta'
  ) THEN
    ALTER TABLE crops ADD COLUMN name_ta text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crops' AND column_name = 'description_ta'
  ) THEN
    ALTER TABLE crops ADD COLUMN description_ta text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crops' AND column_name = 'category_ta'
  ) THEN
    ALTER TABLE crops ADD COLUMN category_ta text DEFAULT '';
  END IF;
END $$;

-- Add Marathi columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crops' AND column_name = 'name_mr'
  ) THEN
    ALTER TABLE crops ADD COLUMN name_mr text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crops' AND column_name = 'description_mr'
  ) THEN
    ALTER TABLE crops ADD COLUMN description_mr text DEFAULT '';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'crops' AND column_name = 'category_mr'
  ) THEN
    ALTER TABLE crops ADD COLUMN category_mr text DEFAULT '';
  END IF;
END $$;

-- Update some sample translations for popular crops
UPDATE crops SET 
  name_hi = 'चावल',
  category_hi = 'अनाज',
  description_hi = 'प्रमुख खाद्य फसल जिसके लिए उच्च जल उपलब्धता की आवश्यकता होती है'
WHERE name = 'Rice';

UPDATE crops SET 
  name_hi = 'गेहूं',
  category_hi = 'अनाज',
  description_hi = 'समशीतोष्ण और उपोष्णकटिबंधीय क्षेत्रों के लिए प्रमुख अनाज फसल'
WHERE name = 'Wheat';

UPDATE crops SET 
  name_hi = 'कपास',
  category_hi = 'नकदी फसल',
  description_hi = 'गर्म जलवायु की आवश्यकता वाली प्रमुख रेशा फसल'
WHERE name = 'Cotton';

UPDATE crops SET 
  name_hi = 'आलू',
  category_hi = 'सब्जियां',
  description_hi = 'साल भर मांग के साथ लोकप्रिय सब्जी फसल'
WHERE name = 'Potato';

UPDATE crops SET 
  name_hi = 'टमाटर',
  category_hi = 'सब्जियां',
  description_hi = 'लगातार मांग के साथ उच्च मूल्य वाली सब्जी फसल'
WHERE name = 'Tomato';
