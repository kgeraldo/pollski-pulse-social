
export interface User {
  name: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
  isPro?: boolean;
  verified?: boolean;
  isAnonymous?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timeAgo: string;
  votes: {
    up: number;
    down: number;
  };
  isVoted?: 'up' | 'down' | null;
  replies: Comment[];
  isCollapsed: boolean;
  depth: number;
  isAwarded?: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

export interface Poll {
  question: string;
  description: string;
  totalVotes: number;
  options: PollOption[];
  hasVoted: boolean;
  userVote?: string;
}

export interface Post {
  id: number;
  author: string;
  avatar: string;
  timeAgo: string;
  content: string;
  image?: string;
  video?: string;
  votes: {
    up: number;
    down: number;
  };
  comments: number;
  shares: number;
  category: string;
  tags: string[];
  isVoted?: 'up' | 'down' | null;
  isBookmarked: boolean;
  showComments?: boolean;
  commentsData?: Comment[];
  type?: 'text' | 'image' | 'video' | 'poll';
  videoUrl?: string;
  thumbnail?: string;
  poll?: Poll;
}

export interface FilterOptions {
  category: string;
  timeRange: string;
  sortBy: string;
  minRating: number;
  author: string;
  tags: string[];
}

export type PostType = 'text' | 'image' | 'video' | 'poll';
export type VoteType = 'up' | 'down';
export type AuthMode = 'login' | 'signup';
export type SortOption = 'best' | 'top' | 'new' | 'controversial';
