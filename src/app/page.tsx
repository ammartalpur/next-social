"use client"

import Feed from "@/components/MainMenu/Feed";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import AddPost from "@/components/MainMenu/AddPost";
import Stories from "@/components/MainMenu/Stories";
import React, { useState } from "react";


const Homepage = () => {
  const [refreshFeed, setRefreshFeed] = useState(0);

  const handlePostAdded = () => {
    setRefreshFeed((prev) => prev + 1);
  };

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPost onPostAdded={handlePostAdded} />
          <Feed refresh={refreshFeed} />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu userData={null} />
      </div>
    </div>
  );
};

export default Homepage