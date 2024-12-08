import { useState, useEffect } from 'react';
import { api_link } from '@/api';

const useUserReports = (userId) => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReports = async () => {
        setLoading(true);
        try {
            // Replace the URL with your actual API endpoint
            const response = await fetch(`${api_link}/reports/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch reports');
            }
            const data = await response.json();
            setReports(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchReports();
        }
    }, [userId]);

    return { reports, loading, error, refetch: fetchReports };
};

export default useUserReports;
