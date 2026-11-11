
import { NextResponse } from "next/server";
import { Resend } from "resend";
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

    // Skickar mejl efter att bokningen sparats.
    try {
      if (
        process.env.RESEND_API_KEY &&
        process.env.BOOKING_NOTIFICATION_EMAIL
      ) {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { error: emailError } = await resend.emails.send({
          from: "VAG Diagnos <onboarding@resend.dev>",
          to: [process.env.BOOKING_NOTIFICATION_EMAIL],
          subject: "Ny bokningsförfrågan – VAG Diagnos",
          text: `
Ny bokningsförfrågan!

Registreringsnummer: ${registration || "Ej angivet"}
Tjänst: ${service || "Ej angivet"}
Datum: ${preferred_date || "Ej angivet"}
Tid: ${preferred_time || "Ej angivet"}
Telefon: ${phone.trim()}

Meddelande:
${message || "Inget meddelande"}
          `,
        });

        if (emailError) {
          console.error("Booking notification failed:", emailError);
        }
      }
    } catch (emailError) {
      console.error("Booking email error:", emailError);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Ogiltig bokningsförfrågan." },
      { status: 400 }
    );
  }
}

