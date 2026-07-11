import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { catalogService, Product, ProductAlias } from "@/services/catalog.service";
import { toast } from "sonner";

export function useCatalog() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    if (!session?.accessToken) return;
    setIsLoading(true);
    try {
      const res = await catalogService.getProducts(session.accessToken);
      if (res.success) {
        setProducts(res.data);
      } else {
        toast.error("Gagal memuat katalog produk");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat memuat katalog");
    } finally {
      setIsLoading(false);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const createProduct = async (data: Partial<Product>) => {
    if (!session?.accessToken) return { success: false };
    try {
      const res = await catalogService.createProduct(session.accessToken, data);
      if (res.success) {
        toast.success("Produk berhasil ditambahkan");
        fetchProducts(); // Refresh list
        return { success: true, data: res.data };
      } else {
        toast.error("Gagal menambahkan produk");
        return { success: false };
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menambahkan produk");
      return { success: false };
    }
  };

  const fetchAliases = async (productId: number) => {
    if (!session?.accessToken) return [];
    try {
      const res = await catalogService.getProductAliases(session.accessToken, productId);
      if (res.success) {
        return res.data as ProductAlias[];
      }
    } catch (error) {
      toast.error("Gagal memuat alias produk");
    }
    return [];
  };

  return {
    products,
    isLoading,
    fetchProducts,
    createProduct,
    fetchAliases
  };
}
