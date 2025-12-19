import Image from 'next/image';
import React from 'react'

const Stories = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-x-auto md:overflow-x-scroll  text-xs">
      <div className="flex gap-8 w-max">
        {/* stories */}
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">Ammar</span>
        </div>


         
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">Ammar</span>
        </div>


         
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">Ammar</span>
        </div>


         
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">Ammar</span>
        </div>


         
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">Ammar</span>
        </div>



        
        <div className="flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">Ammar</span>
        </div>
      </div>
    </div>
  );
}

export default Stories