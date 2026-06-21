import { NextResponse } from "next/server";

import Appointment from "../../../../../models/Appointment";

import { connectDB } from "../../../../../lib/db";
import { getCurrentUser } from "../../../../../lib/getCurrentUser";

export async function PUT(
  req: Request,
  context: any
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
      {
        status: 403,
      }
    );
  }

  const { id } =
    await context.params;

  const body =
    await req.json();

  const appointment =
    await Appointment.findOneAndUpdate(
      {
        _id: id,

        doctorId:
          currentUser._id,
      },
      {
        status:
          body.status,
      },
      {
        returnDocument:
          "after",
      }
    );

  return NextResponse.json({
    success: true,
    appointment,
  });
}