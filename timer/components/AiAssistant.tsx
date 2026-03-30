import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, ChatMessage } from '../types';
import { chatWithAi } from '../services/geminiService';
import { Send, Bot, User } from 'lucide-react';

interface AiAssistantProps {
  profile: UserProfile;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ profile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: `你好 ${profile.name}! 我是你的健康助手。关于饮食、运动或减重，有什么我可以帮你的吗？`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Build context string from profile
      const context = `
        Name: ${profile.name}, Age: ${profile.age}, Gender: ${profile.gender},
        Weight: ${profile.weight}kg, Goal: ${profile.targetWeight}kg,
        Activity: ${profile.activityLevel}.
      `;
      
      const responseText = await chatWithAi(userMsg.text, context);
      
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = { role: 'model', text: "抱歉，我现在遇到一点连接问题，请稍后再试。", timestamp: new Date() };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] md:h-[600px] flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-emerald-600 p-4 text-white flex items-center gap-2">
         <Bot className="w-6 h-6" />
         <h2 className="font-semibold">AI 健康教练</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div
                className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex justify-start">
             <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none text-slate-500 text-xs flex items-center gap-1">
               <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
               <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
               <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="问些什么... (例如：晚上饿了吃什么不胖？)"
          className="flex-1 border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default AiAssistant;