"use client";

import { Product } from "@/services/catalog.service";
import { Layers } from "lucide-react";

interface ProductTableProps {
  products: Product[];
  onViewAliases: (id: number) => void;
  onDeleteProduct?: (id: number) => void;
}

export default function ProductTable({ products, onViewAliases, onDeleteProduct }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500">
        Belum ada produk di katalog. Silakan tambah produk baru.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
            <th className="p-4 font-medium">Nama Produk (Kanonikal)</th>
            <th className="p-4 font-medium">SKU</th>
            <th className="p-4 font-medium">Kategori</th>
            <th className="p-4 font-medium">Stok Global</th>
            <th className="p-4 font-medium text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50 transition">
              <td className="p-4 font-medium text-slate-800">{p.canonical_name}</td>
              <td className="p-4 text-slate-500">{p.sku || "-"}</td>
              <td className="p-4 text-slate-500">{p.category || "-"}</td>
              <td className="p-4 text-slate-500">{p.global_stock}</td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => onViewAliases(p.id)}
                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <Layers size={16} />
                    Alias
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Apakah Anda yakin ingin menghapus produk "${p.canonical_name}"?`)) {
                        onDeleteProduct?.(p.id);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
