'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import type { PDFPage, BlurRegion, Tool, BlurType } from '@/types';
import { BlurCanvas } from './BlurCanvas';

interface PDFViewerProps {
  pages: PDFPage[];
  currentPage: number;
  onPageChange: (page: number) => void;
  tool: Tool;
  blurIntensity: number;
  blurType: BlurType;
  fillColor: string;
  onAddBlurRegion: (region: BlurRegion) => void;
  onUpdateBlurRegion: (id: string, updates: Partial<BlurRegion>) => void;
  onSelectRegion: (id: string | null) => void;
  selectedRegionId: string | null;
  onScaleChange: (scale: number) => void;
}

export function PDFViewer({
  pages,
  currentPage,
  onPageChange,
  tool,
  blurIntensity,
  blurType,
  fillColor,
  onAddBlurRegion,
  onUpdateBlurRegion,
  onSelectRegion,
  selectedRegionId,
  onScaleChange,
}: PDFViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
      // Middle mouse button or Shift + left click for panning
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom((prev) => Math.max(0.5, Math.min(3, prev + delta)));
    }
  };

  const currentPageData = pages[currentPage - 1];

  return (
    <div className="space-y-4">
      {/* Page Navigation and Zoom Controls */}
      <Card className="border-blue-100 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-blue-200 hover:bg-blue-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                Page {currentPage} of {pages.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === pages.length}
                className="border-blue-200 hover:bg-blue-50"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
                className="border-blue-200 hover:bg-blue-50"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium w-16 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className="border-blue-200 hover:bg-blue-50"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetZoom}
                className="border-blue-200 hover:bg-blue-50"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PDF Page Canvas */}
      <div
        className="overflow-auto max-h-[70vh] border border-gray-200 rounded-lg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ cursor: isPanning ? 'grabbing' : 'default' }}
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'top left',
            display: 'inline-block',
          }}
        >
          <BlurCanvas
            image={currentPageData.imageData}
            tool={tool}
            blurIntensity={blurIntensity}
            blurType={blurType}
            fillColor={fillColor}
            blurRegions={currentPageData.blurRegions}
            selectedRegionId={selectedRegionId}
            onAddBlurRegion={onAddBlurRegion}
            onUpdateBlurRegion={onUpdateBlurRegion}
            onSelectRegion={onSelectRegion}
            onScaleChange={onScaleChange}
          />
        </div>
      </div>
    </div>
  );
}
