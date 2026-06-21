import { NextResponse } from "next/server";

import User from "../../../../models/User";
import { getCurrentUser } from "../../../../lib/getCurrentUser";
import { connectDB } from "../../../../lib/db";

export async function PUT(req: Request) {

  await connectDB();

  const currentUser =
    await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const {
    name,
    phone,
    email,
  } = await req.json();

  const user =
    await User.findByIdAndUpdate(
      currentUser._id,
      {
        name,
        phone,
        email,
      },
      {
        new: true,
      }
    ).select("-password");

  return NextResponse.json({
    success: true,
    user,
  });
}