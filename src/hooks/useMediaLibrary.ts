import { useState, useEffect, useMemo } from 'react';
import { MediaItem, Category, MediaType } from '@/types/media';

// Demo data - in production this would come from GitHub API or manifest.json
const DEMO_CATEGORIES: Category[] = [
  {
    id: 'tutorials',
    name: 'הדרכות',
    path: 'media/tutorials',
    items: [
      {
        id: '1',
        name: 'intro-to-react.mp4',
        title: 'מבוא ל-React',
        description: 'למד את הבסיס של React',
        type: 'video',
        path: 'media/tutorials/intro-to-react.mp4',
        category: 'tutorials',
        duration: '15:30',
        addedAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'typescript-basics.mp4',
        title: 'יסודות TypeScript',
        description: 'הכר את TypeScript',
        type: 'video',
        path: 'media/tutorials/typescript-basics.mp4',
        category: 'tutorials',
        duration: '22:45',
        addedAt: '2024-01-10'
      },
      {
        id: '3',
        name: 'css-animations.mp4',
        title: 'אנימציות CSS',
        description: 'צור אנימציות מדהימות',
        type: 'video',
        path: 'media/tutorials/css-animations.mp4',
        category: 'tutorials',
        duration: '18:20',
        addedAt: '2024-01-08'
      }
    ]
  },
  {
    id: 'presentations',
    name: 'מצגות',
    path: 'media/presentations',
    items: [
      {
        id: '4',
        name: 'project-overview.pdf',
        title: 'סקירת הפרויקט',
        description: 'סקירה כללית של הפרויקט',
        type: 'pdf',
        path: 'media/presentations/project-overview.pdf',
        category: 'presentations',
        addedAt: '2024-01-12'
      },
      {
        id: '5',
        name: 'architecture.pdf',
        title: 'ארכיטקטורת המערכת',
        description: 'תיאור מבנה המערכת',
        type: 'pdf',
        path: 'media/presentations/architecture.pdf',
        category: 'presentations',
        addedAt: '2024-01-05'
      }
    ]
  },
  {
    id: 'podcasts',
    name: 'פודקאסטים',
    path: 'media/podcasts',
    items: [
      {
        id: '6',
        name: 'episode-01.mp3',
        title: 'פרק 1 - התחלה',
        description: 'הפרק הראשון בסדרה',
        type: 'audio',
        path: 'media/podcasts/episode-01.mp3',
        category: 'podcasts',
        duration: '45:00',
        addedAt: '2024-01-14'
      },
      {
        id: '7',
        name: 'episode-02.mp3',
        title: 'פרק 2 - המשך',
        description: 'הפרק השני בסדרה',
        type: 'audio',
        path: 'media/podcasts/episode-02.mp3',
        category: 'podcasts',
        duration: '38:15',
        addedAt: '2024-01-07'
      }
    ]
  },
  {
    id: 'lectures',
    name: 'הרצאות',
    path: 'media/lectures',
    items: [
      {
        id: '8',
        name: 'web-security.mp4',
        title: 'אבטחת אתרים',
        description: 'הרצאה על אבטחת מידע',
        type: 'video',
        path: 'media/lectures/web-security.mp4',
        category: 'lectures',
        duration: '55:00',
        addedAt: '2024-01-13'
      },
      {
        id: '9',
        name: 'performance.mp4',
        title: 'ביצועים ואופטימיזציה',
        description: 'שיפור ביצועי אתרים',
        type: 'video',
        path: 'media/lectures/performance.mp4',
        category: 'lectures',
        duration: '42:30',
        addedAt: '2024-01-06'
      }
    ]
  }
];

export const useMediaLibrary = () => {
  const [categories, setCategories] = useState<Category[]>(DEMO_CATEGORIES);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<MediaType | 'all'>('all');

  const allItems = useMemo(() => {
    return categories.flatMap(cat => cat.items);
  }, [categories]);

  const filteredItems = useMemo(() => {
    let items = allItems;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      );
    }

    if (filterType !== 'all') {
      items = items.filter(item => item.type === filterType);
    }

    return items;
  }, [allItems, searchQuery, filterType]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery && filterType === 'all') {
      return categories;
    }

    return categories.map(cat => ({
      ...cat,
      items: cat.items.filter(item => filteredItems.includes(item))
    })).filter(cat => cat.items.length > 0);
  }, [categories, filteredItems, searchQuery, filterType]);

  const recentItems = useMemo(() => {
    return [...allItems]
      .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
      .slice(0, 10);
  }, [allItems]);

  return {
    categories: filteredCategories,
    allItems,
    filteredItems,
    recentItems,
    loading,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType
  };
};
