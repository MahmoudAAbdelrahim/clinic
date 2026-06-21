"use client";

import React from "react";
import Link from "next/link";
import { Activity, Phone, Mail, MapPin, ArrowUpLeft } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* العمود الأول: الشعار والتعريف والشبكات */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-white">
              <div className="bg-blue-600 text-white p-2 rounded-xl">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight">إليت<span className="text-blue-500">كير</span></span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              مؤسسة طبية رائدة تهدف إلى تقديم أعلى مستويات الرعاية الصحية والتشخيصية على أيدي نخبة من أكبر الأطباء والاستشاريين بأساليب علاجية حديثة.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a href="#" className="p-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-blue-600 rounded-xl transition-all"></a>
              <a href="#" className="p-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-blue-500 rounded-xl transition-all"></a>
              <a href="#" className="p-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-rose-500 rounded-xl transition-all"></a>
            </div>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-8 after:h-0.5 after:bg-blue-500">روابط سريعة</h4>
            <ul className="flex flex-col gap-3 list-none p-0 text-sm font-medium">
              <li><Link href="/" className="hover:text-blue-400 transition-colors no-underline flex items-center gap-1.5"><ArrowUpLeft className="w-3.5 h-3.5" /> الرئيسية</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors no-underline flex items-center gap-1.5"><ArrowUpLeft className="w-3.5 h-3.5" /> عن العيادة</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors no-underline flex items-center gap-1.5"><ArrowUpLeft className="w-3.5 h-3.5" /> تواصل معنا</Link></li>
              <li><Link href="/book" className="hover:text-blue-400 transition-colors no-underline flex items-center gap-1.5"><ArrowUpLeft className="w-3.5 h-3.5" /> احجز موعد طبي</Link></li>
            </ul>
          </div>

          {/* العمود الثالث: أقسام طبية تخصصية */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-8 after:h-0.5 after:bg-blue-500">الأقسام الطبية</h4>
            <ul className="flex flex-col gap-3 list-none p-0 text-sm font-medium">
              <li className="flex items-center gap-1.5"> عيادة الأمراض الباطنية</li>
              <li className="flex items-center gap-1.5"> عيادة طب الأطفال</li>
              <li className="flex items-center gap-1.5"> عيادة أمراض القلب والأوعية</li>
              <li className="flex items-center gap-1.5"> عيادة جراحة العظام والعمود الفقري</li>
            </ul>
          </div>

          {/* العمود الرابع: معلومات الفروع والاتصال السريع */}
          <div className="flex flex-col gap-4 text-sm font-medium">
            <h4 className="text-white font-bold text-base mb-1 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-8 after:h-0.5 after:bg-blue-500">اتصل بنا</h4>
            
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="font-mono text-white text-base font-bold">19000</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="font-mono">info@elitecare.com</span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-slate-400 m-0 leading-relaxed">شارع التحرير، برج الأطباء، الدقي، القاهرة.</p>
            </div>
          </div>

        </div>

        {/* الجزء السفلي لحفظ الحقوق */}
        <div className="border-t border-slate-800/80 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs font-semibold text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} منظومة إليت كير الطبية الذكية. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400 transition no-underline">سياسة الخصوصية</a>
            <a href="#" className="hover:text-slate-400 transition no-underline">شروط الاستخدام</a>
          </div>
        </div>

      </div>
    </footer>
  );
}