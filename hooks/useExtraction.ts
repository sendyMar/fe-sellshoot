import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { extractionService, ScreenshotResponse } from '../services/extraction.service';

export function useExtraction() {
  const { token, isAuthenticated } = useAuth();
  const [screenshots, setScreenshots] = useState<ScreenshotResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchScreenshots();
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

  return {
    screenshots,
    isLoading,
    fetchScreenshots,
    saveUploadedScreenshots,
    deleteScreenshot
  };
}
