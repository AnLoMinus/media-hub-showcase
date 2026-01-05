import { useState } from 'react';
import { ChevronRight, ChevronLeft, ZoomIn, ZoomOut, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MediaItem } from '@/types/media';

interface PDFViewerProps {
  item: MediaItem;
}

export const PDFViewer = ({ item }: PDFViewerProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(10); // Demo value
  const [zoom, setZoom] = useState(100);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleZoomIn = () => {
    if (zoom < 200) setZoom(zoom + 25);
  };

  const handleZoomOut = () => {
    if (zoom > 50) setZoom(zoom - 25);
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="w-5 h-5" />
          </Button>
          <span className="text-sm text-muted-foreground min-w-[4rem] text-center">
            {zoom}%
          </span>
          <Button variant="ghost" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleNextPage} disabled={currentPage >= totalPages}>
            <ChevronRight className="w-5 h-5" />
          </Button>
          <span className="text-sm text-muted-foreground">
            עמוד {currentPage} מתוך {totalPages}
          </span>
          <Button variant="ghost" size="icon" onClick={handlePrevPage} disabled={currentPage <= 1}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>

        <Button variant="ghost" size="icon">
          <Download className="w-5 h-5" />
        </Button>
      </div>

      {/* PDF Content placeholder */}
      <div className="aspect-[3/4] bg-muted flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-20 h-20 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">{item.title}</p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            (הדגמה - הוסף קבצי PDF למאגר)
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 border-t border-border">
        <h2 className="font-semibold text-lg">{item.title}</h2>
        {item.description && (
          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
        )}
      </div>
    </div>
  );
};
