import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const UserMediaCard = ({userId}:{userId:string}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div id="top" className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href={"/"} className="text-blue-500 text-sm">
          See All
        </Link>
      </div>
      <div id="bottom" className="flex gap-4 justify-between flex-wrap">
        <div className="relative w-1/5 h-24">
          <Image
            src={
              "https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            }
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src={
              "https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            }
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src={
              "https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            }
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src={
              "https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            }
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src={
              "https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            }
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src={
              "https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            }
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default UserMediaCard