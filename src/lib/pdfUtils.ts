'use client';

import type { PDFPage } from '@/types';

export async function loadPDFPages(file: File): Promise<PDFPage[]> {
  try {
    // Dynamic import to avoid SSR issues
    const pdfjsLib = await import('pdfjs-dist');

    // Configure PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const pages: PDFPage[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 });

      // Create canvas to render page
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error(`Failed to get canvas context for page ${i}`);
      }

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      pages.push({
        pageNumber: i,
        imageData: canvas.toDataURL('image/png'),
        width: viewport.width,
        height: viewport.height,
        blurRegions: [],
      });
    }

    return pages;
  } catch (error) {
    console.error('PDF loading error:', error);
    throw error;
  }
}

export function isPDFFile(file: File): boolean {
  return file.type === 'application/pdf';
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}
