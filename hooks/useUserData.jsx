import { api_link } from '@/api';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const useUserData = (userId) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchUserData = async () => {
            try {
                const response = await fetch(`${api_link}/user/${userId}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setUserData(data);
            } catch (err) {
                Alert.alert("Error fetching user data, Please try again!");
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
