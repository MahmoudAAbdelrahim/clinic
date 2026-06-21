import { NextResponse } from "next/server";

import Appointment from "../../../../models/Appointment";
import { connectDB } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/getCurrentUser";

export async function GET() {

  await connectDB();

  const currentUser =
    await getCurrentUser();

  if (
    !currentUser ||
    currentUser.role !== "admin"
  ) {
    return NextResponse.json(
      {},
      { status: 403 }
    );
  }

  const appointments =
    await Appointment.find()
      .sort({
        appointmentDate: 1,
      });

  return NextResponse.json({
    success: true,
    appointments,
  });
}
