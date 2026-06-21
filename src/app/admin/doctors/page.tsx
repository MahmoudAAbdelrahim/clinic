"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  UserCog, 
  Plus, 
  Pencil, 
  Trash2, 
  Phone, 
  Stethoscope, 
  Loader2, 
  UserX 
} from "lucide-react";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/doctors");
      setDoctors(data.doctors || []);
    } catch (error) {
      console.error("Error loading doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const deleteDoctor = async (id: string) => {
    const ok = confirm("هل أنت متأكد من حذف حساب هذا الطبيب نهائياً من المنظومة؟");
    if (!ok) return;

    try {
      await axios.delete(`/api/admin/doctors/${id}`);
      loadDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("حدث خطأ أثناء محاولة الحذف.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-9 h-9 animate-spin text-emerald-600" />
          <span className="text-base font-black text-slate-800">جاري تحميل قائمة الأطباء...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 md:px-8" dir="rtl">
      <div className="max-w-5xl mx-auto">

        {/* الهيدر الفخم */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8 border-b-2 border-slate-200 pb-6">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-600/20">
              <UserCog className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900">الكادر الطبي بالعيادة</h1>
              <p className="text-slate-600 text-sm font-bold mt-0.5">التحكم في حسابات الأطباء وتخصصاتهم وصلاحيات الدخول</p>
            </div>
          </div>

          <Link
            href="/admin/doctors/add"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-3.5 rounded-xl font-black text-base shadow-lg shadow-emerald-200 no-underline transition-all transform hover:-translate-y-0.5"
          >
            <Plus size={18} />
            إضافة طبيب جديد
          </Link>
        </div>

        {/* إذا كانت القائمة فارغة */}
        {doctors.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xl max-w-xl mx-auto mt-12">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserX className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-black text-slate-900">لا يوجد أطباء مسجلين</h3>
            <p className="text-slate-600 font-bold text-sm mt-2">
              لم يتم تدوين أي طبيب في قاعدة البيانات الحالية حتى الآن.
            </p>
          </div>
        ) : (
          /* شبكة عرض البطاقات بشكل فخم */
          <div className="grid gap-4">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white p-5 md:p-6 rounded-2xl shadow-md shadow-slate-200/60 border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 transition-all hover:border-emerald-500/50"
              >
                
                {/* معلومات الطبيب */}
                <div className="space-y-2">
                  <h3 className="font-black text-xl text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {doctor.name}
                  </h3>

                  
                  
                  <div className="flex flex-wrap gap-3 pt-1">
                    {/* شارة التخصص */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-black border border-emerald-200/60">
                      <Stethoscope size={14} className="text-emerald-600" />
                      {doctor.specialization || "عام"}
                    </span>
                    
                    {/* شارة رقم الهاتف */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-800 rounded-lg text-xs font-black border border-slate-200">
                      <Phone size={14} className="text-slate-500" />
                      {doctor.phone || "غير متاح"}
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-800 rounded-lg text-xs font-black border border-slate-200">
                      <Phone size={14} className="text-slate-500" />
                      {doctor.email || "غير متاح"}
                    </span>

                  </div>
                </div>

                {/* أزرار الإجراءات الفخمة */}
                <div className="flex items-center gap-2.5 sm:self-center self-end">
                  
                  {/* زر التعديل بالأصفر الدافئ المميز */}
                  <Link
                    href={`/admin/doctors/edit/${doctor._id}`}
                    className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-xl font-black text-xs no-underline shadow-md shadow-amber-500/10 transition-all"
                  >
                    <Pencil size={14} />
                    تعديل
                  </Link>

                  {/* زر الحذف بالريد المزهزه */}
                  <button
                    onClick={() => deleteDoctor(doctor._id)}
                    className="inline-flex items-center gap-1.5 bg-rose-500 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl font-black text-xs shadow-md shadow-rose-600/10 transition-all"
                  >
                    <Trash2 size={14} />
                    حذف
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}