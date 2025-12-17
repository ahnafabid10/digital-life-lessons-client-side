import React from 'react';
import { Link, NavLink } from 'react-router';
import { useAuth } from '../../Hooks/useAuth';

const NavBar = () => {

  const {user, logOut} = useAuth();

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
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/publicLessons'>Public Lessons</NavLink>
    <NavLink to='/pricing'>Pricing</NavLink>

  {
    user && <>
    <NavLink to='/dashboard/my-lessons'>My Lessons</NavLink>
    <NavLink to='/dashboard/add-lesson'>Add Lesson </NavLink>
    </>
  }

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
    
  <div className="dropdown dropdown-end">
    <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full cursor-pointer" tabIndex={0}/>
    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow">
      <li className="px-2 py-1 font-semibold"> {user.displayName}</li>
    <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><button onClick={handleLogOut} className="btn btn-primary mt-2">Log Out</button></li>
    </ul>
  </div>

  : 

 <Link to="/login" className="btn btn-outline">Login</Link>
    }

    
  </div>
</div>
        </div>
    );
};

export default NavBar;