"use client";

import { useState } from "react";
import { X, Calendar as CalendarIcon } from "lucide-react";
import ExtractionTab from "./tabs/ExtractionTab";
import TaskTab from "./tabs/TaskTab";
import ReportTab from "./tabs/ReportTab";

interface DailyTaskDrawerProps {
  date: string; // YYYY-MM-DD
  isOpen: boolean;
  onClose: () => void;
  isReadOnly: boolean;
}

export default function DailyTaskDrawer({ date, isOpen, onClose, isReadOnly }: DailyTaskDrawerProps) {
  const [activeTab, setActiveTab] = useState<'ekstraksi' | 'task' | 'report'>('ekstraksi');

  if (!isOpen) return null;

  // Format date for display
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-50 transition-opacity" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-screen w-full md:w-[50vw] bg-slate-50 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="bg-white border-b border-slate-200 p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Task Harian</h2>
              <div className="flex items-center gap-2 mt-2 text-slate-500 font-medium">
                <CalendarIcon size={16} />
                <span>{formattedDate}</span>
                {isReadOnly && (
                  <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md uppercase tracking-wide">
                    Read-Only
                  </span>
                )}
              </div>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition">
              <X size={24} />
            </button>
          </div>

          {/* Segmented Control */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['ekstraksi', 'task', 'report'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg capitalize transition-all duration-200 ${
                  activeTab === tab 
                    ? "bg-white text-violet-700 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 relative">
          {activeTab === 'ekstraksi' && <ExtractionTab date={date} isReadOnly={isReadOnly} />}
          {activeTab === 'task' && <TaskTab date={date} />}
          {activeTab === 'report' && <ReportTab date={date} />}
        </div>
      </div>
    </>
  );
}
