"use client";

import { CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import Image from "next/image";

export function ExtractionResultCard({ result }: { result: any }) {
  return (
    <div className="flex flex-col gap-4 p-4 border border-slate-200 rounded-xl bg-white shadow-sm sm:flex-row">
      <div className="relative w-full sm:w-48 h-48 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200">
        <Image
          src={result.screenshot.image_url}
          alt="Screenshot"
          fill
          className="object-contain"
        />
      </div>
      
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {result.screenshot.platform}
            </span>
            <span className="text-xs text-slate-400">
              {new Date(result.processed_at).toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-900">Items Ditemukan: {result.items.length}</h4>
          
          {result.items.length === 0 ? (
            <div className="text-sm text-slate-500 italic p-3 bg-slate-50 rounded-lg border border-slate-100">
              Tidak ada data produk/pesanan yang terdeteksi.
            </div>
          ) : (
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs">
                  <tr>
                    <th className="px-4 py-2 font-medium">Produk</th>
                    <th className="px-4 py-2 font-medium">Status</th>
                    <th className="px-4 py-2 font-medium">Qty</th>
                    <th className="px-4 py-2 font-medium text-right">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {result.items.map((item: any) => (
                    <tr key={item.id} className="bg-white hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900 max-w-[200px] truncate" title={item.product_name}>
                        {item.product_name}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 capitalize">
                          {item.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {item.quantity || '-'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {item.confidence >= 0.85 ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                          )}
                          <span className={item.confidence >= 0.85 ? "text-emerald-600 font-medium" : "text-amber-600 font-medium"}>
                            {Math.round(item.confidence * 100)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
