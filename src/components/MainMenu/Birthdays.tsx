import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Birthdays = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col">
      <div id="top" className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Birthdays</span>
      </div>
      <div id="user" className="flex items-center justify-between mt-4">
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
          <button className="bg-blue-500 text-white text-sm px-2 py-1 roundem">
            Celebrate
          </button>
        </div>
      </div>

      <div
        id="upcoming"
        className="p-4 bg-slate-100 rounded-lg flex items-center gap-4"
      >
        <Image src={"/gift.png"} alt="gift icon" width={24} height={24} />
        <Link href={"/"} className="flex flex-col gap-1 text-sm">
          <span className='text-gray-700 font-semibold'>Upcoming Birthdays</span>
          <span className='text-gray-500'>See the others</span>
        </Link>
      </div>
    </div>
  );
}

export default Birthdays