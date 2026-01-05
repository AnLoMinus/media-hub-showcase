import { MediaItem } from '@/types/media';
import { VideoPlayer } from './VideoPlayer';
import { AudioPlayer } from './AudioPlayer';
import { PDFViewer } from './PDFViewer';

interface MediaPlayerProps {
  item: MediaItem;
  playlist?: MediaItem[];
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export const MediaPlayer = ({ item, onNext, onPrevious, hasNext, hasPrevious }: MediaPlayerProps) => {
  switch (item.type) {
    case 'video':
      return (
        <VideoPlayer
          item={item}
          onNext={onNext}
          onPrevious={onPrevious}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      );
    case 'audio':
      return (
        <AudioPlayer
          item={item}
          onNext={onNext}
          onPrevious={onPrevious}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      );
    case 'pdf':
      return <PDFViewer item={item} />;
    default:
      return (
        <div className="bg-card rounded-lg p-8 text-center">
          <p className="text-muted-foreground">סוג קובץ לא נתמך</p>
        </div>
      );
  }
};
