"use client";

import { useState } from "react";
import { useCatalog } from "@/hooks/useCatalog";
import { ProductTable } from "./_components/ProductTable";
import { ProductForm } from "./_components/ProductForm";
import { AliasListDrawer } from "./_components/AliasListDrawer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Product } from "@/services/catalog.service";

export default function CatalogPage() {
  const { products, isLoading, addProduct } = useCatalog();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingAliasProduct, setViewingAliasProduct] = useState<Product | null>(null);

  const handleOpenForm = (product?: Product) => {
    setEditingProduct(product || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleSubmitForm = async (data: Partial<Product>) => {
    if (editingProduct) {
      // TODO: Implement update product
      console.log("Update not implemented yet", data);
    } else {
      await addProduct(data);
    }
    handleCloseForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Katalog Produk</h1>
          <p className="text-sm text-slate-500">
            Kelola master data produk Anda. Sistem AI akan mencocokkan hasil ekstraksi pesanan dengan katalog ini.
          </p>
        </div>
        
        <Button 
          onClick={() => handleOpenForm()} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Produk
        </Button>
      </div>

      <ProductTable 
        products={products}
        isLoading={isLoading}
        onEdit={handleOpenForm}
        onViewAliases={setViewingAliasProduct}
      />

      <ProductForm 
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        initialData={editingProduct}
      />

      <AliasListDrawer
        isOpen={!!viewingAliasProduct}
        product={viewingAliasProduct}
        onClose={() => setViewingAliasProduct(null)}
      />
    </div>
  );
}
