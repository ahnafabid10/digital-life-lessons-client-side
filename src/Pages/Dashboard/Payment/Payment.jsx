import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingPage from '../../LoadingPage/LoadingPage';

const Payment = () => {
    const {userId} = useParams()
    const axiosSecure = useAxiosSecure()

    const {isLoading, data: users=[]} = useQuery({
        queryKey: ['users', userId],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users?id=${userId}`)
            return res.data
        }
    })

    if(isLoading){
        return <LoadingPage></LoadingPage>
    }

    const handlePayment =async ()=>{
        const paymentInfo = {
            cost: 1500,
            userId: users[0]._id,
            buyerEmail: users[0].email,
            name: users[0].name,
            // isPremium: true
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        console.log(res.data)
        window.location.href = res.data.url;
    }

    return (
        <div  className='min-h-screen flex flex-col items-center justify-center'>
            please pay 1500tk for Premium Vibe 
            <button onClick={handlePayment} className='btn btn-primary mt-4'>Pay Now</button>
        </div>
    );
};

export default Payment;
