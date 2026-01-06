import { getStories } from '@/app/actions/User';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import StoryList from './StoryList';

const Stories = () => {
  const {userId , isLoaded} = useAuth()
  const [stories, setStories] = useState<any>();
  useEffect(() => {
    if (userId) {
      const getStoriesFromBackend = async (userId: string) => {
        const result = await getStories(userId);
        setStories(result);
      };
      getStoriesFromBackend(userId);
    }
  }, [userId]);
  
  if (!userId) {
    return null
  }
  if (!isLoaded) {
    return <div>Loading...</div>
  }
  
  return (
  
    <div className="p-4 bg-white rounded-lg shadow-md overflow-x-auto md:overflow-x-scroll  text-xs">
      <div className="flex gap-8 w-max">
        {/* stories */}
        {userId && 
        <StoryList stories={stories} userId={userId} />}


         
      </div>
    </div>
  );
}

export default Stories