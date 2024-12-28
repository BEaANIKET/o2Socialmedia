import { Search } from 'lucide-react';
import { posts } from '../data/dummyData';
import { useRef, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

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

  const identifyMediaType = (fileName: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.flv'];

    const fileExtension = fileName.split('.').pop()?.toLowerCase();

    if (imageExtensions.includes(`.${fileExtension}`)) {
      return 'image';
    } else if (videoExtensions.includes(`.${fileExtension}`)) {
      return 'video';
    } else {
      return 'unknown';
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
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
        <div className=" columns-3 md:gap-4  ">
          {posts.map((post) => {
            const mediaType = identifyMediaType(post.image);
            const videoRef = useRef<HTMLVideoElement>(null);

            // Handle video play when it's in the viewport
            const [isPlay, setIsPlay] = useState(false);

            const observerRef = useIntersectionObserver(() => {
              setIsPlay(true);
            });

            return (
              <div key={post.id} className=" mb-4 relative bg-red-500 h-fit cursor-pointer">
                {mediaType === 'video' ? (
                  <video
                    ref={observerRef}
                    muted
                    autoPlay={isPlay}
                    loop
                    className="w-full h-auto object-cover"
                  >
                    <source src={post.image} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={post.image}
                    alt=""
                    className="w-full h-auto object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-white flex space-x-4">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>


  );
}

{/* Design 1 */ }
{/* <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Design 1</h2>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 pl-10 bg-gray-100 rounded-lg focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>
        <select
          className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none"
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
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Search
        </button>
      </div> */}

{/* Design 2 */ }
{/* <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Design 2</h2>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 pl-10 bg-gray-200 dark:bg-gray-700 rounded-lg focus:outline-none dark:text-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>
        <select
          className="w-full p-3 bg-gray-200 dark:bg-gray-700 rounded-lg focus:outline-none dark:text-white"
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
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">
          Search
        </button>
      </div> */}

{/* Design 3 */ }
{/* <div className="p-6 bg-blue-50 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Design 3</h2>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 pl-10 bg-blue-100 rounded-lg focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
        </div>
        <select
          className="w-full p-3 bg-blue-100 rounded-lg focus:outline-none"
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
        <button className="mt-4 px-4 py-2 bg-blue-700 text-white rounded-lg">
          Search
        </button>
      </div> */}

{/* Design 4 */ }
{/* <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Design 4</h2>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 pl-10 bg-gray-700 rounded-lg focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        <select
          className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none"
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
        <button className="mt-4 px-4 py-2 bg-gray-700 text-white border border-white rounded-lg">
          Search
        </button>
      </div> */}

{/* Design 5 */ }
{/* <div className="max-w-4xl mx-auto p-4">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none dark:text-white"
          />
          <select
            className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none dark:text-white"
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
          <button className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Search
          </button>
        </div>
      </div> */}

{/* design 6 */ }


{/* Design 7 */ }

{/* <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-2 gap-4 items-center">
          <input
            type="text"
            placeholder="Search"
            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none dark:text-white col-span-2 md:col-span-1"
          />
          <select
            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none dark:text-white col-span-1"
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
          <button className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 col-span-1">
            Search
          </button>
        </div>
      </div> */}

{/* Design 8 */ }
{/* <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="relative col-span-2">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-3 pl-10 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none dark:text-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          </div>
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
          <button className="col-span-1 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Search
          </button>
        </div>
      </div> */}