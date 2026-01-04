import Image from 'next/image';
import React from 'react'
import Comments from './Comments';
import { Post as PrismaPost, User } from "@prisma/client";

type PostType = PrismaPost & {
  user: User;
  likes: { userId: string }[];
  _count: { comments: number };
};


const Post = ({ posts }: { posts:PostType }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between" id="user">
        <div className="flex items-center gap-4">
          <Image
            src={
              posts.user.avatar || "/noAvatar.png"
            }
            alt="icon"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">{ (posts.user.name && posts.user.name) ? posts.user.name + " " + posts.user.surname : posts.user.username}</span>
        </div>
        <Image src={"/more.png"} alt="icon" width={16} height={16} />
      </div>
      <div className="flex flex-col gap-4" id="description">
        {posts.img && <div className="w-full min-h-96 relative">
          <Image
            src={
              posts.img
            }
            alt="icon"
            fill
            className="object-cover rounded-md"
          />
        </div>}
        <p>
        {posts.desc} 
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
              <span className="hidden md:inline"> Likes</span>
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
              <span className="hidden md:inline"> Comments</span>
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
              <span className="hidden md:inline"> Share</span>
            </span>
          </div>
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default Post