import { NextResponse } from "next/server";

import MedicalRecord from "../../../../../../models/MedicalRecord";
import User from "../../../../../../models/User";

import { connectDB } from "../../../../../../lib/db";
import { getCurrentUser } from "../../../../../../lib/getCurrentUser";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({}, { status: 403 });
    }

    const { id } = await params;

    const patient = await User.findById(id).select("-password");

    if (!patient) {
      return NextResponse.json(
        { success: false, message: "Patient not found" },
        { status: 404 }
      );
    }

    // lean() عشان يرجع plain JS object بدل mongoose document
    const record = await MedicalRecord.findOne({ userId: id }).lean();

    return NextResponse.json({
      success: true,
      patient,
      record, // null لو لسه الباشنت مفيهوش سجل طبي، ده طبيعي
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({}, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();

    // whitelist صريح للحقول المسموح بتحديثها فقط
    const allowedFields = [
      "age",
      "gender",
      "weight",
      "height",
      "bloodType",
      "chronicDiseases",
      "drugAllergies",
      "currentMedications",
      "firstVisitReason",
      "medicalDescription",
      "previousOperations",
      "familyDiseases",
    ];

    const safeBody: Record<string, any> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        safeBody[field] = body[field];
      }
    }

    const record = await MedicalRecord.findOneAndUpdate(
      { userId: id },
      { ...safeBody, userId: id },
      {
        new: true,
        upsert: true, // أول مرة يتسجل سجل طبي للمريض ده، اعمله من غير ما ترجع null
        runValidators: true,
      }
    ).lean();

    return NextResponse.json({
      success: true,
      record,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({}, { status: 403 });
    }

    const { id } = await params;

    const deleted = await MedicalRecord.findOneAndDelete({ userId: id });

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}