import { NextResponse } from "next/server";

import MedicalRecord from "../../../../models/MedicalRecord";
import { connectDB } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/getCurrentUser";

export async function POST(req: Request) {
  try {
    await connectDB();

    const currentUser =
      await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    const record =
      await MedicalRecord.findOneAndUpdate(
        {
          userId: currentUser._id,
        },
        {
          userId: currentUser._id,

          age: body.age,
          gender: body.gender,
          weight: body.weight,
          height: body.height,
          bloodType: body.bloodType,

          chronicDiseases:
            body.chronicDiseases,

          drugAllergies:
            body.drugAllergies,

          currentMedications:
            body.currentMedications,

          firstVisitReason:
            body.firstVisitReason,

          medicalDescription:
            body.medicalDescription,

          previousOperations:
            body.previousOperations,

          familyDiseases:
            body.familyDiseases,
        },
        {
          upsert: true,
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      record,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}