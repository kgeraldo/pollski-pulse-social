
import { useState, useMemo } from 'react';
import { MentionSuggestion } from '@/types/mention';

// Mock users for demonstration
const mockUsers: MentionSuggestion[] = [
  { id: '1', username: 'john_doe', displayName: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop', isVerified: true },
  { id: '2', username: 'jane_smith', displayName: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b4?w=50&h=50&fit=crop', isVerified: false },
  { id: '3', username: 'mike_wilson', displayName: 'Mike Wilson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop', isVerified: true },
  { id: '4', username: 'sarah_chen', displayName: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop', isVerified: false },
];

export const useMentions = () => {
  const [mentionQuery, setMentionQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  const suggestions = useMemo(() => {
    if (!mentionQuery) return mockUsers.slice(0, 5);
    
    return mockUsers.filter(user => 
      user.username.toLowerCase().includes(mentionQuery.toLowerCase()) ||
      user.displayName.toLowerCase().includes(mentionQuery.toLowerCase())
    ).slice(0, 5);
  }, [mentionQuery]);

  const formatTextWithMentions = (text: string) => {
    // Simple mention highlighting - replace @username with styled spans
    const mentionRegex = /@(\w+)/g;
    
    return text.split(mentionRegex).map((part, index) => {
      if (index % 2 === 1) {
        // This is a username (odd indices after split)
        return (
          <span key={index} className="text-blue-400 font-semibold hover:text-blue-300 cursor-pointer">
            @{part}
          </span>
        );
      }
      return part;
    });
  };

  return {
    mentionQuery,
    setMentionQuery,
    showSuggestions,
    setShowSuggestions,
    activeSuggestionIndex,
    setActiveSuggestionIndex,
    suggestions,
    formatTextWithMentions
  };
};
