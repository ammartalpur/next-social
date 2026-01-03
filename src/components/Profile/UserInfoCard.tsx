import { followReqRes, followRes, getBlocked } from "@/app/actions/User";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";
import { currentUser } from "@clerk/nextjs/server";

const UserInfoCard = ({ userData, onUpdate }: { userData: UserData; onUpdate?: () => void }) => {
  const [isUserBlocked, setIsUserBlocked] = useState(false);
  const [isFollowing , setisFollowing] = useState(false);
  const [isFollowingSent, setisFollowingSent] = useState(false);

  const { user: currentUser, isLoaded } = useUser();

  useEffect(() => {
    const check = async () => {
      if (isLoaded && currentUser?.id) {
        const blockResponse = await getBlocked(currentUser.id, userData?.id);
        if (blockResponse) {
          setIsUserBlocked(true);
        } else {
          setIsUserBlocked(false);
        }

        const followResponse = await followRes(currentUser.id, userData?.id);
        if (followResponse) {
          setisFollowing(true);
        } else {
          setisFollowing(false);
        }

        const followReqResponse = await followReqRes(currentUser.id, userData?.id);
        if (followReqResponse) {
          setisFollowingSent(true);
        } else {
          setisFollowingSent(false);
        }
      }
    };
    check();

    
  }, [isLoaded, currentUser, userData?.id]);

  const createdDate = new Date(userData?.createdAt);
  const formatedDate = createdDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div id="top" className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Media</span>
        {currentUser?.id === userData?.id ? (
          <UpdateUser user={userData} onUpdate={onUpdate} />
        ) : (
          <Link href={"/"} className="text-blue-500 text-sm">
            See All
          </Link>
        )}
      </div>
      <div id="bottom" className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2 ">
          <span className="text-xl text-black">{`${userData?.name} ${userData?.surname}`}</span>
          <span className="text-sm">@{userData?.username.toLowerCase()}</span>
        </div>
        {userData?.description && <p>{userData?.description}</p>}
        {userData?.city && (
          <div className="flex items-center gap-2">
            <Image src={"/map.png"} alt="map icon" width={16} height={16} />
            <span>
              Living in <b>{userData?.city}</b>
            </span>
          </div>
        )}
        {userData?.school && (
          <div className="flex items-center gap-2">
            <Image
              src={"/school.png"}
              alt="school icon"
              width={16}
              height={16}
            />
            <span>Went to {userData?.school}</span>
          </div>
        )}
        {userData?.work && (
          <div className="flex items-center gap-2">
            <Image src={"/work.png"} alt="work icon" width={16} height={16} />
            <span>Work at {userData?.work}</span>
          </div>
        )}
        <div className="flex items-center justify-between ">
          {userData?.website && (
            <div className="flex gap-1 items-center">
              <Image src={"/link.png"} alt="link icon" width={16} height={16} />
              <Link
                href={userData?.website}
                className="text-blue-500 font-medium"
              >
                {userData?.website}
              </Link>
            </div>
          )}
          <div className="flex gap-1 items-center">
            <Image src={"/date.png"} alt="link icon" width={16} height={16} />
            <span>Joined {formatedDate}</span>
          </div>
        </div>
        {currentUser?.id && currentUser?.id != userData?.id && (
          <UserInfoCardInteraction
            userId={userData?.id}
            currentUserId={currentUser?.id}
            isFollowing={isFollowing}
            isFollowingSent={isFollowingSent}
            isUserBlocked={isUserBlocked}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
