
import { useState } from 'react';
import { Post, Comment, VoteType } from '@/types';

export const usePosts = (initialPosts: Post[]) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleVote = (postId: number, voteType: VoteType): void => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const currentVote = post.isVoted;
          let newVotes = { ...post.votes };
          let newVoteState: VoteType | null = voteType;

          if (currentVote === 'up') newVotes.up--;
          if (currentVote === 'down') newVotes.down--;

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

  const handleBookmark = (postId: number): void => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post
      )
    );
  };

  const handleToggleComments = (postId: number): void => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, showComments: !post.showComments } : post
      )
    );
  };

  const handleCommentSubmit = (postId: number, content: string, parentId?: string): void => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: 'You',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      content,
      timeAgo: 'now',
      votes: { up: 1, down: 0 },
      isVoted: 'up',
      replies: [],
      isCollapsed: false,
      depth: parentId ? 1 : 0
    };

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          let updatedComments = [...(post.commentsData || [])];
          
          if (parentId) {
            const addReply = (comments: Comment[]): Comment[] => {
              return comments.map(comment => {
                if (comment.id === parentId) {
                  return {
                    ...comment,
                    replies: [...comment.replies, { ...newComment, depth: comment.depth + 1 }]
                  };
                } else if (comment.replies.length > 0) {
                  return {
                    ...comment,
                    replies: addReply(comment.replies)
                  };
                }
                return comment;
              });
            };
            updatedComments = addReply(updatedComments);
          } else {
            updatedComments.push(newComment);
          }

          return {
            ...post,
            commentsData: updatedComments,
            comments: post.comments + 1
          };
        }
        return post;
      })
    );
  };

  const handleCommentVote = (postId: number, commentId: string, voteType: VoteType): void => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const updateCommentVote = (comments: Comment[]): Comment[] => {
            return comments.map(comment => {
              if (comment.id === commentId) {
                const currentVote = comment.isVoted;
                let newVotes = { ...comment.votes };
                let newVoteState: VoteType | null = voteType;

                if (currentVote === 'up') newVotes.up--;
                if (currentVote === 'down') newVotes.down--;

                if (currentVote === voteType) {
                  newVoteState = null;
                } else {
                  if (voteType === 'up') newVotes.up++;
                  if (voteType === 'down') newVotes.down++;
                }

                return { ...comment, votes: newVotes, isVoted: newVoteState };
              } else if (comment.replies.length > 0) {
                return { ...comment, replies: updateCommentVote(comment.replies) };
              }
              return comment;
            });
          };

          return {
            ...post,
            commentsData: updateCommentVote(post.commentsData || [])
          };
        }
        return post;
      })
    );
  };

  const handleToggleCollapse = (postId: number, commentId: string): void => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const updateCollapse = (comments: Comment[]): Comment[] => {
            return comments.map(comment => {
              if (comment.id === commentId) {
                return { ...comment, isCollapsed: !comment.isCollapsed };
              } else if (comment.replies.length > 0) {
                return { ...comment, replies: updateCollapse(comment.replies) };
              }
              return comment;
            });
          };

          return {
            ...post,
            commentsData: updateCollapse(post.commentsData || [])
          };
        }
        return post;
      })
    );
  };

  const handlePollVote = (pollId: string, optionId: string): void => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === parseInt(pollId) && post.poll && !post.poll.hasVoted) {
          const updatedOptions = post.poll.options.map(option => ({
            ...option,
            votes: option.id === optionId ? option.votes + 1 : option.votes
          }));

          const newTotalVotes = post.poll.totalVotes + 1;
          const optionsWithPercentage = updatedOptions.map(option => ({
            ...option,
            percentage: (option.votes / newTotalVotes) * 100
          }));

          return {
            ...post,
            poll: {
              ...post.poll,
              options: optionsWithPercentage,
              totalVotes: newTotalVotes,
              hasVoted: true,
              userVote: optionId
            }
          };
        }
        return post;
      })
    );
  };

  return {
    posts,
    handleVote,
    handleBookmark,
    handleToggleComments,
    handleCommentSubmit,
    handleCommentVote,
    handleToggleCollapse,
    handlePollVote
  };
};
