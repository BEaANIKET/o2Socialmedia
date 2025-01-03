
import ProfileDetails from "./ProfileDetails";
import useGetProfile from "../../hooks/profile/useGetProfile";
import { useSelector } from "react-redux";
import { ProfileSkeloton } from "./ProfileSkeloton";
import { useState } from "react";

export default function ProfileHeader() {

  const { loading, error } = useGetProfile();
  const user = useSelector((state) => state?.auth?.user);
  const [editData, setEditData] = useState({
    fullName: user?.fullName,
    email: user?.email,
    profilePicture: user?.profilePicture,
    backgroundCover: user?.backgroundCover,
  });
  const [isEditing, setIsEditing] = useState(false);
  if (loading) {
    return <ProfileSkeloton />
  }

  if (error) {
    return (
      <>
        <ProfileSkeloton />
        <div className=" w-full text-center text-red-500 " > Sometching went wronge</div>
      </>
    )
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Updated data:", editData);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setEditData({
      fullName: user?.fullName,
      email: user?.email,
      profilePicture: user?.profilePicture,
      backgroundCover: user?.backgroundCover,
    })
    setIsEditing(true);
  }

  return (
    <div className="relative">
      {/* Background Cover */}
      <img
        src={user?.backgroundCover}
        alt="Background Cover"
        className="w-full h-[200px] md:h-[300px] object-cover"
      />

      {/* Profile Info Bar */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row relative">
          {/* Profile Picture */}
          <div className="flex-shrink-0 absolute -top-20 md:-top-24 left-4">
            <div className="relative inline-block">
              <img
                src={user?.profilePicture}
                alt={user?.fullName}
                className="w-32 md:w-40 h-32 md:h-40 rounded-full border-4 border-white dark:border-gray-900 object-cover"
              />
              <button
                className="absolute bottom-2 right-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setIsEditing(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Name and Basic Info */}
          <div className="flex-grow mt-16 md:mt-4 md:ml-48">
            <h1 className="text-3xl font-bold dark:text-white">{user?.fullName}</h1>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 md:mt-4 flex space-x-2">
            <button
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md font-medium dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={handleEditClick}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex space-x-8 mt-6 pb-4 border-b dark:border-gray-700">
          <span className="font-medium dark:text-white">0 Followers</span>
          <span className="font-medium dark:text-white">0 Following</span>
        </div>
      </div>

      {/* Profile Details */}
      <ProfileDetails
        pageType="Page"
        category="Artist"
        recommendationPercentage={98}
        reviewCount={1331}
      />

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-4">
              Edit Profile
            </h2>
            <div className="space-y-4">
              {/* Profile Picture Input */}
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24">
                  <img
                    src={editData.profilePicture}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-gray-300 dark:border-gray-700"
                  />
                  <label
                    htmlFor="profilePictureInput"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </label>
                  <input
                    id="profilePictureInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setEditData((prev) => ({
                            ...prev,
                            profilePicture: reader.result,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Full Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={editData.fullName}
                  onChange={handleEditChange}
                  className="mt-1 block w-full p-2 border-gray-300 dark:border-gray-700 rounded-md shadow-sm dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* Background Cover Input */}
              <div className="flex flex-col items-center">
                <div className="relative w-full h-36">
                  <img
                    src={editData.backgroundCover}
                    alt="Background Cover"
                    className="w-full h-full object-cover rounded-lg border-4 border-gray-300 dark:border-gray-700"
                  />
                  <label
                    htmlFor="backgroundCoverInput"
                    className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </label>
                  <input
                    id="backgroundCoverInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setEditData((prev) => ({
                            ...prev,
                            backgroundCover: reader.result,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md font-medium dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}