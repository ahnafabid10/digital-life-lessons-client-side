import React from 'react';
import { Link, NavLink } from 'react-router';
import { useAuth } from '../../Hooks/useAuth';

const NavBar = () => {

  const {user, logout} = useAuth();

  const handleLogOut = ()=>{
    logout()
    .then(res=>{
      console.log(res.data)
    })
    .catch(error=>{
      console.log(error)
    })
  }

    const links = <>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/dashboard/add-lesson'>Add Lesson </NavLink>
    <NavLink to='/dashboard/my-lessons'>My Lessons</NavLink>
    <NavLink to='/publicLessons'>Public Lessons</NavLink>
    <NavLink to='/pricing'>Pricing</NavLink>
    </>

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn-ghost  lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {
            links
        }
      </ul>
    </div>
    <a className="btn btn-ghost text-lg md:text-xl">Digital Life Lessons</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal gap-5 px-1">
        {
            links
        }
    </ul>
  </div>
  <div className="navbar-end">
    {
      user 
      ? 
      <button onClick={handleLogOut} className="btn">Log Out</button> 
      :
      <Link to='/login' className="btn">Login</Link>
    }
    
  </div>
</div>
        </div>
    );
};

export default NavBar;