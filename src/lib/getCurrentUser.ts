import { cookies } from "next/headers";
import User from "../models/User";
import { verifyToken } from "../lib/jwt";

export async function getCurrentUser() {

  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {

    const decoded: any =
      verifyToken(token);

    const user =
      await User.findById(
        decoded.userId
      );

    return user;

  } catch {

    return null;

  }
}