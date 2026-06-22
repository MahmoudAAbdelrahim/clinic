import { NextResponse } from "next/server";

import Appointment from "../../../../models/Appointment";
import Treatment from "../../../../models/Treatment";

import { connectDB } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/getCurrentUser";

export async function GET() {

  await connectDB();

  const user =
    await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      {},
      { status: 401 }
    );
  }

  const appointments =
    await Appointment.countDocuments({
      userId: user._id,
    });

  const treatments =
    await Treatment.countDocuments({
      patientId: user._id,
      isActive: true,
    });

  return NextResponse.json({
    appointments,
    treatments,
  });
}