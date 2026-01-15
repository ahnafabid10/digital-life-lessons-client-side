import React from 'react';
import { FaEye, FaRegCreditCard, FaRegPlusSquare, FaHome, FaHeart } from 'react-icons/fa';
import { MdApproval, MdOutlinePlayLesson, MdOutlineReport, MdDashboard } from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../Hooks/useRole';
import { RiAdminLine } from "react-icons/ri";
import { GrUserAdmin } from "react-icons/gr";
import { CiSaveDown2 } from "react-icons/ci";

const DashboardLayout = () => {
  const {role} = useRole()
  console.log('in the dashboard', role)

  return (
    <div className='flex min-h-screen bg-base-200'>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col">
          {/* Enhanced Navbar */}
          <nav className="navbar bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-xl sticky top-0 z-50">
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

            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <div className="avatar placeholder">
                  <div className="bg-white/20 text-white rounded-full w-10 ring ring-white/30 ring-offset-base-100 ring-offset-2">
                    <span className="text-sm font-bold">
                      {role === 'admin' ? 'A' : 'U'}
                    </span>
                  </div>
                </div>
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
          
          <div className="flex min-h-full flex-col bg-gradient-to-b from-base-100 to-base-200 is-drawer-close:w-20 is-drawer-open:w-72 shadow-2xl border-r border-base-300">
            {/* Logo Section */}
            <div className="p-6 is-drawer-close:p-4 border-b border-base-300">
              <div className="is-drawer-close:hidden">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-xl shadow-lg">
                    <MdDashboard className="text-2xl text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Dashboard</h2>
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
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 rounded-xl transition-all duration-300 group" 
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
                  className={({isActive}) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${isActive ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'hover:bg-primary/10'}`}
                  data-tip="Add Lesson"
                >
                  <FaRegPlusSquare className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="is-drawer-close:hidden font-medium">Add Lesson</span>
                </NavLink>
              </li>

              <li>
                <NavLink 
                  to='/dashboard/my-lessons'
                  className={({isActive}) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${isActive ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'hover:bg-secondary/10'}`}
                  data-tip="My Lessons"
                >
                  <MdOutlinePlayLesson className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="is-drawer-close:hidden font-medium">My Lessons</span>
                </NavLink>
              </li>

              <li>
                <NavLink 
                  to='/dashboard/my-favourite'
                  className={({isActive}) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${isActive ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'hover:bg-accent/10'}`}
                  data-tip="My Favourite"
                >
                  <FaHeart className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="is-drawer-close:hidden font-medium">My Favourite</span>
                </NavLink>
              </li>

              <li>
                <NavLink 
                  to='/dashboard/payment-history'
                  className={({isActive}) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${isActive ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'hover:bg-success/10'}`}
                  data-tip="Payment History"
                >
                  <FaRegCreditCard className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="is-drawer-close:hidden font-medium">Payment History</span>
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
                      to='/dashboard/admin'
                      className={({isActive}) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${isActive ? 'bg-gradient-to-r from-error to-warning text-white' : 'hover:bg-error/10'}`}
                      data-tip="Admin Dashboard"
                    >
                      <RiAdminLine className="text-lg group-hover:scale-110 transition-transform" />
                      <span className="is-drawer-close:hidden font-medium">Admin Dashboard</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink 
                      to='/dashboard/admin/manage-lessons'
                      className={({isActive}) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${isActive ? 'bg-gradient-to-r from-error to-warning text-white' : 'hover:bg-warning/10'}`}
                      data-tip="Manage Lessons"
                    >
                      <MdApproval className="text-lg group-hover:scale-110 transition-transform" />
                      <span className="is-drawer-close:hidden font-medium">Manage Lessons</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink 
                      to='/dashboard/admin/manage-users'
                      className={({isActive}) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${isActive ? 'bg-gradient-to-r from-error to-warning text-white' : 'hover:bg-info/10'}`}
                      data-tip="Manage Users"
                    >
                      <FaEye className="text-lg group-hover:scale-110 transition-transform" />
                      <span className="is-drawer-close:hidden font-medium">Manage Users</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink 
                      to='/dashboard/admin/reported-lessons'
                      className={({isActive}) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${isActive ? 'bg-gradient-to-r from-error to-warning text-white' : 'hover:bg-error/10'}`}
                      data-tip="Reported Lessons"
                    >
                      <MdOutlineReport className="text-lg group-hover:scale-110 transition-transform" />
                      <span className="is-drawer-close:hidden font-medium">Reported Lessons</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink 
                      to='/dashboard/admin/profile'
                      className={({isActive}) => `is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl transition-all duration-300 group ${isActive ? 'bg-gradient-to-r from-error to-warning text-white' : 'hover:bg-success/10'}`}
                      data-tip="Admin Profile"
                    >
                      <GrUserAdmin className="text-lg group-hover:scale-110 transition-transform" />
                      <span className="is-drawer-close:hidden font-medium">Admin Profile</span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {/* Footer Section */}
            <div className="p-4 border-t border-base-300 is-drawer-close:hidden">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4">
                <p className="text-xs font-semibold mb-1">Need Help?</p>
                <p className="text-xs text-base-content/60">Contact support for assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;