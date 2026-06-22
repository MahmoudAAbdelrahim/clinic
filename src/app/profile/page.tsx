"use client";

import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  LogOut,
  Trash2,
  Pencil,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

import axios from "axios";
import { useState , useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();

  const { user, loading } = useAuth();

  const [showDeleteModal, setShowDeleteModal] =
  useState(false);

  const [processing, setProcessing] =
  useState(false);

const handleLogout = async () => {
  try {

    setProcessing(true);

    await axios.post(
      "/api/auth/logout"
    );

    router.replace("/");

    router.refresh();

  } catch (error) {

    console.log(error);

  } finally {

    setProcessing(false);

  }
};
const [stats, setStats] =
useState({
  appointments: 0,
  treatments: 0,
});

useEffect(() => {

  const loadStats =
  async () => {

    const { data } =
    await axios.get(
      "/api/profile/stats"
    );

    setStats(data);
  };

  loadStats();

}, []);
const deleteAccount = async () => {

  try {

    setProcessing(true);

    await axios.delete(
      "/api/profile/delete"
    );

    router.replace("/");

    router.refresh();

  } catch (error) {

    console.log(error);

  } finally {

    setProcessing(false);

  }
};


  if (loading) {
    return (
      <div className="container py-5 text-slate-700 font-medium" dir="rtl">
        جاري تحميل البيانات...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const roleName = {
    patient: "مريض",
    doctor: "طبيب",
    admin: "مدير النظام",
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4" dir="rtl">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-100">

          <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-600" />

          <div className="px-8 pb-8">

            <div className="-mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">

              <div className="flex items-center gap-5">

                <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white shrink-0">
                  <User className="w-14 h-14 text-slate-400" />
                </div>

                <div>
                  <h1 className="text-3xl font-black text-slate-900">
                    {user.name}
                  </h1>

                  <p className="text-slate-500 font-medium mt-1">
                    {roleName[user.role as keyof typeof roleName]}
                  </p>
                </div>

              </div>

              <button
                onClick={() =>
                  router.push("/profile/edit")
                }
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 font-bold transition shadow-md shadow-blue-100"
              >
                <Pencil size={18} />
                تعديل البيانات
              </button>

            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-10">

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100/80">

                <h2 className="font-bold text-lg mb-5 text-slate-900">
                  المعلومات الشخصية
                </h2>

                <div className="space-y-4 text-slate-700 font-medium">

                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100">
                    <User size={20} className="text-blue-600" />
                    <span>{user.name}</span>
                  </div>

                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100">
                    <Phone size={20} className="text-blue-600" />
                    <span className="font-mono">{user.phone}</span>
                  </div>

                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100">
                    <Mail size={20} className="text-blue-600" />
                    <span className="font-mono">{user.email || "-"}</span>
                  </div>

                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100">
                    <Shield size={20} className="text-blue-600" />
                    <span>{roleName[user.role as keyof typeof roleName] || user.role}</span>
                  </div>

                </div>

              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100/80">

                <h2 className="font-bold text-lg mb-5 text-slate-900">
                  إحصائيات الحساب
                </h2>

                <div className="grid grid-cols-2 gap-4">

                  <div className="bg-white rounded-xl p-4 border border-slate-100">
                    <h3 className="text-slate-400 text-sm font-semibold">
                      المواعيد
                    </h3>

                    <p className="text-2xl font-black text-slate-900 mt-1">
                      {stats.appointments}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-slate-100">
                    <h3 className="text-slate-400 text-sm font-semibold">
                      العلاجات
                    </h3>

                    <p className="text-2xl font-black text-slate-900 mt-1">
                      {stats.treatments}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4 col-span-2 border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
                      <Calendar size={18} className="text-indigo-600" />
                      <span>
                        عضو منذ:
                      </span>
                    </div>

                    <p className="mt-2 text-slate-800 font-bold font-mono">
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString("ar-EG", { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-8">

              <button
                onClick={() =>
                  router.push(
                    "/profile/change-password"
                  )
                }
                className="bg-amber-500 text-white py-3.5 rounded-xl font-bold hover:bg-amber-600 transition shadow-sm"
              >
                تغيير كلمة المرور
              </button>

              <button
                onClick={handleLogout}
                disabled={processing}
                className="bg-slate-800 text-white py-3.5 rounded-xl font-bold hover:bg-slate-950 transition flex items-center justify-center gap-2 shadow-sm"
              >
                <LogOut size={18} />
                تسجيل الخروج
              </button>

              <button
               onClick={() =>
                setShowDeleteModal(true)
              }
                className="md:col-span-2 bg-red-600 text-white py-3.5 rounded-xl font-bold hover:bg-red-700 transition flex items-center justify-center gap-2 shadow-sm"
              >
                <Trash2 size={18} />
                حذف الحساب نهائياً
              </button>

            </div>

          </div>

        </div>

      </div>
{
showDeleteModal && (

<div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">

  <div className="bg-white rounded-3xl p-6 w-full max-w-md">

    <h3 className="text-xl font-black text-slate-900">
      حذف الحساب
    </h3>

    <p className="mt-3 text-slate-600">
      سيتم حذف الحساب نهائياً ولن
      تستطيع استعادته مرة أخرى.
    </p>

    <div className="flex gap-3 mt-6">

      <button
        onClick={() =>
        setShowDeleteModal(false)
        }
        className="flex-1 border border-slate-200 py-3 rounded-xl"
      >
        إلغاء
      </button>

      <button
        disabled={processing}
        onClick={deleteAccount}
        className="flex-1 bg-red-600 text-white py-3 rounded-xl"
      >
        نعم احذف الحساب
      </button>

    </div>

  </div>

</div>

)
}
    </div>
  );
}