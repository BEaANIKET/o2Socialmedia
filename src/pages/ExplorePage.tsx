import { posts } from '../data/dummyData';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useState, useRef } from 'react';

export default function ExplorePage() {
  // Function to identify media type (video or image)
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

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className=" columns-2 sm:columns-3 md:gap-4  ">
        {posts.map((post) => {
          const mediaType = identifyMediaType(post.image);
          const videoRef = useRef<HTMLVideoElement>(null);

          // Handle video play when it's in the viewport
          const [isPlay, setIsPlay] = useState(false);

          const observerRef = useIntersectionObserver(() => {
            setIsPlay(true);
          });

          return (
            <div key={post.id} className=" mb-4 relative bg-red-500 h-fit cursor-pointer">
              {mediaType === 'video' ? (
                <video
                  ref={observerRef}
                  muted
                  autoPlay={isPlay}
                  loop
                  className="w-full h-auto object-cover"
                >
                  <source src={post.image} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-auto object-cover"
                />
              )}

              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="text-white flex space-x-4">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
