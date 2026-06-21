"use client";

import axios from "axios";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Pill, 
  FileSpreadsheet, 
  StickyNote, 
  CalendarDays, 
  HeartPulse, 
  Save, 
  ChevronRight,
  ClipboardList
} from "lucide-react";

export default function AddTreatmentPage() {
  const params = useParams();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    diagnosis: "",
    treatment: "",
    instructions: "",
    notes: "",
    nextVisit: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await axios.post("/api/doctors/treatments", {
        patientId: params.patientId,
        ...form,
      });
      router.back();
    } catch (error) {
      console.error("Error saving treatment:", error);
    } finally {
      setSaving(false);
    }
  };

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
          <span>العودة للملف الطبي</span>
        </button>

        {/* كارت الروشتة الرئيسي */}
        <div className="bg-white rounded-2xl shadow-md border-2 border-slate-300 overflow-hidden">
          
          {/* هيدر النموذج بالطابع الطبي الزاهي */}
          <div className="bg-slate-900 p-5 px-6 border-b-2 border-slate-950 flex items-center gap-3">
            <div className="p-2 bg-indigo-700 text-white rounded-lg">
              <ClipboardList size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                تحرير وصفة طبية وخطة علاجية
              </h1>
              <p className="text-slate-300 text-xs font-bold mt-0.5">
                قم بتدوين التشخيص الحالي، الجرعات الدوائية، والتعليمات المباشرة للمريض
              </p>
            </div>
          </div>

          {/* استمارة الإدخال */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* 1. حقل التشخيص */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                <HeartPulse size={16} className="text-rose-700 stroke-[2.5]" />
                <span>التشخيص الطبي للحالة (Diagnosis)</span>
              </label>
              <textarea
                rows={3}
                placeholder="اكتب هنا التفاصيل الدقيقة للتشخيص السريري الحالي..."
                className="w-full border-2 border-slate-300 p-4 rounded-xl text-slate-950 font-bold text-sm bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none transition-all placeholder:text-slate-500"
                value={form.diagnosis}
                onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
                required
              />
            </div>

            {/* 2. حقل خطة العلاج */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                <Pill size={16} className="text-emerald-700 stroke-[2.5]" />
                <span>الخطة العلاجية والأدوية (Treatment / Rx)</span>
              </label>
              <textarea
                rows={4}
                placeholder="مثال: اسم الدواء - الجرعة (كل 8 ساعات) - المدة (أسبوعين)..."
                className="w-full border-2 border-slate-300 p-4 rounded-xl text-slate-950 font-bold text-sm bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none transition-all placeholder:text-slate-500"
                value={form.treatment}
                onChange={(e) => setForm({ ...form, treatment: e.target.value })}
                required
              />
            </div>

            {/* 3. حقل تعليمات الطبيب */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                <FileSpreadsheet size={16} className="text-indigo-700 stroke-[2.5]" />
                <span>تعليمات وإرشادات المريض الخاصة</span>
              </label>
              <textarea
                rows={3}
                placeholder="مثال: الراحة التامة - الابتعاد عن السكريات - شرب السوائل بكثرة..."
                className="w-full border-2 border-slate-300 p-4 rounded-xl text-slate-950 font-bold text-sm bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none transition-all placeholder:text-slate-500"
                value={form.instructions}
                onChange={(e) => setForm({ ...form, instructions: e.target.value })}
              />
            </div>

            {/* شبكة منقسمة للملاحظات وتاريخ الزيارة القادمة */}
            <div className="grid md:grid-cols-2 gap-4">
              
              {/* 4. حقل الملاحظات السرية */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                  <StickyNote size={16} className="text-amber-700 stroke-[2.5]" />
                  <span>ملاحظات إضافية (داخلية)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="ملاحظات شخصية للطبيب لا تظهر على روشتة المريض العامة..."
                  className="w-full border-2 border-slate-300 p-4 rounded-xl text-slate-950 font-bold text-sm bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none transition-all placeholder:text-slate-500"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>

              {/* 5. حقل تاريخ المراجعة القادمة */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                  <CalendarDays size={16} className="text-blue-700 stroke-[2.5]" />
                  <span>تحديد موعد الاستشارة القادمة</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full border-2 border-slate-300 p-4 rounded-xl text-slate-950 font-bold text-sm bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none transition-all"
                    value={form.nextVisit}
                    onChange={(e) => setForm({ ...form, nextVisit: e.target.value })}
                  />
                </div>
                <p className="text-[11px] text-slate-600 font-bold px-1">
                  * اترك الحقل فارغاً إذا لم تكن هناك حاجة لاستشارة قريبة.
                </p>
              </div>

            </div>

            {/* ─── أزرار التحكم والاعتماد المتزنة ─── */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-slate-200">
              
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-slate-200 hover:bg-slate-300 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors border border-slate-400"
              >
                إلغاء الأمر
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 bg-indigo-800 hover:bg-indigo-950 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-md border border-indigo-950 disabled:opacity-70"
              >
                <Save size={16} className="stroke-[2.5]" />
                <span>{saving ? "جاري اعتماد الوصفة..." : "اعتماد وحفظ الروشتة الحالية"}</span>
              </button>

            </div>

          </form>
        </div>

      </div>
    </div>
  );
}