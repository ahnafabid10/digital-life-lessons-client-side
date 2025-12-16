import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ApprovedLessons = () => {

    const axiosSecure = useAxiosSecure()

    const {data: lessons = []} = useQuery({
        queryKey: ['lessons', 'pending'],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/lessons`)
            return res.data
        }
    })

    return (
        <div>
            <h2 className="text-5xl">Lessons Pending Approval:{lessons.length}</h2>
        </div>
    );
};

export default ApprovedLessons;