import { NextResponse } from "next/server";

import User from "../../../../models/User";
import { connectDB } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/getCurrentUser";
import MedicalRecord from "../../../../models/MedicalRecord";

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
    await User.find({
      role: "patient",
    })
      .select("-password")
      .sort({
        createdAt: -1,
      });

  return NextResponse.json({
    success: true,
    patients,
  });
}
export async function PUT(
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

 const body =
   await req.json();

 const record =
   await MedicalRecord.findByIdAndUpdate(
     params.id,
     body,
     {
       new: true,
     }
   );

 return NextResponse.json({
   success: true,
   record,
 });
}