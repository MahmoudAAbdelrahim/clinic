import { NextResponse } from "next/server";
import mongoose from "mongoose";

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
          message: "Unauthorized",
        },
        {
          status: 403,
        }
      );
    }

    const { id } =
      await context.params;

    const treatments =
      await Treatment.find({
        patientId:
          new mongoose.Types.ObjectId(id),
      })
      .sort({
        createdAt: -1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      count:
        treatments.length,
      treatments,
    });

  } catch (error) {

    console.log(
      "Treatments Error:",
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