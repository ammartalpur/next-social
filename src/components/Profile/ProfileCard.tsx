'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';

import { getUserById } from '@/app/actions/User';


const ProfileCard = () => {
 
 const { user, isLoaded } = useUser();


  
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (user?.id) {
      const fetchUserData = async () => {
        const userdata = await getUserById(user.id);
        setUserData(userdata);
      };
      fetchUserData();
    }
  }, [user?.id]);

  if (!isLoaded) return <p>Loading...</p>;
  if (!user) return null;
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6 mb-2">
      <div className="h-20 relative">
        <Image
          src={userData?.cover ? userData.cover : "/noAvatar.png"}
          alt="Profile Cover"
          fill
          className="rounded-md object-cover"
        />
        <Image
          src={userData?.avatar || "/noAvatar.png"}
          alt="Profile"
          width={48}
          height={48}
          className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-white z-10 "
        />
      </div>
      <div className="h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold">{(userData?.name && userData?.surname) ? userData?.name + " " + userData?.surname : userData?.username }</span>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500">
            {userData?._count?.follower || 0} followers
          </span>
        </div>
        <button className="bg-blue-500 text-white text-xs p-2 rounded-md">
          My Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;