"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { 
  User, 
  Activity, 
  Clock, 
  Pill, 
  FileText, 
  ShieldAlert, 
  Phone, 
  Mail, 
  Calendar,
  AlertCircle,
  TrendingUp
} from "lucide-react";

export default function FullMedicalRecordPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(
          `/api/doctors/patients/${params.id}/full-record`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error loading full medical record:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadData();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3 bg-white p-8 rounded-2xl shadow-md border-2 border-slate-300">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-indigo-700 animate-spin" />
          <span className="text-base font-bold text-slate-900">جاري فحص واستدعاء الملف الشامل...</span>
        </div>
      </div>
    );
  }

  const { user, medicalRecord, latestAppointment, treatments } = data;

  // دالة لتنسيق شارات حالة الزيارة الأخيرة
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return { text: "مؤكدة ومقبولة", classes: "bg-emerald-100 text-emerald-950 border-emerald-400" };
      case "rejected":
        return { text: "مرفوضة", classes: "bg-rose-100 text-rose-950 border-rose-400" };
      case "completed":
        return { text: "مكتملة ومغلقة", classes: "bg-blue-100 text-blue-950 border-blue-400" };
      default:
        return { text: "قيد الانتظار", classes: "bg-amber-100 text-amber-950 border-amber-400" };
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 md:px-8" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* هيدر الصفحة الرئيسي المحمي البنية */}
        <div className="mb-8 border-b-2 border-slate-400 pb-5 flex items-center gap-4">
          <div className="p-3.5 bg-slate-900 text-white rounded-xl shadow-md border border-slate-950">
            <FileText className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-950 tracking-tight">
              الملف السريري والطبي الشامل
            </h1>
            <p className="text-slate-800 text-sm md:text-base font-bold mt-1">
              المرجع المركزي الموحد لبيانات المريض، الفحوصات الحيوية، وسجل الأدوية المتراكم
            </p>
          </div>
        </div>

        {/* القسم الأول: بيانات المريض الشخصية */}
        <div className="bg-white rounded-2xl shadow-md border-2 border-slate-300 overflow-hidden">
          <div className="bg-slate-900 p-4 px-6 border-b border-slate-950 flex items-center gap-2">
            <User className="text-indigo-400 w-5 h-5 stroke-[2.5]" />
            <h2 className="text-base md:text-lg font-bold text-white">البيانات التعريفية للمريض</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-300">
              <span className="text-xs text-slate-700 font-bold block mb-1">اسم المريض الكامل</span>
              <span className="text-base font-bold text-slate-950">{user?.name}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-300">
              <span className="text-xs text-slate-700 font-bold block mb-1 flex items-center gap-1"><Phone size={12}/> رقم الهاتف</span>
              <span className="text-sm font-bold text-slate-950 font-sans block" dir="ltr">{user?.phone}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-300">
              <span className="text-xs text-slate-700 font-bold block mb-1 flex items-center gap-1"><Mail size={12}/> البريد الإلكتروني</span>
              <span className="text-sm font-bold text-slate-950 block truncate">{user?.email || "—"}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-300">
              <span className="text-xs text-slate-700 font-bold block mb-1">العمر المقيد</span>
              <span className="text-base font-bold text-slate-950 font-sans">{medicalRecord?.age ? `${medicalRecord.age} عاماً` : "—"}</span>
            </div>
          </div>
        </div>

        {/* القسم الثاني: المؤشرات الحيوية والتاريخ المرضي */}
        <div className="bg-white rounded-2xl shadow-md border-2 border-slate-300 overflow-hidden">
          <div className="bg-slate-900 p-4 px-6 border-b border-slate-950 flex items-center gap-2">
            <Activity className="text-emerald-400 w-5 h-5 stroke-[2.5]" />
            <h2 className="text-base md:text-lg font-bold text-white">القياسات البدنية والتاريخ الطبي</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 text-indigo-950 p-3 rounded-xl border border-indigo-200">
                <span className="text-xs font-bold block mb-0.5">الوزن الحالي</span>
                <span className="text-base font-bold font-sans">{medicalRecord?.weight ? `${medicalRecord.weight} كجم` : "—"}</span>
              </div>
              <div className="bg-indigo-50 text-indigo-950 p-3 rounded-xl border border-indigo-200">
                <span className="text-xs font-bold block mb-0.5">الطول الرأسي</span>
                <span className="text-base font-bold font-sans">{medicalRecord?.height ? `${medicalRecord.height} سم` : "—"}</span>
              </div>
              <div className="bg-rose-50 text-rose-950 p-3 rounded-xl border border-rose-200 col-span-2">
                <span className="text-xs font-bold block mb-1 flex items-center gap-1"><AlertCircle size={12}/> الأمراض المزمنة المثبتة</span>
                <div className="flex flex-wrap gap-1">
                  {medicalRecord?.chronicDiseases && medicalRecord.chronicDiseases.length > 0 ? (
                    medicalRecord.chronicDiseases.map((cd: string, idx: number) => (
                      <span key={idx} className="bg-rose-700 text-white px-2 py-0.5 rounded-lg text-xs font-bold">
                        {cd}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs font-bold text-slate-600">لا يوجد سجل أمراض مزمنة</span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-300">
                <span className="text-xs text-slate-900 font-bold block mb-1.5 border-b border-slate-200 pb-1">الدافع أو الشكوى لأول زيارة للعيادة</span>
                <p className="text-slate-950 text-sm font-bold leading-relaxed">{medicalRecord?.firstVisitReason || "—"}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-300">
                <span className="text-xs text-slate-900 font-bold block mb-1.5 border-b border-slate-200 pb-1">الوصف والتقييم السريري العام للطبيب</span>
                <p className="text-slate-950 text-sm font-bold leading-relaxed">{medicalRecord?.description || "لا يوجد وصف طبي مضاف."}</p>
              </div>
            </div>
          </div>
        </div>

        {/* القسم الثالث: تفاصيل آخر زيارة للمستشفى/العيادة */}
        {latestAppointment && (
          <div className="bg-white rounded-2xl shadow-md border-2 border-slate-300 overflow-hidden">
            <div className="bg-slate-900 p-4 px-6 border-b border-slate-950 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Clock className="text-amber-400 w-5 h-5 stroke-[2.5]" />
                <h2 className="text-base md:text-lg font-bold text-white">تفاصيل ونتائج آخر زيارة حية</h2>
              </div>
              {latestAppointment.status && (
                <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${getStatusBadge(latestAppointment.status).classes}`}>
                  {getStatusBadge(latestAppointment.status).text}
                </span>
              )}
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-300">
                  <span className="text-xs text-slate-700 font-bold block mb-0.5">سبب الشكوى الفوري</span>
                  <span className="text-sm font-bold text-slate-950">{latestAppointment.visitReason || "—"}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-300">
                  <span className="text-xs text-slate-700 font-bold block mb-0.5">كود المتابعة والتدقيق</span>
                  <span className="text-sm font-bold text-slate-950 font-sans">{latestAppointment.trackingNumber || "—"}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-300">
                  <span className="text-xs text-slate-700 font-bold block mb-0.5">هاتف الطوارئ البديل</span>
                  <span className="text-sm font-bold text-slate-950 font-sans block" dir="ltr">{latestAppointment.emergencyPhone || "—"}</span>
                </div>
              </div>
              {latestAppointment.notes && (
                <div className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-200">
                  <span className="text-xs text-amber-950 font-bold block mb-1">ملاحظات الزيارة المرفقة:</span>
                  <p className="text-slate-950 text-xs md:text-sm font-bold">{latestAppointment.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* القسم الرابع: الأرشيف المتتابع للروشتات والعلاجات السابقة */}
        <div className="bg-white rounded-2xl shadow-md border-2 border-slate-300 overflow-hidden">
          <div className="bg-slate-900 p-4 px-6 border-b border-slate-950 flex items-center gap-2">
            <Pill className="text-indigo-400 w-5 h-5 stroke-[2.5]" />
            <h2 className="text-base md:text-lg font-bold text-white">سجل العلاجات والروشتات الصادرة</h2>
          </div>
          <div className="p-6">
            {treatments?.length === 0 ? (
              <div className="text-center py-6 text-slate-600 font-bold text-sm">
                * لم يتم صرف أو تدوين أي عقاقير أو خطط علاجية سابقة لهذا المريض حتى الآن.
              </div>
            ) : (
              <div className="space-y-4">
                {treatments?.map((item: any) => (
                  <div key={item._id} className="border-2 border-slate-200 rounded-xl p-4 md:p-5 bg-slate-50/50 space-y-3">
                    
                    {/* ترويسة التشخيص الفردي */}
                    <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-2 gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-700" />
                        <h3 className="font-bold text-slate-950 text-sm md:text-base">{item.diagnosis}</h3>
                      </div>
                      <span className="bg-slate-200 text-slate-950 border border-slate-300 px-3 py-1 rounded-lg text-xs font-bold font-sans flex items-center gap-1">
                        <Calendar size={12} className="text-slate-700" />
                        {new Date(item.createdAt).toLocaleDateString("ar-EG")}
                      </span>
                    </div>

                    {/* تفاصيل خطة الدواء والإرشادات */}
                    <div className="space-y-2 text-xs md:text-sm">
                      <p className="text-slate-950 font-bold">
                        <span className="text-emerald-800 font-bold ml-1">العلاج الموصوف (Rx):</span>
                        {item.treatment}
                      </p>
                      <p className="text-slate-950 font-bold">
                        <span className="text-indigo-900 font-bold ml-1">تعليمات الاستخدام:</span>
                        {item.instructions || "—"}
                      </p>
                      <p className="text-slate-950 font-bold">
                        <span className="text-amber-900 font-bold ml-1">ملاحظات الطبيب المرافقة:</span>
                        {item.notes || "—"}
                      </p>
                      
                      {item.nextVisit && (
                        <div className="pt-2 flex items-center gap-1 text-[11px] text-blue-900 font-bold">
                          <TrendingUp size={12} />
                          <span>تاريخ مراجعة الاستشارة القادمة الموصى بها:</span>
                          <span className="font-sans underline decoration-blue-400 font-bold">
                            {new Date(item.nextVisit).toLocaleDateString("ar-EG")}
                          </span>
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}