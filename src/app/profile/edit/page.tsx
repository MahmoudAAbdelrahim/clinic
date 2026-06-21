"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User, Phone, Mail, Save, ArrowRight } from "lucide-react";
import useAuth from "../../../hooks/useAuth";

export default function EditProfile() {
  const router = useRouter();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  // تحديث بيانات الفورم فور توفر بيانات المستخدم من الـ Hook
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.put("/api/profile/update", form);

      router.push("/profile");
      router.refresh();
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
          {/* خط التزيين العلوي المودرن */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          <h1 className="text-2xl font-black text-slate-900 mb-8">
            تعديل البيانات الشخصية
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* حقل الاسم */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">الاسم بالكامل</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                  <User size={20} />
                </span>
                <input
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pr-11 pl-4 text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                  placeholder="الاسم"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            {/* حقل رقم الهاتف */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">رقم الهاتف</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                  <Phone size={20} />
                </span>
                <input
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pr-11 pl-4 text-slate-800 font-medium font-mono placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                  placeholder="رقم الهاتف"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            {/* حقل البريد الإلكتروني */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">البريد الإلكتروني</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                  <Mail size={20} />
                </span>
                <input
                  type="email"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pr-11 pl-4 text-slate-800 font-medium font-mono placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                  placeholder="البريد الإلكتروني"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* زر الحفظ المطور */}
            <button
              disabled={loading}
              className="w-full mt-4 bg-blue-600 text-white p-3.5 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 shadow-lg shadow-blue-100 text-base"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>جاري حفظ التعديلات...</span>
                </div>
              ) : (
                <>
                  <Save size={18} />
                  <span>حفظ التعديلات</span>
                </>
              )}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}