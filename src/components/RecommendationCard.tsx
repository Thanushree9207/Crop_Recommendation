import { TrendingUp, DollarSign, Sprout, Calendar, CheckCircle } from 'lucide-react';
import { RecommendedCrop } from '../lib/supabase';

interface RecommendationCardProps {
  crop: RecommendedCrop;
  rank: number;
}

const DEMAND_COLORS = {
  high: 'text-green-600 bg-green-50',
  medium: 'text-yellow-600 bg-yellow-50',
  low: 'text-orange-600 bg-orange-50',
};

const DEMAND_ICONS = {
  high: '📈',
  medium: '📊',
  low: '📉',
};

export function RecommendationCard({ crop, rank }: RecommendationCardProps) {
  const demandColor = DEMAND_COLORS[crop.demand_level as keyof typeof DEMAND_COLORS] || DEMAND_COLORS.medium;
  const demandIcon = DEMAND_ICONS[crop.demand_level as keyof typeof DEMAND_ICONS] || DEMAND_ICONS.medium;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">#{rank}</span>
              <h3 className="text-2xl font-bold text-white">{crop.name}</h3>
            </div>
            <p className="text-green-50 text-sm mt-1">{crop.category}</p>
          </div>
          <div className="bg-white rounded-full px-4 py-2">
            <div className="text-2xl font-bold text-green-600">{Math.round(crop.score)}%</div>
            <div className="text-xs text-gray-600">Match</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-4">{crop.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-700 mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-semibold">Market Price</span>
            </div>
            <div className="text-xl font-bold text-gray-900">₹{crop.market_price}/kg</div>
          </div>

          <div className={`rounded-lg p-3 ${demandColor}`}>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">Market Demand</span>
            </div>
            <div className="text-xl font-bold flex items-center gap-2">
              <span>{demandIcon}</span>
              <span className="capitalize">{crop.demand_level}</span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-blue-700 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-semibold">Season</span>
            </div>
            <div className="text-lg font-bold text-blue-900">{crop.growing_season}</div>
          </div>

          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-700 mb-1">
              <Sprout className="w-4 h-4" />
              <span className="text-sm font-semibold">Compatibility</span>
            </div>
            <div className="text-lg font-bold text-green-900">Excellent</div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Why This Crop?
          </h4>
          <ul className="space-y-1">
            {crop.reasons.map((reason, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-green-500 mt-0.5">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
