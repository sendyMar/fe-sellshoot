"use client";

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { extractionService, ScreenshotResponse } from '../services/extraction.service';

export function useExtraction() {
  const { token, isAuthenticated } = useAuth();
  const [screenshots, setScreenshots] = useState<ScreenshotResponse[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [reviewData, setReviewData] = useState<{ auto_verified: any[], needs_review: any[] }>({ auto_verified: [], needs_review: [] });

  const fetchScreenshots = useCallback(async (dateStr?: string) => {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await extractionService.getTodayScreenshots(token);
      if (res.success) {
        setScreenshots(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch screenshots", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const fetchResults = useCallback(async (dateStr?: string) => {
    if (!token) return;
    try {
      const res = await extractionService.getExtractionToday(token);
      if (res.success) {
        setResults(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch extraction results", error);
    }
  }, [token]);

  const fetchReview = useCallback(async (dateStr?: string) => {
    if (!token) return;
    try {
      const res = await extractionService.getExtractionReview(token, dateStr);
      if (res.success) {
        setReviewData(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch review data", error);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchScreenshots();
      fetchResults();
      fetchReview();

      const handleRefresh = () => {
        fetchScreenshots();
        fetchResults();
        fetchReview();
      };
      window.addEventListener('refresh_screenshots', handleRefresh);
      return () => window.removeEventListener('refresh_screenshots', handleRefresh);
    }
  }, [isAuthenticated, token, fetchScreenshots, fetchResults, fetchReview]);

  const verifyBatch = async (itemIds: number[], corrections: any[]) => {
    if (!token) return { success: false };
    try {
      const res = await extractionService.verifyExtractionBatch(token, { item_ids: itemIds, corrections });
      if (res.success) {
        await fetchReview(); // Refresh review panel
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error("Failed to verify batch", error);
      return { success: false };
    }
  };

  const saveUploadedScreenshots = async (imageUrls: string[], platform: string, uploadSession: string) => {
    if (!token) return false;
    try {
      const res = await extractionService.saveScreenshots(token, {
        image_urls: imageUrls,
        platform,
        upload_session: uploadSession
      });
      if (res.success) {
        await fetchScreenshots();
        window.dispatchEvent(new Event('refresh_screenshots'));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to save screenshots to backend", error);
      return false;
    }
  };

  const deleteScreenshot = async (id: number) => {
    if (!token) return false;
    try {
      const res = await extractionService.deleteScreenshot(token, id);
      if (res.success) {
        setScreenshots(prev => prev.filter(s => s.id !== id));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to delete screenshot", error);
      return false;
    }
  };

  const [processingProgress, setProcessingProgress] = useState<string>("");

  const processAllPending = async () => {
    if (!token) return { success: false, error: "Tidak ada akses token" };

    const pendingScreenshots = screenshots.filter(s => s.status === 'pending');
    if (pendingScreenshots.length === 0) return { success: true };

    setIsProcessing(true);
    let allSuccess = true;
    let errorMessage = "";

    try {
      for (let i = 0; i < pendingScreenshots.length; i++) {
        const ss = pendingScreenshots[i];
        setProcessingProgress(`Memproses ${i + 1} dari ${pendingScreenshots.length}...`);

        const res = await extractionService.processScreenshots(token, [ss.id]);
        if (!res.success) {
          allSuccess = false;
          errorMessage = "Gagal menghubungi server.";
          break;
        } else if (res.data?.failed?.length > 0) {
          allSuccess = false;
          const aiError = res.data.failed[0].error || "";
          if (aiError.includes("429") || aiError.includes("Quota") || aiError.includes("Exhausted") || aiError.includes("RESOURCE_EXHAUSTED") || aiError.includes("rate_limit")) {
            errorMessage = "Batas kuota API AI telah habis (Rate Limit). Tunggu beberapa saat lalu coba lagi.";
            break; // Hanya berhenti jika rate limit (tidak ada gunanya lanjut)
          } else {
            errorMessage = `AI Error: ${aiError.substring(0, 100)}...`;
            // Lanjutkan proses gambar berikutnya meskipun 1 gagal
          }
        }

        // Fetch updates for UI after each item
        await fetchScreenshots();
        await fetchResults();
        await fetchReview();

        // Delay 20 detik antar gambar (Groq Free Tier: 8.000 TPM, ~2.000 token/gambar)
        // Dengan 20 detik, maksimal 3 gambar/menit × 2.000 = 6.000 token → aman di bawah 8K
        if (i < pendingScreenshots.length - 1) {
          const delaySeconds = 20;
          for (let sec = delaySeconds; sec > 0; sec--) {
            setProcessingProgress(`Menunggu jeda API (${sec}s)... (${i + 1}/${pendingScreenshots.length} selesai)`);
            await new Promise(r => setTimeout(r, 1000));
          }
        }
      }

      return { success: allSuccess, error: errorMessage };
    } catch (error: any) {
      console.error("Failed to process screenshots", error);
      return { success: false, error: error?.message || "Terjadi kesalahan internal" };
    } finally {
      setIsProcessing(false);
      setProcessingProgress("");
      await fetchScreenshots();
      await fetchReview();
    }
  };

  return {
    screenshots,
    results,
    reviewData,
    isLoading,
    isProcessing,
    processingProgress,
    fetchScreenshots,
    fetchResults,
    fetchReview,
    verifyBatch,
    saveUploadedScreenshots,
    deleteScreenshot,
    processAllPending
  };
}
