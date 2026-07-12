"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/statistics", label: "Statistik", icon: BarChart3 },
  { href: "/catalog", label: "Katalog", icon: Package },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`sticky left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-200 bg-white py-6 shadow-sm transition-all duration-300 max-md:hidden ${isCollapsed ? "w-24" : "w-64"
        }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 hover:text-indigo-600 transition-colors z-50"
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Logo */}
      <div className={`mb-8 flex items-center gap-3 px-6 ${isCollapsed ? "justify-center px-0" : "justify-start"}`}>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 font-bold text-white text-sm shadow-md">
          SS
        </div>
        {!isCollapsed && (
          <span className="text-xl font-bold text-slate-800 tracking-tight whitespace-nowrap overflow-hidden">
            SellShoot
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex flex-1 flex-col gap-2 w-full ${isCollapsed ? "px-3" : "px-4"}`}>
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={`flex items-center rounded-xl p-3 transition-all duration-200 group relative ${isCollapsed ? "justify-center" : "justify-start px-4"
                } ${isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
                }`}
            >
              <item.icon className={`h-6 w-6 shrink-0 ${isCollapsed ? "" : "mr-3"}`} />

              {!isCollapsed && (
                <span className="font-medium whitespace-nowrap overflow-hidden">
                  {item.label}
                </span>
              )}

              {/* Tooltip on hover (hanya terlihat saat collapsed) */}
              {isCollapsed && (
                <span className="absolute left-16 rounded-md bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap pointer-events-none z-50">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className={`border-t border-slate-200 pt-4 w-full ${isCollapsed ? "px-3" : "px-4"}`}>
        <button
          title="Logout"
          className={`flex w-full items-center rounded-xl p-3 transition-all duration-200 hover:bg-red-50 hover:text-red-500 group relative ${isCollapsed ? "justify-center" : "justify-start px-4"
            } text-slate-500`}
        >
          <LogOut className={`h-6 w-6 shrink-0 ${isCollapsed ? "" : "mr-3"}`} />

          {!isCollapsed && (
            <span className="font-medium whitespace-nowrap overflow-hidden">
              Logout
            </span>
          )}

          {isCollapsed && (
            <span className="absolute left-16 rounded-md bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap pointer-events-none z-50">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
