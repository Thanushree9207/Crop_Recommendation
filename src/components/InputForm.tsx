import { useState } from 'react';
import { Cloud, Droplets, Thermometer, Mountain, Ruler } from 'lucide-react';
import { RecommendationInput } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';

interface InputFormProps {
  onSubmit: (input: RecommendationInput) => void;
  loading: boolean;
}

const SOIL_TYPES = ['Loamy', 'Clay', 'Sandy', 'Sandy Loam', 'Clay Loam', 'Black', 'Red'];
const CLIMATE_TYPES = ['Tropical', 'Sub-tropical', 'Temperate', 'Arid', 'Semi-arid'];

export function InputForm({ onSubmit, loading }: InputFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<RecommendationInput>({
    soil_type: '',
    rainfall: 0,
    temperature: 0,
    climate: '',
    farm_size: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isValid = formData.soil_type && formData.climate && formData.rainfall > 0 && formData.temperature > 0 && formData.farm_size > 0;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Mountain className="inline w-4 h-4 mr-2" />
            {t('form.soilType')}
          </label>
          <select
            value={formData.soil_type}
            onChange={(e) => setFormData({ ...formData, soil_type: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            required
          >
            <option value="">{t('form.selectSoil')}</option>
            {SOIL_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(`soilTypes.${type}`)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Cloud className="inline w-4 h-4 mr-2" />
            {t('form.climate')}
          </label>
          <select
            value={formData.climate}
            onChange={(e) => setFormData({ ...formData, climate: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            required
          >
            <option value="">{t('form.selectClimate')}</option>
            {CLIMATE_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(`climateTypes.${type}`)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Droplets className="inline w-4 h-4 mr-2" />
            {t('form.rainfall')}
          </label>
          <input
            type="number"
            value={formData.rainfall || ''}
            onChange={(e) => setFormData({ ...formData, rainfall: Number(e.target.value) })}
            placeholder={t('form.rainfallPlaceholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Thermometer className="inline w-4 h-4 mr-2" />
            {t('form.temperature')}
          </label>
          <input
            type="number"
            value={formData.temperature || ''}
            onChange={(e) => setFormData({ ...formData, temperature: Number(e.target.value) })}
            placeholder={t('form.tempPlaceholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Ruler className="inline w-4 h-4 mr-2" />
            {t('form.farmSize')}
          </label>
          <input
            type="number"
            value={formData.farm_size || ''}
            onChange={(e) => setFormData({ ...formData, farm_size: Number(e.target.value) })}
            placeholder={t('form.farmSizePlaceholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            min="0"
            step="0.1"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid || loading}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? t('form.analyzing') : t('form.submit')}
      </button>
    </form>
  );
}
