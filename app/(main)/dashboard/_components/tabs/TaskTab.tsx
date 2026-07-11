"use client";

import { ListChecks, AlertCircle } from "lucide-react";

export default function TaskTab({ date }: { date: string }) {
  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex gap-3">
        <AlertCircle className="text-orange-500 mt-0.5" size={20} />
        <div>
          <h3 className="font-semibold text-orange-800">Tahap Pengembangan (Fase 6)</h3>
          <p className="text-orange-600 text-sm mt-1">
            Fitur pembuatan task otomatis dari hasil ekstraksi AI sedang dalam proses pengembangan. 
            Nantinya, semua hasil ekstaksi yang diverifikasi akan muncul sebagai daftar periksa (checklist) di sini.
          </p>
        </div>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 font-semibold text-slate-700 flex items-center gap-2">
          <ListChecks size={18} />
          Contoh Task Harian (Dummy)
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
            <div>
              <p className="font-medium text-slate-800">Proses Order Segera: Kemeja Flanel Kotak (x2)</p>
              <p className="text-xs text-slate-500 mt-0.5">Prioritas Tinggi • Shopee</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition cursor-pointer">
            <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
            <div>
              <p className="font-medium text-slate-800">Restock Barang: Sepatu Sneaker Pria Premium</p>
              <p className="text-xs text-slate-500 mt-0.5">Stok menipis • Tokopedia</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg bg-slate-50 opacity-60">
            <input type="checkbox" checked readOnly className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
            <div>
              <p className="font-medium text-slate-800 line-through">Balas Komplain Pelanggan</p>
              <p className="text-xs text-slate-500 mt-0.5">Selesai • Instagram</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
