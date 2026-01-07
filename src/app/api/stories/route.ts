import { NextResponse } from "next/server";
import { getStories } from "@/app/actions/User";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  try {
    const stories = await getStories(userId);
    return NextResponse.json(stories);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
  }
}
