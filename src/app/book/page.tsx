"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Calendar, User, Phone, ChevronDown, Activity, FileText, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

const diseases = [
  "سكري",
  "ضغط",
  "قلب",
  "ربو",
  "كبد",
  "كلى",
  "غدة",
  "حساسية",
  "أخرى",
];

export default function BookPage() {
  const { user, loading: authLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

const [doctors, setDoctors] = useState<any[]>([]);

const [form, setForm] = useState({
  emergencyPhone: "",
  age: "",
  gender: "",
  visitReason: "",
  notes: "",
  appointmentDate: "",
  doctorId: "",
});
  useEffect(() => {

  const loadDoctors = async () => {

    const { data } =
      await axios.get(
        "/api/doctors"
      );

    setDoctors(data.doctors);
  };

  loadDoctors();

}, []);

  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const [successData, setSuccessData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-9 h-9 animate-spin text-emerald-600" />
          <span className="text-base font-bold text-slate-800">جاري تحميل بياناتك الطبية...</span>
        </div>
      </div>
    );
  }

  const handleDisease = (disease: string) => {
    if (selectedDiseases.includes(disease)) {
      setSelectedDiseases(selectedDiseases.filter((item) => item !== disease));
    } else {
      setSelectedDiseases([...selectedDiseases, disease]);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const { data } = await axios.post("/api/appointments/book", {
        ...form,
        chronicDiseases: selectedDiseases,
      });
      setSuccessData(data);
    } catch (error: any) {
      console.error(error);
      const msg = error?.response?.data?.message || "حدث خطأ غير متوقع أثناء تأكيد الحجز، يرجى المحاولة مرة أخرى.";
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // شاشة النجاح الفخمة بعد إتمام الحجز
  if (successData) {
    return (
      <div className="min-h-screen bg-slate-100 py-16 px-4" dir="rtl">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-2xl shadow-slate-300 border border-slate-200 text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-emerald-600"></div>
          
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-black text-slate-900">تم تسجيل حجزك بنجاح</h2>
          <p className="text-slate-700 text-base font-bold mt-2">يرجى الاحتفاظ ببيانات المتابعة التالية لزيارتك</p>

          <div className="mt-8 bg-slate-50 p-6 rounded-2xl border-2 border-slate-200 space-y-4 max-w-sm mx-auto">
            <div className="flex justify-between items-center border-b border-slate-300 pb-3">
              <span className="text-base font-black text-slate-700">رقم المتابعة:</span>
              <span className="text-lg font-mono font-black text-emerald-700">{successData.trackingNumber}</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-base font-black text-slate-700">رقم الدور في العيادة:</span>
              <span className="text-2xl font-mono font-black text-emerald-600">{successData.queueNumber}</span>
            </div>
          </div>

          <button 
            onClick={() => window.location.reload()} 
            className="mt-8 text-base font-black text-emerald-600 hover:text-emerald-700 hover:underline transition"
          >
            حجز موعد آخر جديد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-slate-300/60 border border-slate-200 relative overflow-hidden">
          
          {/* شريط المظهر الجديد: مزيج بين الزمردي الفاخر والأزرق الداكن */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-600 to-teal-700"></div>

          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <Calendar className="text-emerald-600 w-8 h-8" />
            حجز موعد طبي جديد
          </h1>

          <form onSubmit={submit} className="space-y-6">
            
            {/* بيانات المريض (مملوءة تلقائياً ومغلقة) */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-base font-black text-slate-900">اسم المريض</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-600">
                    <User size={18} />
                  </span>
                  <input
                    value={user?.name || "مريض غير معروف"}
                    disabled
                    className="w-full border-2 border-slate-200 p-3.5 pr-11 rounded-xl bg-slate-100 text-slate-900 font-bold cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-base font-black text-slate-900">رقم الهاتف الأساسي</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-600">
                    <Phone size={18} />
                  </span>
                  <input
                    value={user?.phone || "—"}
                    disabled
                    className="w-full border-2 border-slate-200 p-3.5 pr-11 rounded-xl bg-slate-100 text-slate-900 font-mono font-bold cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* رقم هاتف احتياطي */}
            <div className="flex flex-col gap-2">
              <label className="text-base font-black text-slate-900">رقم هاتف احتياطي للطوارئ</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
                  <Phone size={18} />
                </span>
                <input
                  type="tel"
                  placeholder="أدخل رقم الهاتف الإضافي"
                  className="w-full border-2 border-slate-300 p-3.5 pr-11 rounded-xl bg-slate-50 font-bold text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  value={form.emergencyPhone}
                  onChange={(e) => setForm({ ...form, emergencyPhone: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* العمر والنوع */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-base font-black text-slate-900">العمر</label>
                <input
                  type="number"
                  placeholder="أدخل عمرك بالسنوات"
                  className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-base font-black text-slate-900">النوع / الجنس</label>
                <div className="relative">
                  <select
                    className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition appearance-none cursor-pointer pr-4"
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    required
                  >
                    <option value="" className="text-slate-500">اختر النوع</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-600">
                    <ChevronDown size={20} />
                  </span>
                </div>
              </div>
            </div>

            {/* الأمراض المزمنة */}
            <div>
              <h3 className="text-base font-black text-slate-900 mb-3 flex items-center gap-1.5">
                <Activity size={18} className="text-rose-600" />
                هل تعاني من أي أمراض مزمنة؟
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                {diseases.map((disease) => {
                  const isSelected = selectedDiseases.includes(disease);
                  return (
                    <button
                      type="button"
                      key={disease}
                      onClick={() => handleDisease(disease)}
                      className={`py-3 px-3 rounded-xl border-2 text-sm font-black transition text-center ${
                        isSelected
                          ? "bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm"
                          : "bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-200"
                      }`}
                    >
                      {disease}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* سبب الزيارة وملاحظات */}
            <div className="flex flex-col gap-2">
              <label className="text-base font-black text-slate-900">سبب الزيارة المرضية</label>
              <textarea
                placeholder="يرجى وصف الأعراض الطبية الحالية بدقة ليرى الطبيب تشخيصك الأولي..."
                className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-emerald-600 focus:bg-white transition text-sm"
                rows={3}
                value={form.visitReason}
                onChange={(e) => setForm({ ...form, visitReason: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base font-black text-slate-900 flex items-center gap-1.5">
                <FileText size={16} className="text-slate-600" />
                ملاحظات إضافية أو تاريخ مرضي (اختياري)
              </label>
              <textarea
                placeholder="أي أدوية تتناولها بانتظام أو تفاصيل تود إطلاع العيادة عليها..."
                className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-emerald-600 focus:bg-white transition text-sm"
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
<div className="flex flex-col gap-2">

  <label className="text-base font-black text-slate-600">
    اختر الطبيب
  </label>

  <select
    value={form.doctorId}
    onChange={(e) =>
      setForm({
        ...form,
        doctorId: e.target.value,
      })
    }
    className="w-full border-2 text-slate-600 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold"
    required 
  >

    <option value="">
      اختر الطبيب
    </option>

    {doctors.map((doctor) => (

      <option
        key={doctor._id}
        value={doctor._id}
      >
        {doctor.name}
        {" - "}
        {doctor.specialization}
      </option>

    ))}

  </select>

</div>
            {/* تاريخ الموعد */}
            <div className="flex flex-col gap-2">
              <label className="text-base font-black text-slate-900">اختر تاريخ الحجز المطلوب</label>
              <input
                type="date"
                className="w-full border-2 border-slate-300 p-3.5 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                value={form.appointmentDate}
                onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
                required
              />
            </div>

            {/* رسائل الخطأ تظهر فوق الزر مباشرة بتصميم غامق وواضح جداً */}
            {errorMsg && (
              <div className="p-4 bg-rose-50 border-2 border-rose-300 text-rose-950 rounded-2xl flex items-center gap-3 text-base font-black transition-all animate-in fade-in slide-in-from-bottom-2">
                <AlertCircle className="w-6 h-6 text-rose-700 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* زر الحجز الرئيسي باللون الزمردي الفاخر */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black hover:bg-emerald-700 transition flex items-center justify-center gap-2 text-base shadow-xl shadow-emerald-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري تسجيل بيانات حجزك المعتمد...</span>
                </>
              ) : (
                <span>تأكيد الحجز الفوري</span>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}