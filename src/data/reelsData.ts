export interface Reel {
  id: number;
  username: string;
  avatar: string;
  video: string;
  caption: string;
  likes: number;
  comments: number;
  music: string;
  isFollowing: boolean;
}

// Initial set of reels
export const generateReels = (startIndex: number, count: number): Reel[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: startIndex + i,
    username: `user_${startIndex + i}`,
    avatar: `https://images.unsplash.com/photo-${1500000000000 + startIndex + i}?w=150&h=150&fit=crop`,
    video: `https://player.vimeo.com/video/${27259387 + startIndex + i}`,
    caption: `Amazing reel! 🎥 #reels #trending ${startIndex + i}`,
    likes: Math.floor(Math.random() * 10000),
    comments: Math.floor(Math.random() * 1000),
    music: `Popular Song ${startIndex + i}`,
    isFollowing: Math.random() > 0.5
  }));
};