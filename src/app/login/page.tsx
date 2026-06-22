"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Lock, Eye, EyeOff, AlertCircle, UserCheck } from "lucide-react";
import useAuth from "../../hooks/useAuth";
export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // لإدارة ظهور كلمة المرور
  const [toast, setToast] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const [form, setForm] = useState({
    login: "",
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
    if (type === "error") {
      setTimeout(() => {
        setToast({ type: null, message: "" });
      }, 4000);
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);
    setToast({ type: null, message: "" });

    await axios.post("/api/auth/login", form);

    showToast("success", "تم تسجيل الدخول بنجاح! جاري توجيهك...");

    setTimeout(() => {
      window.location.href = "/";  // ✅ نفس اللي بيعمله register
    }, 1500);

  } catch (error: any) {
    const errMsg = error?.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول";
    showToast("error", errMsg);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center px-4 py-12" dir="rtl">
      
      <div className="w-full max-w-md bg-white border border-slate-100 p-8 rounded-3xl shadow-xl shadow-slate-200/50 relative overflow-hidden">
        
        {/* شريط الألوان العلوي المتناسق مع الهوم */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 mb-2">تسجيل الدخول</h2>
          <p className="text-sm text-slate-500">مرحباً بك مجدداً في منظومتك الطبية الذكية</p>
        </div>

        {/* تنبيهات مخصصة جذابة */}
        {toast.type && (
          <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium transition-all animate-in fade-in slide-in-from-top-4 ${
            toast.type === "success" 
              ? "bg-emerald-50 border border-emerald-100 text-emerald-800" 
              : "bg-rose-50 border border-rose-100 text-rose-800"
          }`}>
            {toast.type === "success" ? <UserCheck className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
            <span>{toast.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* حقل البريد أو الهاتف */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">البريد الإلكتروني أو رقم الهاتف</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                <LogIn className="w-5 h-5" />
              </span>
              <input
                type="text"
                name="login"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-11 pl-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-medium"
                placeholder="أدخل البريد أو رقم الهاتف الخاص بك"
                required
                value={form.login}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* حقل كلمة المرور مع زر العين التفاعلي */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">كلمة المرور</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                <Lock className="w-5 h-5" />
              </span>
              
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-11 pl-12 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-sm font-medium"
                placeholder="••••••••"
                required
                value={form.password}
                onChange={handleChange}
              />

              {/* زر العين لإظهار / إخفاء الرمز */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 hover:text-blue-600 transition-colors"
                title={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
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
                <span>جاري تسجيل الدخول...</span>
              </div>
            ) : (
              "تسجيل الدخول"
            )}
          </button>

        </form>

        {/* الجملة التوجيهية في أسفل البطاقة */}
        <div className="mt-8 pt-5 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            ليس لديك حساب بالفعل؟{" "}
            <Link href="/register" className="text-blue-600 font-bold hover:text-blue-700 no-underline transition-colors mr-1">
              إنشاء حساب جديد
            </Link>
          </p>
        </div>

      </div>
      
    </div>
  );
}
