import prisma  from "@/lib/client";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { error } from "console";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(evt.data)
    if (eventType === 'user.created') {
      try {
        console.log("[webhook] user.created received", { id: evt.data.id, username: evt.data.username });
        const fallbackName = `${evt.data.first_name || ""}${evt.data.last_name || ""}`;
        const baseUsername = evt.data.username || fallbackName;
        const username = baseUsername;
        console.log("[webhook] checking existing user", { username });
        let exists = await prisma.user.findUnique({ where: { username } });
       
        if (exists) {
          console.log("User already exists");
          return new Response("User already exists", { status: 200 });
        }
        console.log("[webhook] creating user", { id: evt.data.id, username });
        await prisma.user.create({
          data: {
            id: evt.data.id,
            username,
            avatar: evt.data.image_url || "/noAvatar.png",
            cover: "/noCover.png"
          }
        });
        console.log("[webhook] user created", { username });
        return new Response("User created", { status: 200 });
      } catch (error) {
        console.error("DB error:", error);
        return new Response("Database error", { status: 500 });
      }
    }
   
if (eventType === 'user.updated') {
      try {
        await prisma.user.update({
          where: {

            id: evt.data.id,
          },
          data: {
            username: evt.data.username || ((evt.data.first_name || "") + (evt.data.last_name || "")) || "Nothing",
            avatar: evt.data.image_url || "/noAvatar.png",
          }
        })
        console.log("User updated");
         return new Response("User updated", { status: 200 });
      } catch (error) {
       console.error("DB error:", error);
       return new Response("Database error", { status: 500 });
        
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
