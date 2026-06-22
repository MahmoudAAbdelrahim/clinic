"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  CalendarDays,
  Pill,
  ClipboardCheck,
  Stethoscope,
  ArrowUpLeft,
  ChevronLeft
} from "lucide-react";

export default function DoctorDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    axios
      .get("/api/doctors/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error loading dashboard stats:", err));
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3 bg-white p-8 rounded-2xl shadow-md border-2 border-slate-300">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-indigo-700 animate-spin" />
          <span className="text-base font-bold text-slate-900">جاري إعداد لوحة القيادة الحيوية...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 md:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ترويسة لوحة التحكم الطبية الفاخرة */}
        <div className="border-b-2 border-slate-400 pb-5 flex items-center gap-4">
          <div className="p-3.5 bg-slate-900 text-white rounded-xl shadow-md border border-slate-950">
            <Stethoscope className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-950 tracking-tight">
              لوحة القيادة والمتابعة السريرية
            </h1>
            <p className="text-slate-800 text-sm md:text-base font-bold mt-0.5">
              متابعة حية لإحصائيات العيادة، أعداد المراجعين، وحالة الزيارات الحالية
            </p>
          </div>
        </div>

        {/* شبكة الإحصائيات والأرقام الضخمة حادة المقروئية */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {/* 1. إجمالي المرضى */}
          <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-slate-300 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-4">
                <Users className="text-blue-700 w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="text-sm font-bold text-slate-950">إجمالي المرضى المسجلين</h3>
            </div>
            <p className="text-4xl font-bold text-slate-950 font-sans mt-4 tracking-tight">
              {stats.patients}
            </p>
          </div>

          {/* 2. مواعيد اليوم */}
          <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-slate-300 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
                <CalendarDays className="text-emerald-700 w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="text-sm font-bold text-slate-950">حجوزات ومواعيد اليوم</h3>
            </div>
            <p className="text-4xl font-bold text-slate-950 font-sans mt-4 tracking-tight">
              {stats.todayAppointments}
            </p>
          </div>

          {/* 3. العلاجات النشطة */}
          <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-slate-300 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center mb-4">
                <Pill className="text-purple-700 w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="text-sm font-bold text-slate-950">الخطط العلاجية النشطة</h3>
            </div>
            <p className="text-4xl font-bold text-slate-950 font-sans mt-4 tracking-tight">
              {stats.treatments}
            </p>
          </div>

          {/* 4. الزيارات المكتملة */}
          <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-slate-300 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4">
                <ClipboardCheck className="text-amber-700 w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="text-sm font-bold text-slate-950">الزيارات الطبية المكتملة</h3>
            </div>
            <p className="text-4xl font-bold text-slate-950 font-sans mt-4 tracking-tight">
              {stats.completed}
            </p>
          </div>

        </div>

        {/* قسم التوجيه والتنقل السريع - أزرار تفاعلية بارزة */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-950 flex items-center gap-1.5">
            <span>إجراءات الإدارة السريعة</span>
            <ChevronLeft size={16} className="text-slate-800" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* رابط مواعيد اليوم */}
            <Link
              href="/doctor/today"
              className="group bg-slate-900 hover:bg-indigo-950 border-2 border-slate-950 text-white p-6 rounded-2xl transition-all shadow-md flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-lg font-bold block">جدول مواعيد اليوم</span>
                <span className="text-xs text-slate-300 font-bold block">الفحص الفوري للمرضى المدرجين بقائمة انتظار اليوم</span>
              </div>
              <div className="p-2 bg-slate-800 text-white rounded-xl group-hover:bg-indigo-900 transition-colors">
                <ArrowUpLeft size={20} className="stroke-[2.5]" />
              </div>
            </Link>

            {/* رابط ملفات المرضى */}
            <Link
              href="/doctor/patients"
              className="group bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-950 p-6 rounded-2xl transition-all shadow-md flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-lg font-bold block">أرشيف سجلات المرضى</span>
                <span className="text-xs text-slate-700 font-bold block">استعراض الملفات الطبية الشاملة والتاريخ العلاجي السابق</span>
              </div>
              <div className="p-2 bg-slate-100 text-slate-950 rounded-xl group-hover:bg-slate-200 transition-colors border border-slate-300">
                <ArrowUpLeft size={20} className="stroke-[2.5]" />
              </div>
            </Link>

            {/* رابط التقارير السنوية */}
            <Link
              href="/doctor/reports"
              className="group bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-950 p-6 rounded-2xl transition-all shadow-md flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-lg font-bold block">التقارير الطبية والمؤشرات</span>
                <span className="text-xs text-slate-700 font-bold block">استخراج البيانات الدورية وإحصائيات الكفاءة التشغيلية</span>
              </div>
              <div className="p-2 bg-slate-100 text-slate-950 rounded-xl group-hover:bg-slate-200 transition-colors border border-slate-300">
                <ArrowUpLeft size={20} className="stroke-[2.5]" />
              </div>
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}