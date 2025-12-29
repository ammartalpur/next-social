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