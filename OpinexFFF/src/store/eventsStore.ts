
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type EventCategory = 'all' | 'politics' | 'sports' | 'entertainment' | 'technology' | 'finance';

interface EventsState {
  selectedCategory: EventCategory;
  searchQuery: string;
  isFilterMenuOpen: boolean;
  sortBy: 'newest' | 'popular' | 'ending-soon';
  viewMode: 'grid' | 'list';
  animations: {
    categoryChanging: boolean;
    isLoading: boolean;
  };
  actions: {
    setSelectedCategory: (category: EventCategory) => void;
    setSearchQuery: (query: string) => void;
    toggleFilterMenu: () => void;
    setSortBy: (sort: 'newest' | 'popular' | 'ending-soon') => void;
    setViewMode: (mode: 'grid' | 'list') => void;
    setLoading: (isLoading: boolean) => void;
  };
}

export const useEventsStore = create<EventsState>()(
  devtools(
    (set) => ({
      selectedCategory: 'all',
      searchQuery: '',
      isFilterMenuOpen: false,
      sortBy: 'newest',
      viewMode: 'grid',
      animations: {
        categoryChanging: false,
        isLoading: false,
      },
      actions: {
        setSelectedCategory: (category) => set((state) => {
          // Trigger animation state
          set({ animations: { ...state.animations, categoryChanging: true } });
          
          // Reset animation state after a delay
          setTimeout(() => {
            set({ animations: { ...state.animations, categoryChanging: false } });
          }, 300);
          
          return { selectedCategory: category };
        }),
        setSearchQuery: (query) => set({ searchQuery: query }),
        toggleFilterMenu: () => set((state) => ({ isFilterMenuOpen: !state.isFilterMenuOpen })),
        setSortBy: (sort) => set({ sortBy: sort }),
        setViewMode: (mode) => set({ viewMode: mode }),
        setLoading: (isLoading) => set({ 
          animations: { categoryChanging: false, isLoading } 
        }),
      },
    })
  )
);