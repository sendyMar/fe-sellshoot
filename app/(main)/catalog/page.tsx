"use client";

import { useCatalog } from "@/hooks/useCatalog";
import ProductTable from "./_components/ProductTable";
import ProductForm from "./_components/ProductForm";
import { useState } from "react";
import { Plus } from "lucide-react";
import AliasListDrawer from "./_components/AliasListDrawer";

export default function CatalogPage() {
  const { products, isLoading, createProduct, fetchAliases } = useCatalog();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleAddProduct = async (data: any) => {
    const res = await createProduct(data);
    if (res.success) {
      setIsFormOpen(false);
    }
  };

  const handleViewAliases = (productId: number) => {
    setSelectedProductId(productId);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Katalog Produk</h1>
          <p className="text-slate-500">Kelola master data produk dan alias lintas platform.</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          <span>Tambah Produk</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500">Memuat katalog...</div>
        ) : (
          <ProductTable products={products} onViewAliases={handleViewAliases} />
        )}
      </div>

      <ProductForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleAddProduct} 
      />

      {selectedProductId && (
        <AliasListDrawer
          productId={selectedProductId}
          isOpen={!!selectedProductId}
          onClose={() => setSelectedProductId(null)}
          fetchAliases={() => fetchAliases(selectedProductId)}
        />
      )}
    </div>
  );
}
