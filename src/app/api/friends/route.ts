import { NextResponse } from "next/server";
import { getUserFriendRequest } from "@/app/actions/UserAction";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  try {
    const friends = await getUserFriendRequest(userId);
    return NextResponse.json(friends);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch friends" }, { status: 500 });
  }
}
