
import { create } from 'zustand';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    isAnonymous?: boolean;
  };
  timestamp: string;
  content: string;
  category: string;
  type: 'text' | 'image' | 'video' | 'poll';
  media?: string;
  reactions: {
    likes: number;
    comments: number;
    shares: number;
  };
  poll?: {
    question: string;
    options: { text: string; votes: number }[];
  };
}

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
  posts: [
    {
      id: '1',
      user: { name: 'Admin', avatar: '👤' },
      timestamp: '5 hr ago',
      content: 'Welcome to Pollski! Share your thoughts and connect with the community.',
      category: 'Uncategorized',
      type: 'text',
      reactions: { likes: 12, comments: 3, shares: 2 }
    },
    {
      id: '2',
      user: { name: 'Admin', avatar: '👤' },
      timestamp: '3 hr ago',
      content: 'Check out this amazing content!',
      category: 'Featured',
      type: 'image',
      media: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=400&fit=crop',
      reactions: { likes: 25, comments: 8, shares: 5 }
    }
  ],
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setPosts: (posts) => set({ posts }),
  setAuthenticated: (auth) => set({ isAuthenticated: auth })
}));
