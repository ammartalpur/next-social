"use server";

import prisma from "@/lib/client";

export async function getBlockedUserById(blockerId: string , blockedId:string) {
  return prisma.block.findFirst({
    where: { blockerId, blockedId },
  });
}