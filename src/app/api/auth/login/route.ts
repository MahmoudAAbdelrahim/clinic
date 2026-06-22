import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "../../../../models/User";
import { connectDB } from "../../../../lib/db";
import { generateToken } from "../../../../lib/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { login, password } =
      await req.json();

    if (!login || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "جميع الحقول مطلوبة",
        },
        {
          status: 400,
        }
      );
    }

    const user = await User.findOne({
      $or: [
        { email: login },
        { phone: login },
      ],
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "البيانات غير صحيحة",
        },
        {
          status: 401,
        }
      );
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "البيانات غير صحيحة",
        },
        {
          status: 401,
        }
      );
    }

    const token = generateToken(
      user._id.toString(),
      user.role
    );

    const response = NextResponse.json({
      success: true,
      role: user.role,
      message: "تم تسجيل الدخول بنجاح",
    });

const isProd = process.env.NODE_ENV === "production";

response.cookies.set("token", token, {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "strict" : "lax",
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
});

    return response;

  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "حدث خطأ",
      },
      {
        status: 500,
      }
    );
  }
}
