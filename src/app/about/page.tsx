"use client";

import React from "react";
import { ShieldCheck, Award, Users, HeartPulse, Target, CheckCircle2, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800" dir="rtl">
      
      {/* 1. قسم البانر العلوي الضخم */}
      <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="bg-white/10 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full backdrop-blur-sm">
            مرحباً بكم في إليت كير
          </span>
          <h1 className="text-4xl md:text-6xl font-black mt-4 tracking-tight leading-tight">
            رعاية طبية تليق بك وبأسرتك
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto font-medium">
            نحن لسنا مجرد عيادة، نحن منظومة صحية متكاملة تسعى لتقديم أرقى الخدمات الطبية بأساليب تكنولوجية مبتكرة ورعاية إنسانية فائقة.
          </p>
        </div>
      </section>

      {/* 2. قسم أرقام وإحصائيات فخمة */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
          <div className="text-center border-l md:border-l border-slate-100 last:border-0 pl-4">
            <p className="text-3xl md:text-4xl font-black text-blue-600 font-mono">+15,000</p>
            <p className="text-sm font-bold text-slate-500 mt-2">مريض سعيد</p>
          </div>
          <div className="text-center md:border-l border-slate-100 last:border-0 pl-4">
            <p className="text-3xl md:text-4xl font-black text-blue-600 font-mono">+45</p>
            <p className="text-sm font-bold text-slate-500 mt-2">طبيب استشاري</p>
          </div>
          <div className="text-center border-l md:border-l border-slate-100 last:border-0 pl-4">
            <p className="text-3xl md:text-4xl font-black text-blue-600 font-mono">+12</p>
            <p className="text-sm font-bold text-slate-500 mt-2">قسم طبي متخصص</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-black text-blue-600 font-mono">99.4%</p>
            <p className="text-sm font-bold text-slate-500 mt-2">نسبة نجاح العمليات</p>
          </div>
        </div>
      </section>

      {/* 3. قسم الرؤية والرسالة */}
      <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex gap-5 items-start">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
            <Target className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">رؤيتنا</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              أن نكون الواجهة الطبية الأولى والملهمة في تقديم الرعاية الصحية الرقمية والسريرية على مستوى المنطقة، متجاوزين التوقعات التقليدية عبر تبني أحدث ما توصلت إليه الأبحاث والحلول الطبية.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex gap-5 items-start">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl shrink-0">
            <HeartPulse className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">رسالتنا</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              التزامنا المطلق بصحة المرضى من خلال توفير بيئة علاجية آمنة ومريحة، تجمع بين الكفاءات الطبية اللامعة والتقنيات التشخيصية الحديثة، مع الحفاظ على خصوصية المريض وكرامته كأولوية قصوى.
            </p>
          </div>
        </div>
      </section>

      {/* 4. قسم مميزات العيادة الفخمة */}
      <section className="bg-white border-y border-slate-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900">لماذا يختار المرضى عياداتنا؟</h2>
            <p className="text-slate-500 mt-3 font-medium">نحن نضع معايير جديدة تماماً للخدمات الطبية</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">أعلى معايير الأمان</h4>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">نطبق بروتوكولات تعقيم عالمية صارمة لضمان بيئة علاجية خالية تماماً من المخاطر والأوبئة.</p>
            </div>

            <div className="p-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">أطباء نخبة</h4>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">طاقمنا الطبي يتكون من استشاريين وأساتذة جامعيين حاصلين على زمالات دولية وخبرات عملية طويلة.</p>
            </div>

            <div className="p-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">رعاية مخصصة للفرد</h4>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">لكل مريض ملف طبي إلكتروني فريد وخطة علاجية مخصصة ومتابعة دورية مستمرة حتى الشفاء التام.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}