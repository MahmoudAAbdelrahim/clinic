import { NextResponse } from "next/server";

import User from "../../../../models/User";
import { connectDB } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/getCurrentUser";

export async function GET() {

  await connectDB();

  const currentUser =
    await getCurrentUser();

  if (
    !currentUser ||
    currentUser.role !== "admin"
  ) {
    return NextResponse.json(
      {},
      { status: 403 }
    );
  }

  const doctors =
    await User.find({
      role: "doctor",
    })
      .select("-password")
      .sort({
        createdAt: -1,
      });

  return NextResponse.json({
    success: true,
    doctors,
  });
}