"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Pill, 
  FileSpreadsheet, 
  StickyNote, 
  CalendarDays, 
  HeartPulse, 
  FileEdit, 
  Save, 
  ChevronRight 
} from "lucide-react";

export default function EditTreatmentPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    diagnosis: "",
    treatment: "",
    instructions: "",
    notes: "",
    nextVisit: "",
  });

  useEffect(() => {
    const loadTreatment = async () => {
      try {
        const { data } = await axios.get(
          `/api/doctors/treatments/${params.id}`
        );

        setForm({
          diagnosis: data.treatment.diagnosis,
          treatment: data.treatment.treatment,
          instructions: data.treatment.instructions || "",
          notes: data.treatment.notes || "",
          nextVisit: data.treatment.nextVisit?.split("T")[0] || "",
        });
      } catch (error) {
        console.error("Error loading treatment:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadTreatment();
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await axios.put(`/api/doctors/treatments/${params.id}`, form);
      router.back();
    } catch (error) {
      console.error("Error updating treatment:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3 bg-white p-8 rounded-2xl shadow-md border-2 border-slate-300">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-indigo-700 animate-spin" />
          <span className="text-base font-bold text-slate-900">جاري جلب بيانات الروشتة...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 md:px-8" dir="rtl">
      <div className="max-w-3xl mx-auto">
        
        {/* زر العودة العلوي الذكي */}
        <button 
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-1 text-slate-800 hover:text-indigo-950 font-bold text-sm mb-4 transition-colors"
        >
          <ChevronRight size={16} className="stroke-[2.5]" />
          <span>إلغاء والعودة للخلف</span>
        </button>

        {/* كارت تعديل الروشتة الرئيسي */}
        <div className="bg-white rounded-2xl shadow-md border-2 border-slate-300 overflow-hidden">
          
          {/* هيدر النموذج بالطابع الطبي الداكن والزاهي */}
          <div className="bg-slate-900 p-5 px-6 border-b-2 border-slate-950 flex items-center gap-3">
            <div className="p-2 bg-indigo-700 text-white rounded-lg">
              <FileEdit size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                تعديل خطة العلاج والروشتة الصادرة
              </h1>
              <p className="text-slate-300 text-xs font-bold mt-0.5">
                تحديث بيانات التشخيص السريري، جرعات الأدوية المصاحبة أو مواعيد الاستشارة
              </p>
            </div>
          </div>

          {/* استمارة التعديل والإدخال الفوري */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* 1. حقل التشخيص */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                <HeartPulse size={16} className="text-rose-700 stroke-[2.5]" />
                <span>التشخيص السريري المعدل (Diagnosis)</span>
              </label>
              <textarea
                rows={3}
                placeholder="تحديث تفاصيل التشخيص الحالي..."
                className="w-full border-2 border-slate-300 p-4 rounded-xl text-slate-950 font-bold text-sm bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none transition-all"
                value={form.diagnosis}
                onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
                required
              />
            </div>

            {/* 2. حقل خطة العلاج */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                <Pill size={16} className="text-emerald-700 stroke-[2.5]" />
                <span>تحديث خطة الأدوية والجرعات (Rx)</span>
              </label>
              <textarea
                rows={4}
                placeholder="تعديل أسماء الأدوية أو الجرعات المصروفة للمريض..."
                className="w-full border-2 border-slate-300 p-4 rounded-xl text-slate-950 font-bold text-sm bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none transition-all"
                value={form.treatment}
                onChange={(e) => setForm({ ...form, treatment: e.target.value })}
                required
              />
            </div>

            {/* 3. حقل تعليمات الطبيب */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                <FileSpreadsheet size={16} className="text-indigo-700 stroke-[2.5]" />
                <span>إرشادات وتعليمات المريض الصريحة</span>
              </label>
              <textarea
                rows={3}
                placeholder="أية توجيهات إضافية تتعلق بالراحة أو الغذاء..."
                className="w-full border-2 border-slate-300 p-4 rounded-xl text-slate-950 font-bold text-sm bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none transition-all"
                value={form.instructions}
                onChange={(e) => setForm({ ...form, instructions: e.target.value })}
              />
            </div>

            {/* شبكة منفصلة للملاحظات والاستشارة القادمة */}
            <div className="grid md:grid-cols-2 gap-4">
              
              {/* 4. حقل الملاحظات السرية */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                  <StickyNote size={16} className="text-amber-700 stroke-[2.5]" />
                  <span>ملاحظات إضافية داخلية (للطبيب)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="ملاحظات سرية لا تظهر على الروشتة المطبوعة العامة..."
                  className="w-full border-2 border-slate-300 p-4 rounded-xl text-slate-950 font-bold text-sm bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none transition-all"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>

              {/* 5. حقل تاريخ المراجعة */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                  <CalendarDays size={16} className="text-blue-700 stroke-[2.5]" />
                  <span>تعديل موعد الاستشارة القادمة</span>
                </label>
                <input
                  type="date"
                  className="w-full border-2 border-slate-300 p-4 rounded-xl text-slate-950 font-bold text-sm bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none transition-all"
                  value={form.nextVisit}
                  onChange={(e) => setForm({ ...form, nextVisit: e.target.value })}
                />
                <p className="text-[11px] text-slate-600 font-bold px-1">
                  * اترك الحقل خالياً إذا انتهت الحاجة للاستشارات القريبة.
                </p>
              </div>

            </div>

            {/* ─── أزرار التحكم والاعتماد الجريئة ─── */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-slate-200">
              
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-slate-200 hover:bg-slate-300 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors border border-slate-400"
              >
                إلغاء التعديل
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 bg-indigo-800 hover:bg-indigo-950 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-md border border-indigo-950 disabled:opacity-70"
              >
                <Save size={16} className="stroke-[2.5]" />
                <span>{saving ? "جاري حفظ التعديلات..." : "حفظ واعتماد التعديلات الحالية"}</span>
              </button>

            </div>

          </form>
        </div>

      </div>
    </div>
  );
}