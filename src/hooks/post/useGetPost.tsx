import { useState, useEffect } from 'react';
import api from '../../services/api/axiosConfig';

const useGetPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/post/get');
                setPosts(response.data.posts);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return { posts, loading, error };
};

export default useGetPosts;
