import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { CategoryRow } from '@/components/media/CategoryRow';
import { MediaModal } from '@/components/layout/MediaModal';
import { MediaCard } from '@/components/media/MediaCard';
import { useMediaLibrary } from '@/hooks/useMediaLibrary';
import { MediaItem } from '@/types/media';

const Index = () => {
  const {
    categories,
    recentItems,
    filteredItems,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType
  } = useMediaLibrary();

  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<MediaItem[]>([]);

  const handleItemClick = (item: MediaItem, playlist?: MediaItem[]) => {
    setSelectedItem(item);
    setCurrentPlaylist(playlist || filteredItems);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const isSearching = searchQuery || filterType !== 'all';

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterType={filterType}
        onFilterChange={setFilterType}
      />

      <main className="py-8 space-y-10">
        {/* Recent items hero */}
        {!isSearching && recentItems.length > 0 && (
          <section className="px-4 md:px-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">נוסף לאחרונה</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {recentItems.slice(0, 5).map((item) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  onClick={(item) => handleItemClick(item, recentItems)}
                  isActive={selectedItem?.id === item.id}
                />
              ))}
            </div>
          </section>
        )}

        {/* Search results */}
        {isSearching && (
          <section className="px-4 md:px-8">
            <h2 className="text-xl font-bold mb-4">
              תוצאות חיפוש ({filteredItems.length})
            </h2>
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredItems.map((item) => (
                  <MediaCard
                    key={item.id}
                    item={item}
                    onClick={(item) => handleItemClick(item)}
                    isActive={selectedItem?.id === item.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">לא נמצאו תוצאות</p>
                <p className="text-sm text-muted-foreground mt-2">
                  נסה לחפש משהו אחר או לשנות את הסינון
                </p>
              </div>
            )}
          </section>
        )}

        {/* Category rows */}
        {!isSearching && categories.map((category) => (
          <CategoryRow
            key={category.id}
            category={category}
            onItemClick={(item) => handleItemClick(item, category.items)}
            activeItem={selectedItem || undefined}
          />
        ))}

        {/* Empty state */}
        {!isSearching && categories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">אין תוכן להצגה</p>
            <p className="text-sm text-muted-foreground mt-2">
              הוסף קבצי מדיה למאגר כדי להתחיל
            </p>
          </div>
        )}
      </main>

      {/* Media modal */}
      <MediaModal
        item={selectedItem}
        playlist={currentPlaylist}
        onClose={handleCloseModal}
        onItemChange={setSelectedItem}
      />

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-10">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>מאגר מדיה פתוח | מופעל באמצעות GitHub Pages</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
