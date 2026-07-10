import { apiClient } from './apiClient';

export const authService = {
  async getCurrentUser(token: string) {
    return apiClient.get('/api/auth/me/', token);
  },
};
