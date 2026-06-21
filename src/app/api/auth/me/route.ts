import { NextRequest, NextResponse } from "next/server";

import User from "../../../../models/User";
import { connectDB } from "../../../../lib/db";
import { verifyToken } from "../../../../lib/jwt";

export async function GET(
  req: NextRequest
) {

  try {

    await connectDB();

    const token =
      req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message:
            "غير مصرح بالدخول",
        },
        {
          status: 401,
        }
      );
    }

    const decoded: any =
      verifyToken(token);

    const user =
      await User.findById(
        decoded.userId
      ).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "المستخدم غير موجود",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });

  } catch {

    return NextResponse.json(
      {
        success: false,
        message:
          "جلسة الدخول منتهية",
      },
      {
        status: 401,
      }
    );
  }
}