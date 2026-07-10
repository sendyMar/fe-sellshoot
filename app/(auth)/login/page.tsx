import { GoogleSignInBtn } from "./_components/GoogleSignInBtn";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-zinc-900 p-8">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-xl font-bold text-white">
            SS
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">
            Masuk ke SellShoot
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Operational co-pilot untuk seller marketplace
          </p>
        </div>

        <GoogleSignInBtn />

        <p className="text-center text-xs text-zinc-500">
          Dengan masuk, Anda menyetujui syarat dan ketentuan SellShoot.
        </p>
      </div>
    </div>
  );
}
