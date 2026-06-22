import { NextResponse } from "next/server";

import User from "../../../../models/User";
import Appointment from "../../../../models/Appointment";

import { connectDB } from "../../../../lib/db";
import { getCurrentUser } from "../../../../lib/getCurrentUser";

export async function POST(
  req: Request
) {

  await connectDB();

  const currentUser =
    await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      {},
      { status: 401 }
    );
  }

  const body =
    await req.json();

const {
  appointmentDate,
  age,
  gender,
  visitReason,
  notes,
  emergencyPhone,
  chronicDiseases,
  doctorId,
} = body;

  const selectedDate =
    new Date(
      appointmentDate
    );

  const today =
    new Date();

  if (
    selectedDate < today
  ) {
    return NextResponse.json(
      {
        message:
          "تاريخ غير صالح",
      },
      {
        status: 400,
      }
    );
  }

  if (
    selectedDate.getDay() ===
    5
  ) {
    return NextResponse.json(
      {
        message:
          "الجمعة إجازة",
      },
      {
        status: 400,
      }
    );
  }

const startOfDay = new Date(selectedDate);
startOfDay.setHours(0, 0, 0, 0);

const endOfDay = new Date(selectedDate);
endOfDay.setHours(23, 59, 59, 999);

const count =
await Appointment.countDocuments({
  doctorId,

  appointmentDate: {
    $gte: startOfDay,
    $lte: endOfDay,
  },
});

const existing =
await Appointment.findOne({
  userId: currentUser._id,
  doctorId,

  appointmentDate: {
    $gte: startOfDay,
    $lte: endOfDay,
  },
});

if (existing) {
  return NextResponse.json(
    {
      message:
        "لديك حجز بالفعل مع هذا الطبيب في هذا اليوم",
    },
    {
      status: 400,
    }
  );
}

  if (count >= 20) {
    return NextResponse.json(
      {
        message:
          "اليوم مكتمل",
      },
      {
        status: 400,
      }
    );
  }
const doctor =
  await User.findById(
    doctorId
  );

if (!doctor) {

  return NextResponse.json(
    {
      message:
        "الطبيب غير موجود",
    },
    {
      status: 404,
    }
  );
}
  const appointment =
    await Appointment.create({
      userId:
        currentUser._id,
doctorId:
  doctor._id,

doctorName:
  doctor.name,

doctorSpecialization:
  doctor.specialization,

      trackingNumber:
        `${currentUser.phone}-${count + 1}`,

      queueNumber:
        count + 1,

      name:
        currentUser.name,

      phone:
        currentUser.phone,

      emergencyPhone,

      age,

      gender,

      visitReason,

      notes,

      chronicDiseases,

      appointmentDate:
        selectedDate,
    });

  return NextResponse.json({
    success: true,
    trackingNumber:
      appointment.trackingNumber,
    queueNumber:
      appointment.queueNumber,
  });
}