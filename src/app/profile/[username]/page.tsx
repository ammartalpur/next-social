"use client"
import LeftMenu from '@/components/LeftMenu';
import Feed from '@/components/MainMenu/Feed';
import RightMenu from '@/components/RightMenu';
import React, { useEffect, useState } from 'react'
import { useParams , notFound as nof} from 'next/navigation';
import Image from 'next/image';
import { getUserByUsername ,  getBlocked} from '@/app/actions/User';
import { useUser } from '@clerk/nextjs';
import Loading from '@/components/Loading';


const ProfilePage = (): React.ReactNode => {

  const params = useParams()
  const username = params.username as string;
  const { user: currentUser, isLoaded: currentUserIsLoading } = useUser();



  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading , setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  useEffect(() => {
    const checkBlocked = async () => {
      if (currentUser?.id) {
        try {
          const res = await getBlocked(username, currentUser.id);
          setIsBlocked(!!res);
        } catch (err) {
          setIsBlocked(false);
        }
      } else {
        setIsBlocked(false);
      }
    };
    checkBlocked();
  }, [currentUserIsLoading, currentUser?.id, username]);


 useEffect(() => {
   if (!username) return;

   setLoading(true);
   setNotFound(false);

   const fetchUserData = async () => {
     try {
       const userdata = await getUserByUsername(username);

       if (userdata) {
         setUserData(userdata);
         setNotFound(false);
       } else {
         setUserData(null);
         setNotFound(true); 
       }
     } catch (err) {
       console.error(err);
       setUserData(null);
       setNotFound(true);
     } finally {
       setLoading(false);
     }
   };

   fetchUserData();
 }, [username]);

 if (loading) return <Loading />;
 if (notFound || isBlocked) return nof();
 console.log("proile wala" , userData?.avatar)
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image
                src={userData?.avatar || "/noCover.png"}
                alt="banner"
                fill
                className="rounded-md object-cover"
              />
              <Image
                src={userData?.avatar || "/noAvatar.png"}
                alt="profile"
                width={128}
                height={128}
                className=" w-32 h-32 rounded-full absolute left-1/2 -translate-x-1/2 -bottom-16 ring-4 ring-white object-cover z-10"
              />
            </div>

            <h1 className="mt-20 mb-4 text-2xl font-medium">
              {userData?.name && userData?.surname
                ? userData?.name + " " + userData?.surname
                : userData?.username}
            </h1>
            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center ">
                <span className="font-medium ">{userData?._count?.posts}</span>
                <span className="text-sm ">Posts</span>
              </div>

              <div className="flex flex-col items-center ">
                <span className="font-medium ">
                  {userData?._count?.following}
                </span>
                <span className="text-sm ">Followers</span>
              </div>

              <div className="flex flex-col items-center ">
                <span className="font-medium ">
                  {userData?._count?.follower}
                </span>
                <span className="text-sm ">Following</span>
              </div>
            </div>
          </div>
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        {!userData ? <p>Loading</p> : <RightMenu userData={userData} />}
      </div>
    </div>
  );
}
// 2:55:18
export default ProfilePage