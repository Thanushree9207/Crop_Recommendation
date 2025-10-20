import { Crop, RecommendationInput, RecommendedCrop } from '../lib/supabase';

export function calculateRecommendations(
  crops: Crop[],
  input: RecommendationInput
): RecommendedCrop[] {
  const recommendations: RecommendedCrop[] = [];

  for (const crop of crops) {
    let score = 0;
    const reasons: string[] = [];

    if (crop.optimal_soil_types.includes(input.soil_type)) {
      score += 30;
      reasons.push(`Perfect match for ${input.soil_type} soil type`);
    } else {
      score += 5;
      reasons.push(`Can grow in ${input.soil_type} soil with proper care`);
    }

    if (input.rainfall >= crop.min_rainfall && input.rainfall <= crop.max_rainfall) {
      score += 30;
      reasons.push(`Ideal rainfall range (${crop.min_rainfall}-${crop.max_rainfall}mm)`);
    } else if (
      input.rainfall >= crop.min_rainfall * 0.8 &&
      input.rainfall <= crop.max_rainfall * 1.2
    ) {
      score += 15;
      reasons.push(`Acceptable rainfall with irrigation management`);
    } else {
      score += 5;
      reasons.push(`May require significant water management`);
    }

    if (input.temperature >= crop.min_temp && input.temperature <= crop.max_temp) {
      score += 25;
      reasons.push(`Perfect temperature range (${crop.min_temp}-${crop.max_temp}°C)`);
    } else if (
      input.temperature >= crop.min_temp * 0.9 &&
      input.temperature <= crop.max_temp * 1.1
    ) {
      score += 12;
      reasons.push(`Acceptable temperature with proper timing`);
    } else {
      score += 3;
      reasons.push(`Temperature may be challenging`);
    }

    if (crop.demand_level === 'high') {
      score += 10;
      reasons.push(`High market demand ensures good returns`);
    } else if (crop.demand_level === 'medium') {
      score += 5;
      reasons.push(`Stable market demand`);
    }

    if (crop.market_price > 50) {
      score += 5;
      reasons.push(`Premium market price of ₹${crop.market_price}/kg`);
    } else if (crop.market_price > 30) {
      score += 3;
      reasons.push(`Good market price of ₹${crop.market_price}/kg`);
    }

    if (score >= 40) {
      recommendations.push({
        ...crop,
        score,
        reasons,
      });
    }
  }

  recommendations.sort((a, b) => b.score - a.score);

  return recommendations.slice(0, 6);
}
