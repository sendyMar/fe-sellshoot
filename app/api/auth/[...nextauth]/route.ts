import { NextResponse } from "next/server";

// BFF Route Handler: Proxy ke Django /api/auth/
// Akan diimplementasikan lengkap di Fase 1 (NextAuth)
export async function POST() {
  return NextResponse.json(
    { success: false, message: "Auth belum diimplementasikan" },
    { status: 501 }
  );
}
