"use client";

import { Product } from "@/services/catalog.service";
import { Package, MoreHorizontal, Link as LinkIcon, Edit } from "lucide-react";

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  onViewAliases: (product: Product) => void;
  onEdit: (product: Product) => void;
}

export function ProductTable({ products, isLoading, onViewAliases, onEdit }: ProductTableProps) {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-slate-200 bg-white">
        <div className="text-slate-500">Memuat katalog...</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
        <Package className="h-10 w-10 text-slate-400 mb-4" />
        <p className="text-slate-600 font-medium">Belum ada produk di katalog</p>
        <p className="text-sm text-slate-500 mt-1">Tambahkan produk pertama Anda untuk mulai mengatur inventaris.</p>
      </div>
    );
  }

  const formatCurrency = (val: string | null) => {
    if (!val) return "-";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(val));
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">Nama Produk (Kanonikal)</th>
              <th scope="col" className="px-6 py-4 font-semibold">SKU / Kategori</th>
              <th scope="col" className="px-6 py-4 font-semibold">Harga Modal</th>
              <th scope="col" className="px-6 py-4 font-semibold">Harga Jual</th>
              <th scope="col" className="px-6 py-4 font-semibold">Stok</th>
              <th scope="col" className="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {product.canonical_name}
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-900">{product.sku || "-"}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{product.category || "Tanpa Kategori"}</div>
                </td>
                <td className="px-6 py-4">
                  {formatCurrency(product.cost_price)}
                </td>
                <td className="px-6 py-4">
                  {formatCurrency(product.retail_price)}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    product.global_stock > 10 ? 'bg-green-100 text-green-800' :
                    product.global_stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.global_stock} unit
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onViewAliases(product)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                      title="Lihat Variasi Nama (Alias)"
                    >
                      <LinkIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(product)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                      title="Edit Produk"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
