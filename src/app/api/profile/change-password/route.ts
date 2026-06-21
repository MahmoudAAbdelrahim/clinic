import bcrypt from "bcryptjs";
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
      {},
      { status: 401 }
    );
  }

  const {
    oldPassword,
    newPassword,
  } = await req.json();

  const isMatch =
    await bcrypt.compare(
      oldPassword,
      currentUser.password
    );

  if (!isMatch) {
    return NextResponse.json(
      {
        message:
          "كلمة المرور الحالية غير صحيحة",
      },
      {
        status: 400,
      }
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      12
    );

  currentUser.password =
    hashedPassword;

  await currentUser.save();

  return NextResponse.json({
    success: true,
    message:
      "تم تغيير كلمة المرور",
  });
}