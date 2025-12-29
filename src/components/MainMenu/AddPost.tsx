'use client'

import Image from 'next/image'
import React from 'react'

const AddPost = () => {



  return (
    <div className="flex bg-white">
      <div
        id="avatar"
        className="py-2 px-1 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm"
      >
        <Image
          src={
            "https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
          }
          alt=""
          width={48}
          height={48}
          className="w-12 h-12 object-cover rounded-full"
        />
      </div>
      <div id="post" className="flex-1 ">
        <form id="textinput" className="flex flex-row gap-4 bg-white" >
            <textarea id='posttest' 
            placeholder="whats on your mind?"
            className="flex-1 bg-slate-100 rounded-lg p-2 resize-none mt-2 ml-1"
            name='desc'
            
            required
            ></textarea>

          <Image
            src={"/emoji.png"}
            alt=""
            width={20}
            height={20}
            className="w-5 h-5 cursor-pointer self-end"
          />
          <button type="submit" >Submit</button>
        </form>
        <div
          id="postoptions"
          className="flex bg-white items-center gap-4 mt-4 text-gray-500 flex-wrap"
        >
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src={"/addimage.png"}
              alt="Add Photo Icon"
              height={20}
              width={20}
            />
            Photo
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src={"/addimage.png"}
              alt="Add Photo Icon"
              height={20}
              width={20}
            />
            Image
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src={"/addVideo.png"}
              alt="Add Photo Icon"
              height={20}
              width={20}
            />
            Video
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src={"/addevent.png"}
              alt="Add Photo Icon"
              height={20}
              width={20}
            />
            Event
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src={"/poll.png"}
              alt="Add Photo Icon"
              height={20}
              width={20}
            />
            Poll
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost