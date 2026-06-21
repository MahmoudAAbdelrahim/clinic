import { NextResponse } from "next/server";

import Appointment from "../../../../models/Appointment";
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

  const appointments =
    await Appointment.find({
      userId: currentUser._id,
    })
      .sort({
        appointmentDate: -1,
      });

  return NextResponse.json({
    success: true,
    appointments,
  });
}