"use client"

import { addStory } from '@/app/actions/UserAction';
import { useUser } from '@clerk/nextjs';
import { Story, User } from '@prisma/client';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, { useState } from 'react'

type storyWithUser = Story & {user:User}

const StoryList = ({
  stories,
  userId,
}: {
  stories: storyWithUser[];
  userId: string;
}) => {
  const { user , isLoaded} = useUser()
  const [Img, setImg] = useState<any>();

  // Always use the stories prop for display, fallback to empty array
  const displayStories = Array.isArray(stories) ? stories : [];

  const add = async (formData: FormData) => {
    if (!Img?.secure_url) return;
    try {
      if (userId) {
        await addStory(Img.secure_url, userId);
        setImg(null);
        // Optionally: trigger a refresh in parent or reload page
        // location.reload();
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset="social"
        onSuccess={(result, { widget }) => {
          setImg(result.info);
          widget.close();
        }}
      >
        {({ open }) => (
          <div className="flex flex-col items-center gap-2 cursor-pointer relative">
            <Image
              src={user?.imageUrl || "/noAvatar.png"}
              alt=""
              width={80}
              height={80}
              className="w-20 h-20 rounded-full ring-2 object-cover"
              onClick={() => open()}
            />
            {Img ? (
              <form action={add}>
                <button className="text-xs bg-blue-500 p-1 rounded-md text-white">
                  set
                </button>
              </form>
            ) : (
              <span className="font-medium">Add a story</span>
            )}
            <div className="absolute text-6xl text-gray-200 top-1">+</div>
          </div>
        )}
      </CldUploadWidget>{" "}
      {displayStories.length === 0 ? (
        <div className="text-gray-400">No stories found.</div>
      ) : (
        displayStories.map((story) => (
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            key={story.id}
          >
            <Image
              src={story.img || "/noAvatar.png"}
              alt=""
              width={80}
              height={80}
              className="w-20 h-20 rounded-full ring-2 object-cover"
            />
            <span className="font-medium">{story.user.name}</span>
          </div>
        ))
      )}
    </>
  );
};

export default StoryList