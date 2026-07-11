import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { reportingService, CalendarStatusResponse } from "@/services/reporting.service";
import { toast } from "sonner";

export function useDashboard() {
  const { data: session } = useSession();
  const [calendarData, setCalendarData] = useState<CalendarStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);

  const fetchCalendar = useCallback(async (year: number, month: number) => {
    if (!session?.accessToken) return;
    setIsLoading(true);
    try {
      const res = await reportingService.getCalendarStatus(session.accessToken, year, month);
      if (res && res.days) {
        setCalendarData(res);
      } else {
        toast.error("Format data kalender tidak sesuai");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat memuat kalender");
    } finally {
      setIsLoading(false);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    fetchCalendar(currentYear, currentMonth);
  }, [fetchCalendar, currentYear, currentMonth]);

  const handlePrevMonth = () => {
    if (!calendarData) return;
    const firstActiveMonth = new Date(calendarData.first_active_month + "-01");
    const currentRenderedDate = new Date(`${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`);
    
    // Do not allow going before first active month
    if (currentRenderedDate <= firstActiveMonth) return;

    if (currentMonth === 1) {
      setCurrentYear(y => y - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    const today = new Date();
    const currentRenderedDate = new Date(`${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`);
    const currentActualMonth = new Date(`${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-01`);
    
    // Do not allow going past the current real month
    if (currentRenderedDate >= currentActualMonth) return;

    if (currentMonth === 12) {
      setCurrentYear(y => y + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  return {
    calendarData,
    isLoading,
    currentYear,
    currentMonth,
    handlePrevMonth,
    handleNextMonth
  };
}
