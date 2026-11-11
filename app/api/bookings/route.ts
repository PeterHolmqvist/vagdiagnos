
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Tar emot och sparar en bokningsförfrågan.
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      phone,
      vehicle,
      year,
      registration,
      service,
      preferred_date,
      preferred_time,
      message,
    } = body;

    if (typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { error: "Telefonnummer krävs." },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("bookings").insert({
      phone: phone.trim(),
      vehicle,
      year,
      registration,
      service,
      preferred_date: preferred_date || null,
      preferred_time: preferred_time || null,
      message,
    });

    if (error) {
      console.error("Booking error:", error.message);

      return NextResponse.json(
        { error: "Kunde inte spara bokningen." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Ogiltig bokningsförfrågan." },
      { status: 400 }
    );
  }
}
