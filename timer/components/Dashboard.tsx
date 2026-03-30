import React from 'react';
import { UserProfile } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Trophy, TrendingDown, Scale } from 'lucide-react';

interface DashboardProps {
  profile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ profile }) => {
  // Mock data for visualization based on current stats
  const weightData = [
    { name: 'Week 1', weight: profile.weight + 2 },
    { name: 'Week 2', weight: profile.weight + 1.5 },
    { name: 'Week 3', weight: profile.weight + 0.8 },
    { name: 'Current', weight: profile.weight },
    { name: 'Goal', weight: profile.targetWeight },
  ];

  const bmi = (profile.weight / ((profile.height / 100) * (profile.height / 100))).toFixed(1);
  const weightToLose = (profile.weight - profile.targetWeight).toFixed(1);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">你好, {profile.name} 👋</h2>
        <p className="text-slate-500">这是您今天的健康概览</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Scale className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-slate-500">当前体重</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{profile.weight} <span className="text-sm font-normal text-slate-400">kg</span></p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
              <Trophy className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-slate-500">目标体重</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{profile.targetWeight} <span className="text-sm font-normal text-slate-400">kg</span></p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-slate-500">BMI 指数</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{bmi}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
              <TrendingDown className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-slate-500">待减重量</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{weightToLose} <span className="text-sm font-normal text-slate-400">kg</span></p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-80">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">体重趋势预测</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weightData}>
            <defs>
              <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
            <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="weight" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorWeight)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-white shadow-lg">
        <h3 className="text-xl font-bold mb-2">每日健康小贴士</h3>
        <p className="opacity-90">
            {profile.activityLevel === 'Sedentary' 
             ? '由于您的活动量较少，建议每工作1小时站立活动5分钟，促进血液循环。' 
             : '保持当前的活动水平非常棒！记得运动后及时补充水分和蛋白质。'}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;