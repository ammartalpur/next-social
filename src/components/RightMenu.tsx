"use client"
import React from 'react'
import FriendRequest from './MainMenu/FriendRequest'
import Birthdays from './MainMenu/Birthdays';
import Ad from './MainMenu/Ad';
import UserInfoCard from './Profile/UserInfoCard';
import UserMediaCard from './Profile/UserMediaCard';
import { Suspense } from 'react'



const RightMenu = ({userData}:{userData:UserData | null}) => {

  
  return (
    <div className="flex flex-col gap-6">
      {userData ? (
        <>
          <Suspense fallback="loading...">
            <UserInfoCard userData={userData} />
          </Suspense>
          <Suspense fallback="loading...">
            <UserMediaCard userData={userData} />
          </Suspense>
        </>
      ) : null}

      <FriendRequest />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
}

export default RightMenu