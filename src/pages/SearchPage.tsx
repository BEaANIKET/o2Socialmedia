import { Search } from 'lucide-react';

export default function SearchPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-3 pl-10 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none dark:text-white"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
      </div>
    </div>
  );
}