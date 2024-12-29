import { useEffect, useRef, useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Music2, VideoIcon } from 'lucide-react';
import type { Reel } from '../../data/reelsData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface ReelCardProps {
  reel: Reel;
}

export default function ReelCard({ reel }: ReelCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [localLikes, setLocalLikes] = useState(reel.likes);
  const [isVideoPlay, setIsVideoPlay] = useState(false);

  const videoRef = useIntersectionObserver(() => setIsVideoPlay(true), () => setIsVideoPlay(false), { threshold: 0.5 });



  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPlay) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVideoPlay])

  const handleLike = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent bubbling
    setIsLiked(!isLiked);
    setLocalLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleSave = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent bubbling
    setIsSaved(!isSaved);
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
      className=" reel relative z-10 h-full w-full snap-start bg-black overflow-hidden ">
      {/* Video */}
      <video
        ref={videoRef}
        key={reel.id}
        src={reel.video}
        className="  w-full h-full "
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bottom-12 top-0 ">
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
