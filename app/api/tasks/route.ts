import { NextResponse } from "next/server";

// BFF Route Handler: Proxy ke Django /api/tasks/
export async function GET() {
  return NextResponse.json(
    { success: false, message: "Tasks API belum diimplementasikan" },
    { status: 501 }
  );
}

export async function POST() {
  return NextResponse.json(
    { success: false, message: "Tasks API belum diimplementasikan" },
    { status: 501 }
  );
}
