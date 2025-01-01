import { useEffect, useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { IoVolumeMute } from "react-icons/io5";
import { GoUnmute } from 'react-icons/go';
import { formatTimeAgo } from '../utils/dateUtils';
import CommentSection from './interactions/CommentSection';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import useHandleLikes from '../hooks/post/useHandleLike';

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

const identifyMediaType = (fileType: string) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
  const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.flv'];
  const fileExtension = fileType?.toLowerCase();

  return imageExtensions.includes(`.${fileExtension}`)
    ? 'image'
    : videoExtensions.includes(`.${fileExtension}`)
      ? 'video'
      : 'unknown';
};

export default function Post({ post }: PostProps) {
  const [isPlay, setIsPlay] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { likes, isLiked, likePost } = useHandleLikes(post._id);

  const observerRef = useIntersectionObserver(
    () => setIsPlay(true),
    () => setIsPlay(false),
    { threshold: 0.5 }
  );

  console.log(isLiked);
  console.log(likes);


  useEffect(() => {
    if (observerRef.current) {
      isPlay ? observerRef.current.play() : observerRef.current.pause();
    }
  }, [isPlay]);

  const handleLike = async () => {
    await likePost(post._id);
  }

  const mediaType = identifyMediaType(post.file.fileType);

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg mb-4">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <img
            src={post.user.profilePicture}
            alt={post.user.fullName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold dark:text-white">{post.user.fullName}</span>
        </div>
        <button className="dark:text-white">
          <MoreHorizontal className="cursor-pointer" />
        </button>
      </div>

      <div className="relative">
        {mediaType === 'video' ? (
          <div
            onClick={() => setIsPlay(false)}
            onDoubleClick={handleLike}
            className="relative min-w-96 min-h-64"
          >
            <video className="w-full" muted={isMuted} loop autoPlay>
              <source src={post.file.url} type={`video/${post.file.fileType}`} />
              Your browser does not support the video tag.
            </video>
            <div
              className="absolute bottom-2 right-2 z-30"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <GoUnmute className="text-white text-xl" />
              ) : (
                <IoVolumeMute className="text-white text-xl" />
              )}
            </div>
          </div>
        ) : (
          <img
            onDoubleClick={handleLike}
            src={post.file.url}
            alt="Post Media"
            className="w-full object-cover min-h-64 max-h-[500px]"
          />
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-4">
            <button
              onClick={handleLike}
              className="transform active:scale-125 transition-transform duration-200"
            >
              <Heart
                className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : 'dark:text-white'
                  }`}
              />
            </button>
            <button onClick={() => setShowComments((prev) => !prev)}>
              <MessageCircle className="w-6 h-6 dark:text-white" />
            </button>
            <button>
              <Send className="w-6 h-6 dark:text-white" />
            </button>
          </div>
          <button onClick={() => setIsSaved((prev) => !prev)}>
            <Bookmark
              className={`w-6 h-6 ${isSaved ? 'fill-current' : ''
                } dark:text-white`}
            />
          </button>
        </div>

        <div className="space-y-2">
          <p className="font-semibold dark:text-white">
            {likes} likes
          </p>
          <p className="dark:text-white">
            <span className="font-semibold">{post.user.fullName}</span> {post.caption}
          </p>
          <button
            className="text-gray-500 dark:text-gray-400 text-sm"
            onClick={() => setShowComments((prev) => !prev)}
          >
            View all comments
          </button>
          <p className="text-gray-400 text-xs uppercase">
            {formatTimeAgo(post.createdAt)}
          </p>
        </div>

        {showComments && <CommentSection postId={post._id} />}
      </div>
    </div>
  );
}
