"use client";

import { SwitchBlock, SwitchFollower} from '@/app/actions/UserAction';
import React, {  useEffect, useOptimistic, useState } from 'react'

const UserInfoCardInteraction = ({
  userId,
  currentUserId,
  isUserBlocked,
  isFollowing,
  isFollowingSent
}: {
  userId: string;
    currentUserId: string | undefined;
    isUserBlocked: boolean
    isFollowing: boolean;
    isFollowingSent: boolean
  }) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent 
  })

  useEffect(() => {
    setUserState({
      following: isFollowing,
      blocked: isUserBlocked,
      followingRequestSent: isFollowingSent,
    });
  }, [isFollowing, isFollowingSent, isUserBlocked]);

  const nextFollowState = (state: typeof userState) => {
    if (state.following) {
      return { ...state, following: false };
    }

    if (state.followingRequestSent) {
      return { ...state, followingRequestSent: false };
    }

    return { ...state, followingRequestSent: true };
  };

  const follow = async () => {
    switchOptimisticState("follow");
    try {
      if (currentUserId) {
        await SwitchFollower(userId, currentUserId);
      }
      setUserState(prev => nextFollowState(prev));
    } catch (error) {
      console.error("Follow error", error);
    }
  } 

  const block = async () => {
    switchOptimisticState("block");
    try {
      await SwitchBlock(userId , currentUserId)
      setUserState(prev => ({
        ...prev,blocked: !prev.blocked
      }))
    } catch (error) {
      console.error("Block error", error);
    }
  }
  
  const [OptimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state , value: "follow" | "block") => value ==="follow" ? nextFollowState(state) : {...state , blocked: !state.blocked}
  );
  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2 ">
          {OptimisticState.following
            ? "Following"
            : OptimisticState.followingRequestSent
            ? "Follow Request Sent"
            : "Follow"}
        </button>
      </form>

      <form action={block} className="self-end">
        <button>

        <span className="text-red-400  text-xs cursor-pointer ">
          {OptimisticState.blocked ? "Unblock User" : "Block User"}
        </span>
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction