import { apiClient } from './apiClient';

export interface Product {
  id: number;
  canonical_name: string;
  sku: string;
  category: string;
  cost_price: string | null;
  retail_price: string | null;
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
  getProducts: async (token: string): Promise<Product[]> => {
    return apiClient.get('/api/catalog/products/', token);
  },

  createProduct: async (token: string, data: Partial<Product>): Promise<Product> => {
    return apiClient.post('/api/catalog/products/', data, token);
  },

  getProductAliases: async (token: string, productId: number): Promise<ProductAlias[]> => {
    return apiClient.get(`/api/catalog/products/${productId}/aliases/`, token);
  },

  matchProduct: async (token: string, rawName: string, platform: string): Promise<MatchResult> => {
    return apiClient.post('/api/catalog/match/', {
      raw_name: rawName,
      platform
    }, token);
  },

  confirmMatch: async (token: string, rawName: string, platform: string, productId: number, isCorrection = false): Promise<any> => {
    return apiClient.post('/api/catalog/match/confirm/', {
      raw_name: rawName,
      platform,
      product_id: productId,
      is_correction: isCorrection
    }, token);
  }
};
