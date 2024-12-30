import { PROFILE_DATA } from "../../data/constants"; 
import cover from  "../../../public/assets/r8.mp4"
import CoverVideo from "./CoverVideo";
import ProfileDetails from "./ProfileDetails";

export default function ProfileHeader() {

  return (
    <div className="relative">
    <CoverVideo
        src={cover}
        poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop"
    />

      {/* Profile Info Bar */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row relative">
          {/* Profile Picture */}
          <div className="flex-shrink-0 absolute -top-20 md:-top-24 left-4">
            <div className="relative inline-block">
              <img
                src={PROFILE_DATA.avatar}
                alt={PROFILE_DATA.username}
                className="w-32 md:w-40 h-32 md:h-40 rounded-full border-4 border-white dark:border-gray-900 object-cover"
              />
              <button className="absolute bottom-2 right-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Name and Basic Info */}
          <div className="flex-grow mt-16 md:mt-4 md:ml-48">
            <h1 className="text-3xl font-bold dark:text-white">{PROFILE_DATA.username}</h1>
            <p className="text-gray-600 dark:text-gray-400">{PROFILE_DATA.bio}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 md:mt-4 flex space-x-2">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md font-medium dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex space-x-8 mt-6 pb-4 border-b dark:border-gray-700">
          <span className="font-medium dark:text-white">{PROFILE_DATA.stats.followers} Followers</span>
          <span className="font-medium dark:text-white">{PROFILE_DATA.stats.following} Following</span>
        </div>
      </div>

      <ProfileDetails
        pageType="Page"
        category="Artist"
        recommendationPercentage={98}
        reviewCount={1331}
      />
    </div>
  );
}