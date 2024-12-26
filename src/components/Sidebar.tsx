import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Compass, Film, Heart, PlusSquare, MessageCircle, Menu } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t md:top-0 md:w-16 lg:w-64 md:h-screen md:border-r">
      <div className="flex justify-around md:flex-col md:justify-start md:p-4 md:space-y-6">
        <div className="hidden lg:block p-4">
          <h1 className="text-xl font-bold">Instagram</h1>
        </div>
        
        <NavItem to="/" icon={<Home />} label="Home" active={location.pathname === '/'} />
        <NavItem to="/search" icon={<Search />} label="Search" />
        <NavItem to="/explore" icon={<Compass />} label="Explore" />
        <NavItem to="/reels" icon={<Film />} label="Reels" active={location.pathname === '/reels'} />
        <NavItem to="/messages" icon={<MessageCircle />} label="Messages" />
        <NavItem to="/notifications" icon={<Heart />} label="Notifications" />
        <NavItem to="/create" icon={<PlusSquare />} label="Create" />
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
      className={`flex items-center p-4 space-x-4 cursor-pointer hover:bg-gray-100 rounded-lg ${
        active ? 'font-bold' : ''
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="hidden lg:block">{label}</span>
    </Link>
  );
}