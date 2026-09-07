import { NextResponse } from "next/server";
import { registerUser, createSession } from "@/lib/dev-store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!email || password.length < 8) return NextResponse.json({ error: "A valid email and password of at least 8 characters are required." }, { status: 400 });
  const user = registerUser(email, password);
  if (!user) return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  const response = NextResponse.json({ user: { id: user.id, email: user.email } }, { status: 201 });
  response.cookies.set("kk_session", createSession(user.id), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
  return response;
}
