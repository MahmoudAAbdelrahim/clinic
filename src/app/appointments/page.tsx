"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { CalendarDays, Hash, FileText, CheckCircle2, Clock, AlertTriangle, XCircle, Loader2 } from "lucide-react";

interface Appointment {
  _id: string;
  trackingNumber: string;
  queueNumber: number;
  appointmentDate: string;
  visitReason: string;
  status: string;
}

export default function AppointmentsPage() {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const { data } = await axios.get("/api/appointments/my");
        setAppointments(data.appointments || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, []);

  // دالة ذكية لطباعة اليوم والتشكيل العربي الصحيح للتاريخ
  const formatFullDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long", // يطبع اسم اليوم (السبت، الأحد، الخ)
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("ar-EG", options);
  };

  // دالة ترجمة حالات الحجز مع أيقوناتها بطريقة احترافية
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-black bg-amber-100 border-2 border-amber-300 text-amber-950">
            <Clock className="w-4 h-4 text-amber-700" />
            في انتظار التأكيد
          </span>
        );
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-black bg-emerald-100 border-2 border-emerald-300 text-emerald-950">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            تم تأكيد الموعد
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-black bg-blue-100 border-2 border-blue-300 text-blue-950">
            <CheckCircle2 className="w-4 h-4 text-blue-700" />
            اكتملت الزيارة
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-black bg-rose-100 border-2 border-rose-300 text-rose-950">
            <XCircle className="w-4 h-4 text-rose-700" />
            ملغي
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-9 h-9 animate-spin text-emerald-600" />
          <span className="text-base font-black text-slate-800">جاري جلب جدول مواعيدك الطبية...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto">
        
        {/* الهيدر الخاص بالصفحة */}
        <div className="flex items-center justify-between mb-8 border-b-2 border-slate-200 pb-5">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-3">
            <CalendarDays className="text-emerald-600 w-8 h-8" />
            سجل مواعيدي الطبية
          </h1>
          <span className="bg-emerald-600 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-sm font-mono">
            {appointments.length} حجز
          </span>
        </div>

        {/* حالة عدم وجود مواعيد */}
        {appointments.length === 0 && (
          <div className="bg-white p-12 rounded-3xl shadow-2xl shadow-slate-300/50 border border-slate-200 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-slate-900">لا توجد أي مواعيد مسجلة حالياً</h2>
            <p className="text-slate-600 font-bold text-sm mt-2">عند قيامك بحجز موعد جديد في العيادة، سيظهر لك هنا فوراً.</p>
          </div>
        )}

        {/* قائمة الكروت الفخمة للمواعيد */}
        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-300/40 border-2 border-slate-200 relative overflow-hidden transition-all hover:border-emerald-500 hover:shadow-2xl hover:shadow-slate-300/60"
            >
              {/* شريط المظهر الجانبي الأنيق حسب حالة الموعد */}
              <div className={`absolute top-0 bottom-0 right-0 w-2.5 ${
                appointment.status === "confirmed" ? "bg-emerald-500" : 
                appointment.status === "pending" ? "bg-amber-500" : 
                appointment.status === "completed" ? "bg-blue-500" : "bg-rose-500"
              }`}></div>

              {/* الجزء العلوي للكارت */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b-2 border-slate-100 pb-5">
                <div className="space-y-1.5 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-900 text-white text-xs font-black px-2.5 py-1 rounded-lg">رقم الدور</span>
                    <h3 className="font-black text-2xl text-slate-900 font-mono">
                      #{appointment.queueNumber}
                    </h3>
                  </div>
                  <p className="text-slate-800 text-base font-bold flex items-center gap-1">
                    <Hash className="w-4 h-4 text-slate-500" />
                    رقم المتابعة الحصري: 
                    <span className="font-mono text-emerald-700 font-black tracking-wide mr-1">{appointment.trackingNumber}</span>
                  </p>
                </div>
                
                {/* كبسولة الحالة */}
                <div className="shrink-0">
                  {getStatusBadge(appointment.status)}
                </div>
              </div>

              {/* الجزء السفلي: تفاصيل الوقت والسبب بوضوح شديد */}
              <div className="mt-5 grid md:grid-cols-2 gap-6 pr-3">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <p className="text-slate-900 font-black text-sm flex items-center gap-1.5 mb-2">
                    <CalendarDays className="w-4 h-4 text-emerald-600" />
                    تاريخ وتوقيت الكشف
                  </p>
                  {/* يطبع اليوم والـ Date الرقمي جنباً إلى جنب بشكل مثالي */}
                  <p className="text-slate-900 font-black text-base">
                    {formatFullDate(appointment.appointmentDate)}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <p className="text-slate-900 font-black text-sm flex items-center gap-1.5 mb-2">
                    <FileText className="w-4 h-4 text-slate-600" />
                    السبب الرئيسي للزيارة
                  </p>
                  <p className="text-slate-800 font-bold text-base leading-relaxed">
                    {appointment.visitReason}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}