import { apiClient } from './apiClient';

export interface CalendarDay {
  date: string;
  status: 'no_activity' | 'completed' | 'today' | 'future';
  day_of_week: number;
}

export interface CalendarStatusResponse {
  first_active_month: string;
  year: number;
  month: number;
  days: CalendarDay[];
}

export const reportingService = {
  getCalendarStatus: async (token: string, year?: number, month?: number) => {
    let url = '/api/reporting/calendar-status/';
    if (year && month) {
      url += `?year=${year}&month=${month}`;
    }
    return apiClient.get(url, token);
  },
};
