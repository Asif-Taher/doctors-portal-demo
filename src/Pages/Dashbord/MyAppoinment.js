import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

export default function MyAppoinment() {
  const [appointments, setAppointments] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      fetch(`http://localhost:5000/booking?patient=${user.email}`,{
        method: 'GET',
        headers:{
          'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then(res =>{
        console.log('res', res);
        if(res.status === 401 || res.status === 403){
          signOut(auth);
        localStorage.removeItem('accessToken'); 
          navigate('/');
        }
        return res.json()

      })
      .then(data => {
        setAppointments(data)
      });
    }
    },[user])
  return (
    <div class="overflow-x-auto">
  <table class="table">
    {/* <!-- head --> */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Date</th>
        <th>Time</th>
        <th>Treatment</th>
      </tr>
    </thead>
    <tbody>
{
  appointments.map((a,index)=>
    <tr>
    <th>{index + 1}</th>
    <td>{a.name}</td>
    <td>{a.patient}</td>
    <td>{a.slot}</td>
    <td>{a.treatment}</td>
  </tr>
  )
}     
    </tbody>
  </table>
</div>
  )
}
