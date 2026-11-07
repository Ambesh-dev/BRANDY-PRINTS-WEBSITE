import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let Icon = CheckCircle2;
        let borderClass = "border-cyan-500/40 text-cyan-400";
        let bgClass = "bg-[#0c121e]/95";

        if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = "border-red-500/40 text-red-400";
        } else if (toast.type === 'info') {
          Icon = Info;
          borderClass = "border-purple-500/40 text-purple-400";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border ${borderClass} ${bgClass} shadow-2xl backdrop-blur-md transform transition-all duration-300 animate-slide-in`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium text-slate-200">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
