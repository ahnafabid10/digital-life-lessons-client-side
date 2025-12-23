import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useAuth } from '../../Hooks/useAuth';




// const TopContributors = () => {
//   const axiosSecure = useAxiosSecure()
// const { data: contributors = [] } = useQuery({
//   queryKey: ['contributors'],
//   queryFn: async () => {
//     const res = await axiosSecure.get('/lessons/top-contributors');
//     return res.data;
//   }
// });


//     return (
//         <div className='bg-gradient-to-r from-primary to-secondary text-white border-t border-white border-opacity-30'>
//             <div className=" p-8 rounded-xl max-w-7xl mx-auto">
//       <h2 className="text-3xl md:text-4xl text-white font-bold mb-8 text-center">Top Contributors of the Week</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {contributors?.map((contributor, index) => (
//   <div className='justify-center items-center my-2' key={index}>
//     <img className='h-[200px] w-[200px] rounded-full mb-2' src={contributor?.avatar} alt={contributor?.name} />
//     <p className=''>{contributor?.name}</p>
//   </div>
// ))}

//       </div>
//     </div>
//         </div>
//     );
// };
// const TopContributors = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure()
//   const { data: contributors = [] } = useQuery({
//     queryKey: ['contributors'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/lessons/top-contributors');
//       return res.data;
//     }
//   });

//   if (!user) {
//     return (
//       <div className="text-center py-10 bg-base-100">
//         <h3 className="text-2xl font-bold">Top Contributors</h3>
//         <p className="text-base-content/70 mt-2">Sign in to see full profiles.</p>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
//           {contributors.map(c => (
//             <div key={c.email} className="flex flex-col items-center">
//               <img className="h-24 w-24 rounded-full" src={c.avatar} alt={c.name} />
//               <p>{c.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // Logged-in users see full view
//   return (
//     <div className="bg-gradient-to-r from-primary to-secondary text-white border-t border-white border-opacity-30">
//       <div className="p-8 rounded-xl max-w-7xl mx-auto">
//         <h2 className="text-3xl md:text-4xl text-white font-bold mb-8 text-center">
//           Top Contributors of the Week
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {contributors?.map((contributor, index) => (
//             <div key={index} className="justify-center items-center my-2">
//               <img
//                 className="h-[200px] w-[200px] border-2 border-white rounded-full mb-2"
//                 src={contributor?.avatar}
//                 alt={contributor?.name}
//               />
//               <p>{contributor?.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };



const TopContributors = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: contributors = [] } = useQuery({
    queryKey: ['contributors'],
    queryFn: async () => {
      const res = await axiosSecure.get('/lessons/top-contributors');
      return res.data;
    },
  });

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white border-t border-white border-opacity-30">
      <div className="p-8 rounded-xl max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-white font-bold mb-8 text-center">
          Top Contributors of the Week
        </h2>
        {!user && (
          <p className="text-base-content/70 text-center mb-6">
            Sign in to see full profiles.
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contributors.map((contributor, index) => (
            <div key={index} className="flex flex-col items-center my-2">
              <img
                className={`rounded-full mb-2 ${
                  user ? 'h-[200px] w-[200px] border-2 border-white' : 'h-24 w-24'
                }`}
                src={contributor?.avatar}
                alt={contributor?.name}
              />
              <p>{contributor?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default TopContributors;