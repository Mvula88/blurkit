export type BlurType = 'gaussian' | 'pixelate' | 'solid';
export type FileType = 'image' | 'pdf';
export type UserTier = 'free' | 'premium' | 'lifetime';

export interface BlurRegion {
  id: string;
  type: 'rectangle' | 'circle';
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  blurIntensity: number;
  blurType: BlurType;
  fillColor: string;
}

export interface PDFPage {
  pageNumber: number;
  imageData: string;
  width: number;
  height: number;
  blurRegions: BlurRegion[];
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  original_image_url: string;
  blur_regions: BlurRegion[];
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  tier: UserTier;
  subscription_id?: string;
  subscription_status?: string;
  created_at: string;
  updated_at: string;
}

export interface UsageStats {
  blursToday: number;
  lastResetDate: string;
}

export type Tool = 'rectangle' | 'circle' | 'select';
