import { Search, Sun, Moon, Film, Music, FileText, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/hooks/useTheme';
import { MediaType } from '@/types/media';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterType: MediaType | 'all';
  onFilterChange: (type: MediaType | 'all') => void;
}

const filterOptions: { type: MediaType | 'all'; label: string; icon: React.ReactNode }[] = [
  { type: 'all', label: 'הכל', icon: <LayoutGrid className="w-4 h-4" /> },
  { type: 'video', label: 'וידאו', icon: <Film className="w-4 h-4" /> },
  { type: 'audio', label: 'אודיו', icon: <Music className="w-4 h-4" /> },
  { type: 'pdf', label: 'PDF', icon: <FileText className="w-4 h-4" /> },
];

export const Header = ({ searchQuery, onSearchChange, filterType, onFilterChange }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Film className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">מדיה גיטהאב</h1>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="חיפוש..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pr-10 bg-secondary border-transparent focus:border-primary"
            />
          </div>

          {/* Filter & Theme */}
          <div className="flex items-center gap-2">
            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
              {filterOptions.map((option) => (
                <Button
                  key={option.type}
                  variant={filterType === option.type ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onFilterChange(option.type)}
                  className="gap-1"
                >
                  {option.icon}
                  <span className="hidden sm:inline">{option.label}</span>
                </Button>
              ))}
            </div>

            {/* Theme toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
