import ProfileHeader from '../components/profile/ProfileHeader';
import PostGrid from '../components/profile/ProfileGrid';

export default function Profile() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ProfileHeader />
      <PostGrid />
    </div>
  );
}