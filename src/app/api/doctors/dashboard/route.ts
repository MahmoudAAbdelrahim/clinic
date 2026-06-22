import { NextResponse } from "next/server";

import Appointment from "../../../../models/Appointment";
import Treatment from "../../../../models/Treatment";

import { connectDB } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/getCurrentUser";

export async function GET() {

  await connectDB();

  const doctor =
    await getCurrentUser();

  if (
    !doctor ||
    doctor.role !== "doctor"
  ) {
    return NextResponse.json(
      {},
      { status: 403 }
    );
  }

  const patients =
    await Appointment.distinct(
      "userId",
      {
        doctorId:
          doctor._id,
      }
    );

  const today =
    new Date();

  const start =
    new Date(today);

  start.setHours(
    0,0,0,0
  );

  const end =
    new Date(today);

  end.setHours(
    23,59,59,999
  );

  const todayAppointments =
    await Appointment.countDocuments({
      doctorId:
        doctor._id,

      appointmentDate: {
        $gte: start,
        $lte: end,
      },
    });

  const completed =
    await Appointment.countDocuments({
      doctorId:
        doctor._id,

      status:
        "completed",
    });

  const treatments =
    await Treatment.countDocuments({
      doctorId:
        doctor._id,

      isActive: true,
    });

  return NextResponse.json({
    patients:
      patients.length,

    todayAppointments,

    completed,

    treatments,
  });
}