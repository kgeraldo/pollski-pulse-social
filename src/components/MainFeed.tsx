
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import FeedHeader from './feed/FeedHeader';
import PostCard from './feed/PostCard';

interface Post {
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
  isVoted?: 'up' | 'down' | null;
}

const MainFeed: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      timeAgo: '2h ago',
      content: 'What do you think about the new React 19 features? The new compiler looks promising for performance optimization.',
      votes: { up: 124, down: 8 },
      comments: 23,
      shares: 5,
      category: 'Technology',
      isVoted: null
    },
    {
      id: 2,
      author: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop',
      timeAgo: '4h ago',
      content: 'Should remote work be the standard for tech companies? Let\'s discuss the pros and cons.',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=300&fit=crop',
      votes: { up: 89, down: 12 },
      comments: 45,
      shares: 8,
      category: 'Work',
      isVoted: 'up'
    },
    {
      id: 3,
      author: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      timeAgo: '6h ago',
      content: 'The future of AI in web development - what are your thoughts on AI-assisted coding?',
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
      votes: { up: 156, down: 23 },
      comments: 67,
      shares: 12,
      category: 'AI',
      isVoted: null
    }
  ]);

  const handleVote = (postId: number, voteType: 'up' | 'down'): void => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const currentVote = post.isVoted;
          let newVotes = { ...post.votes };
          let newVoteState: 'up' | 'down' | null = voteType;

          // Remove previous vote if exists
          if (currentVote === 'up') newVotes.up--;
          if (currentVote === 'down') newVotes.down--;

          // Add new vote or cancel if same
          if (currentVote === voteType) {
            newVoteState = null;
          } else {
            if (voteType === 'up') newVotes.up++;
            if (voteType === 'down') newVotes.down++;
          }

          return { ...post, votes: newVotes, isVoted: newVoteState };
        }
        return post;
      })
    );
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex-1 bg-slate-900 min-h-screen">
      <FeedHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <AnimatePresence mode="wait">
          {filteredPosts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index}
              onVote={handleVote}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainFeed;
