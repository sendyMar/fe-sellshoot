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

  const fetchScreenshots = useCallback(async () => {
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

  const fetchResults = useCallback(async () => {
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

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchScreenshots();
      fetchResults();
      
      const handleRefresh = () => {
        fetchScreenshots();
        fetchResults();
      };
      window.addEventListener('refresh_screenshots', handleRefresh);
      return () => window.removeEventListener('refresh_screenshots', handleRefresh);
    }
  }, [isAuthenticated, token, fetchScreenshots]);

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
          if (aiError.includes("429") || aiError.includes("Quota") || aiError.includes("Exhausted") || aiError.includes("RESOURCE_EXHAUSTED")) {
            errorMessage = "Batas token/kuota API Google Gemini Anda telah habis (429 Quota Exceeded). Silakan gunakan API Key yang berbeda.";
          } else {
            errorMessage = `AI Error: ${aiError.substring(0, 100)}...`;
          }
          // Stop processing if we hit quota limits or other major errors
          break;
        }

        // Fetch updates for UI after each item
        await fetchScreenshots();
        await fetchResults();

        // Delay 5 detik sebelum request berikutnya (hanya jika masih ada antrean berikutnya)
        if (i < pendingScreenshots.length - 1) {
          setProcessingProgress(`Menunggu jeda aman API (5s)... (${i + 1}/${pendingScreenshots.length})`);
          await new Promise(r => setTimeout(r, 5000));
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
    }
  };

  return {
    screenshots,
    results,
    isLoading,
    isProcessing,
    processingProgress,
    fetchScreenshots,
    fetchResults,
    saveUploadedScreenshots,
    deleteScreenshot,
    processAllPending
  };
}
