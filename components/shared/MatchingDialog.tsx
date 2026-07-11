"use client";

import { Product, MatchCandidate } from "@/services/catalog.service";
import { X, Check, XCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MatchingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  rawName: string;
  platform: string;
  candidates: MatchCandidate[];
  onConfirm: (productId: number) => Promise<void>;
  onReject: () => void;
}

export function MatchingDialog({ 
  isOpen, 
  onClose, 
  rawName, 
  platform, 
  candidates, 
  onConfirm, 
  onReject 
}: MatchingDialogProps) {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Konfirmasi Produk</h2>
            <p className="text-sm text-slate-500">Bantu sistem mengenali produk ini</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Nama Asli dari {platform}</p>
            <p className="text-base font-medium text-slate-900">{rawName}</p>
          </div>

          <h3 className="text-sm font-semibold text-slate-700 mb-3">Apakah ini sama dengan salah satu produk katalog Anda?</h3>
          
          <div className="space-y-3">
            {candidates.map((candidate) => (
              <div 
                key={candidate.product_id} 
                className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors group cursor-pointer"
                onClick={() => onConfirm(candidate.product_id)}
              >
                <div>
                  <p className="font-medium text-slate-900 group-hover:text-indigo-700">{candidate.product_name}</p>
                  <p className="text-xs text-slate-500 mt-1">Kemiripan: {Math.round(candidate.confidence * 100)}%</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors"
                >
                  <Check className="w-4 h-4 mr-1" /> Ya, Sama
                </Button>
              </div>
            ))}
          </div>

          {candidates.length === 0 && (
            <div className="text-center p-6 border border-dashed border-slate-200 rounded-xl mb-4 bg-slate-50 text-slate-500">
              Sistem tidak menemukan kandidat produk yang mirip.
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            className="flex-1 bg-white hover:bg-slate-100"
            onClick={onReject}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Bukan, Ini Produk Baru
          </Button>
          <Button 
            variant="ghost" 
            className="text-slate-500 hover:text-slate-700"
            onClick={onClose}
          >
            Nanti Saja
          </Button>
        </div>
      </div>
    </div>
  );
}
