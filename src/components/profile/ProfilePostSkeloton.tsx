

export const ProfilePostSkeloton = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Post Type Navigation Skeleton */}
            <div className="flex justify-center border-t dark:border-gray-700">
                <div className="flex space-x-12">
                    {["POSTS", "SAVED", "LIKED"].map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2 px-4 py-4 animate-pulse"
                        >
                            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-md w-16"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Instagram-style Grid Skeleton */}
            <div className="grid grid-cols-3 gap-1 md:gap-8 mt-4">
                {Array.from({ length: 9 }).map((_, index) => (
                    <div key={index} className="relative aspect-square animate-pulse">
                        <div className="w-full h-full bg-gray-300 dark:bg-gray-700"></div>
                        {/* Hover Overlay Skeleton */}
                        <div className="absolute inset-0 bg-black bg-opacity-0"></div>
                    </div>
                ))}
            </div>
        </div>

    )
}