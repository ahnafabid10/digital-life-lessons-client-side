import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useAuth } from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {

    const {user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data: payments = []}=useQuery({
        queryKey: ['payments', user.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })


    return (
        <div>
            <div className="h2-text-5xl">Payment History: {payments.length}</div>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Amount</th>
        <th>Transaction Id</th>
        <th>Paid At</th>
      </tr>
    </thead>
    <tbody>
      {
        payments.map((payment, index)=><tr key={payment._id}>
        <th>{index+1}</th>
        <td>{payment.name}</td>
        <td>৳{payment.amount}</td>
        <td>{payment.transactionId}</td>
        <td>{payment.paidAt}</td>
      </tr>)
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default PaymentHistory;