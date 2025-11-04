import React, { useContext } from 'react';
import { FirebaseAuthContext } from '../../contexts/firebaseAuthContext/AuthContext';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/LoadingSpinner';

const Applications = () => {
    const {initialUser}=useContext(FirebaseAuthContext);
    
    const { data, isLoading } = useQuery({
        queryKey: ['applications', initialUser?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/applicant?email=${initialUser?.email}`);
            const data = await res.json();
            return data;
        },
        enabled: !!initialUser?.email, // This ensures the query only runs when the email is available
    });

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div>
            <h1>application so far : {data?.length}</h1>
        </div>
    );
};

export default Applications;