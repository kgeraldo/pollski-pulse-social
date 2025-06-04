
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Calendar, Link2, MessageCircle, UserPlus, Check, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileCardProps {
  user: {
    id: string;
    name: string;
    username: string;
    bio: string;
    avatar: string;
    coverImage?: string;
    location?: string;
    joinedDate: string;
    website?: string;
    followers: number;
    following: number;
    posts: number;
    isVerified: boolean;
    isPremium: boolean;
    isFollowing?: boolean;
  };
  onFollow?: (userId: string) => void;
  onMessage?: (userId: string) => void;
  compact?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  onFollow,
  onMessage,
  compact = false
}) => {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    onFollow?.(user.id);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {user.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <Check size={10} className="text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-semibold text-sm truncate">{user.name}</h3>
              {user.isPremium && <Star size={12} className="text-yellow-400" />}
            </div>
            <p className="text-slate-400 text-xs">{user.username}</p>
            <p className="text-slate-300 text-xs mt-1 line-clamp-2">{user.bio}</p>
          </div>
          <Button
            size="sm"
            onClick={handleFollow}
            className={`h-8 px-3 text-xs ${
              isFollowing
                ? 'bg-green-600/20 text-green-400 border-green-500/30'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="relative h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        {user.coverImage && (
          <img
            src={user.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/20"
        />
      </div>

      {/* Profile Content */}
      <div className="p-4 -mt-8 relative">
        <div className="flex items-end justify-between mb-4">
          <div className="relative">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full border-4 border-slate-800 object-cover"
            />
            {user.isVerified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-slate-800"
              >
                <Check size={12} className="text-white" />
              </motion.div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onMessage?.(user.id)}
              className="bg-slate-700 hover:bg-slate-600 text-slate-300 h-8 w-8 p-0"
            >
              <MessageCircle size={14} />
            </Button>
            <Button
              size="sm"
              onClick={handleFollow}
              className={`h-8 px-4 text-sm ${
                isFollowing
                  ? 'bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/30'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isFollowing ? (
                <>
                  <Check size={14} className="mr-2" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus size={14} className="mr-2" />
                  Follow
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-white font-bold text-lg">{user.name}</h2>
              {user.isPremium && (
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400" />
                  <Award size={16} className="text-purple-400" />
                </div>
              )}
            </div>
            <p className="text-slate-400 text-sm">{user.username}</p>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">{user.bio}</p>

          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin size={12} />
                <span>{user.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>Joined {user.joinedDate}</span>
            </div>
            {user.website && (
              <div className="flex items-center gap-1">
                <Link2 size={12} />
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {user.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>

          <div className="flex gap-6 pt-2">
            <div className="text-center">
              <div className="text-white font-bold">{formatNumber(user.posts)}</div>
              <div className="text-slate-400 text-xs">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold">{formatNumber(user.followers)}</div>
              <div className="text-slate-400 text-xs">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold">{formatNumber(user.following)}</div>
              <div className="text-slate-400 text-xs">Following</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
