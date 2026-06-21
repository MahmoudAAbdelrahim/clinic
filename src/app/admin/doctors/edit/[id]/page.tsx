"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  User, 
  Phone, 
  Mail, 
  Stethoscope, 
  Loader2, 
  UserCheck, 
  X 
} from "lucide-react";

export default function EditDoctorPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    specialization: "",
  });

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const { data } = await axios.get(`/api/admin/doctors/${params.id}`);
        setForm({
          name: data.doctor.name || "",
          phone: data.doctor.phone || "",
          email: data.doctor.email || "",
          specialization: data.doctor.specialization || "",
        });
      } catch (error) {
        console.error("Error loading doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) loadDoctor();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await axios.put(`/api/admin/doctors/${params.id}`, form);
      router.push("/admin/doctors");
    } catch (error) {
      console.error("Error saving doctor data:", error);
      alert("حدث خطأ أثناء محاولة حفظ التعديلات.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-9 h-9 animate-spin text-emerald-600" />
          <span className="text-base font-black text-slate-800">جاري استدعاء سجل الطبيب...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-slate-300/60 border border-slate-200 relative overflow-hidden">
          
          {/* الشريط العلوي الخاص بهوية الموقع */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-500 to-emerald-600"></div>

          {/* الهيدر */}
          <div className="flex items-center gap-3.5 mb-8 border-b-2 border-slate-100 pb-5">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl shadow-sm">
              <UserCheck className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900">تعديل بيانات الطبيب</h1>
              <p className="text-slate-600 text-sm font-bold mt-0.5">تحديث معلومات الحساب أو الملف الشخصي السريري</p>
            </div>
          </div>

          {/* الاستمارة */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* الاسم */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-slate-800">الاسم الكامل للطبيب</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  placeholder="اسم الدكتور"
                  className="w-full border-2 border-slate-300 p-3.5 pr-11 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* رقم الهاتف والتخصص */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black text-slate-800">رقم الهاتف</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                    <Phone size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="رقم الهاتف"
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
                    placeholder="التخصص"
                    className="w-full border-2 border-slate-300 p-3.5 pr-11 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                    value={form.specialization}
                    onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* البريد الإلكتروني */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-slate-800">البريد الإلكتروني</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full border-2 border-slate-300 p-3.5 pr-11 rounded-xl bg-slate-50 font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* أزرار الحفظ والإلغاء */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                disabled={saving}
                type="submit"
                className="flex-1 bg-emerald-600 text-white py-4 rounded-xl font-black text-base hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>جاري تحديث السجل...</span>
                  </>
                ) : (
                  <span>حفظ التعديلات الحالية</span>
                )}
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() => router.push("/admin/doctors")}
                className="px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-xl font-black text-base transition flex items-center justify-center gap-1.5 border-2 border-slate-200/60 disabled:opacity-50"
              >
                <X size={18} />
                إلغاء
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}