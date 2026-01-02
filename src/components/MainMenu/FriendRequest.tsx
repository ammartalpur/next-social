import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useOptimistic, useState } from 'react'
import { acceptFollowRequest, declineFollowRequest, getUserFriendRequest } from "@/app/actions/UserAction";
import { FollowRequest, User } from '@prisma/client';

type TypeFriendRequest = FollowRequest & {
  sender: User
}

const FriendRequest = () => {
  
  const { user, isLoaded } = useUser();
  const [UserFriendReq, setUserFriendReq] = useState<TypeFriendRequest[]>([]);
  const [optimisticRequests, setOptimisticRequests] = useOptimistic<TypeFriendRequest[]>(UserFriendReq);
  
  useEffect(() => {
    const fetchFriendRequests = async () => {
      if (user?.id) {
        const requests = await getUserFriendRequest(user.id);
        setUserFriendReq(requests || []);
      }
    };
    fetchFriendRequests();
    
  }, [user?.id])

  const accept = async (request: TypeFriendRequest) => {
    if (!user?.id || !isLoaded) return;
    setOptimisticRequests((prev) => prev.filter((r) => r.id !== request.id));
    setUserFriendReq((prev) => prev.filter((r) => r.id !== request.id));
    try {
      await acceptFollowRequest(request.senderId.toString(), user.id);
    } catch (error) {
      setUserFriendReq((prev) => {
        const exists = prev.some((r) => r.id === request.id);
        return exists ? prev : [request, ...prev];
      });
    }
  }

  const decline = async (request: TypeFriendRequest) => {
    if (!user?.id || !isLoaded) return;
    setOptimisticRequests((prev) => prev.filter((r) => r.id !== request.id));
    setUserFriendReq((prev) => prev.filter((r) => r.id !== request.id));
    try {
      await declineFollowRequest(request.senderId.toString(), user.id);
    } catch (error) {
      setUserFriendReq((prev) => {
        const exists = prev.some((r) => r.id === request.id);
        return exists ? prev : [request, ...prev];
      });
    }
  }


  
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div id="top" className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Request</span>
        <Link href={"/"} className="text-blue-500 text-sm">
          See All
        </Link>
      </div>

    {optimisticRequests.map(request => (
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
            onClick={() => accept(request)}
          />
          <Image
            src={"/reject.png"}
            alt="reject friend req icon"
            className="cursor-pointer"
            width={20}
            height={20}
            onClick={() => decline(request)}
          />
        </div>
      </div>
    ))}
      </div>
  );
}

export default FriendRequest