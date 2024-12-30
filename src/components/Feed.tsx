import { lazy, Suspense } from 'react';
import Suggestions from './Suggestions';
import { posts } from '../data/dummyData';


const Post = lazy(() => import('./Post'));

export default function Feed() {
  return (
    <div className="max-w-4xl mx-auto pt-4 px-4 md:pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 mt-16 md:mt-0">
        <Suspense fallback={<div className="w-full h-full flex justify-center items-center text-black">Loading...</div>}>
          {posts?.length ? (
            posts.map((post) => <Post key={post.id} post={post} />)
          ) : (
            <div className="text-center">No posts available</div>
          )}
        </Suspense>
      </div>
      <div className="hidden lg:block">
        <Suggestions />
      </div>
    </div>
  );
}
