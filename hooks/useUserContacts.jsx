import { api_link } from '@/api';
import { useState, useEffect } from 'react';

const useUserContacts = (userId) => {
    const [userContacts, setUserContacts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchUserContacts = async () => {
            try {
                const response = await fetch(`${api_link}/emergency-contacts/${userId}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setUserContacts(data);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserContacts();
    }, [userId]);

    return { userContacts, loading };
};

export default useUserContacts;
