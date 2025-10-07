'use client';

import * as pdfjsLib from 'pdfjs-dist';
import type { PDFPage } from '@/types';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export async function loadPDFPages(file: File): Promise<PDFPage[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages: PDFPage[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });

    // Create canvas to render page
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) continue;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: context,
      viewport: viewport,
      canvas: canvas,
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
}

export function isPDFFile(file: File): boolean {
  return file.type === 'application/pdf';
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}
