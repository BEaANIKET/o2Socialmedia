import { useEffect, useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

interface PostProps {
    post: {
        id: number;
        username: string;
        avatar: string;
        image: string;  // Image or video URL
        caption: string;
        likes: number;
        comments: number;
        timestamp: string;
    };
}

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

const SearchPost = ({ post }: PostProps) => {

    const mediaType = identifyMediaType(post.image);
    const [isPlay, setIsPlay] = useState(false);
    const observerRef = useIntersectionObserver(() => setIsPlay(true), () => setIsPlay(false), { threshold: 0.6 });

    useEffect(() => {
        if (observerRef.current) {
            if (isPlay) {
                observerRef.current.play();
            }
            else {
                observerRef.current.pause();
            }
        }
    }, [isPlay]);


    return (
        <div key={post.id} className=" overflow-hidden rounded-lg mb-2 relative h-fit cursor-pointer">
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
}

export default SearchPost;