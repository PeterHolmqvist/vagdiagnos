
"use client";

import { useState, useEffect, type FormEvent } from "react";

const services = [
  {
    number: "01",
    title: "Felsökning & fordonsdiagnos",
    description: "Läs av felkoder, undersök varningslampor och hitta orsaken till bilens problem.",
  },
  {
    number: "02",
    title: "Start/Stop",
    description: "Aktivera, avaktivera eller anpassa bilens Start/Stop-funktion där det är möjligt.",
  },
  {
    number: "03",
    title: "Kodning & funktioner",
    description: "Aktivera tillgängliga komfortfunktioner och anpassa bilens inställningar.",
  },
  {
    number: "04",
    title: "Service & underhåll",
    description: "Serviceåterställning, batteriregistrering, bromsservice och andra servicefunktioner.",
  },
  {
    number: "05",
    title: "Fördjupad diagnostik",
    description: "Analys av exempelvis motor, DPF, EGR, DSG och bilens elektroniska system.",
  },
  {
    number: "06",
    title: "Retrofit & eftermontering",
    description: "Hjälp med kodning vid eftermontering av exempelvis dragkrok, backkamera och rattmodul.",
  },
];

const brands = [
  { name: "VOLKSWAGEN", slug: "volkswagen" },
  { name: "AUDI", slug: "audi" },
  { name: "ŠKODA", slug: "skoda" },
  { name: "SEAT", slug: "seat" },
  { name: "CUPRA", slug: "cupra" },
];


const prices = [
  ["Enkel felkodsavläsning", "350 kr"],
  ["Fullständig VCDS Auto-Scan", "495 kr"],
  ["Fördjupad diagnostik", "795 kr"],
  ["Avancerad felsökning", "895 kr/tim"],
  ["Kodning och aktivering", "Från 495 kr"],
  ["Start/Stop-anpassning", "Från 595 kr"],
  ["Basic Settings / adaptioner", "Från 495 kr"],
  ["Retrofit och eftermonteringskodning", "Från 795 kr"],
  ["Modulbyte, kodning och kalibrering", "Från 1 495 kr"],
];

const weekdays = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];

const monthNames = [
  "Januari", "Februari", "Mars", "April",
  "Maj", "Juni", "Juli", "Augusti",
  "September", "Oktober", "November", "December",
];

// Formaterar ett datum utan UTC-konvertering.
function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [bookingMessage, setBookingMessage] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
const [calendarMonth, setCalendarMonth] = useState(
  () => new Date(2000, 0, 1)
);

const [today, setToday] = useState("");

