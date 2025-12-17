import React from 'react';
import { useAuth } from '../../Hooks/useAuth';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center ">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="bg-gradient-to-r from-primary to-secondary text-white py-6 rounded-t-2xl">
                    <h2 className="text-3xl font-bold text-center">Your Profile</h2>
                </div>
          <div className="card-body items-center text-center -mt-10">
            <div className="avatar">
             <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="" />
                            ) : (
                                <div className="avatar">
  <div className="rounded-full">
    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
  </div>
</div>
                            )}
                        </div>
                    </div>

                    <h3 className="text-2xl font-semibold mt-4">{user.displayName || 'Name Harai gese😭'}
                    </h3>

                    <div className="space-y-4 mt-6 w-full">
                        <div className="flex items-center gap-3 justify-center">
                            <FaRegUserCircle className='h-[24px] w-[24px]'/>
                            <p className="text-lg">{user.displayName || 'name mone nai'}</p>
                        </div>

                        <div className="flex items-center gap-3 justify-center">
                            <MdEmail className='h-[24px] w-[24px]'></MdEmail>
                            <p className="text-lg">{user.email || 'email ki jani disilam'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;