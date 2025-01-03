import { lazy, Suspense } from 'react';
import Suggestions from './Suggestions';
import useGetPosts from '../hooks/post/useGetPost';
import { useSelector } from 'react-redux';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Post = lazy(() => import('./Post'));

export default function Feed() {
  const { loading, error, loadMorePosts } = useGetPosts();
  const posts = useSelector((state) => state.post.posts);

  // const loadMorePosts = () => {
  //   console.log('Loading more posts...');
  // };

  const observerRef = useIntersectionObserver(
    loadMorePosts,
    () => { },
    { threshold: 0.3 }
  );

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center text-black">
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-4 px-4 md:pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content Area */}
      <div className="lg:col-span-2 mx-auto mt-16 md:mt-0 max-w-lg">
        <Suspense
          fallback={
            <div className="w-full h-full flex justify-center items-center text-black">
              Loading post...
            </div>
          }
        >
          {posts?.length > 0 ? (
            posts.map((post) => <Post key={post._id} post={post} />)
          ) : (
            <div className="text-center text-gray-500">No posts available</div>
          )}
        </Suspense>
        <div ref={observerRef} className="w-full text-center dark:text-white text-black h-10 bg-transparent"> Loading ...</div>
      </div>

      {/* Suggestions Sidebar */}
      <div className="hidden lg:block">
        <Suggestions />
      </div>
    </div>
  );
}
