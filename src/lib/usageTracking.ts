'use client';

import type { UsageStats, UserTier } from '@/types';

const STORAGE_KEY = 'blurkit_usage';
const FREE_TIER_DAILY_LIMIT = 15;

export function getUsageStats(): UsageStats {
  if (typeof window === 'undefined') {
    return { blursToday: 0, lastResetDate: new Date().toDateString() };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { blursToday: 0, lastResetDate: new Date().toDateString() };
  }

  try {
    const stats: UsageStats = JSON.parse(stored);
    const today = new Date().toDateString();

    // Reset if it's a new day
    if (stats.lastResetDate !== today) {
      return { blursToday: 0, lastResetDate: today };
    }

    return stats;
  } catch {
    return { blursToday: 0, lastResetDate: new Date().toDateString() };
  }
}

export function incrementBlurCount(): UsageStats {
  const stats = getUsageStats();
  const newStats: UsageStats = {
    blursToday: stats.blursToday + 1,
    lastResetDate: stats.lastResetDate,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
  return newStats;
}

export function canBlur(userTier: UserTier): boolean {
  if (userTier === 'premium' || userTier === 'lifetime') {
    return true;
  }

  const stats = getUsageStats();
  return stats.blursToday < FREE_TIER_DAILY_LIMIT;
}

export function getRemainingBlurs(userTier: UserTier): number {
  if (userTier === 'premium' || userTier === 'lifetime') {
    return -1; // Unlimited
  }

  const stats = getUsageStats();
  return Math.max(0, FREE_TIER_DAILY_LIMIT - stats.blursToday);
}

export function resetUsageStats(): void {
  localStorage.removeItem(STORAGE_KEY);
}
