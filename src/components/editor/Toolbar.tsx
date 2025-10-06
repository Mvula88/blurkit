'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Square,
  Circle,
  Trash2,
  MousePointer2,
  Undo,
  Redo,
} from 'lucide-react';
import type { Tool, BlurRegion } from '@/types';

interface ToolbarProps {
  tool: Tool;
  onToolChange: (tool: Tool) => void;
  blurIntensity: number;
  onBlurIntensityChange: (intensity: number) => void;
  blurRegions: BlurRegion[];
  onRemoveBlurRegion: (id: string) => void;
  onClearAll: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function Toolbar({
  tool,
  onToolChange,
  blurIntensity,
  onBlurIntensityChange,
  blurRegions,
  onRemoveBlurRegion,
  onClearAll,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: ToolbarProps) {

  return (
    <div className="space-y-6">
      {/* Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={tool === 'select' ? 'default' : 'outline'}
              onClick={() => onToolChange('select')}
              className="w-full"
            >
              <MousePointer2 className="mr-2 h-4 w-4" />
              Select
            </Button>
            <Button
              variant={tool === 'rectangle' ? 'default' : 'outline'}
              onClick={() => onToolChange('rectangle')}
              className="w-full"
            >
              <Square className="mr-2 h-4 w-4" />
              Rectangle
            </Button>
            <Button
              variant={tool === 'circle' ? 'default' : 'outline'}
              onClick={() => onToolChange('circle')}
              className="w-full"
            >
              <Circle className="mr-2 h-4 w-4" />
              Circle
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onUndo}
              disabled={!canUndo}
              className="flex-1"
            >
              <Undo className="mr-2 h-4 w-4" />
              Undo
            </Button>
            <Button
              variant="outline"
              onClick={onRedo}
              disabled={!canRedo}
              className="flex-1"
            >
              <Redo className="mr-2 h-4 w-4" />
              Redo
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Blur Intensity: {blurIntensity}px</Label>
            <Slider
              value={[blurIntensity]}
              onValueChange={(value) => onBlurIntensityChange(value[0])}
              min={5}
              max={50}
              step={1}
            />
          </div>
        </CardContent>
      </Card>

      {/* Blur Regions */}
      <Card>
        <CardHeader>
          <CardTitle>Blur Regions ({blurRegions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {blurRegions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No blur regions yet. Draw on the canvas to add.
            </p>
          ) : (
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {blurRegions.map((region, index) => (
                <div
                  key={region.id}
                  className="flex items-center justify-between p-2 rounded-md border"
                >
                  <span className="text-sm">
                    {region.type === 'rectangle' ? '▭' : '●'} Region {index + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveBlurRegion(region.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {blurRegions.length > 0 && (
            <Button
              variant="outline"
              onClick={onClearAll}
              className="w-full mt-4"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
