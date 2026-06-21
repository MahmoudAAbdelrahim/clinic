import { NextResponse } from "next/server";

import Treatment from "../../../../../models/Treatment";

import { connectDB } from "../../../../../lib/db";
import { getCurrentUser } from "../../../../../lib/getCurrentUser";

export async function GET(
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
      { status: 403 }
    );
  }

  const { id } =
    await context.params;

  const treatment =
    await Treatment.findById(id);

  return NextResponse.json({
    success: true,
    treatment,
  });
}

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
      { status: 403 }
    );
  }

  const { id } =
    await context.params;

  const body =
    await req.json();

  const treatment =
    await Treatment.findByIdAndUpdate(
      id,
      {
        diagnosis:
          body.diagnosis,

        treatment:
          body.treatment,

        instructions:
          body.instructions,

        notes:
          body.notes,

        nextVisit:
          body.nextVisit,
      },
      {
        returnDocument:
          "after",
      }
    );

  return NextResponse.json({
    success: true,
    treatment,
  });
}

export async function DELETE(
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
      { status: 403 }
    );
  }

  const { id } =
    await context.params;

  await Treatment.findByIdAndUpdate(
    id,
    {
      isActive: false,
    }
  );

  return NextResponse.json({
    success: true,
  });
}