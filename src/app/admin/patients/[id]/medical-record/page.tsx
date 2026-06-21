"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  FileHeart, 
  Pencil, 
  Activity, 
  History, 
  ClipboardList, 
  Loader2, 
  AlertTriangle,
  Layers,
  Users
} from "lucide-react";

export default function MedicalRecordPage() {
  const params = useParams();
  const [record, setRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecord = async () => {
      try {
        const { data } = await axios.get(
          `/api/admin/patients/${params.id}/medical-record`
        );
        setRecord(data.record);
      } catch (error) {
        console.error("Error loading medical record:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) loadRecord();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-9 h-9 animate-spin text-emerald-600" />
          <span className="text-base font-black text-slate-800">جاري استدعاء الملف الطبي...</span>
        </div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6" dir="rtl">
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-xl max-w-md w-full">
          <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-100">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">لا يوجد ملف طبي</h2>
          <p className="text-slate-600 font-bold text-sm mt-2 mb-6">
            هذا المريض ليس لديه سجل طبي معتمد حالياً بالنظام.
          </p>
          <Link
            href={`/admin/patients/${params.id}/medical-record/edit`}
            className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-black text-base transition-all shadow-lg shadow-emerald-200 no-underline"
          >
            إنشاء ملف طبي الآن
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 md:px-8" dir="rtl">
      <div className="max-w-5xl mx-auto">
        
        {/* الهيدر الفخم */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8 border-b-2 border-slate-200 pb-6">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-600/20">
              <FileHeart className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900">الملف السريري الشامل</h1>
              <p className="text-slate-600 text-sm font-bold mt-0.5">مراجعة الفحوصات الحيوية والتاريخ المرضي والوصف الطبي</p>
            </div>
          </div>

          <Link
            href={`/admin/patients/${params.id}/medical-record/edit`}
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-3.5 rounded-xl font-black text-base shadow-lg shadow-emerald-200 no-underline transition-all transform hover:-translate-y-0.5"
          >
            <Pencil size={16} />
            تعديل وتحديث الملف
          </Link>
        </div>

        {/* شبكة البيانات */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* كارت البيانات الأساسية والحيوية */}
          <div className="bg-white p-6 rounded-3xl shadow-md shadow-slate-200/60 border border-slate-200">
            <div className="flex items-center gap-2.5 mb-5 border-b border-slate-100 pb-3 text-emerald-700">
              <Activity size={22} className="shrink-0" />
              <h3 className="font-black text-lg text-slate-900">المؤشرات الحيوية الأساسية</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm">
                <span className="block text-slate-500 font-bold mb-0.5">العمر</span>
                <span className="font-black text-slate-900 text-base">{record.age ? `${record.age} عاماً` : "—"}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm">
                <span className="block text-slate-500 font-bold mb-0.5">الجنس</span>
                <span className="font-black text-slate-900 text-base">{record.gender === "male" ? "ذكر" : record.gender === "female" ? "أنثى" : record.gender || "—"}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm">
                <span className="block text-slate-500 font-bold mb-0.5">الوزن</span>
                <span className="font-black text-slate-900 text-base">{record.weight ? `${record.weight} كجم` : "—"}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm">
                <span className="block text-slate-500 font-bold mb-0.5">الطول</span>
                <span className="font-black text-slate-900 text-base">{record.height ? `${record.height} سم` : "—"}</span>
              </div>
              <div className="bg-rose-50/40 p-3 rounded-xl border border-rose-100/70 text-sm col-span-2 text-center">
                <span className="block text-rose-700 font-black mb-0.5">فصيلة الدم</span>
                <span className="font-black text-rose-950 text-xl">{record.bloodType || "غير محددة"}</span>
              </div>
            </div>
          </div>

          {/* كارت التاريخ المرضي والحساسية والعمليات والوراثة */}
          <div className="bg-white p-6 rounded-3xl shadow-md shadow-slate-200/60 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-5 border-b border-slate-100 pb-3 text-emerald-700">
                <History size={22} className="shrink-0" />
                <h3 className="font-black text-lg text-slate-900">التاريخ الطبي والتحذيرات</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-black text-slate-500 mb-1">الأمراض المزمنة</h4>
                  <p className="text-sm font-bold text-slate-900 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {record.chronicDiseases || "لا توجد أمراض مزمنة مسجلة"}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-black text-rose-600 mb-1">الحساسية ضد الأدوية</h4>
                  <p className="text-sm font-black text-rose-950 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100/60">
                    {record.drugAllergies || "لا توجد حساسية تجاه أدوية معينة"}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-black text-slate-500 mb-1">الأدوية الحالية المستمرة</h4>
                  <p className="text-sm font-bold text-slate-900 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {record.currentMedications || "لا يتناول أدوية بشكل مستمر"}
                  </p>
                </div>

                {/* الحقول المضافة حديثاً */}
                <div className="pt-1 border-t border-dashed border-slate-200 grid grid-cols-1 gap-3">
                  <div>
                    <h4 className="text-xs font-black text-slate-500 mb-1 flex items-center gap-1">
                      <Layers size={13} className="text-slate-400" />
                      العمليات الجراحية السابقة
                    </h4>
                    <p className="text-sm font-bold text-slate-900 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {record.previousOperations || "لم يخضع لعمليات جراحية سابقة مسجلة"}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-500 mb-1 flex items-center gap-1">
                      <Users size={13} className="text-slate-400" />
                      الأمراض الوراثية العائلية
                    </h4>
                    <p className="text-sm font-bold text-slate-900 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {record.familyDiseases || "لا يوجد تاريخ لأمراض وراثية عائلية"}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* كارت الوصف الطبي المفصل */}
          <div className="bg-white p-6 rounded-3xl shadow-md shadow-slate-200/60 border border-slate-200 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5 border-b border-slate-100 pb-3 text-emerald-700">
              <ClipboardList size={22} className="shrink-0" />
              <h3 className="font-black text-lg text-slate-900">الوصف والتقرير التشخيصي للمريض</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-emerald-50/30 p-4 rounded-2xl border border-emerald-100">
                <h4 className="text-xs font-black text-emerald-800 mb-1.5">سبب الزيارة الأولى للمستشفى/العيادة:</h4>
                <p className="text-sm font-bold text-slate-900 leading-relaxed">
                  {record.firstVisitReason || "لم يتم تدوين سبب الزيارة الأولى."}
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
                <h4 className="text-xs font-black text-slate-500 mb-2">التشخيص الطبي العام وتفاصيل الحالة:</h4>
                <p className="text-base font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                  {record.medicalDescription || "لا توجد تفاصيل إضافية مكتوبة للحالة."}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}