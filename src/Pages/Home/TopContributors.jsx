import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';




const TopContributors = () => {
  const axiosSecure = useAxiosSecure()
const { data: contributors = [] } = useQuery({
  queryKey: ['contributors'],
  queryFn: async () => {
    const res = await axiosSecure.get('/lessons/top-contributors');
    return res.data;
  }
});


    return (
        <div className='bg-gradient-to-r from-primary to-secondary text-white border-t border-white border-opacity-30'>
            <div className=" p-8 rounded-xl max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl text-white font-bold mb-8 text-center">Top Contributors of the Week</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {contributors?.map((contributor, index) => (
  <div className='justify-center items-center my-2' key={index}>
    <img className='h-[200px] w-[200px] rounded-full mb-2' src={contributor?.avatar} alt={contributor?.name} />
    <p className=''>{contributor?.name}</p>
  </div>
))}

      </div>
    </div>
        </div>
    );
};

export default TopContributors;