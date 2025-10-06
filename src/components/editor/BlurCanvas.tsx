'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import type { Tool, BlurRegion } from '@/types';

interface BlurCanvasProps {
  image: string;
  tool: Tool;
  blurIntensity: number;
  blurRegions: BlurRegion[];
  selectedRegionId: string | null;
  onAddBlurRegion: (region: BlurRegion) => void;
  onUpdateBlurRegion: (id: string, updates: Partial<BlurRegion>) => void;
  onSelectRegion: (id: string | null) => void;
}

export function BlurCanvas({
  image,
  tool,
  blurIntensity,
  blurRegions,
  selectedRegionId,
  onAddBlurRegion,
  onUpdateBlurRegion,
  onSelectRegion,
}: BlurCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);

  // Helper function to check if a point is inside a rectangle
  const isPointInRectangle = useCallback(
    (x: number, y: number, region: BlurRegion) => {
      return (
        x >= region.startX &&
        x <= region.endX &&
        y >= region.startY &&
        y <= region.endY
      );
    },
    []
  );

  // Helper function to check if a point is inside a circle
  const isPointInCircle = useCallback(
    (x: number, y: number, region: BlurRegion) => {
      const centerX = (region.startX + region.endX) / 2;
      const centerY = (region.startY + region.endY) / 2;
      const radius =
        Math.sqrt(
          Math.pow(region.endX - region.startX, 2) +
            Math.pow(region.endY - region.startY, 2)
        ) / 2;
      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );
      return distance <= radius;
    },
    []
  );

  // Helper function to get resize handle at position
  const getResizeHandle = useCallback(
    (x: number, y: number, region: BlurRegion) => {
      const handleSize = 8;
      const handles = [
        { name: 'nw', x: region.startX, y: region.startY },
        { name: 'n', x: (region.startX + region.endX) / 2, y: region.startY },
        { name: 'ne', x: region.endX, y: region.startY },
        { name: 'e', x: region.endX, y: (region.startY + region.endY) / 2 },
        { name: 'se', x: region.endX, y: region.endY },
        { name: 's', x: (region.startX + region.endX) / 2, y: region.endY },
        { name: 'sw', x: region.startX, y: region.endY },
        { name: 'w', x: region.startX, y: (region.startY + region.endY) / 2 },
      ];

      for (const handle of handles) {
        if (
          Math.abs(x - handle.x) <= handleSize &&
          Math.abs(y - handle.y) <= handleSize
        ) {
          return handle.name;
        }
      }
      return null;
    },
    []
  );

  const drawBlurRegion = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      region: BlurRegion,
      canvas: HTMLCanvasElement,
      img: HTMLImageElement,
      isSelected: boolean
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
      ctx.strokeStyle = isSelected ? '#f59e0b' : '#3b82f6';
      ctx.lineWidth = isSelected ? 3 : 2;

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

      // Draw resize handles for selected region
      if (isSelected) {
        ctx.fillStyle = '#f59e0b';
        const handleSize = 8;
        const handles = [
          { x: region.startX, y: region.startY },
          { x: (region.startX + region.endX) / 2, y: region.startY },
          { x: region.endX, y: region.startY },
          { x: region.endX, y: (region.startY + region.endY) / 2 },
          { x: region.endX, y: region.endY },
          { x: (region.startX + region.endX) / 2, y: region.endY },
          { x: region.startX, y: region.endY },
          { x: region.startX, y: (region.startY + region.endY) / 2 },
        ];

        handles.forEach((handle) => {
          ctx.fillRect(
            handle.x - handleSize / 2,
            handle.y - handleSize / 2,
            handleSize,
            handleSize
          );
        });
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
      const isSelected = region.id === selectedRegionId;
      drawBlurRegion(ctx, region, canvas, img, isSelected);
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
  }, [
    blurRegions,
    selectedRegionId,
    isDrawing,
    tool,
    startPos,
    currentPos,
    drawBlurRegion,
  ]);

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

    if (tool === 'select') {
      // Check if clicking on selected region's resize handle
      if (selectedRegionId) {
        const selectedRegion = blurRegions.find((r) => r.id === selectedRegionId);
        if (selectedRegion) {
          const handle = getResizeHandle(pos.x, pos.y, selectedRegion);
          if (handle) {
            setResizeHandle(handle);
            setStartPos(pos);
            return;
          }
        }
      }

      // Check if clicking on a region to select or drag
      for (let i = blurRegions.length - 1; i >= 0; i--) {
        const region = blurRegions[i];
        const isInside =
          region.type === 'rectangle'
            ? isPointInRectangle(pos.x, pos.y, region)
            : isPointInCircle(pos.x, pos.y, region);

        if (isInside) {
          onSelectRegion(region.id);
          setIsDragging(true);
          setDragStart(pos);
          setStartPos(pos);
          return;
        }
      }

      // Clicked on empty space, deselect
      onSelectRegion(null);
    } else {
      // Drawing mode (rectangle or circle)
      setStartPos(pos);
      setCurrentPos(pos);
      setIsDrawing(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);

    if (tool === 'select' && selectedRegionId) {
      const selectedRegion = blurRegions.find((r) => r.id === selectedRegionId);
      if (!selectedRegion) return;

      // Handle resizing
      if (resizeHandle) {
        const dx = pos.x - startPos.x;
        const dy = pos.y - startPos.y;
        let updates: Partial<BlurRegion> = {};

        switch (resizeHandle) {
          case 'nw':
            updates = { startX: selectedRegion.startX + dx, startY: selectedRegion.startY + dy };
            break;
          case 'n':
            updates = { startY: selectedRegion.startY + dy };
            break;
          case 'ne':
            updates = { endX: selectedRegion.endX + dx, startY: selectedRegion.startY + dy };
            break;
          case 'e':
            updates = { endX: selectedRegion.endX + dx };
            break;
          case 'se':
            updates = { endX: selectedRegion.endX + dx, endY: selectedRegion.endY + dy };
            break;
          case 's':
            updates = { endY: selectedRegion.endY + dy };
            break;
          case 'sw':
            updates = { startX: selectedRegion.startX + dx, endY: selectedRegion.endY + dy };
            break;
          case 'w':
            updates = { startX: selectedRegion.startX + dx };
            break;
        }

        onUpdateBlurRegion(selectedRegionId, updates);
        setStartPos(pos);
        return;
      }

      // Handle dragging
      if (isDragging) {
        const dx = pos.x - dragStart.x;
        const dy = pos.y - dragStart.y;

        onUpdateBlurRegion(selectedRegionId, {
          startX: selectedRegion.startX + dx,
          startY: selectedRegion.startY + dy,
          endX: selectedRegion.endX + dx,
          endY: selectedRegion.endY + dy,
        });

        setDragStart(pos);
      }
    } else if (isDrawing) {
      // Drawing mode
      setCurrentPos(pos);
      redrawCanvas();
    }
  };

  const handleMouseUp = () => {
    if (resizeHandle) {
      setResizeHandle(null);
      return;
    }

    if (isDragging) {
      setIsDragging(false);
      return;
    }

    if (isDrawing) {
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
    }
  };

  return (
    <Card className="p-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            setIsDrawing(false);
            setIsDragging(false);
            setResizeHandle(null);
          }}
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
        {tool === 'select'
          ? 'Click to select a region, drag to move, or drag handles to resize'
          : `Click and drag to draw ${tool === 'rectangle' ? 'a rectangle' : 'a circle'} blur region`}
      </p>
    </Card>
  );
}
