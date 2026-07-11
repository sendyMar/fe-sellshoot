"use client";

import { useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import { useExtraction } from "@/hooks/useExtraction";
import { v4 as uuidv4 } from "uuid";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";

export function UploadZone() {
  const [platform, setPlatform] = useState<string>("shopee");
  const { saveUploadedScreenshots } = useExtraction();
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const platforms = [
    { id: "shopee", name: "Shopee" },
    { id: "tokopedia", name: "Tokopedia" },
    { id: "instagram", name: "Instagram" },
    { id: "other", name: "Lainnya" },
  ];

  const handleBeforeUpload = async (files: File[]) => {
    setIsSaving(true);
    toast.info("Mengompresi gambar untuk menghemat kuota AI...");
    
    const compressedFiles = await Promise.all(
      files.map(async (file) => {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1280,
          useWebWorker: true,
        };
        try {
          const compressedFile = await imageCompression(file, options);
          return new File([compressedFile], file.name, { type: file.type });
        } catch (error) {
          console.error("Gagal kompresi file:", error);
          return file; // Kembalikan file asli jika kompresi gagal
        }
      })
    );
    
    // Matikan indikator saving untuk membiarkan UploadDropzone menunjukkan progress aslinya
    setIsSaving(false); 
    return compressedFiles;
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Upload Screenshot</h2>
          <p className="text-sm text-slate-500">Pilih platform dan unggah gambar (maks. 5 gambar/sesi)</p>
        </div>
        
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-violet-500 shadow-sm"
        >
          {platforms.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {errorMsg && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
          {errorMsg}
        </div>
      )}

      {isSaving ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
          <Loader2 className="mb-4 h-8 w-8 animate-spin text-violet-600" />
          <p className="text-sm text-slate-500">Mempersiapkan gambar...</p>
        </div>
      ) : (
        <UploadDropzone
          endpoint="screenshotUploader"
          onBeforeUploadBegin={handleBeforeUpload}
          onClientUploadComplete={async (res) => {
            if (res && res.length > 0) {
              setIsSaving(true);
              setErrorMsg("");
              const urls = res.map((file) => file.ufsUrl || file.url);
              const sessionId = uuidv4();
              
              const success = await saveUploadedScreenshots(urls, platform, sessionId);
              if (success) {
                toast.success(`${urls.length} gambar berhasil diupload`);
              } else {
                setErrorMsg("Gagal menyimpan data ke backend. Silakan coba lagi.");
                toast.error("Gagal menyimpan gambar");
              }
              setIsSaving(false);
            }
          }}
          onUploadError={(error: Error) => {
            setErrorMsg(`Upload Error: ${error.message}`);
          }}
          appearance={{
            container: "rounded-xl border-dashed border-slate-300 bg-slate-50 p-10 transition-colors hover:border-violet-500/50 hover:bg-slate-100",
            button: "bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-6 py-2 ut-uploading:bg-violet-600/50 after:bg-violet-500",
            label: "text-violet-600 font-medium hover:text-violet-700",
            allowedContent: "text-slate-500 mt-2",
            uploadIcon: "text-slate-400",
          }}
        />
      )}
    </div>
  );
}
