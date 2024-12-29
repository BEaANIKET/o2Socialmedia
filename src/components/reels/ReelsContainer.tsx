import { useState, useCallback, Suspense } from 'react';
import { generateReels } from '../../data/reelsData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import ReelCard from './ReelCard';

const PAGE_SIZE = 5;

export default function ReelsContainer() {
  const [reels, setReels] = useState(() => generateReels(0, PAGE_SIZE));
  const [hasMore, setHasMore] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const loadMoreReels = useCallback(() => {
    console.log("need more reels ");

    if (!hasMore) return;

    const newReels = generateReels(reels.length, PAGE_SIZE);

    if (newReels.length < PAGE_SIZE) setHasMore(false);

    setReels((prev) => [...prev, ...newReels]);
  }, [reels.length, hasMore]);

  const observerRef = useIntersectionObserver(loadMoreReels);

  const handleScroll = useCallback(
    (scrollOffset: number) => {
      const index = Math.round(scrollOffset / window.innerHeight);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    },
    [activeIndex]
  );

  return (
    <div className="h-[100dvh] w-full max-w-md m-auto overflow-hidden">
      <div
        style={{ scrollSnapAlign: 'start', scrollBehavior: "smooth" }}
        className="h-full scroll-container scrollbar-hide overflow-y-scroll snap-mandatory snap-y"
        onScroll={(e) => handleScroll(e.currentTarget.scrollTop)}
      >
        <Suspense fallback={<div>Loading reels...</div>}>
          {reels.map((reel, index) => (
            <ReelCard isActive={activeIndex === index} key={index} reel={reel} />
          ))}
        </Suspense>
        <div
          ref={observerRef}
          className="relative z-10 h-full w-full snap-start bg-black overflow-hidden "
        >
          {hasMore ? (
            <p className="text-gray-500">Loading more reels...</p>
          ) : (
            <p className="text-gray-500">No more reels!</p>
          )}
        </div>
      </div>
    </div>
  );
}
