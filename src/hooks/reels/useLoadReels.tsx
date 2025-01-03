import { useEffect, useState } from "react";
import api from "../../services/api/axiosConfig";


const useLoadReels = () => {

    const [reels, setReels] = useState([]);

    const fetchReels = async () => {
        try {
            const response = await api.get('/post/get');
            setReels(response.data.posts);
            console.log(response.data.posts);

        } catch (error) {
            console.error(error?.response?.data?.error);
        }
    }

    const loadReels = async () => {
        try {
            const response = await api.get('/post/get');
            setReels([...reels, ...response.data.posts]);
            console.log(response.data.posts);
        } catch (error) {
            console.error(error?.response?.data?.error);
        }
    }

    useEffect(() => {
        fetchReels();
    }, [])

    return { reels, loadReels };
}

export default useLoadReels