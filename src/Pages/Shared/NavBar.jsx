import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { useAuth } from '../../Hooks/useAuth';
import { useQuery} from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Img from '../../assets/Gemini_Generated_Image_uaqoicuaqoicuaqo.png'


const NavBar = () => {

  const axiosSecure = useAxiosSecure()
  const {user, logOut} = useAuth();
  
  // Initialize theme from HTML data-theme attribute or default to 'light'
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'light';
  });

  // Update the HTML data-theme attribute when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };


const {data: userPlan =[]} = useQuery({
  queryKey: ['userPlan', user?.email],
  queryFn: async()=>{
    const res = await axiosSecure.get(`/users/?email=${user.email}`);
    console.log('userPlan', res.data)
    return res.data
  }
})


  const handleLogOut = ()=>{
    logOut()
    .then(res=>{
      console.log(res.data)
    })
    .catch(error=>{
      console.log(error)
    })
  }

    const links = <>
    <li>
      <NavLink 
        to='/' 
        className={({isActive}) => isActive ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-primary/5'}
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink 
        to='/publicLessons'
        className={({isActive}) => isActive ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-primary/5'}
      >
        Public Lessons
      </NavLink>
    </li>
    <li>
      <NavLink 
        to='/pricing'
        className={({isActive}) => isActive ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-primary/5'}
      >
        Pricing
      </NavLink>
    </li>

  {
    user && <>
    <li>
      <NavLink 
        to='/dashboard/my-lessons'
        className={({isActive}) => isActive ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-primary/5'}
      >
        My Lessons
      </NavLink>
    </li>
    <li>
      <NavLink 
        to='/dashboard/add-lesson'
        className={({isActive}) => isActive ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-primary/5'}
      >
        Add Lesson
      </NavLink>
    </li>
    </>
  }

    </>

    return (
        <div className="sticky top-0 z-50 w-full backdrop-blur-md bg-base-100/90 border-b border-primary/10 shadow-sm">
            <div className="navbar max-w-7xl mx-auto px-4 py-2">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-primary/10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-[100] mt-3 w-64 p-3 shadow-2xl border border-primary/20">
        {links}
      </ul>
    </div>
    <Link to='/' className="flex items-center gap-3 btn-ghost text-base sm:text-lg md:text-xl normal-case font-bold px-2 sm:px-4 hover:bg-transparent">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-lg ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300">
        <img src={Img} alt="Digital Life Lessons Logo" className="w-full h-full object-cover" />
      </div>
      <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:inline font-extrabold">
        Digital Life Lessons
      </span>
    </Link>
  </div>
  
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal gap-1 px-1">
        {links}
    </ul>
  </div>
  
  <div className="navbar-end gap-2 sm:gap-3">
    {/* Theme Toggle Button */}
    <button 
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle hover:bg-primary/10 transition-all duration-300"
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        // Moon icon for dark mode
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        // Sun icon for light mode
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>

    {
    user 
    ? 
    <div className='flex gap-2 sm:gap-3 items-center'>

      <div className="hidden sm:block">
        {userPlan[0]?.isPremium === true ? 
          <span className="relative inline-flex items-center gap-2 px-5 md:px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold shadow-lg text-sm animate-pulse">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Premium
          </span>
        : 
          <Link
            to="/pricing"
            className="relative inline-flex items-center gap-2 px-5 md:px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm group overflow-hidden">
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="relative z-10">Upgrade Now</span>
          </Link>
        }
      </div>

      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="avatar online">
          <div className="w-10 sm:w-12 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100 hover:ring-4 transition-all duration-300 cursor-pointer">
            <img src={user.photoURL} alt="User" />
          </div>
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-2xl z-[100] w-64 p-4 shadow-2xl border border-primary/20 mt-4">
          <li className="px-4 py-3 font-bold text-lg border-b border-primary/10 mb-2 pointer-events-none bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {user.displayName}
          </li>
          
          <li className="sm:hidden mb-2">
            {userPlan[0]?.isPremium === true ? 
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-lg pointer-events-none justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Premium Member
              </span>
            : 
              <Link to="/pricing" className="bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg justify-center hover:scale-105 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Upgrade to Premium
              </Link>
            }
          </li>
          
          <li>
            <Link to="/profile" className="hover:bg-primary/10 hover:text-primary rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:bg-primary/10 hover:text-primary rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
              </svg>
              Dashboard
            </Link>
          </li>
          <li className="mt-2">
            <button onClick={handleLogOut} className="btn btn-primary w-full rounded-lg font-bold hover:scale-105 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  : 
    <Link to="/login" className="btn btn-outline btn-primary btn-sm sm:btn-md rounded-full font-bold hover:scale-105 transition-all duration-300 border-2">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
      </svg>
      Login
    </Link>
    }
  </div>
</div>
        </div>
    );
};

export default NavBar;