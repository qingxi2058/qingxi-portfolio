import React, { useState } from 'react';
import { WorkoutPlan, UserProfile } from '../types';
import { generateWorkoutPlan } from '../services/geminiService';
import { Dumbbell, Clock, Zap, RefreshCw, PlayCircle } from 'lucide-react';

interface WorkoutPlannerProps {
  profile: UserProfile;
}

const WorkoutPlanner: React.FC<WorkoutPlannerProps> = ({ profile }) => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await generateWorkoutPlan(profile);
      setPlan(result);
    } catch (err) {
      setError('无法生成训练计划，请重试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">今日训练</h2>
          <p className="text-slate-500">为您定制的燃脂塑形方案</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Dumbbell className="w-4 h-4" />}
          {plan ? '更换计划' : '生成训练'}
        </button>
      </div>

      {error && <div className="text-red-500 bg-red-50 p-3 rounded">{error}</div>}

      {!plan && !loading && (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center text-slate-400">
          <Zap className="w-16 h-16 mb-4 opacity-50" />
          <p>准备好流汗了吗？点击生成计划</p>
        </div>
      )}

      {loading && (
         <div className="space-y-4">
             <div className="h-32 bg-slate-100 rounded-xl animate-pulse"></div>
             <div className="h-64 bg-slate-100 rounded-xl animate-pulse"></div>
         </div>
      )}

      {plan && (
        <div className="space-y-6 animate-fade-in">
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
             <div className="flex justify-between items-start mb-6">
                <div>
                   <h3 className="text-xl font-bold mb-1">{plan.focusArea}</h3>
                   <span className="bg-white/20 px-2 py-1 rounded text-xs font-medium border border-white/20">
                     难度: {plan.difficulty}
                   </span>
                </div>
                <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                   <Clock className="w-4 h-4" />
                   <span className="text-sm font-medium">{plan.estimatedDuration}</span>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4 text-sm bg-white/10 p-4 rounded-lg">
                <div>
                   <span className="block text-white/60 text-xs uppercase tracking-wider mb-1">热身</span>
                   <p>{plan.warmup}</p>
                </div>
                <div>
                   <span className="block text-white/60 text-xs uppercase tracking-wider mb-1">冷身拉伸</span>
                   <p>{plan.cooldown}</p>
                </div>
             </div>
          </div>

          {/* Exercises List */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-blue-600" />
                正式训练动作
            </h3>
            {plan.exercises.map((ex, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                   <h4 className="text-lg font-bold text-slate-800">{ex.name}</h4>
                   <p className="text-sm text-slate-500 mt-1">{ex.notes}</p>
                </div>
                <div className="flex items-center gap-4 text-sm font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="text-center">
                        <div className="text-xs text-slate-400 uppercase">Sets</div>
                        <div className="font-bold text-slate-800">{ex.sets}</div>
                    </div>
                     <div className="w-px h-8 bg-slate-300"></div>
                     <div className="text-center">
                        <div className="text-xs text-slate-400 uppercase">Reps</div>
                        <div className="font-bold text-slate-800">{ex.reps}</div>
                    </div>
                    {ex.duration && (
                       <>
                         <div className="w-px h-8 bg-slate-300"></div>
                         <div className="text-center">
                            <div className="text-xs text-slate-400 uppercase">Time</div>
                            <div className="font-bold text-slate-800">{ex.duration}</div>
                         </div>
                       </>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanner;