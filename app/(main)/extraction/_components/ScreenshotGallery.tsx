"use client";

import { useExtraction } from "@/hooks/useExtraction";
import { Loader2, Trash2, ImageIcon, CheckCircle, Clock, XCircle } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export function ScreenshotGallery() {
  const { screenshots, isLoading, deleteScreenshot } = useExtraction();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processed':
        return <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400 border border-green-500/20"><CheckCircle className="h-3 w-3" /> Diproses</span>;
      case 'failed':
        return <span className="flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400 border border-red-500/20"><XCircle className="h-3 w-3" /> Gagal</span>;
      default:
        return <span className="flex items-center gap-1 rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-400 border border-yellow-500/20"><Clock className="h-3 w-3" /> Pending</span>;
    }
  };

  const getPlatformColors = (platform: string) => {
    switch(platform) {
      case 'shopee': return "bg-[#EE4D2D]/10 text-[#EE4D2D] border-[#EE4D2D]/20";
      case 'tokopedia': return "bg-[#03AC0E]/10 text-[#03AC0E] border-[#03AC0E]/20";
      case 'instagram': return "bg-[#E1306C]/10 text-[#E1306C] border-[#E1306C]/20";
      default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  if (isLoading && screenshots.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-white/10 bg-zinc-900">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900 p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Screenshot Hari Ini</h2>
        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
          {screenshots.length} Item
        </span>
      </div>

      {screenshots.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-white/10 py-12">
          <div className="mb-3 rounded-full bg-zinc-800/50 p-4">
            <ImageIcon className="h-8 w-8 text-zinc-500" />
          </div>
          <p className="text-sm font-medium text-zinc-300">Belum ada screenshot</p>
          <p className="mt-1 text-xs text-zinc-500">Mulai unggah di area upload</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {screenshots.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-950 transition-all hover:border-white/20">
              {/* Image Preview */}
              <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                <img 
                  src={item.image_url} 
                  alt={`Screenshot ${item.id}`}
                  className="h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>
              
              {/* Overlay Actions */}
              <div className="absolute inset-x-0 top-0 flex justify-between bg-gradient-to-b from-black/80 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <span className={`rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${getPlatformColors(item.platform)}`}>
                  {item.platform}
                </span>
                <button 
                  onClick={() => deleteScreenshot(item.id)}
                  className="rounded-full bg-black/50 p-1.5 text-zinc-300 hover:bg-red-500/20 hover:text-red-400"
                  title="Hapus screenshot"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Bottom Info */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-8">
                <div className="flex items-center justify-between">
                  {getStatusBadge(item.status)}
                  <span className="text-[10px] text-zinc-400">
                    {format(new Date(item.uploaded_at), 'HH:mm', { locale: id })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
