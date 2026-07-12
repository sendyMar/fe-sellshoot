import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { reportService, DailyReportResponse } from '@/services/report.service';

export function useReport(date: string) {
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;

  const [report, setReport] = useState<DailyReportResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchReport = useCallback(async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const res = await reportService.getDailyReport(token, date);
      if (res.success && res.data) {
        setReport(res.data);
      } else {
        setReport(null);
      }
    } catch (error) {
      console.error("Failed to fetch report:", error);
      setReport(null);
    } finally {
      setIsLoading(false);
    }
  }, [token, date]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const generateReport = async () => {
    if (!token) return { success: false, message: 'Tidak ada akses' };
    try {
      setIsGenerating(true);
      const res = await reportService.generateDailyReport(token, date);
      if (res.success && res.data) {
        setReport(res.data);
        return { success: true };
      }
      return { success: false, message: res.message || 'Gagal menyusun laporan' };
    } catch (error) {
      console.error("Failed to generate report:", error);
      return { success: false, message: 'Terjadi kesalahan sistem' };
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    report,
    isLoading,
    isGenerating,
    generateReport,
    fetchReport
  };
}
