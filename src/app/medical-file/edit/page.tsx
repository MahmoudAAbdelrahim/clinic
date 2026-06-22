"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { 
  HeartPulse, User, ChevronDown, Scale, Ruler, Droplet, 
  Activity, ShieldAlert, Pill, FileText, ClipboardList, Stethoscope,
  Loader2, CheckCircle2, AlertCircle
} from "lucide-react";

export default function MedicalFile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [form, setForm] = useState<any>({
    age: "",
    gender: "",
    weight: "",
    height: "",
    bloodType: "",
    chronicDiseases: "",
    drugAllergies: "",
    currentMedications: "",
    firstVisitReason: "",
    medicalDescription: "",
    previousOperations: "",
    familyDiseases: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await axios.get("/api/medical-record/me");
        if (data.record) {
          setForm(data.record);
        }
      } catch (error) {
        console.error("Error loading medical record:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveStatus(null);

    try {
      await axios.post("/api/medical-record/save", form);
      setSaveStatus({ type: "success", message: "تم تحديث وحفظ ملفك الطبي بنجاح في المنظومة." });
      
      // إخفاء رسالة النجاح بعد 4 ثوانٍ تلقائياً
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (error) {
      console.error(error);
      setSaveStatus({ type: "error", message: "فشل حفظ البيانات، يرجى التحقق من اتصالك والمحاولة مرة أخرى." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-9 h-9 animate-spin text-emerald-600" />
          <span className="text-base font-black text-slate-800">جاري تحميل ملفك الطبي الآمن...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-slate-300/60 border border-slate-200 relative overflow-hidden">
          
          {/* الشريط العلوي الخاص بالطابع الزمردي الفخم */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-600 to-teal-700"></div>

          <div className="flex items-center gap-3 mb-8 border-b-2 border-slate-100 pb-5">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 shadow-sm">
              <HeartPulse className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900">الملف السريري الشامل</h1>
              <p className="text-slate-600 text-sm font-bold mt-0.5">يرجى مراجعة وتحديث بياناتك الصحية بانتظام لضمان دقة الرعاية الطبية</p>
            </div>
          </div>

          <form onSubmit={save} className="space-y-8">

            {/* القسم الأول: المؤشرات والبيانات الحيوية الأساسية */}
            <div className="space-y-4">
              <h3 className="text-base font-black text-emerald-700 flex items-center gap-2 border-r-4 border-emerald-600 pr-2">
                القياسات الحيوية والأساسية
              </h3>
              
              <div className="grid md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-black text-slate-800">العمر الحالي</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-600">
                      <User size={18} />
                    </span>
                    <input
                      type="number"
                      placeholder="العمر بالسنوات"
                      className="w-full border-2 border-slate-300 p-3.5 pr-11 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                      value={form.age || ""}
                      onChange={(e) => setForm({ ...form, age: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-black text-slate-800">النوع / الجنس</label>
                  <div className="relative">
                    <select
                      className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition appearance-none cursor-pointer pr-4"
                      value={form.gender || ""}
                      onChange={(e) => setForm({ ...form, gender: e.target.value })}
                      required
                    >
                      <option value="">اختر النوع</option>
                      <option value="male">ذكر</option>
                      <option value="female">أنثى</option>
                    </select>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-600">
                      <ChevronDown size={20} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-black text-slate-800">الوزن التقريبي</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-600">
                      <Scale size={18} />
                    </span>
                    <input
                      type="number"
                      placeholder="كجم"
                      className="w-full border-2 border-slate-300 p-3.5 pr-11 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                      value={form.weight || ""}
                      onChange={(e) => setForm({ ...form, weight: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-black text-slate-800">الطول الحالي</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-600">
                      <Ruler size={18} />
                    </span>
                    <input
                      type="number"
                      placeholder="سم"
                      className="w-full border-2 border-slate-300 p-3.5 pr-11 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                      value={form.height || ""}
                      onChange={(e) => setForm({ ...form, height: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
                  <label className="text-sm font-black text-slate-800">فصيلة الدم</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-rose-600">
                      <Droplet size={18} />
                    </span>
                    <input
                      placeholder="مثال: O+, A-, AB+"
                      className="w-full border-2 border-slate-300 p-3.5 pr-11 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                      value={form.bloodType || ""}
                      onChange={(e) => setForm({ ...form, bloodType: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* القسم الثاني: التاريخ المرضي والمحاذير الطبية */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-black text-emerald-700 flex items-center gap-2 border-r-4 border-emerald-600 pr-2">
                التاريخ الطبي والمحاذير الصحّية
              </h3>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-black text-slate-800 flex items-center gap-1">
                  <Activity size={16} className="text-rose-500" />
                  الأمراض المزمنة (إن وجدت)
                </label>
                <textarea
                  placeholder="يرجى ذكر أي عوارض صحية مزمنة مثل السكري، الضغط، القلب..."
                  className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition text-sm"
                  rows={2}
                  value={form.chronicDiseases || ""}
                  onChange={(e) => setForm({ ...form, chronicDiseases: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-black text-slate-800 flex items-center gap-1">
                  <ShieldAlert size={16} className="text-amber-500" />
                  الحساسية ضد بعض العقاقير أو الأدوية
                </label>
                <textarea
                  placeholder="هل تعاني من حساسية البنسلين أو أي نوع علاج معين؟ اكتبه هنا لحمايتك..."
                  className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition text-sm"
                  rows={2}
                  value={form.drugAllergies || ""}
                  onChange={(e) => setForm({ ...form, drugAllergies: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-black text-slate-800 flex items-center gap-1">
                  <Pill size={16} className="text-indigo-500" />
                  العلاجات والأدوية الحالية التي تتناولها بانتظام
                </label>
                <textarea
                  placeholder="أدخل أسماء وجرعات الأدوية والمكملات الغذائية النشطة الحالية..."
                  className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition text-sm"
                  rows={2}
                  value={form.currentMedications || ""}
                  onChange={(e) => setForm({ ...form, currentMedications: e.target.value })}
                />
              </div>
            </div>

            {/* القسم الثالث: سجل الاستشارات والتشخيص */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-black text-emerald-700 flex items-center gap-2 border-r-4 border-emerald-600 pr-2">
                تفاصيل الملاحظات الطبية الحالية
              </h3>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-black text-slate-800 flex items-center gap-1">
                  <ClipboardList size={16} className="text-slate-600" />
                  سبب أول زيارة قمت بها للمنشأة الطبية
                </label>
                <textarea
                  placeholder="دون هنا العرض الأساسي أو الاستشارة الأولى التي تم فتح هذا الملف بناءً عليها..."
                  className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition text-sm"
                  rows={2}
                  value={form.firstVisitReason || ""}
                  onChange={(e) => setForm({ ...form, firstVisitReason: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-black text-slate-800 flex items-center gap-1">
                  <Stethoscope size={16} className="text-emerald-600" />
                  التوصيف السريري التفصيلي للحالة الصحّية
                </label>
                <textarea
                  placeholder="مساحة مخصصة للتشخيص الشامل وملاحظات الأطباء المعالجين..."
                  className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition text-sm"
                  rows={4}
                  value={form.medicalDescription || ""}
                  onChange={(e) => setForm({ ...form, medicalDescription: e.target.value })}
                />
              </div>
            </div>

            {/* ------------------------------------------------------------------ */}
            {/* التنبيهات المودرن الذكية تظهر هنا بسلاسة فوق الزر مباشرة */}
            {saveStatus && (
              <div className={`p-4 rounded-2xl border-2 flex items-center gap-3 text-base font-black transition-all animate-in fade-in slide-in-from-bottom-2 ${
                saveStatus.type === "success" 
                  ? "bg-emerald-50 border-emerald-300 text-emerald-950" 
                  : "bg-rose-50 border-rose-300 text-rose-950"
              }`}>
                {saveStatus.type === "success" ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
                )}
                <span>{saveStatus.message}</span>
              </div>
            )}

            <div className="space-y-4 pt-2">

  <h3 className="text-base font-black text-emerald-700 flex items-center gap-2 border-r-4 border-emerald-600 pr-2">
    التاريخ العائلي والجراحي
  </h3>

  <div className="flex flex-col gap-1.5">

    <label className="text-sm font-black text-slate-800">
      العمليات الجراحية السابقة
    </label>

    <textarea
      placeholder="اذكر أي عمليات جراحية سابقة وتواريخها إن أمكن..."
      className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
      rows={3}
      value={form.previousOperations || ""}
      onChange={(e) =>
        setForm({
          ...form,
          previousOperations:
            e.target.value,
        })
      }
    />

  </div>

  <div className="flex flex-col gap-1.5">

    <label className="text-sm font-black text-slate-800">
      الأمراض الوراثية بالعائلة
    </label>

    <textarea
      placeholder="مثل أمراض القلب، السكر، الضغط، السرطان أو أي أمراض وراثية أخرى..."
      className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
      rows={3}
      value={form.familyDiseases || ""}
      onChange={(e) =>
        setForm({
          ...form,
          familyDiseases:
            e.target.value,
        })
      }
    />

  </div>

</div>
            {/* ------------------------------------------------------------------ */}

            {/* زر الحجز والحفظ التفاعلي والأنيق */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full md:w-auto bg-emerald-600 text-white px-10 py-4 rounded-xl font-black hover:bg-emerald-700 transition flex items-center justify-center gap-2 text-base shadow-xl shadow-emerald-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>جاري تشفير وحفظ بيانات ملفك...</span>
                  </>
                ) : (
                  <span>حفظ وتحديث الملف الطبي</span>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}