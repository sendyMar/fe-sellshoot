"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, BarChart3 } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-slate-200 px-6 py-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center relative">
        
        {/* Statistik */}
        <Link 
          href="/statistics"
          className={`flex flex-col items-center justify-center w-16 gap-1 ${
            pathname.startsWith("/statistics") ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <BarChart3 size={24} />
          <span className="text-[10px] font-medium">Statistik</span>
        </Link>

        {/* Dashboard - Elevated Center Button */}
        <div className="relative -top-6">
          <Link 
            href="/dashboard"
            className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 border-4 border-slate-50 transition-transform active:scale-95"
          >
            <LayoutDashboard size={28} />
          </Link>
          <span className="absolute -bottom-5 w-full text-center text-[10px] font-medium text-indigo-600">
            Dashboard
          </span>
        </div>

        {/* Katalog */}
        <Link 
          href="/catalog"
          className={`flex flex-col items-center justify-center w-16 gap-1 ${
            pathname.startsWith("/catalog") ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Package size={24} />
          <span className="text-[10px] font-medium">Katalog</span>
        </Link>

      </div>
    </div>
  );
}
