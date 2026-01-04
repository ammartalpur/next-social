// src/app/actions/getUser.ts
"use server";

import prisma from "@/lib/client";
import z from "zod";

export async function getUserById(userId: string) {
  return prisma.user.findFirst({
    where: { id: userId },
    include: {
      _count: {
        select: {
          follower:true
        }
      }
    }
  });
}


export async function getUserByUsername(username: string) {
  return prisma.user.findFirst({
    where: { username: username },
    include: {
      _count: {
        select: {
          follower: true,
          following: true,
          posts:true
        }
      }
    }
  });
}


export async function getBlocked(blockerId: string, blockedId: string) {
  return prisma.block.findFirst({
    where: { blockerId, blockedId },
  });
}


export async function followRes(followerId: string, followingId: string) {
  return prisma.follower.findFirst({
    where: {
      followerId , followingId
    }
  })
}

export async function followReqRes(senderId: string, receiverId: string) {
  return prisma.followRequest.findFirst({
    where: {
      senderId,
      receiverId,
    },
  });
}


export const updateProfile = async (
  prevState: { success: boolean; error: boolean },
  formData: FormData
) => {
  const userId = formData.get("userId")?.toString();
  const cover = formData.get("cover")?.toString() || "";

  if (!userId) {
    return { success: false, error: true };
  }

  const field = Object.fromEntries(formData);
  const filteredFields = Object.fromEntries(
    Object.entries(field).filter(
      ([key, value]) => key !== "userId" && key !== "cover" && value !== ""
    )
  );

  const profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  const validatedFields = profile.safeParse({ cover, ...filteredFields });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedFields.data,
    });
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};


export const fetchPost = async (userId?: string, username?: string) => {

  if (username) {
    const posts = await prisma.post.findMany({
      where: {
        user: {
          username
        }
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true
          }
        },
        _count: {
          select:{
            comments: true,
          }
        }
      },
      orderBy: {
        createdAt:"desc"
      }
    });
    return posts;
  }

  if (!username && userId) {
    const following = await prisma.follower.findMany({
      where: {
        followerId:userId
      },
      select: {
        followingId:true
      }
    });
    const followingId = following.map(f => f.followingId);

    // Include own userId in the list
    const userIds = [...followingId, userId];

    const posts = await prisma.post.findMany({
      where: {
        userId: {
          in: userIds,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  }

  // Optionally, handle the case where neither is provided
  return [];
}