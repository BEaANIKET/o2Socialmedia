import { useState, useEffect } from 'react';
import api from '../../services/api/axiosConfig';

const useHandleLikes = (postId) => {
    const [likes, setLikes] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await api.get(`/post/getlikes?postId=${postId}`);
                console.log(response);

                setLikes(response.data.likesCount);
                setLoading(false);
                setIsLiked(response.data.isCurrUserLiked)
                console.log(response.data.isCurrUserLiked);

            } catch (err) {
                setError(err?.response?.data?.message || 'Something went wrong');
                setLoading(false);
            }
        };

        if (postId) fetchLikes();
    }, [postId]);

    const likePost = async (postId) => {
        try {
            const updatedLikes = isLiked ? likes - 1 : likes + 1;
            setLikes(updatedLikes);
            setIsLiked(!isLiked);
            const response = await api.post(`/post/like?postId=${postId}`);
            return response.data;
        } catch (err) {
            setLikes(isLiked ? likes + 1 : likes - 1);
            setIsLiked(isLiked);
        }
    };

    return { likes, loading, error, isLiked, likePost };
};

export default useHandleLikes;
