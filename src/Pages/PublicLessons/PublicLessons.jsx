import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router';

const PublicLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
        const [category, setCategory] = useState('')
        const [tone, setTone] = useState('')
        const [search, setSearch] = useState('');
        const [sortBy, setSortBy] = useState('');


             const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 9;




  const { data: publicLessons = [], isLoading } = useQuery({
    queryKey: ['publicLessons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/lessons?privacy=Public');
      console.log("publicLesson",res.data)
      return res.data;
    },
  });
  const { data: getUsers = [] } = useQuery({
    queryKey: ['userPlan', user?.email],
    queryFn: async () => {
      const resUsers = await axiosSecure.get(`/users/?email=${user.email}`);
      console.log("get user data", resUsers.data)
      return resUsers.data;
    },
  });

  if (isLoading) {
    return <span className="loading min-h-screen items-center justify-center loading-infinity loading-xl"></span>

  }




     const filter = publicLessons?.filter(v => {
        const matchCategory = category ? v.category === category : true;
        const matchPrivacy = tone ? v.tone === tone : true;



        const matchSearch = search
    ? v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase())
    : true;

        return matchCategory  &&  matchPrivacy && matchSearch;
    })?.sort((a, b) => {
    if (sortBy === "newest") {
        return new Date(b.createAt) - new Date(a.createAt);
    }

    if (sortBy === "saved") {
        return (b.favoritesCount || 0) - (a.favoritesCount || 0);
    }

    return 0;
});

console.log("fgerg",sortBy)


 const indexOfLastLesson = currentPage * lessonsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
  const currentLessons = filter.slice(indexOfFirstLesson, indexOfLastLesson);
  const totalPages = Math.ceil(filter.length / lessonsPerPage);


  return (
    <div className='w-9/12 mx-auto my-10 min-h-screen'>
      <div className='flex flex-col md:flex-row items-center gap-5'>
        <input
    type="text"
    placeholder="Search lessons..."
    className="input input-bordered w-full max-w-xs"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
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
                    <div className="dropdown dropdown-center">
  <div tabIndex={0} role="button" className="btn m-1">Tone </div>
  <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
<li><a onClick={() => setTone("")}>All</a></li>
<li><a onClick={() => setTone("Motivational")}>Motivational</a></li>
<li><a onClick={() => setTone("Gratitude")}>Gratitude</a></li>
<li><a onClick={() => setTone("Realization")}>Realization</a></li>
<li><a onClick={() => setTone("Sad")}>Sad</a></li>
  </ul>


  
</div>



<div className="dropdown dropdown-center">
  <div tabIndex={0} role="button" className="btn m-1">
    Sort By
  </div>
  <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li><a onClick={() => setSortBy("")}>Default</a></li>
<li><a onClick={() => setSortBy("newest")}>Newest</a></li>
<li><a onClick={() => setSortBy("saved")}>Most Saved</a></li>

  </ul>
</div>


                </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">



      {currentLessons.map(lesson => {
        const isPremiumLesson = lesson.accessLevel === 'Premium';
        const isPremiumUser = getUsers[0]?.isPremium === true

        return (
          <div className="card bg-base-100 shadow-md relative">
            {isPremiumLesson && !isPremiumUser && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 text-white rounded-lg">
                <FaLock className="text-3xl mb-2" />
                <Link to="/pricing" className="font-semibold">Premium Lesson – Upgrade to view</Link>
              </div>
            )}

            <div className="card-body">
      <h2 className="card-title text-primary">{lesson.title}</h2>

      {/*user info */}

  <div className="flex items-center gap-2 mb-2">
    <img
      src={lesson?.photo}
      alt=""
      className="w-8 h-8 rounded-full object-cover"
    />
    <p className="text-sm font-medium">{lesson?.name}</p>
  </div>
  <p>Date: {lesson?.createAt}</p>
      {/* user data */}
      {/* <p>{isPremiumUser.name}</p>
      <img src={isPremiumUser.photo} alt="" /> */}
<p className="text-sm text-gray-500">{lesson.description.slice(0, 100)}...</p>

              <div className="flex flex-wrap gap-2 text-xs mt-2">
<span className="badge badge-outline">{lesson.category}</span>
<span className="badge badge-outline">{lesson.tone}</span>
<span className={`badge ${isPremiumLesson ? 'badge-secondary' : 'badge-success'}`}>{lesson.accessLevel}</span>
              </div>



              <div className="card-actions justify-end mt-4">
            <Link to={`/lessonsDetails/${lesson._id}`}>
            <button disabled={isPremiumLesson && !isPremiumUser} className="btn btn-primary btn-sm">See Details</button></Link>
        </div>
            </div>
                </div>
        );
      })}
    </div>
          <div className="flex justify-center mt-6 gap-2">
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : ''}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn btn-sm"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >Next</button>
      </div>
    </div>
    
  );
};

export default PublicLessons;
