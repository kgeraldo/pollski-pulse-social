
import { Post } from '@/types';

export const filterPosts = (
  posts: Post[],
  searchQuery: string,
  activeFilter: string
): Post[] => {
  return posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeFilter === 'bookmarked') {
      return matchesSearch && post.isBookmarked;
    }
    
    return matchesSearch;
  });
};

export const getInitialPosts = (): Post[] => [
  {
    id: 1,
    author: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
    timeAgo: '2h ago',
    content: 'What do you think about the new React 19 features? The new compiler looks promising for performance optimization. Would love to hear your thoughts on the upcoming changes!',
    votes: { up: 124, down: 8 },
    comments: 23,
    shares: 5,
    category: 'Technology',
    tags: ['react', 'javascript', 'frontend'],
    isVoted: null,
    isBookmarked: false,
    showComments: false,
    type: 'text',
    commentsData: [
      {
        id: 'c1',
        author: 'DevExpert',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
        content: 'The React 19 compiler is a game-changer! It automatically optimizes re-renders without manual memoization.',
        timeAgo: '1h ago',
        votes: { up: 15, down: 2 },
        isVoted: 'up',
        replies: [
          {
            id: 'c1-r1',
            author: 'ReactFan',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
            content: 'Absolutely! No more useMemo and useCallback everywhere.',
            timeAgo: '45m ago',
            votes: { up: 8, down: 0 },
            replies: [],
            isCollapsed: false,
            depth: 1
          }
        ],
        isCollapsed: false,
        depth: 0,
        isAwarded: true
      }
    ]
  },
  {
    id: 2,
    author: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
    timeAgo: '4h ago',
    content: 'Should remote work be the standard for tech companies? Let\'s discuss the pros and cons of this growing trend in the industry.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=300&fit=crop',
    votes: { up: 89, down: 12 },
    comments: 45,
    shares: 8,
    category: 'Work',
    tags: ['remote-work', 'productivity', 'work-life-balance'],
    isVoted: 'up',
    isBookmarked: true,
    showComments: false,
    type: 'text',
    commentsData: []
  },
  {
    id: 3,
    author: 'Mike Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
    timeAgo: '3h ago',
    content: 'Check out this amazing tutorial on building modern React applications! This covers all the latest best practices.',
    votes: { up: 156, down: 12 },
    comments: 34,
    shares: 28,
    category: 'Education',
    tags: ['tutorial', 'react', 'development'],
    isVoted: null,
    isBookmarked: false,
    type: 'video',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=300&fit=crop'
  },
  {
    id: 4,
    author: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
    timeAgo: '5h ago',
    content: 'Which programming language should I learn next for web development?',
    votes: { up: 67, down: 3 },
    comments: 45,
    shares: 12,
    category: 'Technology',
    tags: ['programming', 'learning', 'career'],
    isVoted: null,
    isBookmarked: false,
    type: 'poll',
    poll: {
      question: 'Best language for modern web development?',
      description: 'Considering job market, learning curve, and future prospects',
      totalVotes: 342,
      options: [
        { id: 'js', text: 'JavaScript/TypeScript', votes: 145, percentage: 42.4 },
        { id: 'py', text: 'Python', votes: 98, percentage: 28.7 },
        { id: 'go', text: 'Go', votes: 67, percentage: 19.6 },
        { id: 'rust', text: 'Rust', votes: 32, percentage: 9.4 }
      ],
      hasVoted: false,
      userVote: undefined
    }
  }
];
