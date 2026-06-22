"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
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
  ChevronLeft,
  X,
  Send,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

// ─── أنميشن ──────────────────────────────────────────────────────────────────
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// ─── بيانات التقييمات الافتراضية ─────────────────────────────────────────────
const DEFAULT_REVIEWS = [
  {
    id: 1,
    name: "خالد محمد ع.",
    initials: "خ. م",
    color: "bg-blue-600",
    type: "حجز حضوري بالعيادة",
    rating: 5,
    text: "تجربة رائعة جداً، حجزت الموعد عبر الموقع ودخلت فوراً في وقتي المحدد دون الانتظار المزعج في العيادات التقليدية. نظام مريح ومنظم للغاية.",
  },
  {
    id: 2,
    name: "ندى أحمد س.",
    initials: "ن. أ",
    color: "bg-indigo-600",
    type: "استشارة عن بُعد + ملف رقمي",
    rating: 5,
    text: "أكثر ما يميز السيستم هو الملف الطبي الرقمي، كل التحاليل والروشتات السابقة موجودة في مكان واحد، الاستشارة عن بعد بالفيديو وفرت علي عناء السفر للمتابعة.",
  },
  {
    id: 3,
    name: "مروان رأفت ف.",
    initials: "م. ر",
    color: "bg-violet-600",
    type: "برنامج المتابعة الذكية",
    rating: 5,
    text: "برنامج المتابعة بعد العلاج ممتاز جداً، يتابعون معك بدقة لتعديل جرعات الأدوية بناء على الفحوصات المستمرة بشكل آلي وسلس وبدون تعقيد.",
  },
];

// ─── ألوان افتراضية للمراجعين الجدد ─────────────────────────────────────────
const AVATAR_COLORS = [
  "bg-emerald-600",
  "bg-rose-600",
  "bg-amber-600",
  "bg-teal-600",
  "bg-pink-600",
];

// ─── مودال إضافة تقييم ───────────────────────────────────────────────────────
interface ReviewModalProps {
  onClose: () => void;
  onSubmit: (review: { name: string; type: string; rating: number; text: string }) => void;
}

function ReviewModal({ onClose, onSubmit }: ReviewModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !text.trim() || rating === 0) return;
    onSubmit({ name: name.trim(), type: type.trim() || "مريض", rating, text: text.trim() });
    setSubmitted(true);
    setTimeout(() => onClose(), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative"
      >
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
              <CheckCircle2 className="w-16 h-16 text-emerald-500" />
            </motion.div>
            <h3 className="text-xl font-bold text-slate-900">شكراً لمشاركتك!</h3>
            <p className="text-slate-500 text-sm text-center">تقييمك يساعدنا نتحسن باستمرار 💙</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">شاركنا تجربتك</h3>
            <p className="text-slate-500 text-sm mb-7">رأيك بيفرق كتير مع كل مريض جديد</p>

            {/* الاسم */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">الاسم</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسمك الكريم..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* نوع الخدمة */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">نوع الخدمة</label>
              <input
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="مثال: حجز حضوري، استشارة عن بُعد..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* التقييم بالنجوم */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">تقييمك</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoverRating || rating)
                          ? "text-amber-400 fill-current"
                          : "text-slate-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* نص التقييم */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">تجربتك</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                placeholder="شاركنا تجربتك مع العيادة..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!name.trim() || !text.trim() || rating === 0}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
              أرسل تقييمك
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}

// ─── بطاقة التقييم ────────────────────────────────────────────────────────────
interface ReviewCardProps {
  review: {
    id: number;
    name: string;
    initials: string;
    color: string;
    type: string;
    rating: number;
    text: string;
  };
  isNew?: boolean;
}

function ReviewCard({ review, isNew }: ReviewCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial={isNew ? { opacity: 0, scale: 0.9, y: 20 } : undefined}
      animate={isNew ? { opacity: 1, scale: 1, y: 0 } : undefined}
      className="p-6 rounded-2xl border border-slate-100 bg-slate-50/40 flex flex-col justify-between"
    >
      <div>
        <div className="flex text-amber-400 gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < review.rating ? "fill-current text-amber-400" : "text-slate-200"}`}
            />
          ))}
        </div>
        <p className="text-slate-700 text-sm leading-relaxed mb-6">"{review.text}"</p>
      </div>
      <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
        <div className={`w-10 h-10 ${review.color} text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0`}>
          {review.initials}
        </div>
        <div>
          <h5 className="text-sm font-bold text-slate-900">{review.name}</h5>
          <span className="text-xs text-slate-400">{review.type}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── الصفحة الرئيسية ──────────────────────────────────────────────────────────
