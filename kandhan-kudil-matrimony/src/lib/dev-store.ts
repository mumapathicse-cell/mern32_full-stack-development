import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";

type User = { id: string; email: string; passwordHash: string; role: "MEMBER" | "ADMIN" };
type Profile = { userId: string; displayName: string; city?: string; education?: string; profession?: string; about?: string };
type Interest = { id: string; senderId: string; receiverId: string; status: "PENDING" | "ACCEPTED" | "DECLINED" };
type Message = { id: string; senderId: string; receiverId: string; body: string; createdAt: string };

const users: User[] = [];
const profiles: Profile[] = [];
const interests: Interest[] = [];
const messages: Message[] = [];
const sessions = new Map<string, string>();

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 12);
}

export function registerUser(email: string, password: string) {
  if (users.some((user) => user.email === email)) return null;
  const user = { id: randomUUID(), email, passwordHash: hashPassword(password), role: "MEMBER" as const };
  users.push(user);
  return user;
}

export function authenticate(email: string, password: string) {
  const user = users.find((item) => item.email === email);
  return user && bcrypt.compareSync(password, user.passwordHash) ? user : null;
}

export function createSession(userId: string) {
  const token = randomUUID();
  sessions.set(token, userId);
  return token;
}

export function userFromToken(token: string | null) {
  const userId = token ? sessions.get(token) : undefined;
  return users.find((user) => user.id === userId) ?? null;
}

export function saveProfile(profile: Profile) {
  const existing = profiles.find((item) => item.userId === profile.userId);
  if (existing) Object.assign(existing, profile);
  else profiles.push(profile);
  return profile;
}

export function getProfiles() { return profiles; }
export function addInterest(senderId: string, receiverId: string) {
  const interest = { id: randomUUID(), senderId, receiverId, status: "PENDING" as const };
  interests.push(interest);
  return interest;
}
export function getInterests(userId: string) { return interests.filter((item) => item.senderId === userId || item.receiverId === userId); }
export function canMessage(userId: string, otherUserId: string) {
  return interests.some((item) => item.status === "ACCEPTED" && ((item.senderId === userId && item.receiverId === otherUserId) || (item.senderId === otherUserId && item.receiverId === userId)));
}
export function addMessage(senderId: string, receiverId: string, body: string) {
  const message = { id: randomUUID(), senderId, receiverId, body, createdAt: new Date().toISOString() };
  messages.push(message);
  return message;
}
export function getMessages(userId: string, otherUserId: string) { return messages.filter((item) => (item.senderId === userId && item.receiverId === otherUserId) || (item.senderId === otherUserId && item.receiverId === userId)); }
