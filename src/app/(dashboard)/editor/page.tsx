'use client';

import { useState } from 'react';
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

  const handleImageUpload = (imageData: string) => {
    setImage(imageData);
    setBlurRegions([]);
  };

  const handleAddBlurRegion = (region: BlurRegion) => {
    setBlurRegions([...blurRegions, region]);
  };

  const handleRemoveBlurRegion = (id: string) => {
    setBlurRegions(blurRegions.filter((region) => region.id !== id));
  };

  const handleClearAll = () => {
    setBlurRegions([]);
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
                onAddBlurRegion={handleAddBlurRegion}
                onRemoveBlurRegion={handleRemoveBlurRegion}
              />
            </div>

            <div className="order-1 lg:order-2">
              <Toolbar
                tool={tool}
                onToolChange={setTool}
                blurIntensity={blurIntensity}
                onBlurIntensityChange={setBlurIntensity}
                blurRegions={blurRegions}
                onRemoveBlurRegion={handleRemoveBlurRegion}
                onClearAll={handleClearAll}
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
