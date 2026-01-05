import { useState } from 'react';
import { X, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { MediaPlayer } from '@/components/media/MediaPlayer';
import { PlaylistSidebar } from '@/components/layout/PlaylistSidebar';
import { MediaItem } from '@/types/media';

interface MediaModalProps {
  item: MediaItem | null;
  playlist: MediaItem[];
  onClose: () => void;
  onItemChange: (item: MediaItem) => void;
}

export const MediaModal = ({ item, playlist, onClose, onItemChange }: MediaModalProps) => {
  const [showPlaylist, setShowPlaylist] = useState(false);

  if (!item) return null;

  const currentIndex = playlist.findIndex(i => i.id === item.id);
  const hasNext = currentIndex < playlist.length - 1;
  const hasPrevious = currentIndex > 0;

  const handleNext = () => {
    if (hasNext) {
      onItemChange(playlist[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (hasPrevious) {
      onItemChange(playlist[currentIndex - 1]);
    }
  };

  return (
    <>
      <Dialog open={!!item} onOpenChange={() => onClose()}>
        <DialogContent className="max-w-4xl p-0 gap-0 bg-card border-border">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPlaylist(!showPlaylist)}
              >
                <List className="w-5 h-5" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} / {playlist.length}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Player */}
          <div className="p-4">
            <MediaPlayer
              item={item}
              onNext={handleNext}
              onPrevious={handlePrevious}
              hasNext={hasNext}
              hasPrevious={hasPrevious}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Playlist sidebar */}
      <PlaylistSidebar
        items={playlist}
        currentItem={item}
        onItemClick={onItemChange}
        isOpen={showPlaylist}
        onClose={() => setShowPlaylist(false)}
      />

      {/* Overlay */}
      {showPlaylist && (
        <div
          className="fixed inset-0 bg-background/80 z-40"
          onClick={() => setShowPlaylist(false)}
        />
      )}
    </>
  );
};