export default function SmartClinicHome() {
  const router = useRouter();
  const { user } = useAuth();
  const role = user?.role || "guest";

  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
  const [showModal, setShowModal] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  // ─── الزر الرئيسي حسب الدور ──────────────────────────────────────────────
  const handleMainAction = () => {
    if (role === "guest") { router.push("/login"); return; }
    if (role === "patient") { router.push("/book"); return; }
    if (role === "doctor") { router.push("/doctor"); return; }
    if (role === "admin") { router.push("/admin"); return; }
  };

  const mainBtnLabel =
    role === "guest" ? "سجل دخول" :
    role === "patient" ? "احجز موعد" :
    role === "doctor" ? "لوحة الطبيب" :
    "لوحة الإدارة";

  // ─── إضافة تقييم جديد ────────────────────────────────────────────────────
  const handleAddReview = (data: { name: string; type: string; rating: number; text: string }) => {
    const initials = data.name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join(". ");

    const newReview = {
      id: Date.now(),
      name: data.name,
      initials,
      color: AVATAR_COLORS[colorIndex % AVATAR_COLORS.length],
      type: data.type,
      rating: data.rating,
      text: data.text,
    };

    setReviews((prev) => [...prev, newReview]);
    setColorIndex((prev) => prev + 1);
  };

  // ─── لوحة تحكم حسب الدور (للزوار تظهر عيادة افتراضية) ──────────────────
  const renderRolePanel = () => {
    if (role === "guest") {
      return (
        <div className="mt-4 p-4 bg-blue-50/60 border border-blue-100 rounded-2xl text-center">
          <p className="text-sm text-blue-700 font-medium">
            سجّل دخولك لتتمتع بخدمات العيادة الذكية بالكامل
          </p>
        </div>
      );
    }

    if (role === "patient") {
      return (
        <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
          <p className="text-sm font-bold text-emerald-800 mb-1">مرحباً، {user?.name || "مريضنا الكريم"} 👋</p>
          <p className="text-xs text-emerald-700">موعدك القادم: لا يوجد مواعيد قريبة</p>
          <button onClick={() => router.push("/book")} className="mt-3 w-full bg-emerald-600 text-white text-xs font-bold py-2 rounded-xl hover:bg-emerald-700 transition-all">
            + احجز موعد جديد
          </button>
        </div>
      );
    }

    if (role === "doctor") {
      return (
        <div className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
          <p className="text-sm font-bold text-indigo-800 mb-1">د. {user?.name || "الطبيب"} 🩺</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button onClick={() => router.push("/doctor/today")} className="bg-indigo-600 text-white text-xs font-bold py-2 rounded-xl hover:bg-indigo-700 transition-all">
              مواعيدي اليوم
            </button>
            <button onClick={() => router.push("/doctor/patients")} className="bg-white border border-indigo-200 text-indigo-700 text-xs font-bold py-2 rounded-xl hover:bg-indigo-50 transition-all">
              ملفات المرضى
            </button>
          </div>
        </div>
      );
    }

    if (role === "admin") {
      return (
        <div className="mt-4 p-4 bg-rose-50 border border-rose-100 rounded-2xl">
          <p className="text-sm font-bold text-rose-800 mb-1">لوحة الإدارة ⚙️</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button onClick={() => router.push("/admin/doctors")} className="bg-rose-600 text-white text-xs font-bold py-2 rounded-xl hover:bg-rose-700 transition-all">
              إدارة الأطباء
            </button>
            <button onClick={() => router.push("/admin/patients")} className="bg-white border border-rose-200 text-rose-700 text-xs font-bold py-2 rounded-xl hover:bg-rose-50 transition-all">
              إدارة المرضى
            </button>
            <button onClick={() => router.push("/admin/appointments")} className="bg-white border border-rose-200 text-rose-700 text-xs font-bold py-2 rounded-xl hover:bg-rose-50 transition-all">
              المواعيد
            </button>
            <button onClick={() => router.push("/admin/records")} className="bg-white border border-rose-200 text-rose-700 text-xs font-bold py-2 rounded-xl hover:bg-rose-50 transition-all">
              السجلات
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-500 selection:text-white" dir="rtl">

      {/* ── مودال التقييم ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <ReviewModal
            onClose={() => setShowModal(false)}
            onSubmit={(data) => { handleAddReview(data); setShowModal(false); }}
          />
        )}
      </AnimatePresence>

      {/* ══ 1. Hero Section ════════════════════════════════════════════════════ */}
      <section className="relative px-4 pt-20 pb-24 overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* النصوص */}
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
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                جدران العيادة التقليدية
              </span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              منظومة متكاملة مخصصة لراحتك تدمج بين دقة الفحص داخل العيادة، مرونة الاستشارات الرقمية، ومتابعة حالتك الصحية لحظة بلحظة.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
              <button
                onClick={handleMainAction}
                className="bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200"
              >
                {mainBtnLabel}
              </button>
              <button
                onClick={() => router.push("/consultation")}
                className="border-2 border-slate-200 bg-white text-slate-700 font-medium px-6 py-4 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <Video className="w-5 h-5 text-blue-600" />
                منظومة الاستشارة الفورية
              </button>
            </div>
          </motion.div>

          {/* لوحة السيستم */}
          <div className="relative w-full max-w-xl mx-auto">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-400/20 blur-3xl rounded-full pointer-events-none"></div>

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

              <div className="flex flex-col gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => role === "patient" ? router.push("/book") : handleMainAction()}
                  className="p-4 bg-blue-50/40 border border-blue-100/50 rounded-2xl flex items-center justify-between cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-100">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-0.5">حجز موعد فوري بالعيادة</h4>
                      <p className="text-xs text-slate-500">تأكيد تلقائي وذكي بدون انتظار</p>
                    </div>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-blue-600" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => router.push(role === "patient" ? "/treatment" : role === "doctor" ? "/doctor/patients" : "/login")}
                  className="p-4 bg-indigo-50/40 border border-indigo-100/50 rounded-2xl flex items-center justify-between cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-100">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-0.5">متابعة الخطة العلاجية والتقارير</h4>
                      <p className="text-xs text-slate-500">تحديثات لحظية ومستمرة من طبيبك</p>
                    </div>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-indigo-600" />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => router.push("/consultation")}
                  className="p-4 bg-violet-50/40 border border-violet-100/50 rounded-2xl flex items-center justify-between cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-violet-600 text-white rounded-xl shadow-md shadow-violet-100">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-0.5">عيادة افتراضية (استشارة عن بُعد)</h4>
                      <p className="text-xs text-slate-500">اتصال مرئي مباشر مشفر وآمن بالكامل</p>
                    </div>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-violet-600" />
                </motion.div>
              </div>

              {/* بانر الدور الحالي */}
              {renderRolePanel()}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 2. Trust Section ═══════════════════════════════════════════════════ */}
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
              <p className="text-slate-600 leading-relaxed text-sm">
                بياناتك الطبية وسجلاتك محمية بنسبة 100% وفق أعلى المعايير العالمية وخاضعة لتشفير صارم لا يطّلع عليه سوى طبيبك الخاص.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="p-6 border border-slate-100 bg-slate-50/50 rounded-2xl transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-100/40 group">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-6 transition-all group-hover:bg-blue-600 group-hover:text-white">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">نخبة من الاستشاريين</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                فريق طبي متكامل ومؤهل بأعلى الشهادات الطبية والخبرات العملية الطويلة لضمان دقة التشخيص وجودة الخطة العلاجية.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="p-6 border border-slate-100 bg-slate-50/50 rounded-2xl transition-all hover:bg-white hover:shadow-xl hover:shadow-blue-100/40 group">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-6 transition-all group-hover:bg-blue-600 group-hover:text-white">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">احترام تام للوقت</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                نظام الجدولة الذكي يضمن لك الدخول مباشرة في موعدك المحدد دون دقيقة انتظار واحدة، مع رسائل تذكيرية آلية.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ 3. Core Values ════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-blue-600 font-bold tracking-wider text-xs block mb-2">ثقافتنا ورؤيتنا</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              القيم التي تحركنا لتقديم رعاية صحية أفضل
            </h2>
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

      {/* ══ 4. Reviews Section ════════════════════════════════════════════════ */}
      <section className="py-20 bg-white px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between max-w-full mx-auto mb-16 gap-6">
            <div className="text-center sm:text-right">
              <span className="text-blue-600 font-bold text-xs tracking-wider block mb-2">تجارب مراجعينا</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">تجارب واقعية وقصص تعافي</h2>
              <p className="text-slate-600 text-sm">آراء حقيقية من أشخاص استعادوا عافيتهم من خلال منظومتنا الذكية.</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex-shrink-0 bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-blue-100"
            >
              <Star className="w-4 h-4 fill-current" />
              أضف تقييمك
            </button>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {reviews.map((review, index) => (
              <ReviewCard
                key={review.id}
                review={review}
                isNew={index >= DEFAULT_REVIEWS.length}
              />
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}