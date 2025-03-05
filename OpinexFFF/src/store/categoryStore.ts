
import { create } from 'zustand';
import { EventCategory } from './eventsStore';

interface CategoryState {
  categories: Array<{
    id: EventCategory;
    name: string;
    count: number;
    icon: string;
  }>;
  selectedCategory: EventCategory;
  actions: {
    setSelectedCategory: (category: EventCategory) => void;
  };
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [
    { id: 'all', name: 'All Events', count: 26, icon: '🌎' },
    { id: 'politics', name: 'Politics', count: 8, icon: '🏛️' },
    { id: 'sports', name: 'Sports', count: 5, icon: '🏆' },
    { id: 'entertainment', name: 'Entertainment', count: 6, icon: '🎬' },
    { id: 'technology', name: 'Technology', count: 4, icon: '💻' },
    { id: 'finance', name: 'Finance', count: 3, icon: '📈' },
  ],
  selectedCategory: 'all',
  actions: {
    setSelectedCategory: (category) => {
      set({ selectedCategory: category });
    }
  }
}));
