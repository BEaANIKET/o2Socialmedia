import { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface CoverVideoProps {
  src: string;
  poster: string;
}

export default function CoverVideo({ src, poster }: CoverVideoProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Initial setup
      video.muted = true;
      
      // Add event listeners
      const handleLoadedMetadata = () => {
        video.play().catch(error => {
          console.error('Error playing video:', error);
        });
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  const toggleMute = async () => {
    const video = videoRef.current;
    if (video) {
      try {
        if (isMuted) {
          // When unmuting, we need to ensure the video is playing
          await video.play();
          video.muted = false;
          setIsMuted(false);
        } else {
          video.muted = true;
          setIsMuted(true);
        }
      } catch (error) {
        console.error('Error toggling mute:', error);
      }
    }
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="w-full h-[350px] object-cover"
        autoPlay
        loop
        playsInline
        muted={isMuted}
        poster={poster}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button
          onClick={toggleMute}
          className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-md backdrop-blur-sm hover:bg-white/100 dark:hover:bg-gray-800/100 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          ) : (
            <Volume2 className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          )}
        </button>
        <button className="bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-md font-medium text-sm backdrop-blur-sm hover:bg-white/100 dark:hover:bg-gray-800/100 transition-colors">
          Change Cover
        </button>
      </div>
    </div>
  );
}