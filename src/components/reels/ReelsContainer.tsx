import { useState, useCallback } from 'react';
import { generateReels } from '../../data/reelsData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import ReelCard from './ReelCard';
import { FixedSizeList as List } from 'react-window';

const PAGE_SIZE = 5;

export default function ReelsContainer() {
  const [reels, setReels] = useState(() => generateReels(0, PAGE_SIZE));
  const [hasMore, setHasMore] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const loadMoreReels = useCallback(() => {
    if (!hasMore) return;

    const newReels = generateReels(reels.length, PAGE_SIZE);

    if (newReels.length < PAGE_SIZE) setHasMore(false);

    setReels(prev => [...prev, ...newReels]);
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

  const renderReel = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const reel = reels[index];
      if (!reel) return null;

      return (
        <div style={style} className="snap-start">
          <ReelCard reel={reel} isActive={index === activeIndex} />
        </div>
      );
    },
    [reels, activeIndex]
  );

  return (
    <div className="h-full w-full max-w-md m-auto overflow-hidden">
      <List
        className="overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        height={1000}
        itemCount={reels.length + 1}
        itemSize={window.innerHeight}
        width="100%"
        onScroll={({ scrollOffset }) => handleScroll(scrollOffset)}
      >
        {({ index, style }) => {
          if (index === reels.length) {
            return hasMore ? (
              <div ref={observerRef} style={style} className="h-16 flex items-center justify-center">
                <p className="text-gray-500">Loading more reels...</p>
              </div>
            ) : (
              <div style={style} className="h-16 flex items-center justify-center">
                <p className="text-gray-500">No more reels!</p>
              </div>
            );
          }

          return renderReel({ index, style });
        }}
      </List>
    </div>
  );
}
