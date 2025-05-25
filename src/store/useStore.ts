
import { create } from 'zustand';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    isAnonymous?: boolean;
    verified?: boolean;
  };
  timestamp: string;
  content: string;
  category: string;
  type: 'text' | 'image' | 'video' | 'poll';
  media?: string;
  videoUrl?: string;
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
      user: { name: 'Alex Johnson', avatar: 'AJ', verified: true },
      timestamp: '2 hours ago',
      content: 'What do you think about the latest tech trends? AI is revolutionizing everything we do!',
      category: 'Technology',
      type: 'text',
      reactions: { likes: 42, comments: 12, shares: 8 }
    },
    {
      id: '2',
      user: { name: 'Sarah Chen', avatar: 'SC' },
      timestamp: '4 hours ago',
      content: 'Beautiful sunset from my evening run! Nature never fails to amaze me.',
      category: 'Lifestyle',
      type: 'image',
      media: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      reactions: { likes: 128, comments: 23, shares: 15 }
    },
    {
      id: '3',
      user: { name: 'Mike Rodriguez', avatar: 'MR', verified: true },
      timestamp: '6 hours ago',
      content: 'Check out this amazing coding tutorial I made! Learn React in 10 minutes.',
      category: 'Education',
      type: 'video',
      media: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop',
      videoUrl: 'https://example.com/video.mp4',
      reactions: { likes: 89, comments: 34, shares: 22 }
    },
    {
      id: '4',
      user: { name: 'Emma Wilson', avatar: 'EW' },
      timestamp: '8 hours ago',
      content: 'Which programming language should I learn next?',
      category: 'Technology',
      type: 'poll',
      poll: {
        question: 'Best language for beginners?',
        options: [
          { text: 'Python', votes: 145 },
          { text: 'JavaScript', votes: 98 },
          { text: 'Java', votes: 67 },
          { text: 'C++', votes: 34 }
        ]
      },
      reactions: { likes: 67, comments: 45, shares: 12 }
    },
    {
      id: '5',
      user: { name: 'David Park', avatar: 'DP' },
      timestamp: '12 hours ago',
      content: 'Amazing street performance in downtown! This artist is incredibly talented.',
      category: 'Entertainment',
      type: 'video',
      media: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop',
      videoUrl: 'https://example.com/street-performance.mp4',
      reactions: { likes: 203, comments: 56, shares: 31 }
    }
  ],
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setPosts: (posts) => set({ posts }),
  setAuthenticated: (auth) => set({ isAuthenticated: auth })
}));
