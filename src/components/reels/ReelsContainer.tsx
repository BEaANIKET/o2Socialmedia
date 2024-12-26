import { useState, useCallback, useEffect } from 'react';
import { generateReels } from '../../data/reelsData';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import ReelCard from './ReelCard';

export default function ReelsContainer() {
  const [reels, setReels] = useState(generateReels(0, 5));
  const [activeIndex, setActiveIndex] = useState(0);

  const loadMoreReels = useCallback(() => {
    const newReels = generateReels(reels.length, 5);
    setReels(prev => [...prev, ...newReels]);
  }, [reels.length]);

  const observerRef = useIntersectionObserver(loadMoreReels);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById('reels-container');
      if (container) {
        const index = Math.round(container.scrollTop / window.innerHeight);
        setActiveIndex(index);
      }
    };

    const container = document.getElementById('reels-container');
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      id="reels-container"
      className="h-[100dvh] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
    >
      {reels.map((reel, index) => (
        <ReelCard 
          key={reel.id} 
          reel={reel} 
          isActive={index === activeIndex}
        />
      ))}
      <div ref={observerRef} className="h-1" />
    </div>
  );
}