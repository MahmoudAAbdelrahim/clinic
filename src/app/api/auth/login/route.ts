import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "../../../../models/User";
import { connectDB } from "../../../../lib/db";
import { generateToken } from "../../../../lib/jwt";

export async function POST(req: Request) {

  try {

    await connectDB();

    const {
      login,
      password,
    } = await req.json();

    const user =
      await User.findOne({
        $or: [
          { email: login },
          { phone: login },
        ],
      });

    if (!user) {

      return NextResponse.json(
        {
          success: false,
          message:
            "البيانات غير صحيحة",
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
          message:
            "البيانات غير صحيحة",
        },
        {
          status: 401,
        }
      );

    }

    const token =
      generateToken(
        user._id.toString(),
        user.role
      );
      

    const response =
      NextResponse.json({
        success: true,
        role: user.role,
        message:
          "تم تسجيل الدخول بنجاح",
      });
response.cookies.set(
  "token",
  token
);

    return response;

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "حدث خطأ بالخادم",
      },
      {
        status: 500,
      }
    );

  }
}
