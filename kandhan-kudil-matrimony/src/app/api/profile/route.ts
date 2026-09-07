import { NextResponse } from "next/server";
import { getProfiles, saveProfile, userFromToken } from "@/lib/dev-store";

function currentUser(request: Request) {
  const token = request.headers.get("cookie")?.match(/(?:^|; )kk_session=([^;]+)/)?.[1] ?? null;
  return userFromToken(token);
}

export async function GET() { return NextResponse.json({ profiles: getProfiles() }); }

export async function PUT(request: Request) {
  const user = currentUser(request);
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const body = await request.json().catch(() => null);
  const displayName = typeof body?.displayName === "string" ? body.displayName.trim() : "";
  if (!displayName) return NextResponse.json({ error: "Display name is required." }, { status: 400 });
  const profile = saveProfile({ userId: user.id, displayName, city: body.city, education: body.education, profession: body.profession, about: body.about });
  return NextResponse.json({ profile });
}
