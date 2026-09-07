import { NextResponse } from "next/server";
import { addInterest, getInterests, userFromToken } from "@/lib/dev-store";

function currentUser(request: Request) {
  const token = request.headers.get("cookie")?.match(/(?:^|; )kk_session=([^;]+)/)?.[1] ?? null;
  return userFromToken(token);
}

export async function GET(request: Request) {
  const user = currentUser(request);
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  return NextResponse.json({ interests: getInterests(user.id) });
}

export async function POST(request: Request) {
  const user = currentUser(request);
  const body = await request.json().catch(() => null);
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  if (typeof body?.receiverId !== "string" || body.receiverId === user.id) return NextResponse.json({ error: "A different receiver is required." }, { status: 400 });
  return NextResponse.json({ interest: addInterest(user.id, body.receiverId) }, { status: 201 });
}
