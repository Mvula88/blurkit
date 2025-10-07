'use client';

import { jsPDF } from 'jspdf';
import type { PDFPage } from '@/types';

export async function exportPDFWithBlur(
  pages: PDFPage[],
  canvasScale: number
): Promise<void> {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4',
  });

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    // Create canvas to render blurred page
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;

    // Load the page image
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = page.imageData;
    });

    canvas.width = img.width;
    canvas.height = img.height;

    // Draw original image
    ctx.drawImage(img, 0, 0);

    // Calculate scale factor
    const scale = 1 / canvasScale;

    // Apply blur regions
    page.blurRegions.forEach((region) => {
      ctx.save();

      const startX = region.startX * scale;
      const startY = region.startY * scale;
      const endX = region.endX * scale;
      const endY = region.endY * scale;
      const width = endX - startX;
      const height = endY - startY;

      if (region.blurType === 'solid') {
        ctx.fillStyle = region.fillColor;

        if (region.type === 'rectangle') {
          ctx.fillRect(startX, startY, width, height);
        } else if (region.type === 'circle') {
          const centerX = (startX + endX) / 2;
          const centerY = (startY + endY) / 2;
          const radius =
            Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) /
            2;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (region.blurType === 'pixelate') {
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
            Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) /
            2;

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
        // Gaussian blur
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
            Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)) /
            2;

          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(img, 0, 0, img.width, img.height);
        }
      }

      ctx.restore();
    });

    // Add page to PDF
    const pageData = canvas.toDataURL('image/jpeg', 0.95);

    // Calculate PDF page dimensions
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgAspect = img.width / img.height;
    const pageAspect = pdfWidth / pdfHeight;

    let finalWidth = pdfWidth;
    let finalHeight = pdfHeight;

    if (imgAspect > pageAspect) {
      finalHeight = pdfWidth / imgAspect;
    } else {
      finalWidth = pdfHeight * imgAspect;
    }

    if (i > 0) {
      pdf.addPage();
    }

    pdf.addImage(pageData, 'JPEG', 0, 0, finalWidth, finalHeight);
  }

  pdf.save(`blurred-document-${Date.now()}.pdf`);
}
