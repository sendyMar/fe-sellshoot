"use client";

import { Bell, Search } from "lucide-react";

export default function Header() {
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
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600" />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-zinc-200">User</p>
            <p className="text-xs text-zinc-500">seller</p>
          </div>
        </div>
      </div>
    </header>
  );
}
