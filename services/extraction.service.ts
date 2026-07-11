import { apiClient } from './apiClient';

export interface ScreenshotResponse {
  id: number;
  image_url: string;
  platform: string;
  status: string;
  upload_session: string;
  uploaded_at: string;
}

export const extractionService = {
  async saveScreenshots(token: string, data: { image_urls: string[], platform: string, upload_session: string }) {
    return apiClient.post('/api/extraction/upload/', data, token);
  },

  async getTodayScreenshots(token: string): Promise<{ success: boolean; data: ScreenshotResponse[] }> {
    return apiClient.get('/api/extraction/screenshots/', token);
  },
  
  async deleteScreenshot(token: string, id: number) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/extraction/screenshots/${id}/`, {
      method: 'DELETE',
      headers,
    });
    return res.json();
  },

  async processScreenshots(token: string, screenshotIds?: number[]) {
    return apiClient.post('/api/extraction/process/', { screenshot_ids: screenshotIds }, token);
  },

  async getExtractionToday(token: string): Promise<{ success: boolean; data: any[] }> {
    return apiClient.get('/api/extraction/today/', token);
  }
};
