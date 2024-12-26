import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Compass, Film, Heart, PlusSquare, MessageCircle, Menu } from 'lucide-react';
import ThemeToggle from './layout/ThemeToggle';

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t dark:border-gray-700 md:top-0 md:w-16 lg:w-64 md:h-screen md:border-r z-50">
      <div className="flex justify-around md:flex-col md:justify-start md:p-4 md:space-y-6">
        <div className="hidden lg:block p-4">
          <h1 className="text-xl font-bold dark:text-white">Indimart</h1>
        </div>
        
        <NavItem to="/" icon={<Home />} label="Home" active={location.pathname === '/'} />
        <NavItem to="/search" icon={<Search />} label="Search" />
        <NavItem to="/explore" icon={<Compass />} label="Explore" />
        <NavItem to="/reels" icon={<Film />} label="Reels" active={location.pathname === '/reels'} />
        <NavItem to="/messages" icon={<MessageCircle />} label="Messages" />
        <NavItem to="/notifications" icon={<Heart />} label="Notifications" />
        <NavItem to="/create" icon={<PlusSquare />} label="Create" />
        
        <div className="hidden md:block mt-auto">
          <ThemeToggle />
        </div>
        
        <NavItem to="/more" icon={<Menu />} label="More" />
      </div>
    </div>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ to, icon, label, active = false }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`flex items-center p-4 space-x-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${
        active ? 'font-bold' : ''
      }`}
    >
      <span className={`text-xl ${active ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
        {icon}
      </span>
      <span className={`hidden lg:block ${active ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
        {label}
      </span>
    </Link>
  );
}