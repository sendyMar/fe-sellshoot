"use client";

import { useDashboard } from "@/hooks/useDashboard";
import { ChevronLeft, ChevronRight, Lock, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import DailyTaskDrawer from "./_components/DailyTaskDrawer";
import ModalAlert from "./_components/ModalAlert";

const DAYS_OF_WEEK = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

export default function DashboardPage() {
  const { calendarData, isLoading, currentYear, currentMonth, handlePrevMonth, handleNextMonth } = useDashboard();
  
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDayClick = (day: any) => {
    if (day.status === "future") return;
    
    if (day.status === "no_activity") {
      setIsModalOpen(true);
      return;
    }

    setSelectedDate(day.date);
    setIsDrawerOpen(true);
  };

  const renderCalendar = () => {
    if (!calendarData) return null;

    // Pad beginning of month
    const firstDayOfWeek = calendarData.days[0].day_of_week;
    const paddingDays = Array.from({ length: firstDayOfWeek }).map((_, i) => (
      <div key={`pad-${i}`} className="h-32 bg-slate-50 border border-slate-100 rounded-xl" />
    ));

    const monthDays = calendarData.days.map((day) => {
      const isToday = day.status === "today";
      const isCompleted = day.status === "completed";
      const isFuture = day.status === "future";
      const isMissed = day.status === "no_activity";

      return (
        <div
          key={day.date}
          onClick={() => handleDayClick(day)}
          className={`relative h-32 border rounded-xl p-4 transition-all flex flex-col justify-between
            ${isFuture ? "bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed" : "bg-white cursor-pointer hover:shadow-md hover:border-violet-300"}
            ${isToday ? "border-violet-400 bg-violet-50/30" : "border-slate-200"}
          `}
        >
          <div className="flex justify-between items-start">
            <span className={`font-semibold text-lg ${isToday ? "text-violet-700" : "text-slate-700"}`}>
              {parseInt(day.date.split('-')[2])}
            </span>
            
            {isFuture && <Lock className="text-slate-400" size={20} />}
            {isMissed && <XCircle className="text-slate-300" size={24} />}
            {isCompleted && <CheckCircle2 className="text-green-500" size={24} />}
          </div>

          <div>
            {isToday && (
              <button className="w-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium py-2 rounded-lg transition shadow-sm">
                Do Now
              </button>
            )}
            {isCompleted && (
              <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium py-2 rounded-lg transition">
                Lihat Laporan
              </button>
            )}
          </div>
        </div>
      );
    });

    return [...paddingDays, ...monthDays];
  };

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Operational Calendar</h1>
          <p className="text-slate-500">Pusat komando harian Anda.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
          <button 
            onClick={handlePrevMonth}
            className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-semibold text-slate-800 min-w-[120px] text-center">
            {monthNames[currentMonth - 1]} {currentYear}
          </span>
          <button 
            onClick={handleNextMonth}
            className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="h-96 flex items-center justify-center text-slate-500 bg-white rounded-2xl border border-slate-200">
          Memuat Kalender...
        </div>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="grid grid-cols-7 gap-4 mb-4">
            {DAYS_OF_WEEK.map(day => (
              <div key={day} className="text-center font-semibold text-slate-500 text-sm tracking-wider uppercase">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-4">
            {renderCalendar()}
          </div>
        </div>
      )}

      {isDrawerOpen && selectedDate && (
        <DailyTaskDrawer 
          date={selectedDate} 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)}
          isReadOnly={selectedDate !== new Date().toISOString().split('T')[0]} // True jika bukan hari ini
        />
      )}

      {isModalOpen && (
        <ModalAlert 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Task Terlewat!"
          message="Task anda terlewat nih, jangan lupa rutin laporan untuk meningkatkan performa penjualan harianmu!"
        />
      )}
    </div>
  );
}
