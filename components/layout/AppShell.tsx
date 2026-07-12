import Sidebar from "./Sidebar";
import Header from "./Header";
import BottomNav from "./BottomNav";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Sidebar />
      <div className="flex flex-1 flex-col w-full min-w-0 transition-all duration-300">
        <Header />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
