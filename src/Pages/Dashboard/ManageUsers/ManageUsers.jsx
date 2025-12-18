import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';

const ManageUsers = () => {

    const axiosSecure = useAxiosSecure()

    const {refetch, data: users = {}
    } = useQuery({
        queryKey: ['users'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const handleMakeAdmin = user =>{
        const roleInfo = { role: 'admin'}
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
        .then(res=>{
            console.log(res.data)
            if(res.data.modifiedCount){
                refetch()
                Swal.fire({
  position: "top-end",
  icon: "success",
  title: `${user.name}User marked as Admin`,
  showConfirmButton: false,
  timer: 1500
});
            }
        })
    }

    const handleRemoveAdmin = user =>{
         Swal.fire({
  title: "Are you sure?",
  text: `Do you want to make this user a ${user.role}?`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
})
.then((result) => {
  if (result.isConfirmed) {
        const roleInfo = { role: 'user'}
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
        .then(res=>{ 
            if(res.data.modifiedCount){
               
         refetch()
    Swal.fire({
      title: "Deleted!",
      text: `User role updated to ${user.role}.`,
      icon: "success"
    });
  }
});
            }
    })
    }
    
    return (
        <div>
            <h2 className="text-2xl text-center font-bold p-3">Total Users:{users.length}</h2>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Total Lessons</th>
        <th>Role</th>
        <th>Admin Action</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user, index)=>
            <tr key={user._id}>
        <th>{index + 1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>5</td>
        <td>{typeof user.role === 'string' ? user.role : user.role?.role}</td>
        <td>
            {
            user.role === 'admin' 
            ? 
            <button onClick={()=>handleRemoveAdmin(user)} className='btn bg-red-300'><FiShieldOff />
            </button> 
            : 
            <button
            onClick={()=> handleMakeAdmin(user)}
            className='btn bg-green-500'><FaUserShield />
            </button>
            }
            
            
        </td>
      </tr>
        )
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ManageUsers;