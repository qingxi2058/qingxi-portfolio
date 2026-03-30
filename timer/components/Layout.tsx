import React from 'react';
import { LayoutDashboard, Utensils, Dumbbell, MessageSquare, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard', label: '概览', icon: LayoutDashboard },
    { id: 'meals', label: '饮食计划', icon: Utensils },
    { id: 'workouts', label: '健身计划', icon: Dumbbell },
    { id: 'chat', label: 'AI 教练', icon: MessageSquare },
    { id: 'profile', label: '个人信息', icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-xl font-bold text-emerald-600 flex items-center gap-2">
          <Dumbbell className="w-6 h-6" />
          SmartFit
        </h1>
      </div>

      {/* Sidebar / Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-white border-t md:border-t-0 md:border-r md:w-64 md:h-screen md:sticky md:top-0 z-10 flex md:flex-col justify-between md:justify-start">
        <div className="hidden md:flex items-center p-6 border-b">
          <Dumbbell className="w-8 h-8 text-emerald-600 mr-2" />
          <span className="text-2xl font-bold text-slate-800">SmartFit</span>
        </div>
        
        <div className="flex w-full md:flex-col justify-around md:justify-start md:p-4 md:space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col md:flex-row items-center p-2 md:p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-emerald-600 md:bg-emerald-50' 
                    : 'text-slate-500 hover:text-emerald-500 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-6 h-6 md:w-5 md:h-5 ${isActive ? 'fill-current opacity-20 md:fill-none md:opacity-100' : ''}`} />
                <span className={`text-xs md:text-sm md:ml-3 font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;