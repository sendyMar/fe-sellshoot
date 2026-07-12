import { useState, useEffect, useCallback } from 'react';
import { analyticsService, AnalyticsResponse } from '../services/analytics.service';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export function useAnalytics() {
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await analyticsService.getStatistics(token);
      if (res.success && res.data) {
        setData(res.data);
      } else {
        toast.error("Gagal memuat data statistik");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem saat memuat statistik");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { data, isLoading, refetch: fetchAnalytics };
}
