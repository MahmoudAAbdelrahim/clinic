"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { User, Phone, Mail, Loader2, UserCheck, X, Save } from "lucide-react";

export default function EditPatientPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const { data } = await axios.get(`/api/admin/patients/${params.id}`);
        setForm({
          name: data.patient.name || "",
          phone: data.patient.phone || "",
          email: data.patient.email || "",
        });
      } catch (error) {
        console.error("Error loading patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) loadPatient();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await axios.put(`/api/admin/patients/${params.id}`, form);
      router.push("/admin/patients");
    } catch (error) {
      console.error("Error saving patient data:", error);
      alert("حدث خطأ أثناء محاولة حفظ تعديلات المريض.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-9 h-9 animate-spin text-emerald-600" />
          <span className="text-base font-black text-slate-800">جاري استدعاء ملف المريض...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-slate-300/60 border border-slate-200 relative overflow-hidden">
          
          {/* شريط الطابع الزمردي المميز أعلى الكارت */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-500 to-emerald-600"></div>

          {/* الهيدر */}
          <div className="flex items-center gap-3.5 mb-8 border-b-2 border-slate-100 pb-5">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shadow-sm">
              <UserCheck className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900">تعديل ملف المريض</h1>
              <p className="text-slate-600 text-sm font-bold mt-0.5">تحديث مراجعة تفاصيل الحساب الهوية وبيانات التواصل للمريض</p>
            </div>
          </div>

          {/* الاستمارة والمدخلات مع عناوين ظاهرة وحادة التباين */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* حقل الاسم */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black text-slate-900">الاسم الكامل للمريض</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  placeholder="أدخل اسم المريض بالكامل"
                  className="w-full border-2 border-slate-300 p-3.5 pr-11 rounded-xl bg-slate-50 font-black text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition text-base"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* حقل رقم الهاتف */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black text-slate-900">رقم الهاتف النشط</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
                  <Phone size={18} />
                </span>
                <input
                  type="tel"
                  placeholder="01xxxxxxxxx"
                  className="w-full border-2 border-slate-300 p-3.5 pr-11 rounded-xl bg-slate-50 font-black text-slate-900 font-sans text-base focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* حقل البريد الإلكتروني */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black text-slate-900">البريد الإلكتروني الشخصي</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  placeholder="patient@example.com"
                  className="w-full border-2 border-slate-300 p-3.5 pr-11 rounded-xl bg-slate-50 font-black text-slate-900 font-sans text-base focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* الأزرار المزهزهة صريحة الألوان وعالية التباين لسهولة الرؤية والقراءة */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
              <button
                disabled={saving}
                type="submit"
                className="flex-1 bg-emerald-500 hover:bg-emerald-200 text-white py-4 rounded-xl font-black text-base transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-200 active:scale-95"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>جاري حفظ السجلات المشفرة...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>تأكيد وحفظ التعديلات</span>
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() => router.push("/admin/patients")}
                className="px-6 bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-black text-base transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
              >
                <X size={18} />
                تراجع وإلغاء
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}