useEffect(() => {
  const now = new Date();

  setToday(formatDate(now));
  setCalendarMonth(
    new Date(now.getFullYear(), now.getMonth(), 1)
  );
}, []);

  const firstWeekday =
    (calendarMonth.getDay() + 6) % 7;

  const daysInMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth() + 1,
    0
  ).getDate();

  const calendarDays = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Skickar bokningsförfrågan till API:t.
  async function handleBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setBookingStatus("sending");
    setBookingMessage("");

    const booking = {
      phone: formData.get("phone"),
      vehicle: "",
      year: "",
      registration: formData.get("registration"),
      service: formData.get("service"),
      preferred_date: selectedDate || null,
      preferred_time: selectedTime || null,
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Kunde inte skicka bokningen.");
      }

      setBookingStatus("success");
      setBookingMessage(
        "Tack! Din bokningsförfrågan har skickats. Vi kontaktar dig så snart vi kan."
      );

      form.reset();
      setSelectedDate("");
      setSelectedTime("");
    } catch (error) {
      console.error("Booking submission failed:", error);
      setBookingStatus("error");
      setBookingMessage(
        "Något gick fel. Försök igen eller kontakta oss via telefon."
      );
    }
  }

  return (
    <main
      className="min-h-screen bg-[#090909] text-[#f3eee4]"
      style={{ fontFamily: "var(--font-inter), Arial, sans-serif" }}
    >
      <header className="sticky top-0 z-40 border-b border-[#b99b63]/20 bg-[#090909]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-6">
          <a href="#" className="text-lg font-semibold tracking-[0.16em] md:text-xl">
            VAG <span className="text-[#c6aa76]">DIAGNOS</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-[#c8c1b5] md:flex">
            <a href="#tjanster" className="transition hover:text-[#c6aa76]">Tjänster</a>
            <a href="#priser" className="transition hover:text-[#c6aa76]">Priser</a>
            <a href="#om" className="transition hover:text-[#c6aa76]">Om tjänsten</a>
          </nav>

          <button
            onClick={() => setContactOpen(true)}
            className="border border-[#c6aa76]/70 px-4 py-2 text-xs tracking-wider text-[#e2c895] transition hover:bg-[#c6aa76] hover:text-black"
          >
            KONTAKTA OSS
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[65vh] min-h-[390px] max-h-[850px] overflow-hidden bg-black md:h-[75vh] md:min-h-[520px]">
        <img
          src="/hero-rs6.png"
          alt="Närbild av en RS6-strålkastare"
          className="absolute inset-0 h-full w-full object-cover object-[55%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
      </section>

      {/* VAG-märken */}
      <section className="border-y border-[#b99b63]/20 bg-[#11100e]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-5">
          {brands.map((brand) => (
            <div key={brand.slug} className="flex items-center justify-center gap-3">
           <img
  src={
    brand.slug === "cupra"
      ? "https://upload.wikimedia.org/wikipedia/commons/e/ef/Cupra_symbol.svg"
      : `https://cdn.simpleicons.org/${brand.slug}/C6AA76`
  }
  alt=""
  className={
    brand.slug === "cupra"
      ? "h-8 w-8 object-contain"
      : "h-6 w-7 object-contain"
  }
  style={
    brand.slug === "cupra"
      ? {
          filter:
            "brightness(0) saturate(100%) invert(74%) sepia(18%) saturate(700%) hue-rotate(5deg) brightness(88%) contrast(88%)",
        }
      : undefined
  }
/>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#c9c1b4]">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Tjänster */}
      <section id="tjanster" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 md:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 text-xs tracking-[0.3em] text-[#c6aa76]">
            VAD VI HJÄLPER DIG MED
          </p>
          <h2
            className="text-3xl font-semibold tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-manrope), sans-serif" }}
          >
            Rätt hjälp för din VAG.
          </h2>
          <p className="mt-5 leading-7 text-[#aaa397]">
            Från en enkel felkodsavläsning till mer avancerad diagnostik,
            kodning och eftermontering.
          </p>
        </div>

        <div className="grid gap-px bg-[#c6aa76]/15 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.number}
              className="bg-[#0c0c0b] p-7 transition hover:bg-[#171511] md:p-8"
            >
              <span className="text-xs tracking-[0.2em] text-[#c6aa76]">
                {service.number}
              </span>
              <h3
                className="mt-6 text-xl font-semibold"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#aaa397]">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Priser */}
      <section id="priser" className="border-y border-[#b99b63]/20 bg-[#11100e] scroll-mt-24">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
          <div className="mb-10">
            <p className="mb-4 text-xs tracking-[0.3em] text-[#c6aa76]">
              TYDLIGA PRISER
            </p>
            <h2
              className="text-3xl font-semibold md:text-5xl"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              Prislista
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#aaa397]">
              Du får alltid ett prisförslag innan vi påbörjar arbetet.
            </p>
          </div>

          <div className="border-t border-[#c6aa76]/30">
            {prices.map(([service, price]) => (
              <div
                key={service}
                className={`flex items-start justify-between gap-5 border-b border-white/10 py-5 ${
                  service.startsWith("Basic Settings")
                    ? "border-l-2 border-l-[#c6aa76] bg-[#c6aa76]/5 pl-4"
                    : ""
                }`}
              >
                <span className={`text-sm leading-6 md:text-base ${
                  service.startsWith("Basic Settings")
                    ? "font-semibold text-[#e2c895]"
                    : "text-[#d8d1c5]"
                }`}>
                  {service}
                </span>
                <span className="shrink-0 text-right text-sm font-semibold text-[#d5b982] md:text-base">
                  {price}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs leading-6 text-[#8f877a]">
            Från-priser gäller beroende på bilmodell, årsmodell, utrustning
            och arbetsomfattning. Eventuella reservdelar tillkommer.
          </p>
        </div>
      </section>

      {/* Om tjänsten */}
      <section id="om" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <p className="mb-4 text-xs tracking-[0.3em] text-[#c6aa76]">
              SPECIALISTKUNSKAP
            </p>
            <h2
              className="text-3xl font-semibold leading-tight md:text-4xl"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              Mer än att bara läsa felkoder.
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-[#b9b2a7]">
            <p>
              Med professionell VCDS-diagnostik kan vi läsa av bilens
              styrenheter, analysera felkoder och undersöka tillgängliga
              fordonsfunktioner.
            </p>
            <p>
              Alla kodningar och anpassningar beror på bilens modell,
              årsmodell, utrustning samt stöd i hårdvara och mjukvara.
            </p>
            <p>Du får alltid ett prisförslag innan vi påbörjar ett arbete.</p>
          </div>
        </div>
      </section>

      {/* Bokning */}
      <section id="boka" className="scroll-mt-24 border-y border-[#b99b63]/20 bg-[#11100e]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-24">
          <div>
            <p className="mb-4 text-xs tracking-[0.3em] text-[#c6aa76]">
              BOKNINGSFÖRFRÅGAN
            </p>
            <h2
              className="text-3xl font-semibold leading-tight md:text-4xl"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              Berätta vad du behöver hjälp med.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#aaa397]">
              Fyll i det du vet. Vi behöver bara ditt telefonnummer för att
              kunna återkomma. Övriga uppgifter är frivilliga.
            </p>
            <p className="mt-5 text-sm text-[#c6aa76]">
              Eskilstuna med omnejd
            </p>
          </div>

          <form onSubmit={handleBooking} className="space-y-5">
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm text-[#d8d1c5]">
                Telefonnummer <span className="text-[#c6aa76]">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="Ditt telefonnummer"
                className="w-full border border-white/15 bg-[#090909] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#777] focus:border-[#c6aa76]"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="registration" className="mb-2 block text-sm text-[#d8d1c5]">
                  Registreringsnummer
                </label>
                <input
                  id="registration"
                  name="registration"
                  placeholder="Ex. ABC123"
                  className="w-full border border-white/15 bg-[#090909] px-4 py-3 text-sm text-white outline-none placeholder:text-[#777] focus:border-[#c6aa76]"
                />
              </div>
              <div>
                <label htmlFor="service" className="mb-2 block text-sm text-[#d8d1c5]">
                  Vad behöver du hjälp med?
                </label>
                <select
                  id="service"
                  name="service"
                  defaultValue=""
                  className="w-full border border-white/15 bg-[#090909] px-4 py-3 text-sm text-[#d8d1c5] outline-none focus:border-[#c6aa76]"
                >
                  <option value="">Välj tjänst</option>
                  <option>Enkel felkodsavläsning – 350 kr</option>
                  <option>Fullständig VCDS Auto-Scan – 495 kr</option>
                  <option>Fördjupad diagnostik – 795 kr</option>
                  <option>Avancerad felsökning – 895 kr/tim</option>
                  <option>Kodning och aktivering – från 495 kr</option>
                  <option>Start/Stop-anpassning – från 595 kr</option>
                  <option>Basic Settings / adaptioner – från 495 kr</option>
                  <option>Retrofit och eftermonteringskodning – från 795 kr</option>
                  <option>Modulbyte, kodning och kalibrering – från 1 495 kr</option>
                  <option>Annat</option>
                </select>
              </div>
            </div>

            {/* Kalender */}
            <div>
              <label className="mb-3 block text-sm text-[#d8d1c5]">
                Önskat datum
              </label>

              <div className="border border-white/15 bg-[#090909] p-4 sm:p-5">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-semibold text-[#e2c895]">
                    {monthNames[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                  </h3>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      aria-label="Föregående månad"
                      onClick={() =>
                        setCalendarMonth(
                          new Date(
                            calendarMonth.getFullYear(),
                            calendarMonth.getMonth() - 1,
                            1
                          )
                        )
                      }
                      disabled={
  !today ||
  (
    calendarMonth.getFullYear() === Number(today.slice(0, 4)) &&
    calendarMonth.getMonth() === Number(today.slice(5, 7)) - 1
  )
}
                      className="flex h-9 w-9 items-center justify-center border border-white/15 text-[#c6aa76] transition hover:bg-[#252015] disabled:cursor-not-allowed disabled:opacity-25"
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      aria-label="Nästa månad"
                      onClick={() =>
                        setCalendarMonth(
                          new Date(
                            calendarMonth.getFullYear(),
                            calendarMonth.getMonth() + 1,
                            1
                          )
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center border border-white/15 text-[#c6aa76] transition hover:bg-[#252015]"
                    >
                      ›
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {weekdays.map((day) => (
                    <div
                      key={day}
                      className="py-2 text-center text-xs font-medium text-[#8f877a]"
                    >
                      {day}
                    </div>
                  ))}

                  {calendarDays.map((day, index) => {
                    if (day === null) {
                      return <div key={`empty-${index}`} />;
                    }

                    const date = new Date(
                      calendarMonth.getFullYear(),
                      calendarMonth.getMonth(),
                      day
                    );

                    const dateValue = formatDate(date);
                    const isPast = dateValue < today;
                    const isSelected = selectedDate === dateValue;

                    return (
                      <button
                        key={dateValue}
                        type="button"
                        disabled={isPast}
                        onClick={() => setSelectedDate(dateValue)}
                        aria-pressed={isSelected}
                        className={`aspect-square rounded-sm text-sm transition ${
                          isSelected
                            ? "bg-[#c6aa76] font-semibold text-[#100e0a]"
                            : isPast
                              ? "cursor-not-allowed text-[#45413b]"
                              : "text-[#d8d1c5] hover:bg-[#252015] hover:text-[#e2c895]"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-4 border-t border-white/10 pt-4 text-xs text-[#8f877a]">
                  {selectedDate
                    ? `Valt datum: ${new Date(`${selectedDate}T12:00:00`).toLocaleDateString("sv-SE", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}`
                    : "Välj ett datum i kalendern."}
                </p>
              </div>
            </div>

            {/* Tidsval */}
            <div>
              <label htmlFor="time" className="mb-2 block text-sm text-[#d8d1c5]">
                Önskat klockslag
              </label>
              <input
                id="time"
                name="time"
                type="time"
                value={selectedTime}
                onChange={(event) => setSelectedTime(event.target.value)}
                className="w-full border border-white/15 bg-[#090909] px-4 py-3 text-sm text-white outline-none focus:border-[#c6aa76] [color-scheme:dark]"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm text-[#d8d1c5]">
                Beskriv vad du vill ha hjälp med
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Skriv gärna lite mer om problemet eller önskemålet..."
                className="w-full resize-y border border-white/15 bg-[#090909] px-4 py-3 text-sm text-white outline-none placeholder:text-[#777] focus:border-[#c6aa76]"
              />
            </div>

            <button
              type="submit"
              disabled={bookingStatus === "sending"}
              className="w-full bg-[#c6aa76] px-7 py-4 text-sm font-semibold tracking-wide text-[#100e0a] transition hover:bg-[#dfc99f] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {bookingStatus === "sending"
                ? "SKICKAR..."
                : "SKAPA BOKNINGSFÖRFRÅGAN"}
            </button>

            <p aria-live="polite" className="text-xs leading-5 text-[#8f877a]">
              {bookingMessage ||
                "Tiden är inte bokad förrän vi har bekräftat den."}
            </p>
          </form>
        </div>
      </section>

      {/* Kontakt och sidfot */}
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-semibold tracking-[0.16em]">
              VAG <span className="text-[#c6aa76]">DIAGNOS</span>
            </p>
            <p className="mt-2 text-xs text-[#8f877a]">
              Diagnostik · Kodning · Anpassning
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-[#c9c1b4]">
            <a href="#tjanster" className="hover:text-[#c6aa76]">Tjänster</a>
            <a href="#priser" className="hover:text-[#c6aa76]">Priser</a>
            <a href="#boka" className="hover:text-[#c6aa76]">Boka</a>
            <button onClick={() => setContactOpen(true)} className="hover:text-[#c6aa76]">
              Kontakt
            </button>
          </div>
          <p className="text-xs text-[#8f877a]">© 2026 VAG DIAGNOS · Eskilstuna med omnejd</p>
        </div>
      </footer>

      {/* Kontaktmeny */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setContactOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="relative w-full max-w-md border border-[#c6aa76]/35 bg-[#11100e] p-6 shadow-2xl md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setContactOpen(false)}
              aria-label="Stäng"
              className="absolute right-5 top-4 text-2xl text-[#aaa397] hover:text-white"
            >
              ×
            </button>

            <p className="mb-3 text-xs tracking-[0.3em] text-[#c6aa76]">
              VAG DIAGNOS
            </p>
            <h2
              id="contact-title"
              className="text-2xl font-semibold"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              Hur vill du komma i kontakt?
            </h2>
            <p className="mb-7 mt-3 text-sm text-[#aaa397]">
              Välj det sätt som passar dig bäst.
            </p>

            <div className="space-y-3">
              <a
                href="tel:0729036436"
                className="flex items-center justify-between border border-[#c6aa76]/30 p-4 transition hover:bg-[#252015]"
              >
                <span>
                  <span className="block font-semibold">Ring oss</span>
                  <span className="mt-1 block text-xs text-[#aaa397]">072-903 64 36</span>
                </span>
                <span className="text-xl text-[#c6aa76]">↗</span>
              </a>

              <a
                href={`sms:0729036436?body=${encodeURIComponent("Hej! Jag har en fråga till VAG Diagnos.")}`}
                className="flex items-center justify-between border border-[#c6aa76]/30 p-4 transition hover:bg-[#252015]"
              >
                <span>
                  <span className="block font-semibold">Skicka SMS</span>
                  <span className="mt-1 block text-xs text-[#aaa397]">Skriv ett meddelande</span>
                </span>
                <span className="text-xl text-[#c6aa76]">↗</span>
              </a>

              <div className="flex items-center justify-between border border-white/10 p-4 opacity-60">
                <span>
                  <span className="block font-semibold">E-post</span>
                  <span className="mt-1 block text-xs text-[#aaa397]">E-postadress kommer snart</span>
                </span>
                <span className="text-xs text-[#aaa397]">SNART</span>
              </div>

              <a
                href="#boka"
                onClick={() => setContactOpen(false)}
                className="flex items-center justify-between bg-[#c6aa76] p-4 text-[#100e0a] transition hover:bg-[#dfc99f]"
              >
                <span>
                  <span className="block font-semibold">Boka tid</span>
                  <span className="mt-1 block text-xs text-[#332a1b]">Skicka en bokningsförfrågan</span>
                </span>
                <span className="text-xl">↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

