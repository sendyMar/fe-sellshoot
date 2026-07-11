"use client";

import { useTasks } from "@/hooks/useTasks";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Package, 
  MessageCircle, 
  ShoppingCart, 
  ListTodo,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface TaskTabProps {
  date: string;
}

export default function TaskTab({ date }: TaskTabProps) {
  const { tasks, isLoading, toggleTaskStatus } = useTasks(date);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'order': return <ShoppingCart className="w-4 h-4" />;
      case 'restock': return <Package className="w-4 h-4" />;
      case 'reply_chat': return <MessageCircle className="w-4 h-4" />;
      case 'packing': return <Package className="w-4 h-4" />;
      default: return <ListTodo className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string, isCompleted: boolean) => {
    if (isCompleted) return "bg-slate-50 border-slate-200 text-slate-500";
    
    switch (priority) {
      case 'urgent': return "bg-red-50 border-red-200 text-red-900";
      case 'low': return "bg-slate-50 border-slate-200 text-slate-700";
      default: return "bg-blue-50 border-blue-200 text-blue-900";
    }
  };
  
  const getPriorityBadge = (priority: string, isCompleted: boolean) => {
    if (isCompleted) return "bg-slate-200 text-slate-500";
    
    switch (priority) {
      case 'urgent': return "bg-red-200 text-red-800";
      case 'low': return "bg-slate-200 text-slate-700";
      default: return "bg-blue-200 text-blue-800";
    }
  };

  const formattedDate = format(new Date(date), "EEEE, d MMMM yyyy", { locale: id });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p>Memuat daftar tugas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Daftar Tugas</h1>
          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
            <Clock className="w-4 h-4" /> {formattedDate}
          </p>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
          <ListTodo className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-slate-900">Belum ada tugas</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Daftar tugas akan di-generate secara otomatis oleh AI setelah Anda memverifikasi hasil ekstraksi.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className={`flex gap-4 p-4 rounded-xl border transition-all duration-300 ${getPriorityColor(task.priority, task.is_completed)} ${task.is_completed ? 'opacity-60' : 'hover:shadow-md'}`}
            >
              <button 
                onClick={() => toggleTaskStatus(task.id, task.is_completed)}
                className={`mt-1 shrink-0 flex items-center justify-center w-6 h-6 rounded-full transition-colors ${task.is_completed ? 'text-emerald-500' : 'text-slate-400 hover:text-indigo-500'}`}
              >
                {task.is_completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${getPriorityBadge(task.priority, task.is_completed)}`}>
                    {task.priority.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-white/50 border border-black/5 font-medium">
                    {getCategoryIcon(task.category)}
                    {task.category.replace('_', ' ')}
                  </span>
                  {task.platform && task.platform !== 'semua' && (
                    <span className="text-xs px-2 py-0.5 rounded bg-white/50 border border-black/5 font-medium capitalize">
                      {task.platform}
                    </span>
                  )}
                </div>
                
                <h3 className={`font-semibold text-lg ${task.is_completed ? 'line-through' : ''}`}>
                  {task.title}
                </h3>
                
                {task.description && (
                  <p className="text-sm mt-1 opacity-80 line-clamp-2">
                    {task.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
