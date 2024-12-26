import Stories from './Stories';
import Post from './Post';
import Suggestions from './Suggestions';
import { posts } from '../data/dummyData';

export default function Feed() {
  return (
    <div className="max-w-4xl mx-auto pt-4 px-4 md:pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Stories />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <div className="hidden lg:block">
        <Suggestions />
      </div>
    </div>
  );
}