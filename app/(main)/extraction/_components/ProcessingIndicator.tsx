import { Loader2 } from "lucide-react";

export function ProcessingIndicator({ isProcessing, progressMessage }: { isProcessing: boolean; progressMessage?: string }) {
  if (!isProcessing) return null;
  
  return (
    <div className="flex items-center gap-3 p-4 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-xl mb-6">
      <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
      <div>
        <p className="text-sm font-medium">AI sedang mengekstrak data...</p>
        <p className="text-xs text-indigo-600/80">{progressMessage || "Proses ini memakan waktu beberapa detik per gambar."}</p>
      </div>
    </div>
  );
}
