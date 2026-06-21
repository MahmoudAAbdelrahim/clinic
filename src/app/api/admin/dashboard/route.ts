import { NextResponse } from "next/server";

import User from "../../../../models/User";
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

  const patients =
    await User.countDocuments({
      role: "patient",
    });

  const doctors =
    await User.countDocuments({
      role: "doctor",
    });

  const appointments =
    await Appointment.countDocuments();

  const completedVisits =
    await Appointment.countDocuments({
      status: "completed",
    });

  return NextResponse.json({
    success: true,
    stats: {
      patients,
      doctors,
      appointments,
      completedVisits,
    },
  });
}