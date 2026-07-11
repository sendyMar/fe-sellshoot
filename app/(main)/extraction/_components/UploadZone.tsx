"use client";

import { useState } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import { useExtraction } from "@/hooks/useExtraction";
import { v4 as uuidv4 } from "uuid";
import { Loader2 } from "lucide-react";

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

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900 p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Upload Screenshot</h2>
          <p className="text-sm text-zinc-400">Pilih platform dan unggah gambar (maks. 5 gambar/sesi)</p>
        </div>
        
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="rounded-lg border border-white/10 bg-zinc-950 px-4 py-2 text-sm text-white outline-none focus:border-violet-500"
        >
          {platforms.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {errorMsg && (
        <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
          {errorMsg}
        </div>
      )}

      {isSaving ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-zinc-950/50">
          <Loader2 className="mb-4 h-8 w-8 animate-spin text-violet-500" />
          <p className="text-sm text-zinc-400">Menyimpan data ke sistem...</p>
        </div>
      ) : (
        <UploadDropzone
          endpoint="screenshotUploader"
          onClientUploadComplete={async (res) => {
            if (res && res.length > 0) {
              setIsSaving(true);
              setErrorMsg("");
              const urls = res.map((file) => file.url);
              const sessionId = uuidv4();
              
              const success = await saveUploadedScreenshots(urls, platform, sessionId);
              if (!success) {
                setErrorMsg("Gagal menyimpan data ke backend. Silakan coba lagi.");
              }
              setIsSaving(false);
            }
          }}
          onUploadError={(error: Error) => {
            setErrorMsg(`Upload Error: ${error.message}`);
          }}
          appearance={{
            container: "rounded-xl border-dashed border-white/20 bg-zinc-950/50 p-10 transition-colors hover:border-violet-500/50 hover:bg-zinc-950/80",
            button: "bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-6 py-2 ut-uploading:bg-violet-600/50 after:bg-violet-500",
            label: "text-violet-400 font-medium hover:text-violet-300",
            allowedContent: "text-zinc-500 mt-2",
            uploadIcon: "text-zinc-400",
          }}
        />
      )}
    </div>
  );
}
