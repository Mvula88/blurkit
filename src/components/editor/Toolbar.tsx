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
      <Card className="border-blue-100 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={tool === 'select' ? 'default' : 'outline'}
              onClick={() => onToolChange('select')}
              className={
                tool === 'select'
                  ? 'w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                  : 'w-full border-blue-200 hover:bg-blue-50'
              }
            >
              <MousePointer2 className="mr-1 h-4 w-4" />
              Select
            </Button>
            <Button
              variant={tool === 'rectangle' ? 'default' : 'outline'}
              onClick={() => onToolChange('rectangle')}
              className={
                tool === 'rectangle'
                  ? 'w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                  : 'w-full border-blue-200 hover:bg-blue-50'
              }
            >
              <Square className="mr-1 h-4 w-4" />
              Rect
            </Button>
            <Button
              variant={tool === 'circle' ? 'default' : 'outline'}
              onClick={() => onToolChange('circle')}
              className={
                tool === 'circle'
                  ? 'w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                  : 'w-full border-blue-200 hover:bg-blue-50'
              }
            >
              <Circle className="mr-1 h-4 w-4" />
              Circle
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onUndo}
              disabled={!canUndo}
              className="flex-1 border-blue-200 hover:bg-blue-50 disabled:opacity-40"
            >
              <Undo className="mr-2 h-4 w-4" />
              Undo
            </Button>
            <Button
              variant="outline"
              onClick={onRedo}
              disabled={!canRedo}
              className="flex-1 border-blue-200 hover:bg-blue-50 disabled:opacity-40"
            >
              <Redo className="mr-2 h-4 w-4" />
              Redo
            </Button>
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">
              Blur Intensity:{' '}
              <span className="text-blue-600">{blurIntensity}px</span>
            </Label>
            <Slider
              value={[blurIntensity]}
              onValueChange={(value) => onBlurIntensityChange(value[0])}
              min={5}
              max={50}
              step={1}
              className="cursor-pointer"
            />
          </div>
        </CardContent>
      </Card>

      {/* Blur Regions */}
      <Card className="border-blue-100 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Blur Regions ({blurRegions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {blurRegions.length === 0 ? (
            <div className="text-center py-8 px-4 bg-blue-50/50 rounded-lg border-2 border-dashed border-blue-200">
              <p className="text-sm text-muted-foreground">
                No blur regions yet
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Draw on canvas to add
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
              {blurRegions.map((region, index) => (
                <div
                  key={region.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 hover:shadow-sm transition-all"
                >
                  <span className="text-sm font-medium flex items-center gap-2">
                    <span className="text-blue-600">
                      {region.type === 'rectangle' ? '▭' : '●'}
                    </span>
                    Region {index + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveBlurRegion(region.id)}
                    className="hover:bg-red-50 hover:text-red-600"
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
              className="w-full mt-4 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
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
