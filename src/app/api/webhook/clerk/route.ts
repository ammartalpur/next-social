export const runtime = "nodejs";
export const dynamic = "force-dynamic";


import { NextRequest } from "next/server";
import prisma from "@/lib/client";

export async function POST(req: Request) {
  try {
    const { verifyWebhook } = await import("@clerk/nextjs/webhooks");
    // Convert to NextRequest to satisfy verifyWebhook's type requirement
    const nextReq = req instanceof NextRequest ? req : new NextRequest(req.url, req);
    const evt = await verifyWebhook(nextReq);
    const eventType = evt.type;

    if (eventType === "user.created") {
      const fallbackName = `${evt.data.first_name || ""}${
        evt.data.last_name || ""
      }`;
      const username = evt.data.username || fallbackName || evt.data.id;

      const exists = await prisma.user.findUnique({
        where: { username },
      });

      if (!exists) {
        await prisma.user.create({
          data: {
            id: evt.data.id,
            username,
            avatar: evt.data.image_url || "/noAvatar.png",
            cover: "/noCover.png",
          },
        });
      }

      return new Response("OK", { status: 200 });
    }

    if (eventType === "user.updated") {
      await prisma.user.update({
        where: { id: evt.data.id },
        data: {
          username:
            evt.data.username ||
            `${evt.data.first_name || ""}${evt.data.last_name || ""}`,
          avatar: evt.data.image_url || "/noAvatar.png",
        },
      });

      return new Response("OK", { status: 200 });
    }

    return new Response("Ignored", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Bad Request", { status: 400 });
  }
}
