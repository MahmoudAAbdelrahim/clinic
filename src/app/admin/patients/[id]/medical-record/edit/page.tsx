"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  FileHeart, 
  User, 
  ChevronDown, 
  Scale, 
  Ruler, 
  Droplet, 
  Activity, 
  ShieldAlert, 
  Pill, 
  ClipboardList, 
  Stethoscope, 
  Layers, 
  Users, 
  Loader2, 
  Save, 
  X 
} from "lucide-react";

export default function EditMedicalRecordPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
        const { data } = await axios.get(
          `/api/admin/patients/${params.id}/medical-record`
        );
        if (data.record) {
          setForm(data.record);
        }
      } catch (error) {
        console.error("Error loading patient medical record:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) loadData();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await axios.put(
        `/api/admin/patients/${params.id}/medical-record`,
        form
      );
      router.push(`/admin/patients/${params.id}/medical-record`);
    } catch (error) {
      console.error("Error updating patient medical record:", error);
      alert("حدث خطأ أثناء محاولة تعديل وحفظ الملف الطبي.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-9 h-9 animate-spin text-emerald-600" />
          <span className="text-base font-black text-slate-800">جاري فتح وتجهيز السجل السريري...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-slate-300/60 border border-slate-200 relative overflow-hidden">
          
          {/* شريط الطابع الفخم للموقع */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-500 to-emerald-600"></div>

          {/* الهيدر */}
          <div className="flex items-center gap-3.5 mb-8 border-b-2 border-slate-100 pb-5">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 shadow-sm">
              <FileHeart className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900">تحديث الملف الطبي للمريض</h1>
              <p className="text-slate-600 text-sm font-bold mt-0.5">صلاحية إدارية لتعديل وتوثيق السجل السريري والتشخيصي للمريض</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* القياسات والمؤشرات الحيوية */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-emerald-700 flex items-center gap-2 border-r-4 border-emerald-600 pr-2">
                القياسات الحيوية والأساسية
              </h3>
              
              <div className="grid md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-black text-slate-900">العمر الحالي</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
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
                  <label className="text-sm font-black text-slate-900">النوع / الجنس</label>
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
                  <label className="text-sm font-black text-slate-900">الوزن</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
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
                  <label className="text-sm font-black text-slate-900">الطول</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
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
                  <label className="text-sm font-black text-slate-900">فصيلة الدم</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-rose-600">
                      <Droplet size={18} />
                    </span>
                    <input
                      placeholder="O+ / AB- / A+"
                      className="w-full border-2 border-slate-300 p-3.5 pr-11 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                      value={form.bloodType || ""}
                      onChange={(e) => setForm({ ...form, bloodType: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* التاريخ المرضي للأمراض والحساسية */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-black text-emerald-700 flex items-center gap-2 border-r-4 border-emerald-600 pr-2">
                التاريخ المرضي والمحاذير الصحية
              </h3>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-black text-slate-900 flex items-center gap-1">
                  <Activity size={16} className="text-emerald-600" />
                  الأمراض المزمنة
                </label>
                <textarea
                  rows={3}
                  placeholder="اذكر الأمراض المزمنة الحالية للمريض بالتفصيل..."
                  className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition text-sm"
                  value={form.chronicDiseases || ""}
                  onChange={(e) => setForm({ ...form, chronicDiseases: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-black text-slate-900 flex items-center gap-1">
                  <ShieldAlert size={16} className="text-rose-500" />
                  الحساسية من الأدوية والعقاقير
                </label>
                <textarea
                  rows={3}
                  placeholder="هل يعاني المريض من حساسية تجاه مركبات معينة؟ اكتبها لحمايته..."
                  className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition text-sm"
                  value={form.drugAllergies || ""}
                  onChange={(e) => setForm({ ...form, drugAllergies: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-black text-slate-900 flex items-center gap-1">
                  <Pill size={16} className="text-indigo-500" />
                  الأدوية الحالية المنتظمة
                </label>
                <textarea
                  rows={3}
                  placeholder="العلاجات والمكملات الدوائية الفعّالة التي يتناولها المريض بالوقت الحالي..."
                  className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition text-sm"
                  value={form.currentMedications || ""}
                  onChange={(e) => setForm({ ...form, currentMedications: e.target.value })}
                />
              </div>
            </div>

            {/* التشخيص وتاريخ العمليات */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-black text-emerald-700 flex items-center gap-2 border-r-4 border-emerald-600 pr-2">
                التوصيف والتقارير الطبية
              </h3>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-black text-slate-900 flex items-center gap-1">
                  <ClipboardList size={16} className="text-slate-600" />
                  سبب أول زيارة عيادية للمريض
                </label>
                <textarea
                  rows={3}
                  placeholder="دون العارض الأساسي الذي تم فتح الملف بناءً عليه في أول مراجعة..."
                  className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition text-sm"
                  value={form.firstVisitReason || ""}
                  onChange={(e) => setForm({ ...form, firstVisitReason: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-black text-slate-900 flex items-center gap-1">
                  <Stethoscope size={16} className="text-emerald-600" />
                  الوصف التشخيصي الطبي للحالة
                </label>
                <textarea
                  rows={5}
                  placeholder="اكتب التقرير الطبي المعتمد، والتحاليل، والتشخيص النهائي للحالة السريرية..."
                  className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition text-sm"
                  value={form.medicalDescription || ""}
                  onChange={(e) => setForm({ ...form, medicalDescription: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-black text-slate-900 flex items-center gap-1">
                  <Layers size={16} className="text-slate-600" />
                  العمليات الجراحية السابقة
                </label>
                <textarea
                  rows={3}
                  placeholder="سجل العمليات الجراحية السابقة وتواريخها إن وجدت..."
                  className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition text-sm"
                  value={form.previousOperations || ""}
                  onChange={(e) => setForm({ ...form, previousOperations: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-black text-slate-900 flex items-center gap-1">
                  <Users size={16} className="text-slate-600" />
                  الأمراض الوراثية العائلية
                </label>
                <textarea
                  rows={3}
                  placeholder="أي أمراض وراثية معروفة ومسجلة في تاريخ العائلة..."
                  className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition text-sm"
                  value={form.familyDiseases || ""}
                  onChange={(e) => setForm({ ...form, familyDiseases: e.target.value })}
                />
              </div>
            </div>

            {/* أزرار الحفظ والإلغاء */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
              <button
                disabled={saving}
                type="submit"
                className="flex-1 bg-emerald-600 text-white py-4 rounded-xl font-black text-base hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>جاري تشفير وتحديث الملف...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>اعتماد وتحديث الملف الطبي</span>
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() => router.push(`/admin/patients/${params.id}/medical-record`)}
                className="px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-xl font-black text-base transition flex items-center justify-center gap-1.5 border-2 border-slate-200/60 disabled:opacity-50"
              >
                <X size={18} />
                تراجع
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}