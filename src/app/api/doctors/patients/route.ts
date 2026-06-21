import { NextResponse } from "next/server";

import Appointment from "../../../../models/Appointment";
import User from "../../../../models/User";
import { connectDB } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/getCurrentUser";

export async function GET() {

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

  const appointments =
    await Appointment.find({
      doctorId:
        currentUser._id,
    })
    .select(
      "userId name phone"
    )
    .sort({
      createdAt: -1,
    });

  const uniquePatients =
    Array.from(
      new Map(
        appointments.map(
          (item) => [
            item.userId.toString(),
            {
              id: item.userId,
              name: item.name,
              phone: item.phone,
            },
          ]
        )
      ).values()
    );
const patientIds =
  [
    ...new Set(
      appointments.map(
        (a) =>
          a.userId.toString()
      )
    ),
  ];

const patients =
  await User.find({
    _id: {
      $in: patientIds,
    },
  })
  .select(
    "name phone email"
  );

return NextResponse.json({
  success: true,
  patients,
});

  return NextResponse.json({
    success: true,
    patients:
      uniquePatients,
  });
}