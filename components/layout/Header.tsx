"use client";

import { Bell, Search, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "next-auth/react";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-zinc-950/80 px-6 backdrop-blur-xl">
      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-400 transition-colors focus-within:border-violet-500/50">
          <Search className="h-4 w-4" />
          <input
            type="text"
            placeholder="Cari produk, task..."
            className="w-48 bg-transparent text-zinc-200 placeholder-zinc-500 outline-none"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-500" />
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
            <p className="text-sm font-medium text-zinc-200">{user?.name || "User"}</p>
            <p className="text-xs text-zinc-500">seller</p>
          </div>

          <button 
            onClick={() => signOut()}
            className="ml-2 rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-red-400"
            title="Keluar"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
