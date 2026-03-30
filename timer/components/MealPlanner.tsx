import React, { useState } from 'react';
import { DailyMealPlan, UserProfile } from '../types';
import { generateMealPlan } from '../services/geminiService';
import { Utensils, RefreshCw, ChefHat, Flame, Droplet } from 'lucide-react';

interface MealPlannerProps {
  profile: UserProfile;
}

const MealPlanner: React.FC<MealPlannerProps> = ({ profile }) => {
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<DailyMealPlan | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const plan = await generateMealPlan(profile);
      setMealPlan(plan);
    } catch (err) {
      setError('无法生成食谱，请检查网络或稍后再试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">智能食谱</h2>
          <p className="text-slate-500">基于您的代谢情况定制的 {profile.targetWeight < profile.weight ? '减脂' : '增肌'} 饮食</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Utensils className="w-4 h-4" />}
          {mealPlan ? '重新生成' : '生成今日食谱'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {!mealPlan && !loading && (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center text-slate-400">
          <ChefHat className="w-16 h-16 mb-4 opacity-50" />
          <p>点击上方按钮生成您的专属食谱</p>
        </div>
      )}

      {loading && (
         <div className="space-y-4">
             {[1, 2, 3].map(i => (
                 <div key={i} className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
                     <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
                     <div className="h-20 bg-slate-100 rounded"></div>
                 </div>
             ))}
         </div>
      )}

      {mealPlan && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
             <h3 className="font-semibold text-emerald-800 mb-2">今日建议</h3>
             <p className="text-slate-600">{mealPlan.daySummary}</p>
             <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1"><Flame className="w-4 h-4 text-orange-500"/> 总热量: {mealPlan.totalCalories} kcal</span>
             </div>
          </div>

          <div className="grid gap-6">
            {mealPlan.meals.map((meal, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
                <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-700">{meal.type}</h3>
                  <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                    {meal.calories} kcal
                  </span>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-slate-800 mb-2">{meal.name}</h4>
                  
                  <div className="flex gap-4 mb-4 text-sm">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400">蛋白质</span>
                        <span className="font-medium text-slate-700">{meal.protein}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400">碳水</span>
                        <span className="font-medium text-slate-700">{meal.carbs}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400">脂肪</span>
                        <span className="font-medium text-slate-700">{meal.fat}</span>
                    </div>
                  </div>

                  <div className="text-sm text-slate-600">
                    <p className="font-medium mb-1 text-slate-500">主要食材:</p>
                    <div className="flex flex-wrap gap-2">
                      {meal.ingredients.map((ing, i) => (
                        <span key={i} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;