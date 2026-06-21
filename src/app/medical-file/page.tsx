"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  HeartPulse,
  User,
  Scale,
  Ruler,
  Droplet,
  Activity,
  Pill,
  FileText,
  Pencil,
  Plus,
  ShieldAlert,
  Loader2,
  FolderHeart,
  ChevronLeft,
  FlameKindling
} from "lucide-react";

export default function MedicalFileView() {
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState<any>(null);

  useEffect(() => {
    const loadRecord = async () => {
      try {
        const { data } = await axios.get("/api/medical-record/me");
        setRecord(data.record);
      } catch (error) {
        console.error("Error loading medical record:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRecord();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-9 h-9 animate-spin text-emerald-600" />
          <span className="text-base font-black text-slate-800">جاري قراءة وتجهيز ملفك الصحي...</span>
        </div>
      </div>
    );
  }

  // تصميم شاشة "لا يوجد ملف" بشكل يفتح النفس ويحفز المستخدم
  if (!record) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4" dir="rtl">
        <div className="bg-white rounded-3xl p-10 shadow-2xl shadow-slate-300 border border-slate-200 text-center max-w-lg w-full relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
          
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-md border border-emerald-100">
            <FolderHeart className="w-11 h-11" />
          </div>

          <h1 className="text-2xl font-black text-slate-900">ملفك الطبي فارغ تماماً!</h1>
          <p className="text-slate-700 font-medium text-base mt-3 leading-relaxed">
            مرحباً بك! لم تقم بإضافة مؤشراتك الحيوية أو تاريخك المرضي حتى الآن. سجل بياناتك الآن لتسهيل تشخيصك في المستقبل.
          </p>

          <Link
            href="/medical-file/edit"
            className="mt-8 inline-flex items-center justify-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 rounded-xl font-black text-base shadow-lg shadow-emerald-200 no-underline transition-all transform hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <Plus size={20} />
            إنشاء ملفك الطبي الآن
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto">
        
        {/* الهيدر الفخم العلوي */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8 border-b-2 border-slate-200 pb-6">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-md shadow-emerald-200">
              <HeartPulse className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900">ملفي الصحي الرقمي</h1>
              <p className="text-slate-600 text-sm font-bold mt-0.5">مراجعة شاملة وموثقة لبياناتك السريرية الحالية</p>
            </div>
          </div>

          <Link
            href="/medical-file/edit"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-6 py-3.5 rounded-xl font-black text-base shadow-md no-underline transition-all"
          >
            <Pencil size={18} className="text-emerald-400" />
            تعديل الملف الطبي
          </Link>
        </div>

        {/* شبكة البيانات اللامعة */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* كارت المؤشرات الحيوية الدائرية الفخمة */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-300/40 border-2 border-slate-200 md:col-span-1 flex flex-col justify-between">
            <div>
              <h2 className="font-black text-lg text-slate-900 mb-6 flex items-center gap-2 border-r-4 border-emerald-600 pr-2">
                المؤشرات الحيوية
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                
                {/* العمر */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center">
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl mb-2">
                    <User size={20} />
                  </div>
                  <span className="text-xs text-slate-500 font-bold block">العمر</span>
                  <span className="text-base font-black text-slate-900 mt-0.5">{record.age || "-"} سنة</span>
                </div>

                {/* النوع */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center">
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl mb-2">
                    <User size={20} />
                  </div>
                  <span className="text-xs text-slate-500 font-bold block">الجنس</span>
                  <span className="text-base font-black text-slate-900 mt-0.5">
                    {record.gender === "male" ? "ذكر" : record.gender === "female" ? "أنثى" : "-"}
                  </span>
                </div>

                {/* الوزن */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center">
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl mb-2">
                    <Scale size={20} />
                  </div>
                  <span className="text-xs text-slate-500 font-bold block">الوزن</span>
                  <span className="text-base font-black text-slate-900 mt-0.5">{record.weight || "-"} كجم</span>
                </div>

                {/* الطول */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center">
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl mb-2">
                    <Ruler size={20} />
                  </div>
                  <span className="text-xs text-slate-500 font-bold block">الطول</span>
                  <span className="text-base font-black text-slate-900 mt-0.5">{record.height || "-"} سم</span>
                </div>

              </div>
            </div>

            {/* فصيلة الدم المميزة أسفل الكارت */}
            <div className="mt-5 bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplet className="text-rose-600 w-6 h-6 animate-pulse" />
                <span className="text-sm font-black text-rose-950">فصيلة الدم المعتمدة:</span>
              </div>
              <span className="text-xl font-mono font-black text-rose-700 bg-white border border-rose-300 px-3 py-1 rounded-xl shadow-sm">
                {record.bloodType || "غير محددة"}
              </span>
            </div>
          </div>

          {/* كارت الحساسية والتحذيرات الطبية المرضية */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-300/40 border-2 border-slate-200 md:col-span-2 space-y-5">
            <h2 className="font-black text-lg text-slate-900 flex items-center gap-2 border-r-4 border-emerald-600 pr-2">
              المحاذير الطبية والأدوية
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-sm font-black text-slate-900 flex items-center gap-1.5 mb-1">
                  <Activity size={16} className="text-rose-600" />
                  الأمراض المزمنة الموثقة
                </span>
                <p className="text-base font-bold text-slate-800 leading-relaxed">
                  {record.chronicDiseases || "لا توجد أمراض مزمنة مسجلة في ملفك."}
                </p>
              </div>

              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200">
                <span className="text-sm font-black text-amber-950 flex items-center gap-1.5 mb-1">
                  <ShieldAlert size={16} className="text-amber-700" />
                  الحساسية تجاه العقاقير والأدوية
                </span>
                <p className="text-base font-bold text-amber-950 leading-relaxed">
                  {record.drugAllergies || "لا توجد أي حساسية دوائية معروفة."}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-sm font-black text-slate-900 flex items-center gap-1.5 mb-1">
                  <Pill size={16} className="text-indigo-600" />
                  العلاجات الدوائية المنتظمة الحالية
                </span>
                <p className="text-base font-bold text-slate-800 leading-relaxed">
                  {record.currentMedications || "لا توجد أدوية حالية تؤخذ بانتظام."}
                </p>
              </div>
            </div>
          </div>

          {/* كارت عريض يشمل السجل الطبي والعمليات الجراحية */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-300/40 border-2 border-slate-200 md:col-span-3 space-y-6">
            <h2 className="font-black text-lg text-slate-900 flex items-center gap-2 border-r-4 border-emerald-600 pr-2">
              تفاصيل السجل الطبي العام والزيارات
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm mb-2 border-b border-slate-200 pb-2">
                  <FlameKindling size={16} className="text-emerald-600" />
                  سبب أول زيارة عيادية
                </div>
                <p className="text-slate-800 font-bold text-base leading-relaxed">
                  {record.firstVisitReason || "لم يتم تدوين السبب الأولي."}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm mb-2 border-b border-slate-200 pb-2">
                  <Pill size={16} className="text-slate-600" />
                  العمليات الجراحية السابقة
                </div>
                <p className="text-slate-800 font-bold text-base leading-relaxed">
                  {record.previousOperations || "لا توجد عمليات جراحية سابقة مسجلة."}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm mb-2 border-b border-slate-200 pb-2">
                  <User size={16} className="text-slate-600" />
                  الأمراض الوراثية بالعائلة
                </div>
                <p className="text-slate-800 font-bold text-base leading-relaxed">
                  {record.familyDiseases || "لا يوجد تاريخ لأمراض وراثية عائلية."}
                </p>
              </div>

            </div>

            {/* الوصف الطبي الشامل أسفلهم على العرض بالكامل */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-black text-sm mb-3 border-b border-slate-200 pb-2">
                <FileText size={18} className="text-emerald-600" />
                الوصف التشخيصي الطبي التفصيلي المعتمَد للحالة
              </div>
              <p className="text-slate-800 font-bold text-base leading-relaxed whitespace-pre-line">
                {record.medicalDescription || "لا توجد ملاحظات أو توصيف سريري مضاف حالياً."}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}