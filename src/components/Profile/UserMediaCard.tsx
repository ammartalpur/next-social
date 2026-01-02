import { postWithMedia } from '@/app/actions/UserAction';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface Post {
    id: number;
  desc: string;
  img: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  userId: string;
  user?: UserData;
}

const UserMediaCard = ({ userData }: { userData: UserData }) => {
  const [userPost, setuserPost] = useState<Array<Post>>([]);
  useEffect(() => {
    const getPost = async () => {
      let postFromBacked = await postWithMedia(userData?.id);
      setuserPost(postFromBacked);
    }
    getPost();
  }, [userData?.id])

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div id="top" className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href={"/"} className="text-blue-500 text-sm">
          See All
        </Link>
      </div>
      <div id="bottom" className="flex gap-4 justify-between flex-wrap">
        {userPost.length ? userPost.map(post => (
          <>
          
          
           <div className="relative w-1/5 h-24" key={post.id}>
          <Image
            src={
              post.img!
            }
            alt="Post"
            fill
            className="object-cover rounded-md"
            />
        </div>
            </>

        )):"No Media"}
        
       
        
      </div>
    </div>
  );
};

export default UserMediaCard