import { useState, useCallback, useEffect } from 'react';
import { useAuth } from './useAuth';
import { catalogService, Product, ProductAlias } from '../services/catalog.service';
import { toast } from 'sonner';

export function useCatalog() {
  const { token } = useAuth();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await catalogService.getProducts(token);
      setProducts(data);
    } catch (error) {
      toast.error('Gagal mengambil data produk katalog');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (data: Partial<Product>) => {
    if (!token) return null;
    try {
      const newProduct = await catalogService.createProduct(token, data);
      setProducts(prev => [newProduct, ...prev]);
      toast.success('Produk berhasil ditambahkan ke katalog');
      return newProduct;
    } catch (error) {
      toast.error('Gagal menambahkan produk');
      console.error(error);
      return null;
    }
  };

  const getAliases = async (productId: number) => {
    if (!token) return [];
    try {
      return await catalogService.getProductAliases(token, productId);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return {
    products,
    isLoading,
    fetchProducts,
    addProduct,
    getAliases
  };
}
