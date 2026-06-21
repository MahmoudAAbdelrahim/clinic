import { NextResponse } from "next/server";

import User from "../../../models/User";
import { connectDB } from "../../../lib/db";

export async function GET() {

  await connectDB();

  const doctors =
    await User.find({
      role: "doctor",
    })
    .select(
      "name specialization"
    )
    .sort({
      name: 1,
    });

  return NextResponse.json({
    success: true,
    doctors,
  });
}