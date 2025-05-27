
import { useState, useCallback, useMemo } from 'react';
import { MentionUser, Mention, MentionSuggestion } from '@/types/mention';

// Mock users data - in a real app this would come from an API
const mockUsers: MentionUser[] = [
  {
    id: '1',
    username: 'alexjohnson',
    displayName: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
    isVerified: true
  },
  {
    id: '2',
    username: 'sarahsmith',
    displayName: 'Sarah Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b882?w=50&h=50&fit=crop',
    isVerified: false
  },
  {
    id: '3',
    username: 'mikechen',
    displayName: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
    isVerified: true
  },
  {
    id: '4',
    username: 'emilydavis',
    displayName: 'Emily Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
    isVerified: false
  },
  {
    id: '5',
    username: 'davidwilson',
    displayName: 'David Wilson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
    isVerified: true
  }
];

export const useMentions = () => {
  const [mentionQuery, setMentionQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  const searchUsers = useCallback((query: string): MentionSuggestion[] => {
    if (!query) return mockUsers.slice(0, 5);
    
    const lowercaseQuery = query.toLowerCase();
    return mockUsers
      .filter(user => 
        user.username.toLowerCase().includes(lowercaseQuery) ||
        user.displayName.toLowerCase().includes(lowercaseQuery)
      )
      .map(user => ({
        ...user,
        relevanceScore: user.username.toLowerCase().startsWith(lowercaseQuery) ? 1 : 0.5
      }))
      .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
      .slice(0, 5);
  }, []);

  const suggestions = useMemo(() => searchUsers(mentionQuery), [mentionQuery, searchUsers]);

  const parseMentions = useCallback((text: string): Mention[] => {
    const mentionRegex = /@(\w+)/g;
    const mentions: Mention[] = [];
    let match;

    while ((match = mentionRegex.exec(text)) !== null) {
      const username = match[1];
      const user = mockUsers.find(u => u.username === username);
      
      if (user) {
        mentions.push({
          id: `mention-${match.index}`,
          userId: user.id,
          username: user.username,
          displayName: user.displayName,
          startIndex: match.index,
          endIndex: match.index + match[0].length
        });
      }
    }

    return mentions;
  }, []);

  const formatTextWithMentions = useCallback((text: string): JSX.Element => {
    const mentions = parseMentions(text);
    
    if (mentions.length === 0) {
      return <span>{text}</span>;
    }

    const parts: JSX.Element[] = [];
    let lastIndex = 0;

    mentions.forEach((mention, index) => {
      // Add text before mention
      if (mention.startIndex > lastIndex) {
        parts.push(
          <span key={`text-${index}`}>
            {text.slice(lastIndex, mention.startIndex)}
          </span>
        );
      }

      // Add mention
      parts.push(
        <span
          key={`mention-${index}`}
          className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium"
          onClick={() => console.log('Navigate to user:', mention.username)}
        >
          @{mention.username}
        </span>
      );

      lastIndex = mention.endIndex;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(
        <span key="text-end">
          {text.slice(lastIndex)}
        </span>
      );
    }

    return <>{parts}</>;
  }, [parseMentions]);

  return {
    mentionQuery,
    setMentionQuery,
    showSuggestions,
    setShowSuggestions,
    activeSuggestionIndex,
    setActiveSuggestionIndex,
    suggestions,
    searchUsers,
    parseMentions,
    formatTextWithMentions
  };
};
