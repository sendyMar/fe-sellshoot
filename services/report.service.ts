import { apiClient } from './apiClient';

export interface DailyReportResponse {
  date: string;
  total_orders: number;
  total_tasks: number;
  completed_tasks: number;
  ai_insight: string;
}

export const reportService = {
  async getDailyReport(token: string, date?: string): Promise<{ success: boolean; data?: DailyReportResponse; message?: string }> {
    const url = date ? `/api/reporting/daily/?date=${date}` : '/api/reporting/daily/';
    return apiClient.get(url, token);
  },

  async generateDailyReport(token: string, date?: string): Promise<{ success: boolean; data?: DailyReportResponse; message?: string }> {
    return apiClient.post('/api/reporting/daily/', { date }, token);
  }
};
