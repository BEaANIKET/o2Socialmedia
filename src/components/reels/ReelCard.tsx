import { useEffect, useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Music2 } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import useHandleReelsLikes from '../../hooks/reels/useHandleLikes';

interface ReelCardProps {
  reel: {
    _id: string;
    userId: string;
    file: {
      url: string;
      fileType: string;
      publicId: string;
    };
    caption: string;
    price: number;
    category: string;
    location: string;
    likes: number;
    createdAt: string;
    updatedAt: string;
    user: {
      _id: string;
      fullName: string;
      profilePicture: string;
    };
  };
}

export default function ReelCard({ reel }: ReelCardProps) {
  // const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isVideoPlay, setIsVideoPlay] = useState(false);

  const { isLiked, likeCount, likePost } = useHandleReelsLikes(reel._id)

  const videoRef = useIntersectionObserver(
    () => setIsVideoPlay(true),
    () => setIsVideoPlay(false),
    { threshold: 0.5 }
  );

  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPlay) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVideoPlay]);

  const handleLike = async (event: React.MouseEvent) => {
    event.stopPropagation();
    await likePost()
  };

  const handleSave = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleReelsClick = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
    } else {
      videoRef.current?.pause();
    }
  };

  return (
    <div
      onClick={handleReelsClick}
      className="reel relative z-10 h-full w-full snap-start bg-black overflow-hidden"
    >
      {/* Video */}
      <video
        ref={videoRef}
        key={reel._id}
        src={reel.file.url}
        className="w-full h-full"
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bottom-12 top-0">
        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-12 p-4">
          {/* User Info */}
          <div className="flex items-center space-x-2 mb-3">
            <img
              src={reel.user.profilePicture || 'https://via.placeholder.com/40'}
              alt={`${reel.user.fullName}'s avatar`}
              className="w-8 h-8 rounded-full border border-white"
              loading="lazy"
            />
            <span className="text-white font-medium text-sm">{reel.user.fullName || 'Unknown User'}</span>
          </div>

          {/* Caption */}
          <p className="text-white text-sm mb-2 line-clamp-2">{reel.caption}</p>

          {/* Music */}
          <div className="flex items-center space-x-2 text-white">
            <Music2 className="w-3 h-3" />
            <span className="text-xs">{reel.category}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-2 space-y-4">
          <button
            onClick={handleLike}
            className="flex flex-col items-center"
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            <Heart
              className={`w-6 h-6 transition-colors ${isLiked ? 'text-red-500 fill-current' : 'text-white'
                }`}
            />
            <span className="text-white text-xs mt-1">{likeCount.toLocaleString()}</span>
          </button>

          <button className="flex flex-col items-center" aria-label="Comment">
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="text-white text-xs mt-1">0</span>
          </button>

          <button className="flex flex-col items-center" aria-label="Share">
            <Send className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={handleSave}
            className="flex flex-col items-center"
            aria-label={isSaved ? 'Unsave' : 'Save'}
          >
            <Bookmark
              className={`w-6 h-6 transition-colors ${isSaved ? 'text-white fill-current' : 'text-white'
                }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
