import { useState, useRef, useEffect } from 'react';
import ReelCard from './ReelCard';
import useLoadReels from '../../hooks/reels/useLoadReels';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const PAGE_SIZE = 5;

export default function ReelsContainer() {
  const [hasMore, setHasMore] = useState(true);
  const { loadReels, reels } = useLoadReels();

  const containerRef = useRef<HTMLDivElement>(null);
  const reelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isScrolling = useRef(false);

  const debounce = (func: () => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(func, delay);
    };
  };

  const handleSnapToReel = debounce(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerTop = container.getBoundingClientRect().top;

    let closestReel = null;
    let closestDistance = Number.MAX_VALUE;

    reelRefs.current.forEach((reel) => {
      if (!reel) return;
      const reelTop = reel.getBoundingClientRect().top;
      const distance = Math.abs(reelTop - containerTop);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestReel = reel;
      }
    });

    if (closestReel) {
      closestReel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    container.style.pointerEvents = 'auto';
    isScrolling.current = false;
  }, 100);

  const handleScroll = () => {
    if (!isScrolling.current) {
      isScrolling.current = true;

      if (containerRef.current) {
        containerRef.current.style.pointerEvents = 'none';
      }
    }

    handleSnapToReel();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);

      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);


  const observerRef = useIntersectionObserver(loadReels, () => { }, { threshold: 0.2 });
  return (
    <div className="h-[100dvh] w-full max-w-md m-auto overflow-hidden">
      <div
        ref={containerRef}
        className="h-full scroll-container scrollbar-hide overflow-y-scroll snap-mandatory snap-y"
      >
        {reels.map((reel, index) => (
          <div
            ref={(el) => (reelRefs.current[index] = el)}
            key={index}
            className="snap-start h-full"
          >
            <ReelCard reel={reel} />
          </div>
        ))}
        <div ref={observerRef} className="relative flex justify-center items-center dark:text-white text-black z-10 h-8 w-full snap-start bg-black overflow-hidden">
          {hasMore ? (
            <p>Loading more reels...</p>
          ) : (
            <p>No more reels!</p>
          )}
        </div>
      </div>
    </div>
  );
}
