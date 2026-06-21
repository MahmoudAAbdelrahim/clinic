"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  CalendarCheck2, 
  Phone, 
  Stethoscope, 
  Hash, 
  Search, 
  Calendar, 
  Check, 
  X, 
  FileText, 
  Trash2, 
  UserSquare2,
  ClipboardCheck,
  Activity
} from "lucide-react";

export default function AppointmentsPage() {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);

  const loadAppointments = async () => {
    try {
      const { data } = await axios.get("/api/admin/appointments");
      setAppointments(data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`/api/admin/appointments/${id}`, { status });
      loadAppointments();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteAppointment = async (id: string) => {
    const ok = confirm("هل أنت متأكد من رغبتك في حذف هذا الموعد نهائياً؟");
    if (!ok) return;
    try {
      await axios.delete(`/api/admin/appointments/${id}`);
      loadAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "approved":
        return { classes: "bg-emerald-50 text-emerald-900 border-emerald-300", bar: "bg-emerald-600", dot: "bg-emerald-600" };
      case "rejected":
        return { classes: "bg-rose-50 text-rose-500 border-rose-300", bar: "bg-rose-600", dot: "bg-rose-600" };
      case "completed":
        return { classes: "bg-blue-50 text-blue-700 border-blue-300", bar: "bg-blue-600", dot: "bg-blue-600" };
      default:
        return { classes: "bg-amber-50 text-amber-900 border-amber-300", bar: "bg-amber-500", dot: "bg-amber-500" };
    }
  };

  const getStatusName = (status: string) => {
    switch (status) {
      case "approved":   return "مقبول ومؤكد";
      case "rejected":   return "مرفوض";
      case "completed":  return "مكتمل الزيارة";
      default:           return "قيد الانتظار";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3 bg-white p-8 rounded-2xl shadow-md border border-slate-200">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-emerald-600 animate-spin" />
            <Activity className="w-4 h-4 text-emerald-600 absolute inset-0 m-auto animate-pulse" />
          </div>
          <span className="text-sm font-black text-slate-800">جاري استدعاء المواعيد...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 bg-slate-100" dir="rtl">
      <div className="max-w-6xl mx-auto">

        {/* الهيدر الرئيسي للمنصة */}
        <div className="mb-8 border-b border-slate-300 pb-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-slate-900 text-white rounded-xl shadow-md">
              <CalendarCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                غرفة إدارة المواعيد اليومية
              </h1>
              <p className="text-slate-600 text-xs md:text-sm font-bold mt-0.5">
                تحديث حالات المرضى وتنسيق الأدوار والسجلات الطبية
              </p>
            </div>
          </div>

          {/* البادجات الإحصائية العلوية متزنة التباين */}
          {appointments.length > 0 && (
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              {[
                { label: "الإجمالي", count: appointments.length, color: "bg-slate-800 text-white border-slate-800" },
                { label: "انتظار", count: appointments.filter(a => a.status === "pending").length, color: "bg-amber-100 text-amber-950 border-amber-300" },
                { label: "مقبول", count: appointments.filter(a => a.status === "approved").length, color: "bg-emerald-100 text-emerald-950 border-emerald-300" },
                { label: "مكتمل", count: appointments.filter(a => a.status === "completed").length, color: "bg-blue-100 text-blue-950 border-blue-300" },
              ].map(s => (
                <span key={s.label} className={`px-3 py-1 rounded-lg text-xs font-black border shadow-sm ${s.color}`}>
                  {s.label}: <span className="font-sans ml-0.5">{s.count}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* كارت الحالة الفارغة */}
        {appointments.length === 0 && (
          <div className="bg-white p-10 rounded-2xl text-center shadow-sm border border-slate-200 max-w-md mx-auto">
            <Calendar className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h2 className="text-lg font-black text-slate-900">لا توجد مواعيد مدرجة</h2>
            <p className="text-slate-500 font-bold text-xs mt-1">جدول الحجوزات فارغ تماماً حالياً.</p>
          </div>
        )}

        {/* قائمة كروت المواعيد المتباعدة */}
        <div className="space-y-4">
          {appointments.map((item) => {
            const statusConfig = getStatusConfig(item.status);
            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-slate-300 relative overflow-hidden"
              >
                {/* شريط جانبي دلالي */}
                <div className={`absolute top-0 bottom-0 right-0 w-1.5 ${statusConfig.bar}`} />

                <div className="p-5 md:p-6 pr-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-100">

                    {/* بيانات المريض */}
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 text-slate-700 rounded-lg border border-slate-200">
                          <UserSquare2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="text-base md:text-lg font-black text-slate-700 leading-none">{item.name}</h2>
                          <p className="text-slate-700 text-xs font-black flex items-center gap-1 mt-1.5" dir="ltr">
                            <Phone size={13} className="text-slate-500 shrink-0" />
                            <span className="font-sans tracking-wide">{item.phone}</span>
                          </p>
                        </div>
                      </div>

                      {/* تفاصيل المتابعة والدور */}
                      <div className="flex flex-wrap gap-2 text-xs pt-0.5">
                        <span className="flex items-center gap-1.5 font-black text-slate-800 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
                          <Stethoscope size={13} className="text-emerald-700 shrink-0" />
                          <span>السبب: {item.visitReason || "غير محدد"}</span>
                        </span>

                        <span className="flex items-center gap-1.5 font-black text-slate-800 bg-indigo-50 px-2.5 py-1.5 rounded-lg border border-indigo-100">
                          <Hash size={13} className="text-indigo-700 shrink-0" />
                          <span>الدور: <span className="font-sans text-indigo-950">{item.queueNumber || "—"}</span></span>
                        </span>

                        <span className="flex items-center gap-1.5 font-black text-slate-800 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
                          <Search size={13} className="text-slate-600 shrink-0" />
                          <span>المتابعة: <span className="font-sans">{item.trackingNumber || "—"}</span></span>
                        </span>
                      </div>
                    </div>

                    {/* التاريخ والبادج */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0">
                      <p className="text-xs md:text-sm font-black text-slate-800 flex items-center gap-1.5">
                        <Calendar size={14} className="text-slate-500" />
                        {new Date(item.appointmentDate).toLocaleDateString("ar-EG", {
                          weekday: "short", year: "numeric", month: "short", day: "numeric",
                        })}
                      </p>
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-black border shadow-sm ${statusConfig.classes}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} inline-block`} />
                        {getStatusName(item.status)}
                      </span>
                    </div>
                  </div>

                  {/* ─── أزرار الإجراءات المتزنة وعالية التباين ─── */}
                  <div className="flex flex-wrap items-center gap-2 mt-4">
{/* زر قبول */}
<button
  onClick={() => updateStatus(item._id, "approved")}
  className="flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-black text-xs transition-colors shadow-sm active:scale-95"
>
  <Check size={14} className="stroke-[3] shrink-0" />
  <span>قبول</span>
</button>

{/* زر رفض */}
<button
  onClick={() => updateStatus(item._id, "rejected")}
  className="flex items-center justify-center gap-1 bg-rose-500 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-black text-xs transition-colors shadow-sm active:scale-95"
>
  <X size={14} className="stroke-[3] shrink-0" />
  <span>رفض</span>
</button>

{/* زر إنهاء */}
<button
  onClick={() => updateStatus(item._id, "completed")}
  className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-black text-xs transition-colors shadow-sm active:scale-95"
>
  <ClipboardCheck size={14} className="stroke-[2.5] shrink-0" />
  <span>انهاء الزيارة</span>
</button>

<div className="hidden md:block w-px h-5 bg-slate-300 mx-0.5" />

{/* زر السجل السريري */}
<Link
  href={`/admin/patients/${item.userId}/medical-record`}
  className="flex items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-black text-xs no-underline transition-colors shadow-sm active:scale-95"
>
  <FileText size={14} className="stroke-[2.5] shrink-0" />
  <span>السجل السريري</span>
</Link>

{/* زر حذف */}
<button
  onClick={() => deleteAppointment(item._id)}
  className="flex items-center justify-center gap-1 mr-auto bg-slate-100 hover:bg-rose-600 text-slate-600 hover:text-slate-600 px-3 py-2 rounded-lg font-black text-xs transition-colors border border-slate-200 hover:border-rose-600 active:scale-95"
  title="حذف نهائي"
>
  <Trash2 size={14} className="shrink-0" />
  <span>حذف</span>
</button>

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