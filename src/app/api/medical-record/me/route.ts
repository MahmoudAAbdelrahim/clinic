import { NextResponse } from "next/server";

import MedicalRecord from "../../../../models/MedicalRecord";

import { connectDB } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/getCurrentUser";

export async function GET() {

  await connectDB();

  const currentUser =
    await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      {},
      { status: 401 }
    );
  }

  const record =
    await MedicalRecord.findOne({
      userId:
        currentUser._id,
    });

  return NextResponse.json({
    success: true,
    record,
  });
}