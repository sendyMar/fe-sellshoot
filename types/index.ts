// Global TypeScript type definitions for SellShoot

// ==================== User & Auth ====================
export interface User {
  id: number;
  email: string;
  name: string;
  avatar_url?: string;
  google_id: string;
  reminder_time?: string;
  created_at: string;
}

// ==================== Screenshot & Extraction ====================
export type Platform = "shopee" | "tokopedia" | "instagram" | "other";
export type ScreenshotStatus = "pending" | "processed" | "failed";
export type ExtractionStatus = "pending" | "verified" | "rejected";

export interface Screenshot {
  id: number;
  image_url: string;
  platform: Platform;
  upload_session: string;
  status: ScreenshotStatus;
  uploaded_at: string;
}

export interface ExtractedItem {
  id: number;
  extraction_id: number;
  product_name_raw: string;
  product_status: string;
  quantity: number | null;
  confidence: number;
  is_verified: boolean;
  verified_by_user: boolean;
}

export interface ExtractionResult {
  id: number;
  screenshot: Screenshot;
  extracted_items: ExtractedItem[];
  confidence_score: number;
  status: ExtractionStatus;
  created_at: string;
}

// ==================== Product & Catalog ====================
export interface Product {
  id: number;
  canonical_name: string;
  sku?: string;
  category?: string;
  stock_threshold: number;
  aliases: ProductAlias[];
  created_at: string;
}

export interface ProductAlias {
  id: number;
  product_id: number;
  alias_name: string;
  platform: Platform;
  is_confirmed: boolean;
  confidence: number;
}

export interface MatchCandidate {
  product: Product;
  confidence: number;
  alias_name: string;
}

// ==================== Tasks ====================
export type TaskPriority = "urgent" | "normal" | "low";
export type TaskCategory =
  | "order"
  | "restock"
  | "reply_chat"
  | "packing"
  | "other";

export interface Task {
  id: number;
  title: string;
  description?: string;
  category: TaskCategory;
  priority: TaskPriority;
  platform: Platform;
  is_completed: boolean;
  completed_at: string | null;
  created_at: string;
  due_date: string;
}

export interface TaskSummary {
  total: number;
  completed: number;
  pending: number;
  urgent: number;
}

// ==================== Reporting ====================
export interface DailySnapshot {
  id: number;
  date: string;
  total_tasks: number;
  completed_tasks: number;
  total_orders_processed: number;
  anomalies: string[];
  has_data: boolean;
}

export interface WeeklyReport {
  id: number;
  week_start: string;
  week_end: string;
  snapshots: DailySnapshot[];
  narrative_insight: string;
  gap_days: string[];
  created_at: string;
}

// ==================== API Response ====================
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  error_code?: string;
}
