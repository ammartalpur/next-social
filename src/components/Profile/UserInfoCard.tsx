import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserInfoCard = ({ userData }: { userData: UserData }) => {
  const createdDate = new Date(userData?.createdAt)
  const formatedDate = createdDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div id="top" className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href={"/"} className="text-blue-500 text-sm">
          See All
        </Link>
      </div>
      <div id="bottom" className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2 ">
          <span className="text-xl text-black">{userData?.username}</span>
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
            <span>Joined { formatedDate}</span>
          </div>
        </div>
        <button className="bg-blue-500 text-white text-sm rounded-md p-2 ">
          Follow
        </button>
        <span className="text-red-400 self-end text-xs cursor-pointer ">
          Block User
        </span>
      </div>
    </div>
  );
};

export default UserInfoCard;
