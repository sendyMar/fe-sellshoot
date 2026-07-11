import { UploadZone } from "./_components/UploadZone";
import { ScreenshotGallery } from "./_components/ScreenshotGallery";

export default function ExtractionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Ekstraksi & Upload</h1>
        <p className="text-sm text-slate-500">
          Unggah screenshot pesanan atau performa untuk diekstrak oleh AI.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[400px_1fr]">
        <div className="space-y-6">
          <UploadZone />
          
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 font-medium text-slate-900">Tips Upload Screenshot</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="text-violet-500">•</span>
                Pastikan nama produk dan status order terlihat jelas.
              </li>
              <li className="flex gap-2">
                <span className="text-violet-500">•</span>
                Pilih platform yang sesuai sebelum mengunggah.
              </li>
              <li className="flex gap-2">
                <span className="text-violet-500">•</span>
                Maksimal 5 gambar per sesi upload.
              </li>
              <li className="flex gap-2">
                <span className="text-violet-500">•</span>
                Format yang didukung: JPG, PNG. Max 4MB.
              </li>
            </ul>
          </div>
        </div>

        <div>
          <ScreenshotGallery />
        </div>
      </div>
    </div>
  );
}
