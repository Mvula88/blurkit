'use client';

import { useState, useCallback, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ImageUpload } from '@/components/editor/ImageUpload';
import { BlurCanvas } from '@/components/editor/BlurCanvas';
import { PDFViewer } from '@/components/editor/PDFViewer';
import { Toolbar } from '@/components/editor/Toolbar';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Save, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { loadPDFPages } from '@/lib/pdfUtils';
import { exportPDFWithBlur } from '@/lib/pdfExport';
import type { Tool, BlurRegion, BlurType, PDFPage, FileType } from '@/types';

export default function EditorPage() {
  const { user } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [fileType, setFileType] = useState<FileType>('image');
  const [pdfPages, setPdfPages] = useState<PDFPage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tool, setTool] = useState<Tool>('rectangle');
  const [blurIntensity, setBlurIntensity] = useState(10);
  const [blurType, setBlurType] = useState<BlurType>('gaussian');
  const [fillColor, setFillColor] = useState('#ffffff');
  const [blurRegions, setBlurRegions] = useState<BlurRegion[]>([]);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [canvasScale, setCanvasScale] = useState(1);

  // History for undo/redo
  const [history, setHistory] = useState<BlurRegion[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleImageUpload = useCallback((imageData: string) => {
    setFileType('image');
    setImage(imageData);
    setPdfPages([]);
    setBlurRegions([]);
    setHistory([[]]);
    setHistoryIndex(0);
    setSelectedRegionId(null);
    setCurrentPage(1);
  }, []);

  const handlePDFUpload = async (file: File) => {
    try {
      toast.info('Loading PDF...');
      const pages = await loadPDFPages(file);
      setFileType('pdf');
      setPdfPages(pages);
      setImage(null);
      setBlurRegions([]);
      setHistory([[]]);
      setHistoryIndex(0);
      setSelectedRegionId(null);
      setCurrentPage(1);
      toast.success(`PDF loaded with ${pages.length} pages`);
    } catch (error) {
      console.error('Error loading PDF:', error);
      toast.error('Failed to load PDF');
    }
  };

  const updateHistory = useCallback(
    (newRegions: BlurRegion[]) => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newRegions);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setBlurRegions(newRegions);
    },
    [history, historyIndex]
  );

  const getCurrentBlurRegions = () => {
    if (fileType === 'pdf' && pdfPages.length > 0) {
      return pdfPages[currentPage - 1]?.blurRegions || [];
    }
    return blurRegions;
  };

  const updatePDFPageRegions = (newRegions: BlurRegion[]) => {
    const updatedPages = pdfPages.map((page, index) =>
      index === currentPage - 1 ? { ...page, blurRegions: newRegions } : page
    );
    setPdfPages(updatedPages);
  };

  const handleAddBlurRegion = (region: BlurRegion) => {
    if (fileType === 'pdf') {
      const currentRegions = getCurrentBlurRegions();
      const newRegions = [...currentRegions, region];
      updatePDFPageRegions(newRegions);
      updateHistory(newRegions);
    } else {
      updateHistory([...blurRegions, region]);
    }
  };

  const handleUpdateBlurRegion = (id: string, updates: Partial<BlurRegion>) => {
    const currentRegions = getCurrentBlurRegions();
    const newRegions = currentRegions.map((region) =>
      region.id === id ? { ...region, ...updates } : region
    );
    if (fileType === 'pdf') {
      updatePDFPageRegions(newRegions);
    }
    updateHistory(newRegions);
  };

  const handleRemoveBlurRegion = (id: string) => {
    const currentRegions = getCurrentBlurRegions();
    const newRegions = currentRegions.filter((region) => region.id !== id);
    if (fileType === 'pdf') {
      updatePDFPageRegions(newRegions);
    }
    updateHistory(newRegions);
    if (selectedRegionId === id) {
      setSelectedRegionId(null);
    }
  };

  const handleClearAll = () => {
    if (fileType === 'pdf') {
      updatePDFPageRegions([]);
    }
    updateHistory([]);
    setSelectedRegionId(null);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      const newRegions = history[historyIndex - 1];
      if (fileType === 'pdf') {
        updatePDFPageRegions(newRegions);
      }
      setBlurRegions(newRegions);
      setSelectedRegionId(null);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const newRegions = history[historyIndex + 1];
      if (fileType === 'pdf') {
        updatePDFPageRegions(newRegions);
      }
      setBlurRegions(newRegions);
      setSelectedRegionId(null);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSelectedRegionId(null);
    const pageRegions = pdfPages[newPage - 1]?.blurRegions || [];
    setBlurRegions(pageRegions);
    setHistory([[...pageRegions]]);
    setHistoryIndex(0);
  };

  const handleExport = async () => {
    if (fileType === 'pdf' && pdfPages.length > 0) {
      try {
        toast.info('Exporting PDF...');
        await exportPDFWithBlur(pdfPages, canvasScale);
        toast.success('PDF exported successfully!');
      } catch (error) {
        console.error('Error exporting PDF:', error);
        toast.error('Failed to export PDF');
      }
      return;
    }

    if (!image) return;

    // Create a canvas to render the blurred image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Calculate scale factor to convert canvas coords to image coords
      const scale = 1 / canvasScale;

      // Apply blur regions
      blurRegions.forEach((region) => {
        ctx.save();

        // Scale coordinates from canvas to original image size
        const startX = region.startX * scale;
        const startY = region.startY * scale;
        const endX = region.endX * scale;
        const endY = region.endY * scale;
        const width = endX - startX;
        const height = endY - startY;

        if (region.blurType === 'solid') {
          // Fill with solid color
          ctx.fillStyle = region.fillColor;

          if (region.type === 'rectangle') {
            ctx.fillRect(startX, startY, width, height);
          } else if (region.type === 'circle') {
            const centerX = (startX + endX) / 2;
            const centerY = (startY + endY) / 2;
            const radius =
              Math.sqrt(
                Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
              ) / 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (region.blurType === 'pixelate') {
          // Pixelate effect
          const pixelSize = region.blurIntensity * scale;

          if (region.type === 'rectangle') {
            for (let y = startY; y < endY; y += pixelSize) {
              for (let x = startX; x < endX; x += pixelSize) {
                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                if (!tempCtx) continue;

                tempCanvas.width = 1;
                tempCanvas.height = 1;
                tempCtx.drawImage(img, x, y, 1, 1, 0, 0, 1, 1);
                const pixelData = tempCtx.getImageData(0, 0, 1, 1).data;

                ctx.fillStyle = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
                ctx.fillRect(x, y, pixelSize, pixelSize);
              }
            }
          } else if (region.type === 'circle') {
            const centerX = (startX + endX) / 2;
            const centerY = (startY + endY) / 2;
            const radius =
              Math.sqrt(
                Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
              ) / 2;

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.clip();

            for (let y = startY; y < endY; y += pixelSize) {
              for (let x = startX; x < endX; x += pixelSize) {
                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                if (!tempCtx) continue;

                tempCanvas.width = 1;
                tempCanvas.height = 1;
                tempCtx.drawImage(img, x, y, 1, 1, 0, 0, 1, 1);
                const pixelData = tempCtx.getImageData(0, 0, 1, 1).data;

                ctx.fillStyle = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
                ctx.fillRect(x, y, pixelSize, pixelSize);
              }
            }
          }
        } else {
          // Gaussian blur (default)
          ctx.filter = `blur(${region.blurIntensity}px)`;

          if (region.type === 'rectangle') {
            ctx.drawImage(
              img,
              startX,
              startY,
              width,
              height,
              startX,
              startY,
              width,
              height
            );
          } else if (region.type === 'circle') {
            const centerX = (startX + endX) / 2;
            const centerY = (startY + endY) / 2;
            const radius =
              Math.sqrt(
                Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
              ) / 2;

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(img, 0, 0, img.width, img.height);
          }
        }

        ctx.restore();
      });

      // Download the image
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `blurred-image-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Image exported successfully!');
      });
    };
    img.src = image;
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Please sign in to save projects');
      return;
    }

    toast.info('Save functionality coming soon!');
    // TODO: Implement save to Supabase
  };

  // Handle clipboard paste for screenshots
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (!file) continue;

          // Validate file size (10MB limit)
          if (file.size > 10 * 1024 * 1024) {
            toast.error('Image size must be less than 10MB');
            return;
          }

          const reader = new FileReader();
          reader.onload = (event) => {
            const result = event.target?.result as string;
            handleImageUpload(result);
            toast.success('Screenshot pasted successfully!');
          };
          reader.onerror = () => {
            toast.error('Failed to read pasted image');
          };
          reader.readAsDataURL(file);
          break;
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handleImageUpload]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Image & PDF Editor
            </h1>
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse" />
          </div>
          <p className="text-lg text-muted-foreground">
            Upload an image or PDF, paste a screenshot (Ctrl+V), and draw blur
            regions to protect sensitive information
          </p>
        </div>

        {(image || pdfPages.length > 0) && (
          <Card className="mb-6 border-blue-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <span className="font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Quick Actions
                </span>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    onClick={handleExport}
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {fileType === 'pdf' ? 'Export PDF' : 'Export Image'}
                  </Button>
                  {user && (
                    <Button
                      onClick={handleSave}
                      variant="outline"
                      size="sm"
                      className="border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Project
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setImage(null);
                      setPdfPages([]);
                      setFileType('image');
                    }}
                    variant="outline"
                    size="sm"
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    New File
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!image && pdfPages.length === 0 ? (
          <ImageUpload
            onImageUpload={handleImageUpload}
            onPDFUpload={handlePDFUpload}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            <div className="order-2 lg:order-1">
              {fileType === 'pdf' ? (
                <PDFViewer
                  pages={pdfPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  tool={tool}
                  blurIntensity={blurIntensity}
                  blurType={blurType}
                  fillColor={fillColor}
                  onAddBlurRegion={handleAddBlurRegion}
                  onUpdateBlurRegion={handleUpdateBlurRegion}
                  onSelectRegion={setSelectedRegionId}
                  selectedRegionId={selectedRegionId}
                  onScaleChange={setCanvasScale}
                />
              ) : image ? (
                <BlurCanvas
                  image={image}
                  tool={tool}
                  blurIntensity={blurIntensity}
                  blurType={blurType}
                  fillColor={fillColor}
                  blurRegions={blurRegions}
                  selectedRegionId={selectedRegionId}
                  onAddBlurRegion={handleAddBlurRegion}
                  onUpdateBlurRegion={handleUpdateBlurRegion}
                  onSelectRegion={setSelectedRegionId}
                  onScaleChange={setCanvasScale}
                />
              ) : null}
            </div>

            <div className="order-1 lg:order-2">
              <Toolbar
                tool={tool}
                onToolChange={setTool}
                blurIntensity={blurIntensity}
                onBlurIntensityChange={setBlurIntensity}
                blurType={blurType}
                onBlurTypeChange={setBlurType}
                fillColor={fillColor}
                onFillColorChange={setFillColor}
                blurRegions={getCurrentBlurRegions()}
                onRemoveBlurRegion={handleRemoveBlurRegion}
                onClearAll={handleClearAll}
                onUndo={handleUndo}
                onRedo={handleRedo}
                canUndo={historyIndex > 0}
                canRedo={historyIndex < history.length - 1}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
