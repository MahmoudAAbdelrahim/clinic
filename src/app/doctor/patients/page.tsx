"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  User,
  Phone,
  Mail,
  FileText,
  Pill,
} from "lucide-react";

export default function DoctorPatientsPage() {

  const [loading, setLoading] =
    useState(true);

  const [patients, setPatients] =
    useState<any[]>([]);

  useEffect(() => {

    const loadPatients =
      async () => {

        try {

          const { data } =
            await axios.get(
              "/api/doctors/patients"
            );

          setPatients(
            data.patients
          );

        } finally {

          setLoading(false);

        }
      };

    loadPatients();

  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center">
        جاري تحميل المرضى...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-slate-100 p-6"
      dir="rtl"
    >

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-black text-slate-900">
            مرضاي
          </h1>

          <p className="text-slate-500 mt-2">
            جميع المرضى الذين حجزوا عندك
          </p>

        </div>

        {patients.length === 0 && (

          <div className="bg-white p-10 rounded-3xl shadow text-center">

            <h2 className="text-xl font-bold">
              لا يوجد مرضى حتى الآن
            </h2>

          </div>

        )}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {patients.map(
            (patient) => (

              <div
                key={patient._id}
                className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100"
              >

                <div className="flex items-center gap-4 mb-5">

                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">

                    <User
                      className="text-blue-600"
                    />

                  </div>

                  <div>

                    <h2 className="font-black text-lg">
                      {patient.name}
                    </h2>

                  </div>

                </div>

                <div className="space-y-3">

                  <div className="flex items-center gap-2">

                    <Phone
                      size={18}
                    />

                    <span>
                      {patient.phone}
                    </span>

                  </div>

                  <div className="flex items-center gap-2">

                    <Mail
                      size={18}
                    />

                    <span>
                      {
                        patient.email
                        || "-"
                      }
                    </span>

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">

                  <Link
                    href={`/doctor/patients/${patient._id}/medical-record`}
                    className="bg-blue-600 text-white text-center py-3 rounded-xl no-underline font-bold"
                  >
                    <div className="flex items-center justify-center gap-2">

                      <FileText
                        size={16}
                      />

                      الملف الطبي

                    </div>
                  </Link>

                  <Link
                    href={`/doctor/patients/${patient._id}/treatments`}
                    className="bg-emerald-600 text-white text-center py-3 rounded-xl no-underline font-bold"
                  >
                    <div className="flex items-center justify-center gap-2">

                      <Pill
                        size={16}
                      />

                      العلاجات

                    </div>
                  </Link>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}