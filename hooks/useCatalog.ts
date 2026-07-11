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
      // Django REST Framework's ListAPIView returns an array directly
      if (Array.isArray(res)) {
        setProducts(res);
      } else {
        toast.error("Format data katalog tidak sesuai");
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
      // Django returns the created object with an 'id' on success
      if (res && res.id) {
        toast.success("Produk berhasil ditambahkan");
        fetchProducts(); // Refresh list
        return { success: true, data: res };
      } else {
        toast.error("Gagal menambahkan produk: " + JSON.stringify(res));
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
      // Django returns an array directly
      if (Array.isArray(res)) {
        return res as ProductAlias[];
      }
    } catch (error) {
      toast.error("Gagal memuat alias produk");
    }
    return [];
  };

  const deleteProduct = async (productId: number) => {
    if (!session?.accessToken) return { success: false };
    try {
      await catalogService.deleteProduct(session.accessToken, productId);
      toast.success("Produk berhasil dihapus");
      fetchProducts(); // Refresh list
      return { success: true };
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus produk");
      return { success: false };
    }
  };

  return {
    products,
    isLoading,
    fetchProducts,
    createProduct,
    deleteProduct,
    fetchAliases
  };
}
