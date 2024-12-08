import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from '@/FirebaseConfig';

const useAuthState = () => {
    const auth = getAuth(app);
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            setUser(authUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    return { user, loading };
};

export default useAuthState;
