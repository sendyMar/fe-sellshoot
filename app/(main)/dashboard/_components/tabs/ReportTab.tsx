"use client";

import { BarChart3, Sparkles, Loader2, RefreshCw } from "lucide-react";
import { useReport } from "@/hooks/useReport";
import { toast } from "sonner";

export default function ReportTab({ date }: { date: string }) {
  const { report, isLoading, isGenerating, generateReport } = useReport(date);

  const handleGenerate = async () => {
    toast.info("AI sedang menganalisis performa harian Anda...");
    const res = await generateReport();
    if (res.success) {
      toast.success("Berhasil merangkum laporan!");
    } else {
      toast.error(res.message || "Gagal membuat laporan.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
        <p>Memuat Laporan Harian...</p>
      </div>
    );
  }

  if (!report && !isGenerating) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center mt-6">
        <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-slate-900">Belum ada Laporan Hari Ini</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto mb-6">
          Klik tombol di bawah agar AI dapat merangkum data ekstraksi dan penyelesaian tugas Anda menjadi satu wawasan bisnis yang menarik.
        </p>
        <button
          onClick={handleGenerate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          Generate Laporan & Insight
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">Laporan Performa</h2>
        {report && (
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Perbarui
          </button>
        )}
      </div>

      {(isGenerating && !report) ? (
        <div className="flex flex-col items-center justify-center py-12 text-indigo-600">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <p className="font-medium">AI sedang menyusun laporan ajaib Anda...</p>
        </div>
      ) : (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 font-semibold text-slate-700 flex items-center gap-2">
            <BarChart3 size={18} />
            Snapshot Performa
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                <p className="text-blue-600 text-sm font-medium mb-1">Total Order</p>
                <p className="text-3xl font-bold text-blue-900">{report?.total_orders || 0}</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex flex-col justify-center">
                <p className="text-emerald-600 text-sm font-medium mb-1">Task Selesai</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-3xl font-bold text-emerald-900">{report?.completed_tasks || 0}</p>
                  <p className="text-lg text-emerald-700/50 font-medium">/ {report?.total_tasks || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-100 p-5 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-violet-500" size={18} />
                <h4 className="font-bold text-violet-900">AI Insight</h4>
              </div>
              <p className="text-sm text-violet-800 leading-relaxed font-medium whitespace-pre-wrap">
                {report?.ai_insight}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
