import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import useAdmin from '../../hook/useAdmin'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
export default function Dashbord() {

  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  return (
<div class="drawer gap-2 drawer-mobile">
  <input id="dashbord-sidebar" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content s">
    <h2 className='text-3xl font-bold text-purple-500'>Welcome to your Dashbord</h2>
    <Outlet></Outlet>
  </div>
  <div class="drawer-side">
    <label for="dashbord-sidebar" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* <!-- Sidebar content here --> */}
      <li><Link to='/dashbord'>My Appointment</Link></li>
      <li><Link to='/dashbord/review'>My Review</Link></li>
      <li><Link to='/dashbord/histry'>My Histry</Link></li>
      {admin && <li><Link to='/dashbord/users'>All user</Link></li>}
    </ul>
  </div>
</div>
  )
}
