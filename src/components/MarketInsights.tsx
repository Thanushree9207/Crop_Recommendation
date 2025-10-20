import { TrendingUp, AlertCircle, BarChart3 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function MarketInsights() {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 shadow-md border border-blue-100">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-800">{t('insights.title')}</h3>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">{t('insights.highDemand')}</h4>
              <p className="text-sm text-gray-600">
                {t('insights.highDemandText')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">{t('insights.seasonal')}</h4>
              <p className="text-sm text-gray-600">
                {t('insights.seasonalText')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-yellow-600 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">{t('insights.export')}</h4>
              <p className="text-sm text-gray-600">
                {t('insights.exportText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
