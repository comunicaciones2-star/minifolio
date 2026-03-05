import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    ok: true,
    mode: "mock",
    message: "Ruta mock: en static export no hay ejecución server-side.",
  });
}
