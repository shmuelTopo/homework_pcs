import React from 'react'
import SwapThemes from './SwapThemes';
import { useUser, useUpdateUser } from '../UserContext';
import { useCookies } from 'react-cookie'
export default function Navbar() {
  const user = useUser();
  const updateUser = useUpdateUser();
  const [ cookies, setCookies ] = useCookies();

  const logout = async () => {
    updateUser({});
    setCookies('user', '');
    await fetch("http://localhost:3000/logout", {
      method: "POST"
    })
  }

  return (
    <div className='w-full'> 
      <SwapThemes />
      <div className="navbar">
          <div className='flex-1'>
            <a href='/' class="btn btn-ghost normal-case text-xl">Shmuel Toporowitch Blog</a>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt='profile-pic' src="./images/no-user.jpg" />
              </div>
            </label>
            <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {!user?.authenticated && (
                <>
                  <li><a href='signup'>Sign Up</a></li>
                  <li><a href='login'>Login</a></li>
                </>
              )}
              {user?.authenticated && (
                  <li><button onClick={logout}>Logout</button></li>
              )}
            </ul>
        </div>
      </div>
      <div className="w-100 m-2 bg-accent h-1 round-lg" />

    </div>
  )
}
