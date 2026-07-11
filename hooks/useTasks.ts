"use client";

import { useState, useCallback, useEffect } from 'react';
import { useAuth } from './useAuth';
import { taskService, TaskResponse } from '../services/task.service';

export function useTasks(date?: string) {
  const { token, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchTasks = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await taskService.getTasks(token, date);
      if (res.success) {
        setTasks(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setIsLoading(false);
    }
  }, [token, date]);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchTasks();
    }
  }, [isAuthenticated, token, fetchTasks]);

  const generateTasks = async () => {
    if (!token) return { success: false };
    setIsGenerating(true);
    try {
      const res = await taskService.generateTasks(token, date);
      if (res.success) {
        await fetchTasks();
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (error) {
      console.error("Failed to generate tasks", error);
      return { success: false };
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleTaskStatus = async (id: number, currentStatus: boolean) => {
    if (!token) return false;
    
    // Optimistic UI update
    setTasks(prev => prev.map(t => t.id === id ? { ...t, is_completed: !currentStatus } : t));
    
    try {
      const res = await taskService.updateTaskStatus(token, id, !currentStatus);
      if (!res.success) {
        // Revert on failure
        setTasks(prev => prev.map(t => t.id === id ? { ...t, is_completed: currentStatus } : t));
        return false;
      }
      return true;
    } catch (error) {
      // Revert on failure
      setTasks(prev => prev.map(t => t.id === id ? { ...t, is_completed: currentStatus } : t));
      console.error("Failed to update task", error);
      return false;
    }
  };

  return {
    tasks,
    isLoading,
    isGenerating,
    fetchTasks,
    generateTasks,
    toggleTaskStatus
  };
}
