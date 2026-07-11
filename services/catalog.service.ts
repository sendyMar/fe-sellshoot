import { apiClient } from './apiClient';

export interface Product {
  id: number;
  canonical_name: string;
  sku: string;
  category: string;
  cost_price: number | null;
  retail_price: number | null;
  global_stock: number;
  created_at: string;
}

export interface ProductAlias {
  id: number;
  alias_name: string;
  platform: string;
  created_by_correction: boolean;
  created_at: string;
}

export interface MatchCandidate {
  product_id: number;
  product_name: string;
  confidence: number;
}

export interface MatchResult {
  match_type: 'exact' | 'fuzzy' | 'none';
  product_id: number | null;
  product_name: string | null;
  confidence: number;
  candidates: MatchCandidate[];
}

export const catalogService = {
  getProducts: async (token: string) => {
    return apiClient.get('/api/catalog/products/', token);
  },

  createProduct: async (token: string, productData: Partial<Product>) => {
    return apiClient.post('/api/catalog/products/', productData, token);
  },

  getProductAliases: async (token: string, productId: number) => {
    return apiClient.get(`/api/catalog/products/${productId}/aliases/`, token);
  },

  matchProduct: async (token: string, raw_name: string, platform: string) => {
    return apiClient.post('/api/catalog/match/', { raw_name, platform }, token);
  },

  confirmMatch: async (token: string, raw_name: string, platform: string, product_id: number, is_correction = false) => {
    return apiClient.post('/api/catalog/match/confirm/', { 
      raw_name, 
      platform, 
      product_id, 
      is_correction 
    }, token);
  }
};
