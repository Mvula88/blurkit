'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import type { Tool, BlurRegion } from '@/types';

interface BlurCanvasProps {
  image: string;
  tool: Tool;
  blurIntensity: number;
  blurRegions: BlurRegion[];
  onAddBlurRegion: (region: BlurRegion) => void;
  onRemoveBlurRegion: (id: string) => void;
}

export function BlurCanvas({
  image,
  tool,
  blurIntensity,
  blurRegions,
  onAddBlurRegion,
}: BlurCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const drawBlurRegion = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      region: BlurRegion,
      canvas: HTMLCanvasElement,
      img: HTMLImageElement
    ) => {
      ctx.save();
      ctx.filter = `blur(${region.blurIntensity}px)`;

      if (region.type === 'rectangle') {
        const width = region.endX - region.startX;
        const height = region.endY - region.startY;

        // Scale coordinates from image to canvas
        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;

        ctx.drawImage(
          img,
          region.startX / scaleX,
          region.startY / scaleY,
          width / scaleX,
          height / scaleY,
          region.startX,
          region.startY,
          width,
          height
        );
      } else if (region.type === 'circle') {
        const centerX = (region.startX + region.endX) / 2;
        const centerY = (region.startY + region.endY) / 2;
        const radius =
          Math.sqrt(
            Math.pow(region.endX - region.startX, 2) +
              Math.pow(region.endY - region.startY, 2)
          ) / 2;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }

      ctx.restore();

      // Draw outline
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;

      if (region.type === 'rectangle') {
        const width = region.endX - region.startX;
        const height = region.endY - region.startY;
        ctx.strokeRect(region.startX, region.startY, width, height);
      } else if (region.type === 'circle') {
        const centerX = (region.startX + region.endX) / 2;
        const centerY = (region.startY + region.endY) / 2;
        const radius =
          Math.sqrt(
            Math.pow(region.endX - region.startX, 2) +
              Math.pow(region.endY - region.startY, 2)
          ) / 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    },
    []
  );

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw original image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Draw blur regions
    blurRegions.forEach((region) => {
      drawBlurRegion(ctx, region, canvas, img);
    });

    // Draw current drawing if in progress
    if (isDrawing) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);

      if (tool === 'rectangle') {
        const width = currentPos.x - startPos.x;
        const height = currentPos.y - startPos.y;
        ctx.strokeRect(startPos.x, startPos.y, width, height);
      } else if (tool === 'circle') {
        const radius =
          Math.sqrt(
            Math.pow(currentPos.x - startPos.x, 2) +
              Math.pow(currentPos.y - startPos.y, 2)
          ) / 2;
        const centerX = (startPos.x + currentPos.x) / 2;
        const centerY = (startPos.y + currentPos.y) / 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.setLineDash([]);
    }
  }, [blurRegions, isDrawing, tool, startPos, currentPos, drawBlurRegion]);

  // Load and draw image
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Set canvas size to match image
      const maxWidth = canvas.parentElement?.clientWidth || 800;
      const scale = Math.min(1, maxWidth / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      imageRef.current = img;
      setImageLoaded(true);
      redrawCanvas();
    };
    img.src = image;
  }, [image, redrawCanvas]);

  // Redraw canvas when blur regions change
  useEffect(() => {
    if (imageLoaded) {
      redrawCanvas();
    }
  }, [blurRegions, imageLoaded, redrawCanvas]);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);
    setStartPos(pos);
    setCurrentPos(pos);
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const pos = getMousePos(e);
    setCurrentPos(pos);
    redrawCanvas();
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;

    const width = Math.abs(currentPos.x - startPos.x);
    const height = Math.abs(currentPos.y - startPos.y);

    // Only create region if it's large enough
    if (width > 10 && height > 10) {
      const newRegion: BlurRegion = {
        id: `region-${Date.now()}`,
        type: tool as 'rectangle' | 'circle',
        startX: Math.min(startPos.x, currentPos.x),
        startY: Math.min(startPos.y, currentPos.y),
        endX: Math.max(startPos.x, currentPos.x),
        endY: Math.max(startPos.y, currentPos.y),
        blurIntensity: blurIntensity,
      };

      onAddBlurRegion(newRegion);
    }

    setIsDrawing(false);
  };

  return (
    <Card className="p-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDrawing(false)}
          className="w-full h-auto cursor-crosshair border rounded-md"
          style={{ maxHeight: 'calc(100vh - 200px)' }}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-muted-foreground">Loading image...</div>
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        Click and drag to draw{' '}
        {tool === 'rectangle' ? 'a rectangle' : 'a circle'} blur region
      </p>
    </Card>
  );
}
