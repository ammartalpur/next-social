import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getUserFriendRequest } from "@/app/actions/UserAction";
import { FollowRequest, User } from '@prisma/client';

type TypeFriendRequest = FollowRequest & {
  sender: User
}

const FriendRequest = () => {
  const { user, isLoaded } = useUser();
  const [UserFriendReq, setUserFriendReq] = useState<TypeFriendRequest[]>([]);
  
  useEffect(() => {
    const fetchFriendRequests = async () => {
      if (user?.id) {
        const requests = await getUserFriendRequest(user.id);
        setUserFriendReq(requests || []);
      }
    };
    fetchFriendRequests();
    
  }, [user?.id])
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div id="top" className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Request</span>
        <Link href={"/"} className="text-blue-500 text-sm">
          See All
        </Link>
      </div>

    {UserFriendReq.map(request => (
      <div key={request.id} id="user" className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={request.sender.avatar || "/noAvatar.png"}
            alt={request.sender.username || "friend req icon"}
            className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
          />
          <span className="font-semibold ">{request.sender.username}</span>
        </div>
        <div className="flex gap-3 justify-end">
          <Image
            src={"/accept.png"}
            alt="accept friend req icon"
            className="cursor-pointer"
            width={20}
            height={20}
          />
          <Image
            src={"/reject.png"}
            alt="reject friend req icon"
            className="cursor-pointer"
            width={20}
            height={20}
          />
        </div>
      </div>
    ))}
      </div>
  );
}

export default FriendRequest