import { NextResponse } from "next/server";
import { addMessage, canMessage, getMessages, userFromToken } from "@/lib/dev-store";

function currentUser(request: Request) {
  const token = request.headers.get("cookie")?.match(/(?:^|; )kk_session=([^;]+)/)?.[1] ?? null;
  return userFromToken(token);
}

export async function GET(request: Request) {
  const user = currentUser(request);
  const otherUserId = new URL(request.url).searchParams.get("with");
  if (!user || !otherUserId) return NextResponse.json({ error: "Authentication and a conversation user are required." }, { status: 400 });
  return NextResponse.json({ messages: getMessages(user.id, otherUserId) });
}

export async function POST(request: Request) {
  const user = currentUser(request);
  const body = await request.json().catch(() => null);
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  if (typeof body?.receiverId !== "string" || typeof body?.body !== "string" || !body.body.trim()) return NextResponse.json({ error: "Receiver and message body are required." }, { status: 400 });
  if (!canMessage(user.id, body.receiverId)) return NextResponse.json({ error: "Messaging is available after mutual interest is accepted." }, { status: 403 });
  return NextResponse.json({ message: addMessage(user.id, body.receiverId, body.body.trim()) }, { status: 201 });
}
