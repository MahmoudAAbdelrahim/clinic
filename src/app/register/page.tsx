"use client";

import { useState } from "react";
import axios from "axios";
import { User, Phone, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  
  // حالة لإدارة الرسائل التنبيهية بشكل أنيق
  const [toast, setToast] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    // إخفاء التنبيه تلقائياً بعد 4 ثوانٍ إذا لم يتم تحويل الصفحة
    setTimeout(() => {
      setToast({ type: null, message: "" });
    }, 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setToast({ type: null, message: "" }); // إعادة تهيئة التنبيهات

      const { data } = await axios.post("/api/auth/register", form);

      // إظهار رسالة النجاح بشكل جذاب
      showToast("success", data.message || "تم إنشاء الحساب بنجاح! جاري تحويلك...");

      // توجيه المستخدم بعد ثانية ونصف ليرى رسالة النجاح
      setTimeout(() => {
        window.location.href = "/patient/dashboard";
      }, 1500);

    } catch (error: any) {
      const errMsg = error?.response?.data?.message || "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى";
      showToast("error", errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-4 py-12" dir="rtl">
      
      <div className="w-full max-w-md bg-white border border-slate-100 p-8 rounded-3xl shadow-xl shadow-slate-200/50 relative overflow-hidden">
        
        {/* خلفية جمالية علوية ناعمة للبطاقة */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 mb-2">إنشاء حساب جديد</h2>
          <p className="text-sm text-slate-500">انضم إلى منظومتنا الطبية الذكية وابدأ بإدارة رعاية صحتك</p>
        </div>

        {/* رسائل التنبيه المصممة بشكل عصري */}
        {toast.type && (
          <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium transition-all animate-in fade-in slide-in-from-top-4 ${
            toast.type === "success" 
              ? "bg-emerald-50 border border-emerald-100 text-emerald-800" 
              : "bg-rose-50 border border-rose-100 text-rose-800"
          }`}>
            {toast.type === "success" ? <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
            <span>{toast.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* حقل الاسم */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">الاسم بالكامل</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                name="name"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-11 pl-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-medium"
                placeholder="أدخل اسمك الثلاثي"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* حقل رقم الهاتف */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">رقم الهاتف</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                <Phone className="w-5 h-5" />
              </span>
              <input
                type="text"
                name="phone"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-11 pl-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-medium"
                placeholder="01xxxxxxxxx"
                required
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* حقل البريد الإلكتروني */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">البريد الإلكتروني (اختياري)</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                name="email"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-11 pl-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-medium"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* حقل كلمة المرور */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">كلمة المرور</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type="password"
                name="password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-11 pl-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-medium"
                placeholder="••••••••"
                required
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* زر التقديم والإرسال */}
          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center text-base"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>جاري إنشاء الحساب...</span>
              </div>
            ) : (
              "إنشاء حساب"
            )}
          </button>

        </form>

      </div>
      
    </div>
  );
}