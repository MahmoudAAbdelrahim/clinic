"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Lock, key, AlertCircle, ArrowRight, RefreshCw } from "lucide-react";

export default function ChangePassword() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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

    if (form.newPassword !== form.confirmPassword) {
      showToast("error", "كلمتا المرور الجديدتان غير متطابقتين، يرجى التأكد وإعادة المحاولة");
      return;
    }

    try {
      setLoading(true);
      setToast({ type: null, message: "" });

      await axios.put("/api/profile/change-password", {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      showToast("success", "تم تغيير كلمة المرور بنجاح! جاري تحويلك...");
      
      setTimeout(() => {
        router.push("/profile");
      }, 1500);

    } catch (error: any) {
      const errMsg = error?.response?.data?.message || "حدث خطأ أثناء تغيير كلمة المرور، يرجى المحاولة مرة أخرى";
      showToast("error", errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        
        {/* زر العودة للملف الشخصي */}
        <button 
          onClick={() => router.push("/profile")}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition mb-6"
        >
          <ArrowRight size={18} />
          العودة للملف الشخصي
        </button>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
          {/* خط التزيين العلوي المتناسق بلون برتقالي/ذهبي دافئ يناسب التغيير والحماية */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-500 to-orange-500"></div>

          <h1 className="text-2xl font-black text-slate-900 mb-8">
            تغيير كلمة المرور
          </h1>

          {/* مربع التنبيهات المودرن */}
          {toast.type && (
            <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium transition-all animate-in fade-in slide-in-from-top-4 ${
              toast.type === "success" 
                ? "bg-emerald-50 border border-emerald-100 text-emerald-800" 
                : "bg-rose-50 border border-rose-100 text-rose-800"
            }`}>
              <AlertCircle className={`w-5 h-5 shrink-0 ${toast.type === "success" ? "text-emerald-600" : "text-rose-600"}`} />
              <span>{toast.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* حقل كلمة المرور الحالية */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">كلمة المرور الحالية</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                  <Lock size={20} />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pr-11 pl-4 text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      oldPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            {/* حقل كلمة المرور الجديدة */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">كلمة المرور الجديدة</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                  <Lock size={20} className="text-amber-500" />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pr-11 pl-4 text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      newPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            {/* حقل تأكيد كلمة المرور */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">تأكيد كلمة المرور الجديدة</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                  <Lock size={20} className="text-amber-500" />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pr-11 pl-4 text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            {/* زر الإرسال والحفظ الأصفر المتناسق */}
            <button
              disabled={loading}
              className="w-full mt-4 bg-amber-500 text-white p-3.5 rounded-xl font-bold hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 shadow-lg shadow-amber-100 text-base"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>جاري تحديث كلمة المرور...</span>
                </div>
              ) : (
                <>
                  <RefreshCw size={18} />
                  <span>تغيير كلمة المرور</span>
                </>
              )}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}