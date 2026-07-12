"use client";

import { UploadZone } from "./_components/UploadZone";
import { ScreenshotGallery } from "./_components/ScreenshotGallery";
import { ProcessingIndicator } from "./_components/ProcessingIndicator";
import { ExtractionResultCard } from "./_components/ExtractionResultCard";
import { useExtraction } from "@/hooks/useExtraction";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { toast } from "sonner";

export default function ExtractionPage() {
  const { screenshots, results, isProcessing, processingProgress, processAllPending } = useExtraction();

  const handleProcessAI = async () => {
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
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Ekstraksi & Upload</h1>
          <p className="text-sm text-slate-500">
            Unggah screenshot pesanan atau performa untuk diekstrak oleh AI.
          </p>
        </div>
        
        <Button 
          onClick={handleProcessAI} 
          disabled={isProcessing}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Wand2 className="w-4 h-4 mr-2" />
          Proses dengan AI
        </Button>
      </div>

      <ProcessingIndicator isProcessing={isProcessing} progressMessage={processingProgress} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[400px_1fr]">
        <div className="space-y-6">
          <UploadZone />
          
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 font-medium text-slate-900">Tips Upload Screenshot</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="text-violet-500">•</span>
                Pastikan nama produk dan status order terlihat jelas.
              </li>
              <li className="flex gap-2">
                <span className="text-violet-500">•</span>
                Pilih platform yang sesuai sebelum mengunggah.
              </li>
              <li className="flex gap-2">
                <span className="text-violet-500">•</span>
                Maksimal 5 gambar per sesi upload.
              </li>
              <li className="flex gap-2">
                <span className="text-violet-500">•</span>
                Format yang didukung: JPG, PNG. Max 4MB.
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <ScreenshotGallery />
          
          {results.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <h3 className="font-semibold text-slate-900">Hasil Ekstraksi Hari Ini</h3>
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
