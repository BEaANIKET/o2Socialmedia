import { Search } from 'lucide-react';
import SearchPost from '../components/SearchPost';
import { posts } from '../data/dummyData';

const indianCities = [
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi" },
  { value: "bengaluru", label: "Bengaluru" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "ahmedabad", label: "Ahmedabad" },
  { value: "chennai", label: "Chennai" },
  { value: "kolkata", label: "Kolkata" },
  { value: "surat", label: "Surat" },
  { value: "pune", label: "Pune" },
  { value: "jaipur", label: "Jaipur" },
  { value: "lucknow", label: "Lucknow" },
  { value: "kanpur", label: "Kanpur" },
  { value: "nagpur", label: "Nagpur" },
  { value: "indore", label: "Indore" },
  { value: "thane", label: "Thane" },
  { value: "bhopal", label: "Bhopal" },
  { value: "patna", label: "Patna" },
  { value: "vadodara", label: "Vadodara" },
  { value: "ghaziabad", label: "Ghaziabad" },
  { value: "ludhiana", label: "Ludhiana" },
  { value: "agra", label: "Agra" }
];

export default function SearchPage() {

  return (
    <div className="max-w-4xl mt-12 sm:mt-0 mx-auto p-4 space-y-8">
      <div className=" w-full mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search"
            className="col-span-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none dark:text-white"
          />
          <select
            className="col-span-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none dark:text-white"
          >
            <option value="" disabled selected>
              Select a City
            </option>
            {indianCities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
          <button className="col-span-1 p-3 w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className=" columns-2 sm:columns-3 md:gap-2 gap-[8px]  ">
          {posts.map((post) =>
            <SearchPost post={post} />
          )}
        </div>
      </div>
    </div>


  );
}
