import Image from 'next/image';
import React from 'react'
import Comments from './Comments';

const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between" id="user">
        <div className="flex items-center gap-4">
          <Image
            src={
              "https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            }
            alt="icon"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">Ammar</span>
        </div>
        <Image src={"/more.png"} alt="icon" width={16} height={16} />
      </div>
      <div className="flex flex-col gap-4" id="description">
        <div className="w-full min-h-96 relative">
          <Image
            src={
              "https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            }
            alt="icon"
            fill
            className="object-cover rounded-md"
          />
        </div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure harum
          atque veniam incidunt inventore laborum ipsam quod esse quos veritatis
          vero, beatae voluptatem enim modi ab qui a quisquam quis.
        </p>
      </div>
      <div
        className="flex items-center justify-between text-sm my-4"
        id="interaction"
      >
        <div className="flex gap-8">
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl ">
            <Image
              src={"/like.png"}
              alt="icon"
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123
              <span className="hidden md:inline">  Likes</span>
            </span>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl ">
            <Image
              src={"/comment.png"}
              alt="icon"
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123
              <span className="hidden md:inline">  Comments</span>
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl ">
            <Image
              src={"/share.png"}
              alt="icon"
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123
              <span className="hidden md:inline">  Share</span>
            </span>
          </div>
        </div>
      </div>
      <Comments />
    </div>
  );
}

export default Post