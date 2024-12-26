import { ReactNode } from 'react';
import Sidebar from '../Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Sidebar />
      <main className="md:ml-16 lg:ml-64 transition-all duration-300 ease-in-out">
        {children}
      </main>
    </div>
  );
}