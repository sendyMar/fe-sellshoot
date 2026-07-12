import { useState } from "react";
import { X, Loader2, Calendar } from "lucide-react";
import { taskService } from "@/services/task.service";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface CustomTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DAYS = [
  { value: 0, label: "Senin" },
  { value: 1, label: "Selasa" },
  { value: 2, label: "Rabu" },
  { value: 3, label: "Kamis" },
  { value: 4, label: "Jumat" },
  { value: 5, label: "Sabtu" },
  { value: 6, label: "Minggu" },
];

export default function CustomTaskModal({ isOpen, onClose }: CustomTaskModalProps) {
  const { data: session } = useSession();
  const token = (session as any)?.accessToken;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "normal",
    recurrence_type: "daily",
    weekly_days: [] as number[],
  });

  if (!isOpen) return null;

  const toggleDay = (dayValue: number) => {
    setFormData(prev => {
      const isSelected = prev.weekly_days.includes(dayValue);
      if (isSelected) {
        return { ...prev, weekly_days: prev.weekly_days.filter(d => d !== dayValue) };
      } else {
        return { ...prev, weekly_days: [...prev.weekly_days, dayValue] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!formData.title.trim()) {
      toast.error("Nama task tidak boleh kosong");
      return;
    }

    if (formData.recurrence_type === "weekly" && formData.weekly_days.length === 0) {
      toast.error("Pilih minimal 1 hari untuk jadwal mingguan");
      return;
    }

    try {
      setIsLoading(true);
      const res = await taskService.createCustomTaskTemplate(token, formData);
      if (res.success) {
        toast.success("Custom Task berhasil dibuat!");
        // We simulate refreshing the dashboard by reloading or just closing
        onClose();
        // Force refresh for the active dashboard date
        window.location.reload(); 
      } else {
        toast.error(res.message || "Gagal membuat custom task");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-800">
            <Calendar size={20} className="text-indigo-500" />
            <h2 className="text-lg font-bold">Buat Custom Task</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Nama Task</label>
            <input 
              type="text" 
              placeholder="Contoh: Beli Lakban, Cek Stok Gudang, dll" 
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Deskripsi / Checklist (Opsional)</label>
            <textarea 
              placeholder="- Lakban bening 2 roll&#10;- Lakban coklat 1 roll" 
              rows={3}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 resize-none"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
            <p className="text-xs text-slate-500">Gunakan tanda strip (-) untuk membuat checklist.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Prioritas</label>
              <select 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white text-slate-800"
                value={formData.priority}
                onChange={e => setFormData({...formData, priority: e.target.value})}
              >
                <option value="urgent">Urgent</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Jadwal</label>
              <select 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white text-slate-800"
                value={formData.recurrence_type}
                onChange={e => setFormData({...formData, recurrence_type: e.target.value})}
              >
                <option value="daily">Setiap Hari</option>
                <option value="weekly">Pilih Hari</option>
                <option value="monthly_end">Akhir Bulan</option>
              </select>
            </div>
          </div>

          {formData.recurrence_type === "weekly" && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-sm font-semibold text-slate-700">Pilih Hari</label>
              <div className="flex flex-wrap gap-2">
                {DAYS.map(day => (
                  <button
                    key={day.value}
                    type="button"
                    onClick={() => toggleDay(day.value)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      formData.weekly_days.includes(day.value)
                        ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                        : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70"
            >
              {isLoading && <Loader2 size={18} className="animate-spin" />}
              Simpan Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
