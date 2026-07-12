"use client";

import { X, CheckCircle, AlertTriangle } from "lucide-react";

interface MatchingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  rawName: string;
  platform: string;
  candidates: { product_id: number; product_name: string; confidence: number }[];
  onConfirm: (productId: number, isCorrection: boolean) => void;
  onCreateNew: () => void;
}

export default function MatchingDialog({ 
  isOpen, onClose, rawName, platform, candidates, onConfirm, onCreateNew 
}: MatchingDialogProps) {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-amber-50 border-b border-amber-100 p-6">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="bg-amber-100 p-2 rounded-full text-amber-600 h-fit">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Verifikasi Nama Produk</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Sistem menemukan produk dengan nama yang mirip. Apakah ini produk yang sama?
                </p>
              </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Nama dari Screenshot ({platform})</p>
            <p className="font-medium text-slate-900 text-lg">"{rawName}"</p>
          </div>

          <p className="text-sm font-medium text-slate-700 mb-3">Pilih produk yang sesuai di Katalog:</p>
          
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {candidates.map((candidate, idx) => (
              <div 
                key={candidate.product_id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition cursor-pointer"
                onClick={() => onConfirm(candidate.product_id, true)}
              >
                <div>
                  <p className="font-semibold text-slate-800">{candidate.product_name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kemiripan: <span className="font-medium text-slate-700">{Math.round(candidate.confidence * 100)}%</span>
                  </p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5">
                  <CheckCircle size={16} />
                  Pilih
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onCreateNew}
              className="flex-1 px-4 py-2.5 border-2 border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition"
            >
              Bukan Keduanya (Buat Baru)
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 font-medium rounded-xl hover:bg-slate-200 transition"
            >
              Nanti Saja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
