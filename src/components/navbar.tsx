'use client'

import Link from 'next/link'
import React from 'react'
import MobileMenu from './MobileMenu'
import Image from 'next/image'
import { ClerkLoaded } from '@clerk/nextjs';
import { ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import Loading from './Loading'

const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between ">
      {/* left */}
      <div className="md:hidden lg:block w-[20%]">
        <Link href={"/"} className="font-bold text-xl text-blue-500">
          Socialogram
        </Link>
      </div>
      {/* center */}
      <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
        <div className="flex gap-6 text-gray-600">
          {/* Link */}
          <Link href={"/"} className="flex gap-2">
            <Image
              src="/home.png"
              alt="home"
              width={16}
              height={16}
              className="w-4 h-4 items-center"
            />
            <span>Homepage</span>
          </Link>

          <Link href={"/friends"} className="flex gap-2">
            <Image
              src="/friends.png"
              alt="Friends Icon"
              width={16}
              height={16}
              className="w-4 h-4 items-center"
            />
            <span>Friends</span>
          </Link>

          <Link href={"/stories"} className="flex gap-2">
            <Image
              src="/stories.png"
              alt="Stories Icon"
              width={16}
              height={16}
              className="w-4 h-4 items-center"
            />
            <span>Stories</span>
          </Link>
        </div>
        <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl ">
          <input type="text" placeholder='search...' className='bg-transparent outline-none ' />
          <Image src="/search.png" alt="" width={14} height={14} />
        </div>
      </div>
      {/* right */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <ClerkLoading>
          <Loading />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className="cursor-pointer">
              <Image src="/people.png" alt="People logo" width={24} height={24} />
            </div>
            <div className="cursor-pointer">
              <Image src="/messages.png" alt="Message Logo" width={20} height={20} />
            </div>
            <div className="cursor-pointer">
              <Image src="/notifications.png" alt="Notifications Logo" width={20} height={20} />
            </div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-2 text-sm">
              <Image src="/noAvatar.png" alt="Logo" width={20} height={20} />
              <Link href={'/sign-in'}>Login/Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobileMenu />
      </div>
    </div>
  );
}

export default Navbar