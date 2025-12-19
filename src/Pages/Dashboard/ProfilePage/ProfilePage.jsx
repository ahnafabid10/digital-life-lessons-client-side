import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import LoadingPage from '../../LoadingPage/LoadingPage';

const ProfilePage = () => {
  const axiosSecure = useAxiosSecure();
  const { _id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['profileDetails', _id],
    queryFn: async () => {
        const res = await axiosSecure.get(`/users/${_id}/lessons`);
        console.log('datadatadata', res.data)
      return res.data;
    }
  });

  if(isLoading) 
    return <LoadingPage></LoadingPage>

  const user = data?.user;
  const lessons = data?.lessons;

  return (
    <div className="w-10/12 mx-auto my-10">
      <div className="flex items-center gap-4 p-4 border rounded-lg bg-base-100 shadow mb-6">
        <img
          src={lessons[0]?.photo} alt="" className="w-16 h-16 rounded-full object-cover"/>
        <div className="flex-1">
 <h3 className="text-xl font-semibold">{user?.name}</h3>
 <p className="text-sm text-gray-500">Total Lessons Created: {lessons.length}</p></div>
      </div>


  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
    {lessons.map((l) => (
          <div key={l._id} className="p-4 border rounded-lg bg-gradient-to-r from-primary to-secondary text-white border-t border-white border-opacity-30 shadow hover:shadow-lg transition">
            <h4 className="text-lg font-semibold">{l.title}</h4>
            <p className="text-gray-400 text-sm mb-2">{l.createAt}</p>
            <p>{l.description}</p>
            {/* <Link to={`/lessons/${lessons._id}`}><button>View Details</button></Link> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
