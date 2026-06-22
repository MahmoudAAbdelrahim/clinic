import { NextResponse } from "next/server";

import Treatment from "../../../../models/Treatment";

import { connectDB } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/getCurrentUser";

export async function GET() {

  await connectDB();

  const currentUser =
    await getCurrentUser();

  if (
    !currentUser ||
    currentUser.role !== "patient"
  ) {
    return NextResponse.json(
      {},
      { status: 403 }
    );
  }

  const treatments =
    await Treatment.find({
      patientId:
        currentUser._id,

      isActive: true,
    })
      .sort({
        createdAt: -1,
      });

  return NextResponse.json({
    success: true,
    treatments,
  });
}