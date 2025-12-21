import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useAuth } from '../../../Hooks/useAuth';
import { Link } from 'react-router';
import LoadingPage from '../../LoadingPage/LoadingPage';

const MyFavourite = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
    //   const [allVehicles, setAllVehicles] = useState([]);
    const [category, setCategory] = useState('')

  const { data: favourites = [], isLoading } = useQuery({
    queryKey: ['favourites', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const favRes = await axiosSecure.get(`/favourite?email=${user.email}`);
      const favLessons = await Promise.all(
        favRes.data.map(async fav => {
          const lessonRes = await axiosSecure.get(`/lessons/${fav.lessonId}`);
          return {...lessonRes.data, favouriteId:fav._id};
        })
      );
      return favLessons;
    },
  });

  if (isLoading) return <LoadingPage />;

   const filter = favourites.filter(f => {
        const matchCategory = category ? f.category === category : true;

        return matchCategory 
    });

    // console.log("favourites", favourites)

    const handleRemoveFavourite = (id)=>{
      axiosSecure.delete(`/favourite/${id}`)
      .then(res=>{
        console.log(res.data)
      })
    }


  return (
    <div className="w-10/12 mx-auto my-10">
      <h2 className="text-2xl font-bold text-purple-800 mb-6">Total Favourite Lessons: {favourites.length}</h2>

                      <div className='flex gap-5'>
                    <div className="dropdown dropdown-center">
  <div tabIndex={0} role="button" className="btn m-1">Category </div>
  <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
<li><a onClick={() => setCategory("")}>All</a></li>
<li><a onClick={() => setCategory("Relationships")}>Relationships</a></li>
<li><a onClick={() => setCategory("Personal Growth")}>Personal Growth</a></li>
<li><a onClick={() => setCategory("Mistakes Learned")}>Mistakes Learned</a></li>
<li><a onClick={() => setCategory("Mindset")}>Mindset</a></li>
<li><a onClick={() => setCategory("Career")}>Career</a></li>
  </ul>

  
</div>
</div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filter.map(lesson => (
          <div key={lesson._id} className="border rounded shadow p-4">
            <h3 className="text-lg font-semibold">{lesson.title}</h3>
            <p className="text-gray-600">{lesson.description?.slice(0, 100)}...</p>
            <p className="text-sm text-gray-400 mt-1">Category: {lesson.category}</p>
            <Link
              to={`/lessons/${lesson._id}`}
              className="btn my-2 w-full btn-primary">View Lesson</Link>
              <button onClick={()=>handleRemoveFavourite(lesson.favouriteId)} className=' btn bg-white hover:text-white hover:bg-black mt-2 w-full'>Remove From Favourite</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFavourite;
