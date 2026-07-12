"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowRight, Bot, Target, Sparkles, CheckCircle2, ChevronRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Sticky Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/70 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-3" : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <Sparkles className="text-white" size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">SellShoot</span>
          </div>

          <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Fitur</a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">Cara Kerja</a>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              Dashboard
              <ArrowRight size={16} />
            </Link>
          </nav>

          <div className="md:hidden">
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold flex items-center gap-1"
            >
              Dashboard <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        {/* Abstract Background Shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full -z-10 opacity-30 pointer-events-none">
          <motion.div
            style={{ y: y1 }}
            className="absolute top-0 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
          />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">


          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl leading-tight"
          >
            Ubah Screenshot Menjadi <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Aksi Otomatis.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed"
          >
            SellShoot menggunakan AI Vision untuk mengekstrak pesanan lintas platform, mencocokan stok, menyusun tugas harian, dan memberikan insight bisnis yang ter-gamifikasi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 hover:-translate-y-1"
            >
              <LayoutDashboard size={20} />
              Buka Dashboard
            </Link>
          </motion.div>

          {/* 3D Dashboard Mockup Effect */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            style={{ perspective: "1000px" }}
            className="mt-20 w-full max-w-5xl rounded-2xl border border-slate-200/50 shadow-2xl bg-white overflow-hidden"
          >
            <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="p-2 sm:p-8 relative bg-slate-50/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2 space-y-4">
                  <div className="h-10 w-1/3 bg-slate-200 rounded-lg animate-pulse" />
                  <div className="h-32 w-full bg-white border border-slate-100 rounded-xl shadow-sm" />
                  <div className="h-32 w-full bg-white border border-slate-100 rounded-xl shadow-sm" />
                </div>
                <div className="space-y-4">
                  <div className="h-48 w-full bg-indigo-50 border border-indigo-100 rounded-xl shadow-sm" />
                  <div className="h-24 w-full bg-white border border-slate-100 rounded-xl shadow-sm" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Senjata Rahasia Pebisnis Online</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">"Jualan di banyak platform? banyak yang komplain? ada 1.000 order hari ini?, Tinggal kirim Screenshot aja, AI kami akan membuatkan langkah langkah terstruktur buat kamu"</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <motion.div variants={itemVariants} className="bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:shadow-lg hover:border-indigo-100 transition-all group">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">AI Vision Extraction</h3>
              <p className="text-slate-600 leading-relaxed">
                Upload screenshot pesanan dari Shopee, Tokopedia, atau WA. AI Gemini membedah gambar dan mengubahnya menjadi struktur data yang rapi.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:shadow-lg hover:indigo-100 transition-all group">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Smart Task Management</h3>
              <p className="text-slate-600 leading-relaxed">
                Pesanan yang diekstrak secara instan dipecah menjadi *checklist* prioritas. Tambahkan juga rutinitas harian (*Custom Task*) Anda sendiri.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:shadow-lg hover:indigo-100 transition-all group">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Gamified Insights</h3>
              <p className="text-slate-600 leading-relaxed">
                Selesaikan tugas dan biarkan AI merangkum performa harian Anda dengan nada seru, sekaligus memberikan saran strategis penjualan besok.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Siap Melejitkan Penjualan Anda?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto"
          >
            Bergabunglah dengan SellShoot dan rasakan sensasi mengelola operasional seperti bermain game yang sangat seru.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/dashboard"
              className="px-10 py-4 bg-white text-indigo-700 hover:bg-slate-50 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-xl inline-flex items-center gap-2"
            >
              Masuk ke Dashboard Sekarang <ChevronRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-200">
            <Sparkles size={20} className="text-indigo-400" />
            SellShoot
          </div>
          <p className="text-sm">
            &copy; 2026 SellShoot Inc. All rights reserved. Built with AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
