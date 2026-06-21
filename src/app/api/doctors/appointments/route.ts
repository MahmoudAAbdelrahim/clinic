import { NextResponse } from "next/server";

import Appointment from "../../../../models/Appointment";
import { connectDB } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/getCurrentUser";

export async function GET() {
  try {

    await connectDB();

    const currentUser =
      await getCurrentUser();

    if (
      !currentUser ||
      currentUser.role !== "doctor"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 403,
        }
      );
    }

    const appointments =
      await Appointment.find({
        doctorId:
          currentUser._id,
      })
        .sort({
          appointmentDate: 1,
        })
        .lean();

    return NextResponse.json({
      success: true,
      appointments,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}