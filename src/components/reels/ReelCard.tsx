import { useEffect, useRef, useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Music2, VideoIcon } from 'lucide-react';
import type { Reel } from '../../data/reelsData';

interface ReelCardProps {
  reel: Reel;
  isActive: boolean;
}

export default function ReelCard({ reel, isActive }: ReelCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [localLikes, setLocalLikes] = useState(reel.likes);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.currentTime = 0; // Reset to the start
        videoRef.current.play(); // Play the active video
      } else {
        videoRef.current.pause(); // Pause non-active videos
      }
    }
  }, [isActive]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLocalLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleReelsClick = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
    } else {
      videoRef.current?.pause();
    }
  }

  return (
    <div
      onClick={handleReelsClick}
      className="relative h-[100dvh] w-full snap-start bg-black">
      {/* Video */}
      <video

        ref={videoRef}
        key={`${reel.id}-${isActive}`}
        src={reel.video}
        className="absolute inset-0 w-full h-full"
        autoPlay={isActive}
        loop
        playsInline
      />



      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4">
          <h2 className="text-white text-lg font-semibold">Reels</h2>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-12 p-4">
          {/* User Info */}
          <div className="flex items-center space-x-2 mb-3">
            <img
              src={reel.avatar}
              alt={`${reel.username}'s avatar`}
              className="w-8 h-8 rounded-full border border-white"
              loading="lazy"
            />
            <span className="text-white font-medium text-sm">{reel.username}</span>
            {!reel.isFollowing && (
              <button
                className="ml-2 px-3 py-1 text-xs text-white border border-white rounded-md"
                aria-label={`Follow ${reel.username}`}
              >
                Follow
              </button>
            )}
          </div>

          {/* Caption */}
          <p className="text-white text-sm mb-2 line-clamp-2 overflow-hidden">{reel.caption}</p>

          {/* Music */}
          <div className="flex items-center space-x-2 text-white">
            <Music2 className="w-3 h-3" />
            <span className="text-xs">{reel.music}</span>
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
            <span className="text-white text-xs mt-1">{localLikes.toLocaleString()}</span>
          </button>

          <button className="flex flex-col items-center" aria-label="Comment">
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="text-white text-xs mt-1">{reel.comments.toLocaleString()}</span>
          </button>

          <button className="flex flex-col items-center" aria-label="Share">
            <Send className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={() => setIsSaved(!isSaved)}
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
