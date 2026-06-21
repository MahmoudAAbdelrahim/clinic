import { NextResponse } from "next/server";

import User from "../../../../../../models/User";
import Appointment from "../../../../../../models/Appointment";
import MedicalRecord from "../../../../../../models/MedicalRecord";
import Treatment from "../../../../../../models/Treatment";

import { connectDB } from "../../../../../../lib/db";
import { getCurrentUser } from "../../../../../../lib/getCurrentUser";

export async function GET(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {

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
        },
        {
          status: 403,
        }
      );
    }

    const { id } =
      await context.params;

    const user =
      await User.findById(id)
        .select("-password")
        .lean();

    if (!user) {

      return NextResponse.json(
        {
          success: false,
          message:
            "المريض غير موجود",
        },
        {
          status: 404,
        }
      );
    }

    const medicalRecord =
      await MedicalRecord.findOne({
        userId: id,
      }).lean();

    const latestAppointment =
      await Appointment.findOne({
        userId: id,
      })
        .sort({
          createdAt: -1,
        })
        .lean();

    const treatments =
      await Treatment.find({
        patientId: id,
      })
        .sort({
          createdAt: -1,
        })
        .lean();

    return NextResponse.json({
      success: true,

      user,

      medicalRecord,

      latestAppointment,

      treatments,
    });

  } catch (error) {

    console.log(
      "Full Record Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}