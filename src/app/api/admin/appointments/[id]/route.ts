import { NextResponse } from "next/server";

import Appointment from "../../../../../models/Appointment";
import { connectDB } from "../../../../../lib/db";
import { getCurrentUser } from "../../../../../lib/getCurrentUser";

export async function PUT(
  req: Request,
  { params }: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  const { id } =
    await params;

  const body =
    await req.json();

  const appointment =
    await Appointment.findByIdAndUpdate(
      id,
      {
        status:
          body.status,
      },
      {
        returnDocument:
          "after",
      }
    );

  return Response.json({
    success: true,
    appointment,
  });
}

export async function DELETE(
  req: Request,
  { params }: any
) {

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

  await Appointment.findByIdAndDelete(
    params.id
  );

  return NextResponse.json({
    success: true,
  });
}