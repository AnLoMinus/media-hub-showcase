import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MediaCard } from './MediaCard';
import { MediaItem, Category } from '@/types/media';
import { useRef } from 'react';

interface CategoryRowProps {
  category: Category;
  onItemClick: (item: MediaItem) => void;
  activeItem?: MediaItem;
}

export const CategoryRow = ({ category, onItemClick, activeItem }: CategoryRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative group/row">
      {/* Category title */}
      <h2 className="text-xl font-bold mb-4 px-4 md:px-8">{category.name}</h2>

      {/* Scroll container */}
      <div className="relative">
        {/* Left arrow */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 opacity-0 group-hover/row:opacity-100 transition-opacity hidden md:flex"
          onClick={() => scroll('left')}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Items */}
        <div
          ref={scrollRef}
          className="category-row flex gap-4 overflow-x-auto px-4 md:px-8 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {category.items.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-64 md:w-72">
              <MediaCard
                item={item}
                onClick={onItemClick}
                isActive={activeItem?.id === item.id}
              />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 opacity-0 group-hover/row:opacity-100 transition-opacity hidden md:flex"
          onClick={() => scroll('right')}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>
    </section>
  );
};
