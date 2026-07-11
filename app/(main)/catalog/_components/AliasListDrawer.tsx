"use client";

import { useEffect, useState } from "react";
import { Product, ProductAlias } from "@/services/catalog.service";
import { useCatalog } from "@/hooks/useCatalog";
import { X, ExternalLink, Loader2 } from "lucide-react";

interface AliasListDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AliasListDrawer({ product, isOpen, onClose }: AliasListDrawerProps) {
  const { getAliases } = useCatalog();
  const [aliases, setAliases] = useState<ProductAlias[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
      const loadAliases = async () => {
        setIsLoading(true);
        const data = await getAliases(product.id);
        setAliases(data);
        setIsLoading(false);
      };
      loadAliases();
    }
  }, [isOpen, product, getAliases]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Variasi Nama (Alias)</h2>
            <p className="text-sm text-slate-500 line-clamp-1">{product?.canonical_name}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-4" />
              <p className="text-sm text-slate-500">Memuat riwayat variasi nama...</p>
            </div>
          ) : aliases.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <p className="text-slate-600 font-medium">Belum ada variasi nama.</p>
              <p className="text-sm text-slate-500 mt-1 px-4">
                Variasi akan bertambah otomatis saat Anda mencocokkan hasil ekstraksi AI dengan produk ini.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {aliases.map((alias) => (
                <div key={alias.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col gap-2 relative overflow-hidden">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                    alias.platform === 'shopee' ? 'bg-orange-500' :
                    alias.platform === 'tokopedia' ? 'bg-green-500' : 
                    alias.platform === 'instagram' ? 'bg-pink-500' : 'bg-slate-400'
                  }`} />
                  
                  <div className="pl-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-slate-900">{alias.alias_name}</h3>
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
                        {alias.platform}
                      </span>
                    </div>
                    
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                      {alias.created_by_correction ? (
                        <span className="inline-flex items-center text-amber-600">
                          Ditambahkan via koreksi manual
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-green-600">
                          Exact match
                        </span>
                      )}
                      <span>•</span>
                      <span>{new Date(alias.created_at).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
