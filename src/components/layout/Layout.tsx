import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="pl-0 md:pl-16 lg:pl-64">
        <div className="max-w-screen-xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}