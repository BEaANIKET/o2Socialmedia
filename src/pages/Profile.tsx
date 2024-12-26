import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Grid, Settings } from 'lucide-react';

export default function Profile() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="max-w-4xl mx-auto pt-8 px-4">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
        <img
          src={user?.avatar}
          alt={user?.username}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            <h1 className="text-2xl font-semibold dark:text-white">{user?.username}</h1>
            <button className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 rounded font-medium dark:text-white">
              Edit Profile
            </button>
            <Settings className="w-6 h-6 cursor-pointer dark:text-white" />
          </div>
          
          <div className="flex space-x-8 mb-4">
            <span className="font-semibold dark:text-white">150 posts</span>
            <span className="font-semibold dark:text-white">2.5k followers</span>
            <span className="font-semibold dark:text-white">1.2k following</span>
          </div>
          
          <div className="dark:text-white">
            <p className="font-medium">{user?.username}</p>
            <p>Digital creator</p>
            <p>Sharing moments and memories 📸</p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t dark:border-gray-800">
        <div className="flex justify-center py-4">
          <button className="flex items-center space-x-1 text-sm font-medium text-blue-500">
            <Grid className="w-4 h-4" />
            <span>POSTS</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square">
              <img
                src={`https://images.unsplash.com/photo-168${i}687220742-aba13b6e50ba?w=600&h=600&fit=crop`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}