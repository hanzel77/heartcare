import { api_link } from '@/api';
import { useState, useEffect } from 'react';

const useUserData = (userId) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchUserData = async () => {
            try {
                console.log(`${api_link}/user/${userId}`)
                const response = await fetch(`${api_link}/user/${userId}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setUserData(data);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    return { userData, loading, error };
};

export default useUserData;
