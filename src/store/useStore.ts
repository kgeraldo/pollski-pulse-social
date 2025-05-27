
import { create } from 'zustand';
import { Post } from '@/types';

interface AppState {
  activeFilter: string;
  sortOrder: 'asc' | 'desc';
  posts: Post[];
  isAuthenticated: boolean;
  setActiveFilter: (filter: string) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setPosts: (posts: Post[]) => void;
  setAuthenticated: (auth: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  activeFilter: 'All',
  sortOrder: 'desc',
  isAuthenticated: false,
  posts: [],
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setPosts: (posts) => set({ posts }),
  setAuthenticated: (auth) => set({ isAuthenticated: auth })
}));
