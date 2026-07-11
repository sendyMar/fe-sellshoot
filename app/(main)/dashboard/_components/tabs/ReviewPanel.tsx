"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, RefreshCcw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/useTasks";
import { toast } from "sonner";

interface ReviewPanelProps {
  reviewData: {
    auto_verified: any[];
    needs_review: any[];
  };
  onVerifyBatch: (itemIds: number[], corrections: any[]) => Promise<{ success: boolean }>;
  isVerifying?: boolean;
  onNavigateToTasks?: () => void;
}

export function ReviewPanel({ reviewData, onVerifyBatch, isVerifying = false, onNavigateToTasks }: ReviewPanelProps) {
  const [verifying, setVerifying] = useState(false);
  const [selectedNeedsReview, setSelectedNeedsReview] = useState<number[]>([]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const { generateTasks } = useTasks();
  
  const handleVerifyAll = async () => {
    setVerifying(true);
    // Kita approve semua yang auto-verified
    const autoVerifiedIds = reviewData.auto_verified.map(item => item.id);
    // Dan approve item dari needs_review yang dipilih oleh user
    const selectedReviewIds = selectedNeedsReview;
    
    // Saat ini corrections masih kosong (kita akan implementasi MatchingDialog nanti)
    const corrections: any[] = [];
    
    const allIds = [...autoVerifiedIds, ...selectedReviewIds];
    
    const res = await onVerifyBatch(allIds, corrections);
    
    if (res.success) {
      // Chain task generation!
      setIsGenerating(true);
      toast.info("Verifikasi sukses! Sedang menyusun daftar tugas (AI)...");
      const genRes = await generateTasks();
      
      setIsGenerating(false);
      
      if (genRes.success) {
        toast.success("Daftar tugas berhasil dibuat!");
        if (onNavigateToTasks) {
          onNavigateToTasks();
        }
      } else {
        toast.error(genRes.message || "Gagal menyusun daftar tugas.");
      }
    }
    
    setVerifying(false);
  };

  const toggleSelectNeedsReview = (id: number) => {
    setSelectedNeedsReview(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const totalItems = reviewData?.auto_verified?.length + reviewData?.needs_review?.length;
  
  if (!totalItems) {
    return null; // Tidak ada data untuk direview
  }

  return (
    <div className="space-y-6 pt-6 border-t border-slate-200 mt-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-slate-900 text-lg">Review Hasil Ekstraksi</h3>
        <Button 
          onClick={handleVerifyAll}
          disabled={verifying || isVerifying || isGenerating || (reviewData.auto_verified.length === 0 && selectedNeedsReview.length === 0)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {(verifying || isVerifying || isGenerating) ? <RefreshCcw className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
          Verifikasi Terpilih & Lanjut ke Task
        </Button>
      </div>

      {/* Auto Verified Section */}
      <div className="border border-emerald-200 bg-emerald-50 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-emerald-100/50 border-b border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="text-emerald-600" size={18} />
          <h4 className="font-semibold text-emerald-900">Terkonfirmasi Otomatis ({reviewData.auto_verified.length})</h4>
        </div>
        
        {reviewData.auto_verified.length > 0 ? (
          <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto">
            {reviewData.auto_verified.map(item => (
              <div key={item.id} className="flex gap-4 p-3 bg-white rounded-lg border border-emerald-100 shadow-sm">
                <div className="w-16 h-16 rounded overflow-hidden shrink-0 border border-slate-200">
                  <img src={item.screenshot_url} alt="Screenshot" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-slate-900 truncate" title={item.product_name}>
                      {item.product_name}
                    </p>
                    <span className="shrink-0 text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded ml-2">
                      {(item.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-sm text-slate-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Stts: <strong>{item.status}</strong></span>
                    <span>Qty: <strong>{item.quantity || '-'}</strong></span>
                    {item.price && <span>Hrg: <strong>Rp {item.price.toLocaleString('id-ID')}</strong></span>}
                  </div>
                  {item.matched_product && (
                    <div className="mt-2 text-xs text-emerald-600 flex items-center gap-1">
                      <ArrowRight size={12} /> Matched: {item.matched_product.canonical_name}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-sm text-emerald-700">Tidak ada item yang terkonfirmasi otomatis.</div>
        )}
      </div>

      {/* Needs Review Section */}
      <div className="border border-amber-200 bg-amber-50 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-amber-100/50 border-b border-amber-200 flex items-center gap-2">
          <AlertCircle className="text-amber-600" size={18} />
          <h4 className="font-semibold text-amber-900">Butuh Tinjauan ({reviewData.needs_review.length})</h4>
          <span className="text-xs text-amber-700 ml-auto">Pilih untuk memverifikasi secara paksa</span>
        </div>
        
        {reviewData.needs_review.length > 0 ? (
          <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
            {reviewData.needs_review.map(item => (
              <div key={item.id} className="flex gap-4 p-3 bg-white rounded-lg border border-amber-100 shadow-sm relative">
                <div className="absolute top-3 right-3">
                   <input 
                    type="checkbox" 
                    checked={selectedNeedsReview.includes(item.id)}
                    onChange={() => toggleSelectNeedsReview(item.id)}
                    className="w-5 h-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                   />
                </div>
                
                <div className="w-16 h-16 rounded overflow-hidden shrink-0 border border-slate-200">
                  <img src={item.screenshot_url} alt="Screenshot" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 pr-8">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-slate-900 truncate" title={item.product_name}>
                      {item.product_name}
                    </p>
                  </div>
                  <div className="text-sm text-slate-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Stts: <strong>{item.status}</strong></span>
                    <span>Qty: <strong>{item.quantity || '-'}</strong></span>
                    {item.price && <span>Hrg: <strong>Rp {item.price.toLocaleString('id-ID')}</strong></span>}
                  </div>
                  <div className="mt-2 text-xs flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded font-semibold ${item.confidence < 0.6 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                      Confidence: {(item.confidence * 100).toFixed(0)}%
                    </span>
                    {!item.matched_product && (
                      <span className="text-amber-600 italic">Katalog tidak ditemukan</span>
                    )}
                  </div>
                  
                  {/* Action Buttons for specific item correction will be here */}
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs border-amber-200 text-amber-700 hover:bg-amber-50">
                      Koreksi Nama Katalog
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-sm text-amber-700">Semua item berhasil terkonfirmasi otomatis!</div>
        )}
      </div>

    </div>
  );
}
