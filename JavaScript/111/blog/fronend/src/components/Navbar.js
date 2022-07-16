import SwapThemes from './SwapThemes';
import { useUser, useUpdateUser } from '../AppContext';
import { useCookies } from 'react-cookie';
import { SERVER_PORT } from '../constants';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const user = useUser();
  const updateUser = useUpdateUser();
  const navigate = useNavigate();
  const [ ,, setCookies ] = useCookies();

  const logout = async () => {
    updateUser({});
    setCookies('user', '');
    await fetch(`http://localhost:${SERVER_PORT}/logout`, {
      method: "POST",
      credentials: "include",
      mode: 'cors',
    })
    navigate('/');
  }

  return (
    <div className='w-full'> 
      <SwapThemes />
      <div className="navbar">
          <div className='flex-1'>
            <NavLink to={'/'}>
              <span className="btn btn-ghost normal-case text-xl">Shmuel Toporowitch Blog</span>
            </NavLink>
          </div>
          {user?.authenticated && (<p>{user.firstName + ' ' + user.lastName}</p>)}
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
