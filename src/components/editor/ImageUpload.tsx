'use client';

import { useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  onImageUpload: (imageData: string) => void;
  onPDFUpload: (file: File) => void;
}

export function ImageUpload({ onImageUpload, onPDFUpload }: ImageUploadProps) {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Check if it's a PDF
      if (file.type === 'application/pdf') {
        // Validate file size (20MB limit for PDFs)
        if (file.size > 20 * 1024 * 1024) {
          toast.error('PDF size must be less than 20MB');
          return;
        }
        onPDFUpload(file);
        return;
      }

      // Validate image file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image or PDF file');
        return;
      }

      // Validate file size (10MB limit for images)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size must be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onImageUpload(result);
      };
      reader.onerror = () => {
        toast.error('Failed to read file');
      };
      reader.readAsDataURL(file);
    },
    [onImageUpload, onPDFUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (!file) return;

      // Check if it's a PDF
      if (file.type === 'application/pdf') {
        if (file.size > 20 * 1024 * 1024) {
          toast.error('PDF size must be less than 20MB');
          return;
        }
        onPDFUpload(file);
        return;
      }

      // Validate image file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image or PDF file');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size must be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onImageUpload(result);
      };
      reader.readAsDataURL(file);
    },
    [onImageUpload, onPDFUpload]
  );

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  return (
    <Card>
      <CardContent className="py-16">
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-4">
            <Upload className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Upload Image or PDF
          </h3>
          <p className="text-muted-foreground mb-4 text-center max-w-md">
            Drag and drop an image or PDF here, or click to select a file
          </p>
          <p className="text-sm text-muted-foreground">
            Supports JPG, PNG, GIF, WEBP, PDF • Images: Max 10MB • PDFs: Max
            20MB
          </p>
          <input
            id="image-upload"
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </CardContent>
    </Card>
  );
}
