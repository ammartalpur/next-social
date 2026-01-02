// src/app/actions/getUser.ts
"use server";

import prisma from "@/lib/client";

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