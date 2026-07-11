import { GoogleSignInBtn } from "./_components/GoogleSignInBtn";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-xl font-bold text-white shadow-md">
            SS
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Masuk ke SellShoot
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Operational co-pilot untuk seller marketplace
          </p>
        </div>

        <GoogleSignInBtn />

        <p className="text-center text-xs text-slate-400">
          Dengan masuk, Anda menyetujui syarat dan ketentuan SellShoot.
        </p>
      </div>
    </div>
  );
}
