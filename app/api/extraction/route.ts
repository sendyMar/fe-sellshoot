import { NextResponse } from "next/server";

// BFF Route Handler: Proxy ke Django /api/extraction/
export async function GET() {
  return NextResponse.json(
    { success: false, message: "Extraction API belum diimplementasikan" },
    { status: 501 }
  );
}

export async function POST() {
  return NextResponse.json(
    { success: false, message: "Extraction API belum diimplementasikan" },
    { status: 501 }
  );
}
