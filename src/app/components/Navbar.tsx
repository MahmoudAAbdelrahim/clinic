"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Activity, User, Menu, X } from "lucide-react";
import useAuth from "../../hooks/useAuth";

type Role =
  | "guest"
  | "patient"
  | "doctor"
  | "admin"
  | "receptionist";

interface NavbarProps {
  role?: Role;
}

export default function Navbar() {

  const { user, loading } = useAuth();

  const role = user?.role || "guest";

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* يمينًا: الشعار والاسم العصري للمنظومة */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md shadow-blue-100">
              <Activity className="w-5 h-5" />
            </div>
            <Link href="/" className="text-xl font-black text-slate-900 tracking-tight no-underline hover:text-blue-600 transition-colors">
              إليت<span className="text-blue-600">كير</span>
            </Link>
          </div>

          {/* المنتصف واليسار: روابط الانتقال حسب الصلاحية (شاشات الكمبيوتر) */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6 list-none mb-0 p-0 text-sm font-medium text-slate-600">
              
              {/* روابط الزائر العادي */}
              {role === "guest" && (
                <>
                  <li><Link href="/" className="hover:text-blue-600 transition-colors no-underline">الرئيسية</Link></li>
                  <li><Link href="/about" className="hover:text-blue-600 transition-colors no-underline">عن العيادة</Link></li>
                  <li><Link href="/contact" className="hover:text-blue-600 transition-colors no-underline">تواصل معنا</Link></li>
                </>
              )}

              {/* روابط المريض */}
              {role === "patient" && (
                <>
                  <li><Link href="/book" className="hover:text-blue-600 transition-colors no-underline">احجز موعد</Link></li>
                  <li><Link href="/appointments" className="hover:text-blue-600 transition-colors no-underline">مواعيدي</Link></li>
                  <li><Link href="/treatment" className="hover:text-blue-600 transition-colors no-underline">العلاج</Link></li>
                  <li><Link href="/medical-file" className="hover:text-blue-600 transition-colors no-underline">الملف الطبي</Link></li>
                </>
              )}

              {/* روابط الطبيب */}
              {role === "doctor" && (
                <>
                  <li><Link href="/doctor/today" className="hover:text-blue-600 transition-colors no-underline">مواعيد اليوم</Link></li>
                  <li><Link href="/doctor/patients" className="hover:text-blue-600 transition-colors no-underline">المرضى</Link></li>
                </>
              )}
{role === "admin" && (
  <>
    <li>
      <Link
        href="/admin"
        className="hover:text-blue-600 transition-colors no-underline"
      >
        لوحة التحكم
      </Link>
    </li>

    <li>
      <Link
        href="/admin/doctors"
        className="hover:text-blue-600 transition-colors no-underline"
      >
        الأطباء
      </Link>
    </li>

    <li>
      <Link
        href="/admin/patients"
        className="hover:text-blue-600 transition-colors no-underline"
      >
        المرضى
      </Link>
    </li>

    <li>
      <Link
        href="/admin/appointments"
        className="hover:text-blue-600 transition-colors no-underline"
      >
        المواعيد
      </Link>
    </li>
  </>
)}
              {/* روابط موظف الاستقبال */}
              {role === "receptionist" && (
                <li><Link href="/appointments/manage" className="hover:text-blue-600 transition-colors no-underline">إدارة المواعيد</Link></li>
              )}
            </ul>

            {/* أزرار الحساب الشخصي والدخول جهة اليسار */}
            <div className="flex items-center gap-3 border-r border-slate-100 pr-6">
              {role === "guest" ? (
                <>
                  <Link href="/login" className="text-slate-600 font-medium text-sm hover:text-blue-600 transition-colors no-underline px-4 py-2 rounded-xl hover:bg-slate-50">
                    تسجيل دخول
                  </Link>
                  <Link href="/register" className="bg-blue-600 text-white font-semibold text-sm px-4 py-2 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all no-underline">
                    إنشاء حساب
                  </Link>
                </>
              ) : (
                <Link href="/profile" className="p-2 text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-full transition-all">
                  <User className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>

          {/* زر فتح قائمة الموبايل */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* قائمة الموبايل المنسدلة التفاعلية */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 flex flex-col gap-2 shadow-inner">
          <ul className="flex flex-col gap-1 list-none p-0 m-0 text-slate-700 font-medium">
            {role === "guest" && (
              <>
                <li><Link href="/" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 no-underline transition-all">الرئيسية</Link></li>
                <li><Link href="/about" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 no-underline transition-all">عن العيادة</Link></li>
                <li><Link href="/contact" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 no-underline transition-all">تواصل معنا</Link></li>
              </>
            )}

            {role === "patient" && (
              <>
                <li><Link href="/book" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 no-underline transition-all">احجز موعد</Link></li>
                <li><Link href="/appointments" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 no-underline transition-all">مواعيدي</Link></li>
                <li><Link href="/treatment" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 no-underline transition-all">العلاج</Link></li>
                <li><Link href="/medical-file" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 no-underline transition-all">الملف الطبي</Link></li>
              </>
            )}

            {role === "doctor" && (
              <>
                <li><Link href="/doctor/today" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 no-underline transition-all">مواعيد اليوم</Link></li>
                <li><Link href="/doctor/patients" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 no-underline transition-all">المرضى</Link></li>
              </>
            )}
{role === "admin" && (
  <>
    <li>
      <Link
        href="/admin"
        onClick={() => setIsOpen(false)}
        className="block py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 no-underline transition-all"
      >
        لوحة التحكم
      </Link>
    </li>

    <li>
      <Link
        href="/admin/doctors"
        onClick={() => setIsOpen(false)}
        className="block py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 no-underline transition-all"
      >
        إدارة الأطباء
      </Link>
    </li>

    <li>
      <Link
        href="/admin/patients"
        onClick={() => setIsOpen(false)}
        className="block py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 no-underline transition-all"
      >
        إدارة المرضى
      </Link>
    </li>

    <li>
      <Link
        href="/admin/appointments"
        onClick={() => setIsOpen(false)}
        className="block py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 no-underline transition-all"
      >
        إدارة المواعيد
      </Link>
    </li>
  </>
)}
            {role === "receptionist" && (
              <li><Link href="/appointments/manage" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 no-underline transition-all">إدارة المواعيد</Link></li>
            )}
          </ul>

          {/* أزرار الحساب للموبايل */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {role === "guest" ? (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="text-center text-slate-700 font-medium py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 no-underline transition-all">
                  تسجيل دخول
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="text-center bg-blue-600 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-100 no-underline transition-all">
                  إنشاء حساب
                </Link>
              </>
            ) : (
              <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 text-slate-700 font-medium py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 no-underline transition-all">
                <User className="w-5 h-5" />
                <span>الملف الشخصي</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}