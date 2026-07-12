import { apiClient } from './apiClient';

export interface TrendData {
  date: string;
  full_date: string;
  orders: number;
  tasks_total: number;
  tasks_completed: number;
}

export interface TopProductData {
  name: string;
  value: number;
}

export interface PlatformData {
  platform: string;
  count: number;
}

export interface CategoryData {
  category: string;
  total: number;
  completed: number;
}

export interface AnalyticsResponse {
  trend: TrendData[];
  top_products: TopProductData[];
  platforms: PlatformData[];
  task_categories: CategoryData[];
}

export const analyticsService = {
  async getStatistics(token: string): Promise<{ success: boolean; data?: AnalyticsResponse }> {
    return apiClient.get('/api/reporting/statistics/', token);
  },
};
