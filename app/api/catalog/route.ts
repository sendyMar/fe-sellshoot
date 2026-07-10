import { NextResponse } from "next/server";

// BFF Route Handler: Proxy ke Django /api/catalog/
export async function GET() {
  return NextResponse.json(
    { success: false, message: "Catalog API belum diimplementasikan" },
    { status: 501 }
  );
}

export async function POST() {
  return NextResponse.json(
    { success: false, message: "Catalog API belum diimplementasikan" },
    { status: 501 }
  );
}
