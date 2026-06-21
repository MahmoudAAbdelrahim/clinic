"use client";

import Link from "next/link";
import {
  Users,
  UserCog,
  CalendarDays,
  ClipboardCheck,
  Plus,
  ArrowLeft,
  LayoutDashboard
} from "lucide-react";

import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] =
  useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    completedVisits: 0,
  });

useEffect(() => {

  const loadStats =
    async () => {

      try {

        const { data } =
          await axios.get(
            "/api/admin/dashboard"
          );

        setStats(
          data.stats
        );

      } catch (error) {

        console.log(error);

      }
    };

  loadStats();

}, []);
  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10" dir="rtl">
      <div className="max-w-7xl mx-auto">

        {/* الهيدر الفخم */}
        <div className="mb-10 border-b border-slate-200 pb-6 flex items-center gap-4">
          <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-600/20">
            <LayoutDashboard className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900">
              لوحة الإدارة 
            </h1>
            <p className="text-slate-600 font-bold text-sm mt-1">
              التحكم الشامل وإدارة حركة العمليات والعيادة بالكامل
            </p>
          </div>
        </div>

        {/* الإحصائيات الحيوية (مزهزهة وشيك جداً) */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

          {/* كارت المرضى */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200 border-2 border-slate-100 relative overflow-hidden transition-all hover:border-emerald-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-slate-700 font-black text-sm">إجمالي المرضى</h3>
                <p className="text-4xl font-black text-slate-800 font-mono mt-3">{stats.patients}</p>
              </div>
              <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-500 font-bold">الحسابات النشطة بالمنظومة</div>
          </div>

          {/* كارت الأطباء */}
    <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200 border-2 border-slate-100 relative overflow-hidden transition-all hover:border-emerald-500">
  <div className="flex justify-between items-start">
    <div>
      <h3 className="text-slate-700 font-black text-sm">الطاقم الطبي</h3>
      <p className="text-4xl font-black text-slate-800 font-mono mt-3">{stats.doctors}</p>
    </div>
    {/* تم تغيير الألوان هنا إلى emerald */}
    <div className="p-3.5 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100">
      <UserCog className="w-6 h-6" />
    </div>
  </div>
  <div className="mt-4 text-xs text-slate-500 font-bold">الأطباء والاستشاريين</div>
</div>

          {/* كارت المواعيد */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200 border-2 border-slate-100 relative overflow-hidden transition-all hover:border-emerald-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-slate-700 font-black text-sm">حجوزات اليوم</h3>
                <p className="text-4xl font-black text-slate-800 font-mono mt-3">{stats.appointments}</p>
              </div>
              <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
                <CalendarDays className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-500 font-bold">انتظار وتأكيد المواعيد</div>
          </div>

          {/* كارت الزيارات المكتملة */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200 border-2 border-slate-100 relative overflow-hidden transition-all hover:border-emerald-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-slate-700 font-black text-sm">الزيارات المكتملة</h3>
                <p className="text-4xl font-black text-slate-800 font-mono mt-3">0</p>
              </div>
              <div className="p-3.5 bg-sky-50 text-sky-600 rounded-2xl border border-sky-100">
                <ClipboardCheck className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-500 font-bold">إجمالي الكشوفات المنتهية</div>
          </div>

        </div>

        {/* أزرار الإجراءات السريعة (شغل تفتيح النفس) */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {/* زر إضافة دكتور - الزمردي الخارق */}
          <Link
            href="/admin/doctors/add"
            className="bg-emerald-600 text-white rounded-3xl p-6 no-underline hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 group flex flex-col justify-between h-44 border-2 border-transparent hover:-translate-y-1"
          >
            <div className="flex justify-between items-start w-full">
              <div className="p-2.5 bg-white/10 text-white rounded-xl">
                <Plus className="w-6 h-6" />
              </div>
              <ArrowLeft className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-x-1" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-wide">إضافة طبيب جديد</h3>
              <p className="mt-1 text-emerald-100 text-xs font-bold">إنشاء ملف تعريف وتعيين الصلاحيات لطبيب جديد</p>
            </div>
          </Link>

          {/* زر إدارة الأطباء */}
          <Link
            href="/admin/doctors"
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200 border-2 border-slate-200/80 no-underline group flex flex-col justify-between h-44 hover:border-emerald-600 hover:-translate-y-1 transition-all"
          >
            <div className="flex justify-between items-start w-full">
              <div className="p-2.5 bg-slate-100 text-slate-900 rounded-xl group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                <UserCog className="w-6 h-6" />
              </div>
              <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-x-1" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-all">إدارة الأطباء</h3>
              <p className="mt-1 text-slate-600 text-xs font-bold">تعديل المواعيد، الصلاحيات، وحسابات الطاقم الطبي</p>
            </div>
          </Link>

          {/* زر إدارة المرضى */}
          <Link
            href="/admin/patients"
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200 border-2 border-slate-200/80 no-underline group flex flex-col justify-between h-44 hover:border-emerald-600 hover:-translate-y-1 transition-all"
          >
            <div className="flex justify-between items-start w-full">
              <div className="p-2.5 bg-slate-100 text-slate-900 rounded-xl group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                <Users className="w-6 h-6" />
              </div>
              <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-x-1" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-all">إدارة السجلات والفرز</h3>
              <p className="mt-1 text-slate-600 text-xs font-bold">متابعة وحصر ملفات المرضى المسجلين داخل العيادة</p>
            </div>
          </Link>

        </div>

      </div>
    </div>
  );
}