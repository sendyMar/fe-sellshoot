"use client";

import { X, AlertCircle } from "lucide-react";

interface ModalAlertProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function ModalAlert({ isOpen, onClose, title, message }: ModalAlertProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="text-slate-400 w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">{title}</h2>
          <p className="text-slate-600 mb-6">{message}</p>
          <button 
            onClick={onClose}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition"
          >
            Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}
