import { apiClient } from './apiClient';

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  platform: string;
  is_completed: boolean;
}

export const taskService = {
  async getTasks(token: string, date?: string): Promise<{ success: boolean; data: TaskResponse[] }> {
    const url = date ? `/api/tasks/?date=${date}` : '/api/tasks/';
    return apiClient.get(url, token);
  },

  async generateTasks(token: string, date?: string): Promise<{ success: boolean; message?: string }> {
    return apiClient.post('/api/tasks/generate/', { date }, token);
  },

  async updateTaskStatus(token: string, id: number, isCompleted: boolean, description?: string): Promise<{ success: boolean }> {
    const payload: any = { is_completed: isCompleted };
    if (description !== undefined) {
      payload.description = description;
    }
    return apiClient.patch(`/api/tasks/${id}/`, payload, token);
  }
};
