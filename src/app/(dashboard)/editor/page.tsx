'use client';

import { useState, useCallback } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ImageUpload } from '@/components/editor/ImageUpload';
import { BlurCanvas } from '@/components/editor/BlurCanvas';
import { Toolbar } from '@/components/editor/Toolbar';
import { useAuth } from '@/hooks/useAuth';
import type { Tool, BlurRegion } from '@/types';

export default function EditorPage() {
  const { user } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [tool, setTool] = useState<Tool>('rectangle');
  const [blurIntensity, setBlurIntensity] = useState(10);
  const [blurRegions, setBlurRegions] = useState<BlurRegion[]>([]);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);

  // History for undo/redo
  const [history, setHistory] = useState<BlurRegion[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleImageUpload = (imageData: string) => {
    setImage(imageData);
    setBlurRegions([]);
    setHistory([[]]);
    setHistoryIndex(0);
    setSelectedRegionId(null);
  };

  const updateHistory = useCallback((newRegions: BlurRegion[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newRegions);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setBlurRegions(newRegions);
  }, [history, historyIndex]);

  const handleAddBlurRegion = (region: BlurRegion) => {
    updateHistory([...blurRegions, region]);
  };

  const handleUpdateBlurRegion = (id: string, updates: Partial<BlurRegion>) => {
    const newRegions = blurRegions.map((region) =>
      region.id === id ? { ...region, ...updates } : region
    );
    updateHistory(newRegions);
  };

  const handleRemoveBlurRegion = (id: string) => {
    const newRegions = blurRegions.filter((region) => region.id !== id);
    updateHistory(newRegions);
    if (selectedRegionId === id) {
      setSelectedRegionId(null);
    }
  };

  const handleClearAll = () => {
    updateHistory([]);
    setSelectedRegionId(null);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setBlurRegions(history[historyIndex - 1]);
      setSelectedRegionId(null);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setBlurRegions(history[historyIndex + 1]);
      setSelectedRegionId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Image Editor</h1>
          <p className="text-muted-foreground">
            Upload an image and draw blur regions to protect sensitive
            information
          </p>
        </div>

        {!image ? (
          <ImageUpload onImageUpload={handleImageUpload} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            <div className="order-2 lg:order-1">
              <BlurCanvas
                image={image}
                tool={tool}
                blurIntensity={blurIntensity}
                blurRegions={blurRegions}
                selectedRegionId={selectedRegionId}
                onAddBlurRegion={handleAddBlurRegion}
                onUpdateBlurRegion={handleUpdateBlurRegion}
                onSelectRegion={setSelectedRegionId}
              />
            </div>

            <div className="order-1 lg:order-2">
              <Toolbar
                tool={tool}
                onToolChange={setTool}
                blurIntensity={blurIntensity}
                onBlurIntensityChange={setBlurIntensity}
                blurRegions={blurRegions}
                selectedRegionId={selectedRegionId}
                onRemoveBlurRegion={handleRemoveBlurRegion}
                onClearAll={handleClearAll}
                onUndo={handleUndo}
                onRedo={handleRedo}
                canUndo={historyIndex > 0}
                canRedo={historyIndex < history.length - 1}
                onNewImage={() => setImage(null)}
                image={image}
                user={user}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
