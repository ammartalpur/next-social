"use server"

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { error } from "console";
import { revalidatePath } from "next/cache";
import z from "zod";

export const SwitchFollower = async (userId: string, currentUserId: string | undefined) => {

  if (!currentUserId) {
    throw new Error("You must be logged in to follow users");
  }

  // if (userId === currentUserId) {
  //   throw new Error("You cannot follow yourself");
  // }
  
  try {
    const currentUser = await prisma.user.findFirst({
      where: { id: currentUserId }
    });
    
    if (!currentUser) {
      throw new Error("Current user not found in database");
    }

    const userToFollow = await prisma.user.findFirst({
      where: { id: userId },
    });
    if (!userToFollow) {
      console.log("Current User:" , currentUserId)
      throw new Error("User to follow not found in database");
    }

    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });
   
    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id
        }
      })
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId
       }
      })
      
      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          }
        })
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log("ERROR:", error);
    throw new Error("Something Went Wrong");
  }
};

export const SwitchBlock = async (userId: string, currentUserId: string | undefined) => {
  console.log("UserId: " , userId)
  console.log("CurrentUserId: ", currentUserId);

  if (!currentUserId) {
   throw new Error("You must be logged in to block users");
  }

  
  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserId }
    });
    
    if (!currentUser) {
      throw new Error("Current user not found in database");
    }

    const userToBlock = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!userToBlock) {
      throw new Error("User to block not found in database");
    }

    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId
      }
    })

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id:existingBlock.id
        }
      })
    } else {
      await prisma.block.create({
        data: {
          blockedId: userId,
          blockerId: currentUserId,
        },
      });
    }
  } catch (error) {
    console.error("Error: " , error);
    throw new Error("Something Went Wrong");
  }
}


export const postWithMedia = async (userId: string) =>{
  return await prisma.post.findMany({
    where: {
      userId,
      img: {
        not: null,
      }
    },
    take: 8,
    orderBy: {
      createdAt:"desc"
    }
  })
}

export const getUserFriendRequest = async (userId: string) => {
  if (!userId) return null;

  return await prisma.followRequest.findMany({
    where: {
      receiverId: userId
    },
    include: {
      sender: true
    }
  })
}

export const acceptFollowRequest = async (userId:string , currentUserId: string) => {
  console.log("[acceptFollowRequest] Called with userId:", userId, "currentUserId:", currentUserId);
  if (!currentUserId) {
    throw new Error("User is not Authenticated!")
  }

  try {
    console.log("[acceptFollowRequest] Searching for existing follow request...");
    const existingFollowReq = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId
      }
    })
    console.log("[acceptFollowRequest] Found request:", existingFollowReq);
    if (existingFollowReq) {
      console.log("[acceptFollowRequest] Deleting follow request id:", existingFollowReq.id);
      await prisma.followRequest.delete({
        where: {
          id: existingFollowReq.id,
        }
      })
      console.log("[acceptFollowRequest] Creating follower relationship...");
      await prisma.$transaction([
        prisma.follower.create({
          data: {
            followerId: userId,
            followingId: currentUserId,
          },
        }),
        prisma.follower.create({
          data: {
            followerId: currentUserId,
            followingId: userId,
          },
        }),
      ])
      console.log("[acceptFollowRequest] Follower relationship created successfully");
    }
    
  } catch (error) {
    console.error("[acceptFollowRequest] Error: ", error)
    throw new Error("Something went wrong!")
  }

}

export const declineFollowRequest = async (
  userId: string,
  currentUserId: string
) => {
  console.log("[declineFollowRequest] Called with userId:", userId, "currentUserId:", currentUserId);
  if (!currentUserId) {
    throw new Error("User is not Authenticated!");
  }

  try {
    console.log("[declineFollowRequest] Searching for existing follow request...");
    const existingFollowReq = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });
    console.log("[declineFollowRequest] Found request:", existingFollowReq);
    if (existingFollowReq) {
      console.log("[declineFollowRequest] Deleting follow request id:", existingFollowReq.id);
      await prisma.followRequest.delete({
        where: {
          id: existingFollowReq.id,
        },
      });
      console.log("[declineFollowRequest] Follow request deleted successfully");
    }
  } catch (error) {
    console.error("[declineFollowRequest] Error: ", error);
    throw new Error("Something went wrong!");
  }
};




export const Comment = async (postId: number) => {
  return await prisma.comment.findMany({
    where: {
      postId
    },
    include: {
      users: true
    }
  })
}

export const addComment = async (postId: number, desc: string, userId: string) => {
  if (!userId) throw new Error("User is not Authenticated!");
  try {
    const createdComment = await prisma.comment.create({
      data: {
        desc,
        postId,
        users: {
          connect: { id: userId },
        },
      },
      include: {
        users: true,
      },
    });
    return createdComment;
  } catch (error) {
    console.log("Error: ", error);
    throw new Error("Something went wrong!");
  }
}


export const addPost = async (formData: FormData, img: string, userId:string) => {
  const desc = formData.get("desc") as string;
  const Desc = z.string().min(1).max(255)

  const validatedDesc = Desc.safeParse(desc)
  if (!validatedDesc.success) {
    console.log("description is not valid");
    return
  }

  try {
    await prisma.post.create({
      data: {
        desc: validatedDesc.data,
        userId,
        img
      }
    })
    revalidatePath('/')
  } catch (error) {
    console.log(error);
  }

}


export const addStory = async (
  img: string,
  userId:string
) => {
  
  try {
    const existingStory = await prisma.story.findFirst({
      where: {
        userId
      }
    })

    if (existingStory) {
      await prisma.story.delete({
        where: {
          id:existingStory.id
        }
      })
    }

    const createdStory = await prisma.story.create({
      data: {
        userId,
        img,
        expireAt: new Date(Date.now()+24*60*60*1000),
      },
      include: {
        user:true
      }
    });
    return createdStory;

  } catch (error) {
    console.log(error);
  }
};