'use client';

export function addWatermark(
  canvas: HTMLCanvasElement,
  text: string = 'BlurKit - Upgrade to remove watermark'
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Save context state
  ctx.save();

  // Watermark styling
  const fontSize = Math.max(12, Math.floor(canvas.width / 40));
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';

  // Position at bottom center
  const x = canvas.width / 2;
  const y = canvas.height - 10;

  // Add semi-transparent background
  const metrics = ctx.measureText(text);
  const padding = 8;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillRect(
    x - metrics.width / 2 - padding,
    y - fontSize - padding,
    metrics.width + padding * 2,
    fontSize + padding * 2
  );

  // Draw text
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillText(text, x, y);

  // Restore context state
  ctx.restore();
}

export function shouldAddWatermark(userTier: string): boolean {
  return userTier !== 'premium' && userTier !== 'lifetime';
}
