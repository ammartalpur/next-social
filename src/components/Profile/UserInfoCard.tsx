import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserInfoCard = ({ userId }: { userId: string }) => {
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
          <span className="text-xl text-black">Ammar</span>
          <span className="text-sm">@ammar</span>
        </div>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
          unde modi ad nisi sit quaerat rem a amet eveniet dolorem quia hic, nam
          velit earum qui facilis ratione, doloribus maiores!
        </p>
        <div className="flex items-center gap-2">
          <Image src={"/map.png"} alt="map icon" width={16} height={16} />
          <span>
            Living in <b>Hyderabad</b>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Image src={"/school.png"} alt="school icon" width={16} height={16} />
          <span>Went to School</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src={"/work.png"} alt="work icon" width={16} height={16} />
          <span>Work at Apple</span>
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex gap-1 items-center">
            <Image src={"/link.png"} alt="link icon" width={16} height={16} />
            <Link href={"google.com"} className="text-blue-500 font-medium">
              lama.dev
            </Link>
          </div>
          <div className="flex gap-1 items-center">
            <Image src={"/date.png"} alt="link icon" width={16} height={16} />
            <span>Joined November 2024</span>
          </div>
        </div>
        <button className="bg-blue-500 text-white text-sm rounded-md p-2 ">Follow</button>
        <span className="text-red-400 self-end text-xs cursor-pointer ">
          Block User
        </span>
      </div>
    </div>
  );
};

export default UserInfoCard;
