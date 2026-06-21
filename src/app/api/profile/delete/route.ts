import { NextResponse } from "next/server";

import User from "../../../../models/User";
import { connectDB } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/getCurrentUser";

export async function DELETE() {

  await connectDB();

  const currentUser =
    await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      {},
      { status: 401 }
    );
  }

  await User.findByIdAndDelete(
    currentUser._id
  );

  const response =
    NextResponse.json({
      success: true,
      message:
        "تم حذف الحساب",
    });

  response.cookies.delete(
    "token"
  );

  return response;
}