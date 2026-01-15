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
            console.log("payment", res.data)
            return res.data
        }
    })
    
    if(isLoading){
        return <LoadingPage></LoadingPage>
    }
    
    const handlePayment = async ()=>{
        const paymentInfo = {
            cost: 1500,
            userId: users[0]._id,
            buyerEmail: users[0].email,
            name: users[0].name,
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        console.log(res.data)
        window.location.href = res.data.url;
    }
    
    const features = [
        "Unlimited access to premium content",
        "Ad-free experience",
        "Priority customer support",
        "Exclusive community access",
        "Early access to new features",
        "HD quality streaming"
    ];
    
    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 p-4'>
            <div className='max-w-md w-full'>
                {/* Floating Crown Icon */}
                <div className='flex justify-center mb-6 animate-bounce'>
                    <div className='bg-gradient-to-br from-primary to-secondary p-4 rounded-full shadow-lg'>
                        <svg className='w-12 h-12 text-white' fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L15 8.5L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L9 8.5L12 2Z" />
                        </svg>
                    </div>
                </div>
                
                {/* Main Card */}
                <div className='bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-primary/20'>
                    {/* Header with gradient */}
                    <div className='bg-gradient-to-r from-primary to-secondary p-8 text-center relative overflow-hidden'>
                        <div className='absolute inset-0 opacity-20'>
                            <div className='absolute top-4 left-4 w-6 h-6 text-white animate-pulse'>✨</div>
                            <div className='absolute bottom-4 right-4 w-8 h-8 text-white animate-pulse' style={{animationDelay: '0.5s'}}>✨</div>
                            <div className='absolute top-1/2 left-1/4 w-5 h-5 text-white animate-pulse' style={{animationDelay: '0.2s'}}>⚡</div>
                        </div>
                        
                        <h1 className='text-3xl font-bold text-white mb-2 relative z-10'>
                            Premium Vibe
                        </h1>
                        <p className='text-white/90 relative z-10'>Unlock the ultimate experience</p>
                    </div>
                    
                    {/* Pricing */}
                    <div className='p-8 text-center border-b border-base-200'>
                        <div className='flex items-center justify-center gap-2 mb-2'>
                            <span className='text-5xl font-bold text-primary'>৳1,500</span>
                        </div>
                        <p className='text-base-content/60'>One-time payment</p>
                    </div>
                    
                    {/* Features List */}
                    <div className='p-8'>
                        <h3 className='font-semibold text-lg mb-4 flex items-center gap-2'>
                            <span className='text-primary text-xl'>✨</span>
                            What's included
                        </h3>
                        <ul className='space-y-3'>
                            {features.map((feature, index) => (
                                <li 
                                    key={index} 
                                    className='flex items-start gap-3 text-base-content/80'
                                    style={{
                                        animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
                                    }}
                                >
                                    <div className='bg-primary/10 rounded-full p-1 mt-0.5 flex items-center justify-center w-6 h-6'>
                                        <span className='text-primary text-sm'>✓</span>
                                    </div>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* CTA Button */}
                    <div className='p-8 pt-0'>
                        <button 
                            onClick={handlePayment} 
                            className='btn btn-primary w-full text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2'
                        >
                            <span className='text-xl'>👑</span>
                            Upgrade Now
                        </button>
                        
                        <p className='text-center text-sm text-base-content/50 mt-4'>
                            🔒 Secure payment powered by Stripe
                        </p>
                    </div>
                </div>
                
                {/* Trust Badge */}
                <div className='text-center mt-6 text-base-content/60 text-sm'>
                    <p>✓ 30-day money-back guarantee</p>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Payment;