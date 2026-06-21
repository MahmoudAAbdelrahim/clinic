"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Stethoscope,
  Phone,
  AlertCircle,
  Clock,
  Hash,
  Search,
  Check,
  X,
  FileText,
  ClipboardCheck,
  User,
  HeartPulse,
  Activity
} from "lucide-react";

import { Pill } from "lucide-react";

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      const { data } = await axios.get("/api/doctors/appointments");
      setAppointments(data.appointments);
    } catch (error) {
      console.error("Error loading appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`/api/doctors/appointments/${id}`, { status });
      loadAppointments();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return { text: "مقبول ومؤكد", classes: "bg-emerald-100 text-emerald-950 border-emerald-400" };
      case "rejected":
        return { text: "مرفوض نهائياً", classes: "bg-rose-100 text-rose-950 border-rose-400" };
      case "completed":
        return { text: "مكتمل وزيارة منتهية", classes: "bg-blue-100 text-blue-950 border-blue-400" };
      default:
        return { text: "قيد الانتظار الحالي", classes: "bg-amber-100 text-amber-950 border-amber-400" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3 bg-white p-8 rounded-2xl shadow-md border-2 border-slate-300">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-indigo-700 animate-spin" />
          <span className="text-base font-black text-slate-900">جاري استدعاء المواعيد الحية...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 bg-slate-100" dir="rtl">
      <div className="max-w-5xl mx-auto">

        {/* لوحة الهيدر الخاصة بالعيادة */}
        <div className="mb-8 border-b-2 border-slate-400 pb-5">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-indigo-950 text-white rounded-xl shadow-md border border-indigo-900">
              <Stethoscope className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">
                غرفة فحص الحالات والمواعيد الحية
              </h1>
              <p className="text-slate-800 text-sm md:text-base font-extrabold mt-1">
                سجل المتابعة اليومي الفوري لعيادة الطبيب وتنسيق مسار الأدوار
              </p>
            </div>
          </div>
        </div>

        {/* حالة عدم وجود حجوزات */}
        {appointments.length === 0 && (
          <div className="bg-white p-14 rounded-2xl text-center shadow border-2 border-slate-300 max-w-md mx-auto">
            <Activity className="w-10 h-10 text-slate-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-xl font-black text-slate-950">لا توجد حالات مدرجة اليوم بالجدول</h2>
            <p className="text-slate-700 font-extrabold text-sm mt-2">ستظهر بيانات وملفات المرضى هنا تلقائياً فور تسجيل الحضور.</p>
          </div>
        )}

        {/* قائمة كروت فحص الحالات القوية التباين */}
        <div className="space-y-6">
          {appointments.map((item) => {
            const badge = getStatusBadge(item.status);
            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md border-2 border-slate-300 overflow-hidden"
              >
                {/* رأس الكارت: اسم المريض عريض جداً والحالة العامة */}
                <div className="bg-slate-900 p-4 px-6 border-b-2 border-slate-950 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-700 text-white rounded-full flex items-center justify-center font-black">
                      <User size={16} className="stroke-[2.5]" />
                    </div>
                    <h2 className="text-lg md:text-xl font-black text-white tracking-tight">{item.name}</h2>
                  </div>
                  <span className={`px-4 py-1.5 rounded-xl text-xs font-black border-2 shadow-sm ${badge.classes}`}>
                    {badge.text}
                  </span>
                </div>

                <div className="p-5 md:p-6 space-y-5">
                  
                  {/* شبكة البيانات الأساسية الحادة زاهية الألوان */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    
                    <div className="bg-slate-100 p-2.5 px-3 rounded-xl border-2 border-slate-300">
                      <span className="text-xs text-slate-900 font-black block mb-0.5">السن الحالي</span>
                      <span className="text-base font-black text-slate-950 font-sans">{item.age} سنة</span>
                    </div>

                    <div className="bg-indigo-100 text-indigo-950 p-2.5 px-3 rounded-xl border-2 border-indigo-300">
                      <span className="text-xs text-indigo-950 font-black block mb-0.5 flex items-center gap-1">
                        <Hash size={12} className="stroke-[2.5]" /> رقم الدور
                      </span>
                      <span className="text-base font-black text-indigo-950 font-sans">{item.queueNumber || "—"}</span>
                    </div>

                    <div className="bg-slate-100 p-2.5 px-3 rounded-xl border-2 border-slate-300">
                      <span className="text-xs text-slate-900 font-black block mb-0.5 flex items-center gap-1">
                        <Phone size={12} /> رقم الهاتف
                      </span>
                      <span className="text-sm font-black text-slate-950 font-sans block truncate" dir="ltr">{item.phone}</span>
                    </div>

                    <div className="bg-rose-100 p-2.5 px-3 rounded-xl border-2 border-rose-300">
                      <span className="text-xs text-rose-950 font-black block mb-0.5 flex items-center gap-1">
                        <AlertCircle size={12} className="stroke-[2.5]" /> هاتف الطوارئ
                      </span>
                      <span className="text-sm font-black text-rose-950 font-sans block truncate" dir="ltr">{item.emergencyPhone || "—"}</span>
                    </div>

                    <div className="bg-slate-100 p-2.5 px-3 rounded-xl border-2 border-slate-300 col-span-2 md:col-span-1">
                      <span className="text-xs text-slate-900 font-black block mb-0.5 flex items-center gap-1">
                        <Search size={12} /> كود المتابعة
                      </span>
                      <span className="text-sm font-black text-slate-950 font-sans block truncate">{item.trackingNumber || "—"}</span>
                    </div>

                  </div>

                  {/* تفاصيل التشخيص والشكوى الحالية - نصوص عريضة جداً */}
                  <div className="grid md:grid-cols-2 gap-4 pt-1">
                    
                    <div className="bg-slate-50 p-4 rounded-xl border-2 border-slate-300">
                      <h3 className="text-sm font-black text-slate-950 flex items-center gap-1.5 mb-2.5 border-b-2 border-slate-200 pb-2">
                        <Clock size={16} className="text-indigo-900 stroke-[2.5]" />
                        <span>الشكوى الحالية وسبب الزيارة للعيادة</span>
                      </h3>
                      <p className="text-slate-950 text-sm font-black leading-relaxed">
                        {item.visitReason || "لم يتم تدوين سبب محدد للحضور."}
                      </p>
                    </div>

                    <div className="bg-rose-50/60 p-4 rounded-xl border-2 border-rose-300">
                      <h3 className="text-sm font-black text-rose-950 flex items-center gap-1.5 mb-2.5 border-b-2 border-rose-200 pb-2">
                        <HeartPulse size={16} className="text-rose-700 stroke-[2.5]" />
                        <span>التاريخ السريري والأمراض المزمنة</span>
                      </h3>
                      <div className="text-slate-950 text-sm font-black">
                        {item.chronicDiseases && item.chronicDiseases.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {item.chronicDiseases.map((d: string, i: number) => (
                              <span key={i} className="bg-rose-700 text-white px-3 py-1 rounded-lg text-xs font-black border border-rose-800 shadow-sm">
                                {d}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-600 font-extrabold text-xs">خالي تماماً من أي أمراض مزمنة مسجلة.</span>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* ─── أزرار التحكم الطبية الواضحة والنصوص البيضاء الناصعة ─── */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t-2 border-slate-200">

                    {/* زر قبول فوري */}
                    <button
                      onClick={() => updateStatus(item._id, "approved")}
                      className="flex items-center justify-center gap-1.5 bg-emerald-800 hover:bg-emerald-950 text-white px-5 py-2.5 rounded-xl font-black text-xs md:text-sm transition-colors shadow-md border border-emerald-950"
                    >
                      <Check size={16} className="stroke-[3.5]" />
                      <span>قبول الحالة</span>
                    </button>

                    {/* زر رفض الطلب */}
                    <button
                      onClick={() => updateStatus(item._id, "rejected")}
                      className="flex items-center justify-center gap-1.5 bg-rose-800 hover:bg-rose-950 text-white px-5 py-2.5 rounded-xl font-black text-xs md:text-sm transition-colors shadow-md border border-rose-950"
                    >
                      <X size={16} className="stroke-[3.5]" />
                      <span>رفض الطلب</span>
                    </button>

                    {/* زر إنهاء الكشف */}
                    <button
                      onClick={() => updateStatus(item._id, "completed")}
                      className="flex items-center justify-center gap-1.5 bg-blue-800 hover:bg-blue-950 text-white px-5 py-2.5 rounded-xl font-black text-xs md:text-sm transition-colors shadow-md border border-blue-950"
                    >
                      <ClipboardCheck size={16} className="stroke-[3]" />
                      <span>إنهاء الكشف والتوصيات</span>
                    </button>

                    {/* فاصل عمودي بارز */}
                    <div className="hidden md:block w-0.5 h-6 bg-slate-400 mx-1" />
<Link
  href={`/doctor/treatments/add/${item.userId}`}
  className="flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-900 text-white px-5 py-2.5 rounded-xl font-black text-xs md:text-sm no-underline transition-colors shadow-md border border-emerald-900 text-center"
>
  <Pill size={16} className="stroke-[3]" />
  <span>إضافة علاج للمريض</span>
</Link>
<Link
  href={`/doctor/patients/${item.userId}/treatments`}
  className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-black text-white px-5 py-2.5 rounded-xl font-black text-xs md:text-sm no-underline"
>
  سجل العلاجات
</Link>
                    {/* زر الانتقال للملف الطبي الكامل */}
                    <Link
                      href={`/doctor/patients/${item.userId}/medical-record`}
                      className="flex items-center justify-center gap-1.5 bg-indigo-800 hover:bg-indigo-950 text-white px-5 py-2.5 rounded-xl font-black text-xs md:text-sm no-underline transition-colors shadow-md border border-indigo-950 text-center"
                    >
                      <FileText size={16} className="stroke-[3]" />
                      <span>تحديث وعرض الملف الطبي الشامل</span>
                    </Link>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}