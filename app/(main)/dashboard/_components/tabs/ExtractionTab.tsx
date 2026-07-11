"use client";

import { UploadZone } from "../../../extraction/_components/UploadZone";
import { ScreenshotGallery } from "../../../extraction/_components/ScreenshotGallery";
import { ProcessingIndicator } from "../../../extraction/_components/ProcessingIndicator";
import { ExtractionResultCard } from "../../../extraction/_components/ExtractionResultCard";
import { useExtraction } from "@/hooks/useExtraction";
import { Button } from "@/components/ui/button";
import { Wand2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface ExtractionTabProps {
  date: string;
  isReadOnly?: boolean;
}

export default function ExtractionTab({ date, isReadOnly = false }: ExtractionTabProps) {
  // TODO: Update useExtraction to accept 'date' param to fetch historical data
  const { screenshots, results, isProcessing, processingProgress, processAllPending } = useExtraction();

  const handleProcessAI = async () => {
    if (isReadOnly) return;
    
    const pendingCount = screenshots.filter(s => s.status === 'pending').length;
    if (pendingCount === 0) {
      toast.info("Tidak ada screenshot pending yang perlu diproses.");
      return;
    }

    const result = await processAllPending();
    if (result.success) {
      toast.success("Pemrosesan AI selesai!");
    } else {
      toast.error(result.error || "Ada masalah saat memproses sebagian screenshot.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Ekstraksi Resi & Order</h1>
          <p className="text-sm text-slate-500">
            {isReadOnly ? "Melihat data ekstraksi historis" : "Unggah screenshot pesanan untuk diekstrak oleh AI."}
          </p>
        </div>
        
        {!isReadOnly && (
          <Button 
            onClick={handleProcessAI} 
            disabled={isProcessing}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Proses dengan AI
          </Button>
        )}
      </div>

      {isReadOnly && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl flex gap-3 text-sm">
          <AlertTriangle className="text-amber-500 shrink-0" size={18} />
          <p>
            Anda sedang melihat data hari yang sudah lewat. 
            Anda tidak dapat mengunggah gambar baru atau menjalankan AI untuk tanggal ini.
          </p>
        </div>
      )}

      <ProcessingIndicator isProcessing={isProcessing} progressMessage={processingProgress} />

      <div className="grid grid-cols-1 gap-6">
        {!isReadOnly && (
          <div className="space-y-6">
            <UploadZone />
          </div>
        )}

        <div className="space-y-6">
          <ScreenshotGallery />
          
          {results.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <h3 className="font-semibold text-slate-900">Hasil Ekstraksi</h3>
              <div className="grid grid-cols-1 gap-4">
                {results.map((res: any) => (
                  <ExtractionResultCard key={res.id} result={res} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
