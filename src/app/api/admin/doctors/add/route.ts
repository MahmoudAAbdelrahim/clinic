import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "../../../../../models/User";
import { connectDB } from "../../../../../lib/db";
import { getCurrentUser } from "../../../../../lib/getCurrentUser";

export async function POST(req: Request) {

  try {

    await connectDB();

    const currentUser =
      await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    if (
      currentUser.role !== "admin"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    const {
      name,
      phone,
      email,
      password,
      specialization,
    } = await req.json();

    const existingUser =
      await User.findOne({
        $or: [
          { phone },
          { email },
        ],
      });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "الدكتور موجود بالفعل",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      );

    const doctor =
      await User.create({
        name,
        phone,
        email,
        password:
          hashedPassword,

        role: "doctor",

        specialization,
      });

    return NextResponse.json({
      success: true,
      doctor,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}