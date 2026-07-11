"use client";

import { Bell, Search, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "next-auth/react";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-xl">
      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 transition-colors focus-within:border-violet-500/50">
          <Search className="h-4 w-4" />
          <input
            type="text"
            placeholder="Cari produk, task..."
            className="w-48 bg-transparent text-slate-900 placeholder-slate-400 outline-none"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-600" />
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-3">
          {user?.avatar ? (
            <img src={user.avatar} alt="User Avatar" className="h-8 w-8 rounded-full" />
          ) : (
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
              {user?.name?.charAt(0) || "U"}
            </div>
          )}
          
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-900">{user?.name || "User"}</p>
            <p className="text-xs text-slate-500">seller</p>
          </div>

          <button 
            onClick={() => signOut()}
            className="ml-2 rounded-lg p-2 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
            title="Keluar"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
