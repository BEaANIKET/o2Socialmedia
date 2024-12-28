import { useEffect, useRef, useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { formatTimeAgo } from '../utils/dateUtils';
import LikeButton from './interactions/LikeButton';
import CommentSection from './interactions/CommentSection';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { IoVolumeMute } from "react-icons/io5";
import { GoUnmute } from 'react-icons/go';


interface PostProps {
  post: {
    id: number;
    username: string;
    avatar: string;
    image: string;  // Image or video URL
    caption: string;
    likes: number;
    comments: number;
    timestamp: string;
  };
}

// Function to identify media type based on file extension
const identifyMediaType = (fileName: string) => {

  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
  const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.flv'];

  const fileExtension = fileName.split('.').pop()?.toLowerCase();

  if (imageExtensions.includes(`.${fileExtension}`)) {
    return 'image';
  } else if (videoExtensions.includes(`.${fileExtension}`)) {
    return 'video';
  } else {
    return 'unknown';
  }
};

export default function Post({ post }: PostProps) {
  const [isPlay, setIsPlay] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const mediaType = identifyMediaType(post.image);

  const videoRef = useRef<HTMLVideoElement>(null);

  const observerRef = useIntersectionObserver(() => {
    if (videoRef.current && videoRef.current.paused) {
      setIsPlay(true);
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsPlay(true);
      } else {
        setIsPlay(false);
      }
    }, { threshold: 0.5 });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlay) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlay]);

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg mb-4">
      <div className="flex relative items-center justify-between p-4">
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
        {mediaType === 'video' ? (
          <div className=' relative ' >
            <video
              ref={videoRef}
              className="w-full"
              muted={isMuted}
            >
              <source src={post.image} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className=' absolute bottom-2 right-2 z-30 ' onClick={() => setIsMuted(!isMuted)}>
              {
                !isMuted ? (
                  <IoVolumeMute className=' text-white text-xl ' />
                ) : (
                  <GoUnmute className=' text-white text-xl' />
                )
              }
            </div>
          </div>

        ) : (
          <img src={post.image} alt="Post Media" className="w-full object-cover" />
        )}

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
