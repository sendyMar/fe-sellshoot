"use client";

import { BarChart3, AlertCircle, Sparkles } from "lucide-react";

export default function ReportTab({ date }: { date: string }) {
  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex gap-3">
        <AlertCircle className="text-orange-500 mt-0.5" size={20} />
        <div>
          <h3 className="font-semibold text-orange-800">Tahap Pengembangan (Fase 7)</h3>
          <p className="text-orange-600 text-sm mt-1">
            Fitur Laporan Harian sedang dalam proses pengembangan. 
            AI Generative akan menganalisis keseluruhan data operasi Anda dan memberikan insight performa harian secara otomatis.
          </p>
        </div>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 font-semibold text-slate-700 flex items-center gap-2">
          <BarChart3 size={18} />
          Snapshot Performa (Dummy)
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
              <p className="text-blue-600 text-sm font-medium mb-1">Total Order</p>
              <p className="text-3xl font-bold text-blue-900">24</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
              <p className="text-emerald-600 text-sm font-medium mb-1">Task Selesai</p>
              <p className="text-3xl font-bold text-emerald-900">12<span className="text-lg text-emerald-700/50">/15</span></p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-100 p-5 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="text-violet-500" size={18} />
              <h4 className="font-bold text-violet-900">AI Insight</h4>
            </div>
            <p className="text-sm text-violet-800 leading-relaxed">
              Berdasarkan data hari ini, produk <strong>Kemeja Flanel Kotak</strong> mengalami peningkatan order signifikan dari Tokopedia. 
              Sangat disarankan untuk segera melakukan restock karena jumlah pesanan hari ini hampir melebihi stok global di katalog Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
