import { Play, FileText, Music, Film } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { MediaItem } from '@/types/media';
import { cn } from '@/lib/utils';

interface MediaCardProps {
  item: MediaItem;
  onClick: (item: MediaItem) => void;
  isActive?: boolean;
}

const getMediaIcon = (type: MediaItem['type']) => {
  switch (type) {
    case 'video':
      return Film;
    case 'audio':
      return Music;
    case 'pdf':
      return FileText;
    default:
      return Play;
  }
};

const getTypeColor = (type: MediaItem['type']) => {
  switch (type) {
    case 'video':
      return 'bg-primary';
    case 'audio':
      return 'bg-green-600';
    case 'pdf':
      return 'bg-blue-600';
    default:
      return 'bg-secondary';
  }
};

const getTypeLabel = (type: MediaItem['type']) => {
  switch (type) {
    case 'video':
      return 'וידאו';
    case 'audio':
      return 'אודיו';
    case 'pdf':
      return 'PDF';
    default:
      return 'קובץ';
  }
};

export const MediaCard = ({ item, onClick, isActive }: MediaCardProps) => {
  const Icon = getMediaIcon(item.type);

  return (
    <Card
      className={cn(
        "media-card group cursor-pointer overflow-hidden border-transparent hover:border-primary/50",
        isActive && "ring-2 ring-primary"
      )}
      onClick={() => onClick(item)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Icon className="w-12 h-12 text-muted-foreground/50" />
        )}
        
        {/* Play overlay */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
            <Play className="w-6 h-6 text-primary-foreground mr-[-2px]" />
          </div>
        </div>

        {/* Duration badge */}
        {item.duration && (
          <span className="absolute bottom-2 left-2 px-2 py-0.5 text-xs font-medium bg-background/80 rounded">
            {item.duration}
          </span>
        )}

        {/* Type badge */}
        <span className={cn(
          "absolute top-2 right-2 px-2 py-0.5 text-xs font-medium rounded text-white",
          getTypeColor(item.type)
        )}>
          {getTypeLabel(item.type)}
        </span>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-1 text-foreground">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </Card>
  );
};
