"use client";

import Link from "next/link";
import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { 
  History, 
  Pill, 
  Calendar, 
  StickyNote, 
  ShieldAlert, 
  Activity, 
  Clock 
} from "lucide-react";

export default function TreatmentsHistoryPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const [treatments, setTreatments] = useState<any[]>([]);

const disableTreatment = async (
  id: string
) => {

  const ok = confirm(
    "هل تريد إيقاف هذا العلاج؟"
  );

  if (!ok) return;

  await axios.delete(
    `/api/doctor/treatments/${id}`
  );

  setTreatments((prev) =>
    prev.filter(
      (item) => item._id !== id
    )
  );
};

  useEffect(() => {
    const loadTreatments = async () => {
      try {
        const { data } = await axios.get(
          `/api/doctors/patients/${params.id}/treatments`
        );
        setTreatments(data.treatments);
      } catch (error) {
        console.error("Error loading treatments history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadTreatments();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3 bg-white p-8 rounded-2xl shadow-md border-2 border-slate-300">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-indigo-700 animate-spin" />
          <span className="text-base font-bold text-slate-900">جاري مراجعة الأرشيف الطبي...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 md:px-8" dir="rtl">
      <div className="max-w-4xl mx-auto">

        {/* هيدر الصفحة الرئيسي بالطابع الطبي الزاهي */}
        <div className="mb-8 border-b-2 border-slate-400 pb-5">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-slate-900 text-white rounded-xl shadow-md border border-slate-950">
              <History className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-950 tracking-tight">
                السجل التاريخي للتشخيصات والعلاجات
              </h1>
              <p className="text-slate-800 text-sm md:text-base font-bold mt-1">
                عرض أرشيفي شامل لكافة الروشتات الصادرة والزيارات السابقة للمريض
              </p>
            </div>
          </div>
        </div>

        {/* حالة عدم وجود سجلات علاجية سابقة */}
        {treatments.length === 0 && (
          <div className="bg-white p-14 rounded-2xl text-center shadow border-2 border-slate-300 max-w-md mx-auto">
            <Activity className="w-10 h-10 text-slate-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-xl font-bold text-slate-950">ملف تاريخي خالي</h2>
            <p className="text-slate-700 font-bold text-sm mt-2">لا توجد أي وصفات طبية أو تقارير علاجية مسجلة لهذا المريض مسبقاً.</p>
          </div>
        )}

        {/* قائمة كروت خطوط العلاج الزاهية والبارزة */}
        <div className="space-y-6">
          {treatments.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md border-2 border-slate-300 overflow-hidden"
            >
              {/* رأس الكارت الخاص بالزيارات: يعرض التشخيص الحاد والتاريخ الساطع */}
              <div className="bg-slate-900 p-4 px-6 border-b-2 border-slate-950 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-indigo-700 text-white px-2 py-1 rounded font-bold">التشخيص</span>
                  <h2 className="text-base md:text-lg font-bold text-white tracking-tight">
                    {item.diagnosis}
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800 text-indigo-500 border border-slate-700 px-4.5 py-1.5 rounded-xl text-xs font-bold font-sans shadow-sm">
                  <Calendar size={14} className="text-indigo-400 stroke-[2.5]" />
                  <span>
                    {new Date(item.createdAt).toLocaleDateString("ar-EG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* تفاصيل الروشتة السابقة */}
              <div className="p-5 md:p-6 space-y-5">
                
                {/* صندوق العلاج المصرف الخارق المقروئية */}
                <div className="bg-emerald-50/50 p-4 rounded-xl border-2 border-emerald-300">
                  <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5 mb-2 border-b border-emerald-200 pb-1.5">
                    <Pill size={16} className="text-emerald-700 stroke-[2.5]" />
                    <span>الخطة الدوائية المصروفة (Rx)</span>
                  </h3>
                  <p className="text-slate-950 text-sm font-bold whitespace-pre-line leading-relaxed">
                    {item.treatment}
                  </p>
                </div>

                {/* شبكة تفاصيل الإرشادات والملاحظات */}
                <div className="grid md:grid-cols-2 gap-4">
                  
                  {/* تعليمات المريض */}
                  <div className="bg-slate-50 p-4 rounded-xl border-2 border-slate-300">
                    <h3 className="text-xs font-bold text-slate-950 flex items-center gap-1.5 mb-2 border-b border-slate-200 pb-1.5">
                      <ShieldAlert size={15} className="text-indigo-800 stroke-[2.5]" />
                      <span>إرشادات الطبيب للمريض</span>
                    </h3>
                    <p className="text-slate-950 text-xs md:text-sm font-bold leading-relaxed">
                      {item.instructions || "لا توجد تعليمات استثنائية مسجلة."}
                    </p>
                  </div>

                  {/* ملاحظات الطبيب */}
                  <div className="bg-slate-50 p-4 rounded-xl border-2 border-slate-300">
                    <h3 className="text-xs font-bold text-slate-950 flex items-center gap-1.5 mb-2 border-b border-slate-200 pb-1.5">
                      <StickyNote size={15} className="text-amber-800 stroke-[2.5]" />
                      <span>الملاحظات الطبية المرفقة</span>
                    </h3>
                    <p className="text-slate-950 text-xs md:text-sm font-bold leading-relaxed">
                      {item.notes || "لا توجد ملاحظات إضافية لهذه الزيارة."}
                    </p>
                  </div>

                </div>

                {/* موعد المراجعة والاستشارة إن وجد */}
                {item.nextVisit && (
                  <div className="pt-3 border-t-2 border-dashed border-slate-200 flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-950 border border-blue-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-bold">
                      <Clock size={14} className="text-blue-800 stroke-[2.5]" />
                      <span>موعد الاستشارة القادمة المقررة:</span>
                      <span className="font-sans font-bold underline decoration-blue-500 decoration-2">
                        {new Date(item.nextVisit).toLocaleDateString("ar-EG", {
                          weekday: "long",
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </span>
                    </div>
                  </div>
                )}
<div className="flex flex-wrap gap-3 mt-6">

  <Link
    href={`/doctor/treatments/edit/${item._id}`}
    className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-xl font-bold no-underline"
  >
    تعديل العلاج
  </Link>

  <button
    onClick={() =>
      disableTreatment(
        item._id
      )
    }
    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-bold"
  >
    إيقاف العلاج
  </button>

</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}