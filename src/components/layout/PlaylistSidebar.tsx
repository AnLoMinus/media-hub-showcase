import { X, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MediaItem } from '@/types/media';
import { cn } from '@/lib/utils';

interface PlaylistSidebarProps {
  items: MediaItem[];
  currentItem?: MediaItem;
  onItemClick: (item: MediaItem) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const PlaylistSidebar = ({ items, currentItem, onItemClick, isOpen, onClose }: PlaylistSidebarProps) => {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-full w-80 bg-card border-r border-border transform transition-transform duration-300 z-50",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <List className="w-5 h-5" />
          <h2 className="font-semibold">פלייליסט</h2>
          <span className="text-sm text-muted-foreground">({items.length})</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Items */}
      <ScrollArea className="h-[calc(100vh-65px)]">
        <div className="p-2 space-y-1">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => onItemClick(item)}
              className={cn(
                "w-full text-right p-3 rounded-lg transition-colors flex items-center gap-3",
                currentItem?.id === item.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              )}
            >
              <span className="text-sm text-muted-foreground w-6">{index + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.title}</p>
                {item.duration && (
                  <p className="text-xs opacity-70">{item.duration}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
