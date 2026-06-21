import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "../../../../models/User";
import { connectDB } from "../../../../lib/db";
import { generateToken } from "../../../../lib/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      phone,
      email,
      password,
    } = body;

    if (!name || !phone || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "البيانات غير مكتملة",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await User.findOne({
      phone,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "رقم الهاتف مستخدم بالفعل",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role: "patient",
    });

    const token = generateToken(
      user._id.toString(),
      user.role
    );

    const response = NextResponse.json({
      success: true,
      message: "تم إنشاء الحساب بنجاح",
    });

    response.cookies.set(
      "token",
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      }
    );

    return response;

  } catch (error) {
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