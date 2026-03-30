import React, { useState } from 'react';
import { UserProfile, Gender, ActivityLevel } from '../types';
import { ArrowRight, Activity, Ruler, Weight, User as UserIcon } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    gender: Gender.Male,
    activityLevel: ActivityLevel.Sedentary,
    height: 170,
    weight: 70,
    targetWeight: 65,
    age: 30,
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.age && formData.height && formData.weight && formData.targetWeight) {
      onComplete(formData as UserProfile);
    }
  };

  const handleChange = (field: keyof UserProfile, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-emerald-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="bg-emerald-700 p-6 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">欢迎来到 SmartFit</h1>
          <p className="text-emerald-100">让我们为您定制专属的减重计划</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">您的称呼</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  placeholder="例如：李明"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">身高 (cm)</label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                  <input
                    type="number"
                    required
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.height}
                    onChange={(e) => handleChange('height', Number(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">年龄</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                  <input
                    type="number"
                    required
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.age}
                    onChange={(e) => handleChange('age', Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">当前体重 (kg)</label>
                <div className="relative">
                  <Weight className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                  <input
                    type="number"
                    required
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.weight}
                    onChange={(e) => handleChange('weight', Number(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">目标体重 (kg)</label>
                <div className="relative">
                  <Activity className="absolute left-3 top-3 text-emerald-400 w-5 h-5" />
                  <input
                    type="number"
                    required
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none border-emerald-200 bg-emerald-50"
                    value={formData.targetWeight}
                    onChange={(e) => handleChange('targetWeight', Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">性别</label>
              <div className="flex gap-4">
                {Object.values(Gender).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleChange('gender', g)}
                    className={`flex-1 py-2 rounded-lg border text-sm transition-colors ${
                      formData.gender === g 
                        ? 'bg-emerald-600 text-white border-emerald-600' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {g === 'Male' ? '男' : g === 'Female' ? '女' : '其他'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">日常活动量</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                value={formData.activityLevel}
                onChange={(e) => handleChange('activityLevel', e.target.value as ActivityLevel)}
              >
                <option value={ActivityLevel.Sedentary}>久坐不动 (办公室工作)</option>
                <option value={ActivityLevel.LightlyActive}>轻度活动 (每周运动1-3次)</option>
                <option value={ActivityLevel.ModeratelyActive}>中度活动 (每周运动3-5次)</option>
                <option value={ActivityLevel.VeryActive}>重度活动 (体力劳动或每天运动)</option>
              </select>
            </div>
            
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">饮食禁忌 (选填)</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="例如: 花生过敏, 素食主义..."
                value={formData.dietaryRestrictions || ''}
                onChange={(e) => handleChange('dietaryRestrictions', e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group"
          >
            开始我的减重之旅
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;