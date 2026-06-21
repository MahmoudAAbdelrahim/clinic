import { NextResponse } from "next/server";

import User from "../../../../../models/User";
import { connectDB } from "../../../../../lib/db";
import { getCurrentUser } from "../../../../../lib/getCurrentUser";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({}, { status: 403 });
    }

    const { id } = await params; // <-- ده الإصلاح الأساسي

    const doctor = await User.findById(id).select("-password");

    if (!doctor) {
      return NextResponse.json(
        { success: false, message: "Doctor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      doctor,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({}, { status: 403 });
    }

    const { id } = await params; // <-- ده كمان
    const body = await req.json();

    const doctor = await User.findByIdAndUpdate(
      id,
      {
        name: body.name,
        phone: body.phone,
        email: body.email,
        specialization: body.specialization,
      },
      { new: true }
    ).select("-password");

    if (!doctor) {
      return NextResponse.json(
        { success: false, message: "Doctor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      doctor,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}