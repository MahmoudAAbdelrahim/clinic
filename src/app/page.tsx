"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Activity, 
  Video, 
  Shield, 
  Users, 
  Clock, 
  Heart, 
  Cpu, 
  Lock, 
  Star, 
  ChevronLeft 
} from 'lucide-react';

export default function SmartClinicHome() {
  
  // أنميشن مخصص لظهور العناصر بسلاسة عند التمرير
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-500 selection:text-white" dir="rtl">
      
      {/* 1. قسم البطولة الجديد (Hero Section) */}
      <section className="relative px-4 pt-20 pb-24 overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* النصوص والعناوين */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-right"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
              المنظومة الطبية الذكية لعام 2026
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
              رعاية طبية تتجاوز <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">جدران العيادة التقليدية</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              منظومة متكاملة مخصصة لراحتك تدمج بين دقة الفحص داخل العيادة، مرونة الاستشارات الرقمية، ومتابعة حالتك الصحية لحظة بلحظة.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
              <button className="bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all transform hover:-translate-y-1">
                احجز موعدك الآن
              </button>
              <button className="border-2 border-slate-200 bg-white text-slate-700 font-medium px-6 py-4 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <Video className="w-5 h-5 text-blue-600" />
                منظومة الاستشارة الفورية
              </button>
            </div>
          </motion.div>

          {/* محاكاة واجهة السيستم الذكي */}
          <div className="relative w-full max-w-xl mx-auto">
            {/* خلفية جمالية ملونة دائرية */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-400/20 blur-3xl rounded-full pointer-events-none"></div>
            
            {/* لوحة السيستم النظيفة */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative bg-white border border-slate-100 p-6 rounded-3xl shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                </div>
                <span className="text-xs text-slate-400 font-mono font-medium">الملف الطبي الرقمي الموحد</span>
              </div>

              {/* مسارات المريض الـ 3 (حجز، متابعة، استشارة) */}
              <div className="flex flex-col gap-4">
                <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-blue-50/40 border border-blue-100/50 rounded-2xl flex items-center justify-between cursor-pointer transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-100"><Calendar className="w-5 h-5" /></div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-0.5">حجز موعد فوري بالعيادة</h4>
                      <p className="text-xs text-slate-500">تأكيد تلقائي وذكي بدون انتظار</p>
                    </div>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-blue-600" />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-indigo-50/40 border border-indigo-100/50 rounded-2xl flex items-center justify-between cursor-pointer transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-100"><Activity className="w-5 h-5" /></div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-0.5">متابعة الخطة العلاجية والتقارير</h4>
                      <p className="text-xs text-slate-500">تحديثات لحظية ومستمرة من طبيبك</p>
                    </div>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-indigo-600" />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-violet-50/40 border border-violet-100/50 rounded-2xl flex items-center justify-between cursor-pointer transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-violet-600 text-white rounded-xl shadow-md shadow-violet-100"><Video className="w-5 h-5" /></div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-0.5">عيادة افتراضية (استشارة عن بُعد)</h4>
                      <p className="text-xs text-slate-500">اتصال مرئي مباشر مشفر وآمن بالكامل</p>
                    </div>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-violet-600" />
                </motion.div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. قسم ركائز الثقة (Trust Section) */}
      <section className="py-20 bg-white px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">منظومة صحية تستحق ثقتك</h2>
            <p className="text-slate-600">نحن ندمج الخبرة الطبية العريقة بالتكنولوجيا الحديثة لتوفير أعلى درجات الأمان والسرعة.</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="p-6 border border-slate-100 bg-slate-50/50 rounded-2xl transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-100/40 group">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-6 transition-all group-hover:bg-blue-600 group-hover:text-white">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">خصوصية وتشفير كامل</h3>
              <p className="text-slate-600 leading-relaxed text-sm">بياناتك الطبية وسجلاتك محمية بنسبة 100% وفق أعلى المعايير العالمية وخاضعة لتشفير صارم لا يطّلع عليه سوى طبيبك الخاص.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="p-6 border border-slate-100 bg-slate-50/50 rounded-2xl transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-100/40 group">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-6 transition-all group-hover:bg-blue-600 group-hover:text-white">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">نخبة من الاستشاريين</h3>
              <p className="text-slate-600 leading-relaxed text-sm">فريق طبي متكامل ومؤهل بأعلى الشهادات الطبية والخبرات العملية الطويلة لضمان دقة التشخيص وجودة الخطة العلاجية.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="p-6 border border-slate-100 bg-slate-50/50 rounded-2xl transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-100/40 group">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-6 transition-all group-hover:bg-blue-600 group-hover:text-white">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">احترام تام للوقت</h3>
              <p className="text-slate-600 leading-relaxed text-sm">نظام الجدولة الذكي يضمن لك الدخول مباشرة في موعدك المحدد دون دقيقة انتظار واحدة، مع رسائل تذكيرية آلية.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. قسم قيمنا الجوهرية (Our Core Values) */}
      <section className="py-20 bg-slate-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-blue-600 font-bold tracking-wider text-xs block mb-2">ثقافتنا ورؤيتنا</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">القيم التي تحركنا لتقديم رعاية صحية أفضل</h2>
            <p className="text-slate-600 leading-relaxed">
              نحن نؤمن بأن الرعاية الطبية ليست مجرد وصفة دواء، بل هي تجربة إنسانية متكاملة مدعومة بالحلول التكنولوجية لتسهيل رحلة العلاج والتعافي.
            </p>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <Heart className="w-8 h-8 text-rose-500 mb-4" />
              <h4 className="font-bold text-slate-900 mb-2">الإنسانية والتعاطف</h4>
              <p className="text-slate-600 text-sm leading-relaxed">نستمع لشكواك بكل اهتمام، ونضع راحتك النفسية والجسدية في مقدمة أولوياتنا.</p>
            </div>
            
            <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <Cpu className="w-8 h-8 text-blue-600 mb-4" />
              <h4 className="font-bold text-slate-900 mb-2">الابتكار المستمر</h4>
              <p className="text-slate-600 text-sm leading-relaxed">تطوير مستمر للأدوات الرقمية لنقرب المسافات بين المريض وطبيبه بكل سلاسة.</p>
            </div>
            
            <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <Shield className="w-8 h-8 text-indigo-600 mb-4" />
              <h4 className="font-bold text-slate-900 mb-2">النزاهة والشفافية</h4>
              <p className="text-slate-600 text-sm leading-relaxed">وضوح تام في تفاصيل التشخيص، خطة العلاج، والمواعيد دون أي تعقيدات.</p>
            </div>
            
            <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <Star className="w-8 h-8 text-amber-500 mb-4" />
              <h4 className="font-bold text-slate-900 mb-2">التميز والجودة</h4>
              <p className="text-slate-600 text-sm leading-relaxed">الالتزام بأعلى المعايير الطبية لضمان سلامة المرضى ونجاح العلاج.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. قسم آراء المرضى (Testimonials) */}
      <section className="py-20 bg-white px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-bold text-xs tracking-wider block mb-2">تجارب مراجعينا</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">تجارب واقعية وقصص تعافي</h2>
            <p className="text-slate-600">آراء حقيقية من أشخاص استعادوا عافيتهم وتابعوا حالتهم الطبية من خلال منظومتنا الذكية.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* رأي 1 */}
            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/40 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-6">
                  "تجربة رائعة جداً، حجزت الموعد عبر الموقع ودخلت فوراً في وقتي المحدد دون الانتظار المزعج في العيادات التقليدية. نظام مريح ومنظم للغاية."
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">خ. م</div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900">خالد محمد ع.</h5>
                  <span className="text-xs text-slate-400">حجز حضوري بالعيادة</span>
                </div>
              </div>
            </div>

            {/* رأي 2 */}
            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/40 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-6">
                  "أكثر ما يميز السيستم هو الملف الطبي الرقمي، كل التحاليل والروشتات السابقة موجودة في مكان واحد، الاستشارة عن بعد بالفيديو وفرت علي عناء السفر للمتابعة."
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">ن. أ</div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900">ندى أحمد س.</h5>
                  <span className="text-xs text-slate-400">استشارة عن بُعد + ملف رقمي</span>
                </div>
              </div>
            </div>

            {/* رأي 3 */}
            <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/40 flex flex-col justify-between md:col-span-2 lg:col-span-1">
              <div>
                <div className="flex text-amber-400 gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-6">
                  "برنامج المتابعة بعد العلاج ممتاز جداً، يتابعون معك بدقة لتعديل جرعات الأدوية بناء على الفحوصات المستمرة بشكل آلي وسلس وبدون تعقيد."
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                <div className="w-10 h-10 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold text-sm">م. ر</div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900">مروان رأفت ف.</h5>
                  <span className="text-xs text-slate-400">برنامج المتابعة الذكية</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}