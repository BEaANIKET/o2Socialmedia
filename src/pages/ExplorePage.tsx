import SearchPost from '../components/SearchPost';
import { posts } from '../data/dummyData';

export default function ExplorePage() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="columns-2 sm:columns-3 md:gap-2 gap-[8px]">
        {posts.map((post) => (
          <SearchPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
