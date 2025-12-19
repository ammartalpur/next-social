import Image from 'next/image';
import React from 'react'

const Comments = () => {
  return (
    <div>
      <div id="write" className="flex items-center gap-4">
        <Image
          src={
            "https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
          }
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
          <input
            type="text"
            placeholder="Write a comment ..."
            className="bg-transparent outline-none flex-1"
          />
          <Image
            src={"/emoji.png"}
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div id="comments" className="">
        <div id="comment" className="flex gap-4 justify-between mt-6">
          <Image
            src={
              "https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            }
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div id="description" className="flex flex-col gap-2 flex-1">
            <span className="font-medium">Ammar</span>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere
              nostrum nesciunt aspernatur distinctio obcaecati minima temporibus
              sit soluta cupiditate doloremque. Provident a aliquam quo earum
              reprehenderit omnis corporis inventore beatae?
            </p>
            <div className="flex items-center gap-8 text-sm text-gray-500 mt-2">
              <div className="flex items-center gap-4">
                <Image
                  src={"/like.png"}
                  alt=""
                  width={12}
                  height={12}
                  className="cursor-pointer w-3 h-3"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">123 Likes</span>
              </div>
              <div className="">Reply</div>
            </div>
          </div>
          <Image
            src={"/more.png"}
            alt=""
            width={16}
            height={16}
            className="cursor-pointer w-4 h-4"
          />
        </div>
      </div>
    </div>
  );
}

export default Comments