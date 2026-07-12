"use client";

import { useEffect, useState } from "react";
import { X, Search } from "lucide-react";
import { ProductAlias } from "@/services/catalog.service";

interface AliasListDrawerProps {
  productId: number;
  isOpen: boolean;
  onClose: () => void;
  fetchAliases: () => Promise<ProductAlias[]>;
}

export default function AliasListDrawer({ productId, isOpen, onClose, fetchAliases }: AliasListDrawerProps) {
  const [aliases, setAliases] = useState<ProductAlias[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetchAliases().then((data) => {
        setAliases(data);
        setIsLoading(false);
      });
    }
  }, [isOpen, productId, fetchAliases]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Alias Terdaftar</h2>
            <p className="text-sm text-slate-500 mt-1">Nama produk yang terhubung ke master ini</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto bg-slate-50">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <span className="text-slate-500">Memuat alias...</span>
            </div>
          ) : aliases.length === 0 ? (
            <div className="text-center p-8 bg-white border border-slate-200 rounded-xl">
              <Search className="mx-auto text-slate-300 mb-3" size={32} />
              <p className="text-slate-600 font-medium">Belum ada alias</p>
              <p className="text-sm text-slate-400 mt-1">Sistem akan otomatis mencatat alias saat Anda memverifikasi pencocokan nama produk dari AI.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {aliases.map((alias) => (
                <div key={alias.id} className="bg-white p-4 border border-slate-200 rounded-xl flex justify-between items-center shadow-sm">
                  <div>
                    <p className="font-medium text-slate-800">{alias.alias_name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        alias.platform === 'shopee' ? 'bg-orange-100 text-orange-700' :
                        alias.platform === 'tokopedia' ? 'bg-green-100 text-green-700' :
                        alias.platform === 'instagram' ? 'bg-pink-100 text-pink-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {alias.platform}
                      </span>
                      {alias.created_by_correction && (
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider bg-slate-100 px-1.5 py-0.5 rounded">
                          Manual
                        </span>
                      )}
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
