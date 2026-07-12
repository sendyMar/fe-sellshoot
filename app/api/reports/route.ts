import { NextResponse } from "next/server";

// BFF Route Handler: Proxy ke Django /api/reporting/
export async function GET() {
  return NextResponse.json(
    { success: false, message: "Reports API belum diimplementasikan" },
    { status: 501 }
  );
}

export async function POST() {
  return NextResponse.json(
    { success: false, message: "Reports API belum diimplementasikan" },
    { status: 501 }
  );
}
