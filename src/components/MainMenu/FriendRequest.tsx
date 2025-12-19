import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FriendRequest = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div id="top" className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Request</span>
        <Link href={"/"} className="text-blue-500 text-sm">
          See All
        </Link>
      </div>
      <div id="user" className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={
              "https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            }
            alt="friend req icon"
            className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
          />
          <span className="font-semibold ">Ammar Tapur</span>
        </div>
        <div className="flex gap-3 justify-end">
          <Image
            src={"/accept.png"}
            alt="friend req icon"
            className="cursor-pointer"
            width={20}
            height={20}
          />

          <Image
            src={"/reject.png"}
            alt="friend req icon"
            className="cursor-pointer"
            width={20}
            height={20}
          />
        </div>
      </div>

      <div id="user" className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={
              "https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            }
            alt="friend req icon"
            className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
          />
          <span className="font-semibold ">Ammar Tapur</span>
        </div>
        <div className="flex gap-3 justify-end">
          <Image
            src={"/accept.png"}
            alt="friend req icon"
            className="cursor-pointer"
            width={20}
            height={20}
          />

          <Image
            src={"/reject.png"}
            alt="friend req icon"
            className="cursor-pointer"
            width={20}
            height={20}
          />
        </div>
      </div>

      <div id="user" className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={
              "https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            }
            alt="friend req icon"
            className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
          />
          <span className="font-semibold ">Ammar Tapur</span>
        </div>
        <div className="flex gap-3 justify-end">
          <Image
            src={"/accept.png"}
            alt="friend req icon"
            className="cursor-pointer"
            width={20}
            height={20}
          />

          <Image
            src={"/reject.png"}
            alt="friend req icon"
            className="cursor-pointer"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
}

export default FriendRequest