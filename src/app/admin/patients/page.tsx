"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  Pencil, 
  FileHeart, 
  Trash2, 
  Loader2, 
  UserX 
} from "lucide-react";

export default function PatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/patients");
      setPatients(data.patients || []);
    } catch (error) {
      console.error("Error loading patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const deletePatient = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف حساب هذا المريض وسجله نهائياً من المنظومة؟")) {
      return;
    }

    try {
      await axios.delete(`/api/admin/patients/${id}`);
      loadPatients();
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("حدث خطأ أثناء محاولة الحذف.");
    }
  };

  // تصفية البحث بالاسم أو رقم الهاتف بشكل مرن
  const filtered = patients.filter(
    (patient) =>
      patient.name?.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone?.includes(search)
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-9 h-9 animate-spin text-emerald-600" />
          <span className="text-base font-black text-slate-800">جاري استدعاء سجلات المرضى...</span>
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
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900">قاعدة بيانات المرضى</h1>
              <p className="text-slate-600 text-sm font-bold mt-0.5">البحث الفرز، التعديل، والوصول المباشر للملفات الطبية المعتمدة</p>
            </div>
          </div>
        </div>

        {/* حقل البحث الذكي والمزهزه */}
        <div className="relative mb-8 shadow-sm rounded-2xl">
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="ابحث الآن عن طريق اسم المريض أو رقم الهاتف الخاص به..."
            className="w-full bg-white border-2 border-slate-200 rounded-2xl py-4 pr-12 pl-4 text-slate-900 font-black placeholder:text-slate-500 focus:outline-none focus:border-emerald-600 transition text-base shadow-inner"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* كروت عرض المرضى شيك جداً والكلام واضح بنسبة 100% */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xl max-w-xl mx-auto mt-6">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <UserX className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">لا توجد نتائج مطابقة</h3>
            <p className="text-slate-600 font-bold text-sm mt-2">يرجى التأكد من كتابة الاسم أو رقم الهاتف بشكل صحيح.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((patient) => (
              <div
                key={patient._id}
                className="bg-white p-5 md:p-6 rounded-2xl shadow-md shadow-slate-200/60 border border-slate-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 transition-all hover:border-emerald-500/50"
              >
                
                {/* بيانات المريض واضحة ومتباينة */}
                <div className="space-y-2.5">
                  <h3 className="font-black text-xl text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                    {patient.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-3">
                    {/* رقم الهاتف بارز */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-900 rounded-lg text-xs font-black border border-slate-200 font-mono">
                      <Phone size={14} className="text-emerald-600" />
                      {patient.phone || "بدون هاتف"}
                    </span>
                    
                    {/* البريد الإلكتروني بارز */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-900 rounded-lg text-xs font-black border border-slate-200 font-mono">
                      <Mail size={14} className="text-slate-500" />
                      {patient.email || "—"}
                    </span>
                  </div>
                </div>

                {/* أزرار الإجراءات المتناسقة الفخمة */}
                <div className="flex flex-wrap items-center gap-2 sm:self-center self-end">
                  
                  {/* الملف الطبي - أزرق المنظومة */}
                  <Link
                    href={`/admin/patients/${patient._id}/medical-record`}
                    className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-black text-xs no-underline shadow-md shadow-blue-500/10 transition-all"
                  >
                    <FileHeart size={14} />
                    الملف الطبي
                  </Link>

                  {/* تعديل الحساب - أصفر دافئ */}
                  <Link
                    href={`/admin/patients/edit/${patient._id}`}
                    className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-xl font-black text-xs no-underline shadow-md shadow-amber-500/10 transition-all"
                  >
                    <Pencil size={14} />
                    تعديل
                  </Link>

                  {/* حذف الحساب - أحمر وردي مزهزه */}
                  <button
                    onClick={() => deletePatient(patient._id)}
                    className="inline-flex items-center gap-1.5 bg-rose-500 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl font-black text-xs shadow-md shadow-rose-700/10 transition-all"
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