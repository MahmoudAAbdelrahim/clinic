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
  Users,
  ChevronLeft,
  Search
} from "lucide-react";

export default function DoctorPatientsPage() {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const { data } = await axios.get("/api/doctors/patients");
        setPatients(data.patients);
      } catch (error) {
        console.error("Error loading doctor patients:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3 bg-white p-8 rounded-2xl shadow-md border-2 border-slate-300">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-indigo-700 animate-spin" />
          <span className="text-base font-bold text-slate-900">جاري استدعاء سجل المراجعين...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 md:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ترويسة الصفحة والهوية الطبية الداكنة */}
        <div className="border-b-2 border-slate-400 pb-5 flex items-center gap-4">
          <div className="p-3.5 bg-slate-900 text-white rounded-xl shadow-md border border-slate-950">
            <Users className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-950 tracking-tight">
              سجل ومحفوظات المرضى
            </h1>
            <p className="text-slate-800 text-sm md:text-base font-bold mt-0.5">
              استعراض شامل لملفات وبيانات جميع الحالات الطبية المراجعة بالعيادة
            </p>
          </div>
        </div>

        {/* في حال عدم وجود سجل مرضى مسجل */}
        {patients.length === 0 && (
          <div className="bg-white rounded-2xl p-14 text-center border-2 border-slate-300 max-w-md mx-auto shadow-sm">
            <User size={48} className="mx-auto text-slate-400 mb-4 stroke-[1.8]" />
            <h2 className="text-xl font-bold text-slate-950">لا يوجد مرضى مقيدين حالياً</h2>
            <p className="text-slate-700 font-bold text-xs mt-1.5">لم يتم العثور على أي قيود أو حجوزات مسجلة باسمك في النظام.</p>
          </div>
        )}

        {/* شبكة كروت المرضى الفاخرة عالية التباين */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <div
              key={patient._id}
              className="bg-white rounded-2xl shadow-md border-2 border-slate-300 overflow-hidden flex flex-col justify-between transition-all hover:translate-y-[-2px]"
            >
              
              {/* الجزء العلوي: اسم المريض والأيقونة التعريفية */}
              <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-950 flex items-center justify-center text-white shadow-sm shrink-0">
                  <User className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] bg-slate-200 text-slate-900 border border-slate-300 px-1.5 py-0.5 rounded font-bold">ملف مراجع</span>
                  <h2 className="font-bold text-slate-950 text-base md:text-lg tracking-tight">
                    {patient.name}
                  </h2>
                </div>
              </div>

              {/* الجزء الأوسط: بيانات التواصل الحيوية */}
              <div className="p-5 flex-1 space-y-3 bg-white">
                
                {/* رقم الهاتف */}
                <div className="flex items-center gap-2.5 text-slate-950">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-indigo-800 stroke-[2.5]" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 ml-1">الهاتف:</span>
                  <span className="text-sm font-bold font-sans" dir="ltr">{patient.phone}</span>
                </div>

                {/* البريد الإلكتروني */}
                <div className="flex items-center gap-2.5 text-slate-950">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-indigo-800 stroke-[2.5]" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 ml-1">البريد:</span>
                  <span className="text-sm font-bold truncate block">{patient.email || "—"}</span>
                </div>

              </div>

              {/* الجزء السفلي: أزرار التحكم والولوج السريع للملفات */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 grid grid-cols-2 gap-3">
                
                {/* زر الملف الطبي الشامل */}
                <Link
                  href={`/doctor/patients/${patient._id}/medical-record`}
                  className="flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-950 text-white text-center py-2.5 rounded-xl font-bold text-xs border border-slate-950 shadow-sm transition-colors"
                >
                  <FileText size={14} className="stroke-[2.5]" />
                  <span>الملف السريري</span>
                </Link>

                {/* زر العلاجات والروشتات */}
                <Link
                  href={`/doctor/patients/${patient._id}/treatments`}
                  className="flex items-center justify-center gap-1.5 bg-white hover:bg-slate-100 text-slate-950 text-center py-2.5 rounded-xl font-bold text-xs border-2 border-slate-300 shadow-sm transition-colors"
                >
                  <Pill size={14} className="text-emerald-700 stroke-[2.5]" />
                  <span>أرشيف العلاجات</span>
                </Link>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}