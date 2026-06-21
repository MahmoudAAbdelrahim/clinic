"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function ContactPage() {
  const { user } = useAuth(); // جلب بيانات المستخدم تلقائياً من الـ Hook الخاص بك
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // تعبئة البيانات تلقائياً لو المريض مسجل دخول
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // هنا تضع كود الإرسال للـ API الخاص بك إذا أردت لاحقاً
      // await axios.post("/api/contact", form);
      setSuccess(true);
      setForm((prev) => ({ ...prev, message: "" }));
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 text-slate-800" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* العناوين الرئيسية */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">تواصل معنا مباشرة</h1>
          <p className="text-slate-500 mt-3 font-medium text-base">يسعدنا الإجابة على استفساراتكم وتلقي آرائكم على مدار الساعة</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* كارت معلومات الاتصال السريعة */}
          <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col gap-6">
            <h3 className="text-xl font-black text-slate-900 mb-2 border-b border-slate-100 pb-4">بيانات التواصل</h3>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0"><Phone className="w-5 h-5" /></div>
              <div>
                <p className="text-xs font-bold text-slate-400">اتصل بنا</p>
                <p className="text-base font-bold text-slate-800 font-mono mt-0.5">19000 (الخط الساخن)</p>
                <p className="text-sm font-medium text-slate-600 font-mono mt-0.5">+20 123 456 7890</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0"><Mail className="w-5 h-5" /></div>
              <div>
                <p className="text-xs font-bold text-slate-400">البريد الإلكتروني</p>
                <p className="text-base font-bold text-slate-800 font-mono mt-0.5">support@elitecare.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0"><MapPin className="w-5 h-5" /></div>
              <div>
                <p className="text-xs font-bold text-slate-400">العنوان الرئيسي</p>
                <p className="text-sm font-bold text-slate-800 mt-0.5">شارع التحرير، برج الأطباء، الدقي، القاهرة</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0"><Clock className="w-5 h-5" /></div>
              <div>
                <p className="text-xs font-bold text-slate-400">مواعيد العمل</p>
                <p className="text-sm font-bold text-slate-800 mt-0.5">يومياً من السبت إلى الخميس</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">09:00 صباحاً - 10:00 مساءً</p>
              </div>
            </div>
          </div>

          {/* استمارة إرسال الرسالة فخمة جداً */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-blue-600"></div>
            
            <h3 className="text-xl font-black text-slate-900 mb-6">أرسل استفسارك الآن</h3>

            {success && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl flex items-center gap-3 text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>تم إرسال رسالتك بنجاح! سيرد عليك القسم المختص بأقرب وقت ممكن.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">الاسم بالكامل</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    disabled={!!user} // قفل الحقل إذا كان مسجلاً للدخول لمنع اللخبطة
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-800 font-medium focus:outline-none focus:border-blue-600 focus:bg-white disabled:opacity-75 disabled:cursor-not-allowed transition text-sm"
                    placeholder="أدخل اسمك"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">رقم الهاتف</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    disabled={!!user}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-800 font-medium font-mono focus:outline-none focus:border-blue-600 focus:bg-white disabled:opacity-75 disabled:cursor-not-allowed transition text-sm"
                    placeholder="رقم الهاتف"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={!!user}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-800 font-medium font-mono focus:outline-none focus:border-blue-600 focus:bg-white disabled:opacity-75 disabled:cursor-not-allowed transition text-sm"
                  placeholder="name@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">تفاصيل الرسالة</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-800 font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition text-sm"
                  placeholder="اكتب استفسارك أو مشكلتك بالتفصيل هنا..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3.5 px-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-100 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الرسالة</span>
              </button>
            </form>
          </div>
        </div>

        {/* 3. قسم الخريطة التفاعلية الضخمة في الأسفل */}
        <div className="mt-16 bg-white p-4 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
          <h3 className="text-lg font-black text-slate-900 mb-4 px-2">موقع عياداتنا الجغرافي</h3>
          <div className="w-full h-96 rounded-2xl overflow-hidden shadow-inner relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.356262923053!2d31.2115163!3d30.0409249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m3!1s0x0%3A0x0!2zMzDCsDAyJzI3LjMiTiAzMcKwMTInNDEuNSJF!5e0!3m2!1sar!2seg!4v1680000000000!5m2!1sar!2seg"
              className="w-full h-full border-0 absolute inset-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
}