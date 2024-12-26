import { posts } from '../data/dummyData';

export default function ExplorePage() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-3 gap-1 md:gap-4">
        {posts.map((post) => (
          <div key={post.id} className="aspect-square group relative cursor-pointer">
            <img
              src={post.image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="text-white flex space-x-4">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}