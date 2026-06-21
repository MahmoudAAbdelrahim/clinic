"use client";

import axios from "axios";
import { useState } from "react";
import { 
  UserPlus, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Stethoscope, 
  Loader2, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

export default function AddDoctorPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    specialization: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      await axios.post("/api/admin/doctors/add", form);

      setStatus({
        type: "success",
        message: "تم تسجيل الطبيب الجديد بنظام العيادة بنجاح وتفعيل حسابه.",
      });

      setForm({
        name: "",
        phone: "",
        email: "",
        password: "",
        specialization: "",
      });
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error?.response?.data?.message || "عذراً، حدث خطأ أثناء محاولة تسجيل الطبيب.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-slate-300/60 border border-slate-200 relative overflow-hidden">
          
          {/* الشريط العلوي الخاص بهوية الموقع */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-600 to-teal-700"></div>

          {/* الهيدر */}
          <div className="flex items-center gap-3.5 mb-8 border-b-2 border-slate-100 pb-5">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 shadow-sm">
              <UserPlus className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900">تسجيل طبيب جديد</h1>
              <p className="text-slate-600 text-sm font-bold mt-0.5">قم بتعبئة البيانات لاعتماد الحساب السريري للطبيب</p>
            </div>
          </div>

          {/* التنبيهات الذكية المزهزهة */}
          {status && (
            <div className={`mb-6 p-4 rounded-2xl border-2 flex items-center gap-3 text-sm font-black transition-all ${
              status.type === "success" 
                ? "bg-emerald-50 border-emerald-200 text-emerald-950" 
                : "bg-rose-50 border-rose-200 text-rose-950"
            }`}>
              {status.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <span>{status.message}</span>
            </div>
          )}

          {/* الاستمارة */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* حقل اسم الدكتور */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-slate-800">الاسم الكامل للطبيب</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  placeholder="مثال: د. أحمد محمد علي"
                  className="w-full border-2 border-slate-300 p-3.5 pr-11 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* حقل رقم الهاتف والتخصص في صف واحد لشكل أشيك */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black text-slate-800">رقم الهاتف</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                    <Phone size={18} />
                  </span>
                  <input
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    className="w-full border-2 border-slate-300 p-3.5 pr-11 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black text-slate-800">التخصص الطبي</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                    <Stethoscope size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="مثال: قلب وأوعية دموية"
                    className="w-full border-2 border-slate-300 p-3.5 pr-11 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                    value={form.specialization}
                    onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* حقل البريد الإلكتروني */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-slate-800">البريد الإلكتروني المهني</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  placeholder="doctor@clinic.com"
                  className="w-full border-2 border-slate-300 p-3.5 pr-11 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* حقل كلمة المرور */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-slate-800">كلمة المرور الافتراضية</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border-2 border-slate-300 p-3.5 pr-11 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* زر الحفظ التفاعلي */}
            <div className="pt-4">
              <button
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black text-base hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>جاري قيد الطبيب بالنظام...</span>
                  </>
                ) : (
                  <span>اعتماد وإضافة الطبيب</span>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}