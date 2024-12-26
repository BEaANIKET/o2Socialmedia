import { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { formatTimeAgo } from '../utils/dateUtils';
import LikeButton from './interactions/LikeButton';
import CommentSection from './interactions/CommentSection';

interface PostProps {
  post: {
    id: number;
    username: string;
    avatar: string;
    image: string;
    caption: string;
    likes: number;
    comments: number;
    timestamp: string;
  };
}

export default function Post({ post }: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg mb-4">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <img
            src={post.avatar}
            alt={post.username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold dark:text-white">{post.username}</span>
        </div>
        <button className="dark:text-white">
          <MoreHorizontal className="cursor-pointer" />
        </button>
      </div>
      
      <div className="relative">
        <img src={post.image} alt="" className="w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
          <button 
            className="transform scale-150 transition-transform duration-200"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-16 h-16 ${isLiked ? 'text-red-500 fill-current' : 'text-white'}`} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-4">
            <LikeButton isLiked={isLiked} onToggle={() => setIsLiked(!isLiked)} />
            <button onClick={() => setShowComments(!showComments)}>
              <MessageCircle className="w-6 h-6 dark:text-white" />
            </button>
            <button>
              <Send className="w-6 h-6 dark:text-white" />
            </button>
          </div>
          <button onClick={() => setIsSaved(!isSaved)}>
            <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-current' : ''} dark:text-white`} />
          </button>
        </div>
        
        <div className="space-y-2">
          <p className="font-semibold dark:text-white">{post.likes.toLocaleString()} likes</p>
          <p className="dark:text-white">
            <span className="font-semibold">{post.username}</span>{' '}
            {post.caption}
          </p>
          <button 
            className="text-gray-500 dark:text-gray-400 text-sm"
            onClick={() => setShowComments(!showComments)}
          >
            View all {post.comments} comments
          </button>
          <p className="text-gray-400 text-xs uppercase">
            {formatTimeAgo(post.timestamp)}
          </p>
        </div>

        {showComments && <CommentSection postId={post.id} />}
      </div>
    </div>
  );
}