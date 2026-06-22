"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Pill,
  CalendarDays,
  FileText,
  ClipboardList,
  HeartPulse,
  Activity
} from "lucide-react";

export default function TreatmentPage() {
  const [loading, setLoading] = useState(true);
  const [treatments, setTreatments] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await axios.get("/api/patient/treatments");
        setTreatments(data.treatments);
      } catch (error) {
        console.error("Error loading patient treatments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3 bg-white p-8 rounded-2xl shadow-md border-2 border-slate-300">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-indigo-700 animate-spin" />
          <span className="text-base font-bold text-slate-900">جاري استدعاء الجداول العلاجية الحالية...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 md:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">

        {/* ترويسة خطة العلاج والمتابعة للمريض بالطابع الطبي الداكن */}
        <div className="mb-8 border-b-2 border-slate-400 pb-5 flex items-center gap-4">
          <div className="p-3.5 bg-slate-900 text-white rounded-xl shadow-md border border-slate-950">
            <Activity className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-950 tracking-tight">
              خطة العلاج والوصفات الطبية الحالية
            </h1>
            <p className="text-slate-800 text-sm md:text-base font-bold mt-1">
              مراجعة مباشرة للجرعات اليومية الموصوفة والتعليمات المباشرة من الطبيب المعالج
            </p>
          </div>
        </div>

        {/* في حال عدم وجود أي خطط علاجية نشطة */}
        {treatments.length === 0 && (
          <div className="bg-white rounded-2xl p-14 text-center border-2 border-slate-300 max-w-md mx-auto shadow-sm">
            <Pill size={48} className="mx-auto text-slate-400 mb-4 stroke-[1.8]" />
            <h2 className="text-xl font-bold text-slate-950">لا توجد خطة علاجية مضافة</h2>
            <p className="text-slate-700 font-bold text-xs mt-1.5">الملف الدوائي الخاص بك خالٍ من أي وصفات طبية مسجلة حالياً.</p>
          </div>
        )}

        {/* قائمة الكروت العلاجية المحكمة البنية */}
        <div className="space-y-6">
          {treatments.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md border-2 border-slate-300 overflow-hidden"
            >
              
              {/* ترويسة الكارت: عرض التشخيص بوضوح والتاريخ الدقيق */}
              <div className="bg-slate-900 p-4 px-6 border-b-2 border-slate-950 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-indigo-700 text-white px-2 py-1 rounded font-bold">التشخيص الحالي</span>
                  <h2 className="text-base md:text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                    <HeartPulse size={18} className="text-rose-500 stroke-[2.5]" />
                    <span>{item.diagnosis}</span>
                  </h2>
                </div>
                <span className="bg-slate-800  text-indigo-700  border border-slate-700 px-4.5 py-1.5 rounded-xl text-xs font-bold font-sans shadow-sm flex items-center gap-1.5">
                  <CalendarDays size={14} className=" text-indigo-700 stroke-[2.5]" />
                  <span>
                    {new Date(item.createdAt).toLocaleDateString("ar-EG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </span>
              </div>

              {/* تفاصيل خطة العلاج والتوجيهات السريرية */}
              <div className="p-5 md:p-6 space-y-5">
                
                <div className="grid md:grid-cols-2 gap-4">
                  
                  {/* قسم الأدوية المصروفة (العلاج) */}
                  <div className="bg-emerald-50/60 p-4 rounded-xl border-2 border-emerald-300">
                    <div className="flex items-center gap-2 mb-2 border-b border-emerald-200 pb-1.5">
                      <Pill className="text-emerald-800 w-5 h-5 stroke-[2.5]" />
                      <h3 className="font-bold text-emerald-950 text-sm">
                        العقاقير والجرعات الدوائية المقررة (Rx)
                      </h3>
                    </div>
                    <p className="text-slate-950 text-sm font-bold whitespace-pre-line leading-relaxed">
                      {item.treatment}
                    </p>
                  </div>

                  {/* قسم تعليمات واستخدام العلاج للمريض */}
                  <div className="bg-slate-50 p-4 rounded-xl border-2 border-slate-300">
                    <div className="flex items-center gap-2 mb-2 border-b border-slate-200 pb-1.5">
                      <FileText className="text-indigo-800 w-5 h-5 stroke-[2.5]" />
                      <h3 className="font-bold text-slate-950 text-sm">
                        إرشادات وتوجيهات الطبيب الخاصة
                      </h3>
                    </div>
                    <p className="text-slate-950 text-xs md:text-sm font-bold leading-relaxed">
                      {item.instructions || "يرجى اتباع الجرعات المحددة دون تعديل."}
                    </p>
                  </div>

                </div>

                {/* الملاحظات الإضافية الملحقة */}
                <div className="bg-amber-50/50 p-4 rounded-xl border-2 border-amber-300">
                  <div className="flex items-center gap-2 mb-2 border-b border-amber-200 pb-1.5">
                    <ClipboardList className="text-amber-800 w-5 h-5 stroke-[2.5]" />
                    <h3 className="font-bold text-amber-950 text-xs md:text-sm">
                      تنويهات وملاحظات الطبيب المرفقة
                    </h3>
                  </div>
                  <p className="text-slate-950 text-xs md:text-sm font-bold leading-relaxed">
                    {item.notes || "لا توجد تنويهات استثنائية لهذه الروشتة."}
                  </p>
                </div>

                {/* المراجعة أو موعد الزيارة الاستشارية القادمة */}
                {item.nextVisit && (
                  <div className="pt-3 border-t-2 border-dashed border-slate-200 flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-950 border border-blue-300 px-4 py-2 rounded-xl flex items-center gap-2 text-xs md:text-sm font-bold">
                      <CalendarDays size={16} className="text-blue-800 stroke-[2.5]" />
                      <span>موعد الزيارة والاستشارة القادمة لإعادة التقييم:</span>
                      <span className="font-sans font-bold underline decoration-blue-500 decoration-2">
                        {new Date(item.nextVisit).toLocaleDateString("ar-EG", {
                          weekday: "long",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}