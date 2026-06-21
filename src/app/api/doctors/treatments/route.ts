import { NextResponse } from "next/server";

import Treatment from "../../../../models/Treatment";

import { connectDB } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/getCurrentUser";

export async function POST(
  req: Request
) {

  await connectDB();

  const currentUser =
    await getCurrentUser();

  if (
    !currentUser ||
    currentUser.role !== "doctor"
  ) {
    return NextResponse.json(
      {},
      { status: 403 }
    );
  }

  const body =
    await req.json();

  const treatment =
    await Treatment.create({
      patientId:
        body.patientId,

      doctorId:
        currentUser._id,

      diagnosis:
        body.diagnosis,

      treatment:
        body.treatment,

      instructions:
        body.instructions,

      notes:
        body.notes,

      nextVisit:
        body.nextVisit,
    });

  return NextResponse.json({
    success: true,
    treatment,
  });
}