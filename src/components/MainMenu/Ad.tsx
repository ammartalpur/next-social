import Image from 'next/image';
import React from 'react'

const Ad = ({size}:{size:"sm"|"md"|"lg"}) => {
  return (
    <div className={`p-4 bg-white rounded-lg shadow-md text-sm ${size === 'sm' && ("mt-2")}`}>
      <div
        id="top"
        className="flex items-center justify-between text-gray-500 font-medium"
      >
        <span>Sponsored Ads</span>
        <Image src={"/more.png"} alt="more icon" width={16} height={16} />
      </div>
      <div
        id="bottom"
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          } `}
        >
          <Image
            src={
              "https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            }
            alt="advertisment"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src={
              "https://images.pexels.com/photos/13865714/pexels-photo-13865714.jpeg"
            }
            alt="advertisment"
            height={24}
            width={24}
            className="rounded-full w-6 h-6 object-cover"
          />
          <span className="text-blue-500 font-medium">BigChef Lounge</span>
        </div>
        <p className={size === "sm" ? "text-xs" : "text-sm"}>
          {size === "sm"
            ? " Lorem ipsum dolor sit amet consectetur adipisicing elit."
            : size === "md"
            ? " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum iste rem quae error expedita ratione quaerat ab distinctio alias? "
            : " Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus modi cumque delectus repudiandae voluptatum sequi facilis harum enim tenetur eum suscipit, rerum dicta dolore. Aperiam totam quisquam laboriosam molestiae asperiores. "}
        </p>
        <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">
          learn more
        </button>
      </div>
    </div>
  );
}

export default Ad