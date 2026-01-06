export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import prisma from "@/lib/client";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;

    if (eventType === "user.created") {
      const fallbackName = `${evt.data.first_name || ""}${
        evt.data.last_name || ""
      }`;
      const username = evt.data.username || fallbackName || evt.data.id;

      const exists = await prisma.user.findUnique({
        where: { username },
      });

      if (exists) {
        return new Response("User already exists", { status: 200 });
      }

      await prisma.user.create({
        data: {
          id: evt.data.id,
          username,
          avatar: evt.data.image_url || "/noAvatar.png",
          cover: "/noCover.png",
        },
      });

      return new Response("User created", { status: 200 });
    }

    if (eventType === "user.updated") {
      await prisma.user.update({
        where: { id: evt.data.id },
        data: {
          username:
            evt.data.username ||
            `${evt.data.first_name || ""}${evt.data.last_name || ""}` ||
            "Nothing",
          avatar: evt.data.image_url || "/noAvatar.png",
        },
      });

      return new Response("User updated", { status: 200 });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Webhook error", { status: 400 });
  }
}
