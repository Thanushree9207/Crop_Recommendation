import { useState } from 'react';
import { Sprout, Sparkles, Info } from 'lucide-react';
import { InputForm } from './components/InputForm';
import { RecommendationCard } from './components/RecommendationCard';
import { MarketInsights } from './components/MarketInsights';
import { supabase, RecommendationInput, RecommendedCrop } from './lib/supabase';
import { calculateRecommendations } from './utils/recommendationEngine';

function App() {
  const [recommendations, setRecommendations] = useState<RecommendedCrop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (input: RecommendationInput) => {
    setLoading(true);
    setError(null);

    try {
      const { data: crops, error: fetchError } = await supabase
        .from('crops')
        .select('*');

      if (fetchError) throw fetchError;

      if (!crops || crops.length === 0) {
        throw new Error('No crop data available');
      }

      const recommended = calculateRecommendations(crops, input);

      setRecommendations(recommended);

      await supabase.from('recommendations').insert({
        soil_type: input.soil_type,
        rainfall: input.rainfall,
        temperature: input.temperature,
        climate: input.climate,
        farm_size: input.farm_size,
        recommended_crops: recommended.map(r => ({
          name: r.name,
          score: r.score,
        })),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-green-600 p-3 rounded-2xl shadow-lg">
              <Sprout className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
              CropAdvisor
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered crop recommendations based on your soil, climate, and market trends
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
            <Sparkles className="w-4 h-4" />
            <span>Smart farming decisions for maximum yield and profit</span>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <InputForm onSubmit={handleSubmit} loading={loading} />
          </div>
          <div>
            <MarketInsights />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800">Error</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {recommendations.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-800">
                Recommended Crops for Your Farm
              </h2>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {recommendations.map((crop, index) => (
                <RecommendationCard
                  key={crop.id}
                  crop={crop}
                  rank={index + 1}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && recommendations.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
              <Sprout className="w-20 h-20 text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Get Started with Smart Crop Planning
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Enter your farm details above to receive personalized crop recommendations.
                Our AI analyzes soil type, climate conditions, rainfall patterns, and current
                market trends to suggest the most profitable crops for your land.
              </p>
            </div>
          </div>
        )}

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <div className="border-t pt-8">
            <p>Powered by advanced agricultural data and market analytics</p>
            <p className="mt-2">Helping farmers make data-driven decisions</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
