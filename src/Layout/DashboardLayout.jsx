import React, { useEffect, useState } from 'react';
import { FaEye, FaRegCreditCard, FaRegPlusSquare, FaHome, FaHeart } from 'react-icons/fa';
import { MdApproval, MdOutlinePlayLesson, MdOutlineReport, MdDashboard } from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../Hooks/useRole';
import { RiAdminLine } from "react-icons/ri";
import { GrUserAdmin } from "react-icons/gr";
import { useAuth } from '../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const DashboardLayout = () => {
  const {role} = useRole();
  const {user, logOut} = useAuth();
  const axiosSecure = useAxiosSecure();
  
  // Theme state
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Get user plan
  const {data: userPlan = []} = useQuery({
    queryKey: ['userPlan', user?.email],
    enabled: !!user,
    queryFn: async()=>{
      const res = await axiosSecure.get(`/users/?email=${user.email}`);
      return res.data;
    }
  });

  const handleLogOut = ()=>{
    logOut()
    .then(res=>{
      console.log(res.data);
    })
    .catch(error=>{
      console.log(error);
    });
  };

  return (
    <div className='flex min-h-screen bg-base-200'>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col">
          {/* Enhanced Navbar */}
          <nav className="navbar bg-gradient-to-r from-primary to-secondary text-white shadow-xl sticky top-0 z-50">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost text-white hover:bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            
            <div className="flex-1 px-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <MdDashboard className="text-2xl" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Digital Life Lessons</h1>
                  <p className="text-xs text-white/80">Dashboard Panel</p>
                </div>
              </div>
            </div>

            <div className="flex-none flex items-center gap-2">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle text-white hover:bg-white/20 transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>

              {/* Premium Badge - Desktop */}
              <div className="hidden md:block">
                {userPlan[0]?.isPremium === true ? 
                  <span className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold shadow-lg text-sm animate-pulse">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Premium
                  </span>
                : 
                  <Link
                    to="/pricing"
                    className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-bold shadow-lg hover:bg-white/30 transition-all duration-300 text-sm group">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Upgrade</span>
                  </Link>
                }
              </div>

              {/* User Avatar Dropdown */}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="avatar online">
                  <div className="w-10 rounded-full ring-2 ring-white ring-offset-2 ring-offset-primary hover:ring-4 transition-all duration-300 cursor-pointer">
                    <img src={user?.photoURL} alt="User" />
                  </div>
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-2xl z-[100] w-64 p-4 shadow-2xl border border-primary/20 mt-4">
                  {/* User Info Header */}
                  <li className="mb-3 pointer-events-none">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
                      <div className="avatar">
                        <div className="w-12 rounded-full ring-2 ring-primary">
                          <img src={user?.photoURL} alt="User" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-base truncate text-base-content">{user?.displayName}</p>
                        <p className="text-xs text-base-content/60 truncate">{user?.email}</p>
                      </div>
                    </div>
                  </li>
                  
                  {/* Premium Badge - Mobile */}
                  <li className="md:hidden mb-2">
                    {userPlan[0]?.isPremium === true ? 
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-lg pointer-events-none justify-center py-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Premium Member
                      </div>
                    : 
                      <Link to="/pricing" className="bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg justify-center hover:scale-105 transition-transform py-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Upgrade to Premium
                      </Link>
                    }
                  </li>
                  
                  <div className="divider my-1"></div>
                  
                  <li>
                    <Link to="/profile" className="hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200 text-base-content">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
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
          </nav>

          {/* Page content */}
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </div>

        {/* Enhanced Sidebar */}
        <div className="drawer-side is-drawer-close:overflow-visible z-40">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          
          <div className="flex min-h-full flex-col bg-base-100 is-drawer-close:w-20 is-drawer-open:w-72 shadow-2xl border-r border-base-300">
            {/* Logo Section */}
            <div className="p-6 is-drawer-close:p-4 border-b border-base-300 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="is-drawer-close:hidden">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-xl shadow-lg">
                    <MdDashboard className="text-2xl text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-base-content">Dashboard</h2>
                    <p className="text-xs text-base-content/60 capitalize">{role || 'User'} Panel</p>
                  </div>
                </div>
              </div>
              <div className="is-drawer-open:hidden flex justify-center">
                <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
                  <MdDashboard className="text-xl text-white" />
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <ul className="menu w-full grow p-4 gap-2">
              {/* Home Link */}
              <li>
                <Link 
                  to='/' 
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-300 group text-base-content" 
                  data-tip="Homepage"
                >
                  <FaHome className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="is-drawer-close:hidden font-medium">Homepage</span>
                </Link>
              </li>

              {/* Divider */}
              <div className="divider is-drawer-close:hidden my-2">
                <span className="text-xs font-semibold text-base-content/60">USER MENU</span>
              </div>

              {/* User Dashboard Links */}
              <li>
                <NavLink 
                  to='/dashboard/add-lesson' 
                  className={({isActive}) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105 font-semibold' 
                      : 'hover:bg-primary/10 text-base-content hover:text-primary'
                  }`}
                  data-tip="Add Lesson"
                >
                  <FaRegPlusSquare className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="is-drawer-close:hidden font-medium">Add Lesson</span>
                  {({isActive}) => isActive && (
                    <div className="is-drawer-close:hidden ml-auto">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    </div>
                  )}
                </NavLink>
              </li>

              <li>
                <NavLink 
                  to='/dashboard/my-lessons'
                  className={({isActive}) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105 font-semibold' 
                      : 'hover:bg-primary/10 text-base-content hover:text-primary'
                  }`}
                  data-tip="My Lessons"
                >
                  <MdOutlinePlayLesson className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="is-drawer-close:hidden font-medium">My Lessons</span>
                  {({isActive}) => isActive && (
                    <div className="is-drawer-close:hidden ml-auto">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    </div>
                  )}
                </NavLink>
              </li>

              <li>
                <NavLink 
                  to='/dashboard/my-favourite'
                  className={({isActive}) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105 font-semibold' 
                      : 'hover:bg-primary/10 text-base-content hover:text-primary'
                  }`}
                  data-tip="My Favourite"
                >
                  <FaHeart className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="is-drawer-close:hidden font-medium">My Favourite</span>
                  {({isActive}) => isActive && (
                    <div className="is-drawer-close:hidden ml-auto">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    </div>
                  )}
                </NavLink>
              </li>

              <li>
                <NavLink 
                  to='/dashboard/payment-history'
                  className={({isActive}) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105 font-semibold' 
                      : 'hover:bg-primary/10 text-base-content hover:text-primary'
                  }`}
                  data-tip="Payment History"
                >
                  <FaRegCreditCard className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="is-drawer-close:hidden font-medium">Payment History</span>
                  {({isActive}) => isActive && (
                    <div className="is-drawer-close:hidden ml-auto">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    </div>
                  )}
                </NavLink>
              </li>

              {/* Admin Section */}
              {role === 'admin' && (
                <>
                  <div className="divider is-drawer-close:hidden my-2">
                    <span className="text-xs font-semibold text-base-content/60">ADMIN PANEL</span>
                  </div>

                  <li>
                    <NavLink
  to="/dashboard/admin"
  end
  className={({ isActive }) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${
    isActive
      ? 'bg-gradient-to-r from-error to-warning text-white shadow-lg scale-105 font-semibold'
      : 'hover:bg-error/10 text-base-content hover:text-error'
  }`}
  data-tip="Admin Dashboard"
>

                      <RiAdminLine className="text-lg group-hover:scale-110 transition-transform" />
                      <span className="is-drawer-close:hidden font-medium">Admin Dashboard</span>
                      {({isActive}) => isActive && (
                        <div className="is-drawer-close:hidden ml-auto">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                        </div>
                      )}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink 
                      to='/dashboard/admin/manage-lessons'
                      className={({isActive}) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${
                        isActive 
                          ? 'bg-gradient-to-r from-error to-warning text-white shadow-lg scale-105 font-semibold' 
                          : 'hover:bg-error/10 text-base-content hover:text-error'
                      }`}
                      data-tip="Manage Lessons"
                    >
                      <MdApproval className="text-lg group-hover:scale-110 transition-transform" />
                      <span className="is-drawer-close:hidden font-medium">Manage Lessons</span>
                      {({isActive}) => isActive && (
                        <div className="is-drawer-close:hidden ml-auto">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                        </div>
                      )}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink 
                      to='/dashboard/admin/manage-users'
                      className={({isActive}) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${
                        isActive 
                          ? 'bg-gradient-to-r from-error to-warning text-white shadow-lg scale-105 font-semibold' 
                          : 'hover:bg-error/10 text-base-content hover:text-error'
                      }`}
                      data-tip="Manage Users"
                    >
                      <FaEye className="text-lg group-hover:scale-110 transition-transform" />
                      <span className="is-drawer-close:hidden font-medium">Manage Users</span>
                      {({isActive}) => isActive && (
                        <div className="is-drawer-close:hidden ml-auto">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                        </div>
                      )}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink 
                      to='/dashboard/admin/reported-lessons'
                      className={({isActive}) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${
                        isActive 
                          ? 'bg-gradient-to-r from-error to-warning text-white shadow-lg scale-105 font-semibold' 
                          : 'hover:bg-error/10 text-base-content hover:text-error'
                      }`}
                      data-tip="Reported Lessons"
                    >
                      <MdOutlineReport className="text-lg group-hover:scale-110 transition-transform" />
                      <span className="is-drawer-close:hidden font-medium">Reported Lessons</span>
                      {({isActive}) => isActive && (
                        <div className="is-drawer-close:hidden ml-auto">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                        </div>
                      )}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink 
                      to='/dashboard/admin/profile'
                      className={({isActive}) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${
                        isActive 
                          ? 'bg-gradient-to-r from-error to-warning text-white shadow-lg scale-105 font-semibold' 
                          : 'hover:bg-error/10 text-base-content hover:text-error'
                      }`}
                      data-tip="Admin Profile"
                    >
                      <GrUserAdmin className="text-lg group-hover:scale-110 transition-transform" />
                      <span className="is-drawer-close:hidden font-medium">Admin Profile</span>
                      {({isActive}) => isActive && (
                        <div className="is-drawer-close:hidden ml-auto">
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                        </div>
                      )}
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {/* Footer Section */}
            <div className="p-4 border-t border-base-300 bg-base-200">
              {/* Premium Status - Sidebar */}
              <div className="is-drawer-close:hidden mb-3">
                {userPlan[0]?.isPremium === true ? 
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl p-3 text-white shadow-lg">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <div>
                        <p className="font-bold text-sm">Premium Member</p>
                        <p className="text-xs opacity-90">Enjoy all features</p>
                      </div>
                    </div>
                  </div>
                : 
                  <Link to="/pricing" className="block bg-gradient-to-r from-primary to-secondary rounded-xl p-3 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <div>
                        <p className="font-bold text-sm">Upgrade to Premium</p>
                        <p className="text-xs opacity-90">Unlock all features</p>
                      </div>
                    </div>
                  </Link>
                }
              </div>

              {/* Logout Button */}
              <button 
                onClick={handleLogOut}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right btn btn-error w-full rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                data-tip="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="is-drawer-close:hidden">Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;