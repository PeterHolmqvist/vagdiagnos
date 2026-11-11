
"use client";

import { useState, type FormEvent } from "react";

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
];

const prices = [
  ["Enkel felkodsavläsning", "350 kr"],
  ["Fullständig VCDS Auto-Scan", "495 kr"],
  ["Fördjupad diagnostik", "795 kr"],
  ["Avancerad felsökning", "895 kr/tim"],
  ["Kodning och aktivering", "Från 495 kr"],
  ["Start/Stop-anpassning", "Från 595 kr"],
  ["Basic Settings och adaptioner", "Från 495 kr"],
  ["Retrofit och eftermonteringskodning", "Från 795 kr"],
  ["Modulbyte, kodning och kalibrering", "Från 1 495 kr"],
];

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  // Skickar bokningsuppgifterna till kundens SMS-app.
  function handleBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fields = [
      ["Telefon", formData.get("phone")],
      ["Bil", formData.get("vehicle")],
      ["Årsmodell", formData.get("year")],
      ["Registreringsnummer", formData.get("registration")],
      ["Tjänst", formData.get("service")],
      ["Önskat datum", formData.get("date")],
      ["Meddelande", formData.get("message")],
    ];

    const message = [
      "Hej! Jag vill skicka en bokningsförfrågan till VAG Diagnos.",
      "",
      ...fields
        .filter(([, value]) => value)
        .map(([label, value]) => `${label}: ${value}`),
    ].join("\n");

    window.location.href = `sms:0729036436?body=${encodeURIComponent(message)}`;
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
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
          {brands.map((brand) => (
            <div key={brand.slug} className="flex items-center justify-center gap-3">
              <img
                src={`https://cdn.simpleicons.org/${brand.slug}/C6AA76`}
                alt=""
                className="h-6 w-7 object-contain"
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
                className="flex items-start justify-between gap-5 border-b border-white/10 py-5"
              >
                <span className="text-sm leading-6 text-[#d8d1c5] md:text-base">
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
                <label htmlFor="vehicle" className="mb-2 block text-sm text-[#d8d1c5]">
                  Bilmodell
                </label>
                <input
                  id="vehicle"
                  name="vehicle"
                  placeholder="Ex. VW Passat 2.0 TDI"
                  className="w-full border border-white/15 bg-[#090909] px-4 py-3 text-sm text-white outline-none placeholder:text-[#777] focus:border-[#c6aa76]"
                />
              </div>
              <div>
                <label htmlFor="year" className="mb-2 block text-sm text-[#d8d1c5]">
                  Årsmodell
                </label>
                <input
                  id="year"
                  name="year"
                  placeholder="Ex. 2018"
                  className="w-full border border-white/15 bg-[#090909] px-4 py-3 text-sm text-white outline-none placeholder:text-[#777] focus:border-[#c6aa76]"
                />
              </div>
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
                  <option>Felkodsavläsning</option>
                  <option>Felsökning</option>
                  <option>Start/Stop</option>
                  <option>Kodning och aktivering</option>
                  <option>Servicefunktioner</option>
                  <option>Retrofit och eftermontering</option>
                  <option>Annat</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="date" className="mb-2 block text-sm text-[#d8d1c5]">
                Önskat datum
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className="w-full border border-white/15 bg-[#090909] px-4 py-3 text-sm text-white outline-none focus:border-[#c6aa76]"
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
              className="w-full bg-[#c6aa76] px-7 py-4 text-sm font-semibold tracking-wide text-[#100e0a] transition hover:bg-[#dfc99f] sm:w-auto"
            >
              SKAPA BOKNINGSFÖRFRÅGAN
            </button>
            <p className="text-xs leading-5 text-[#8f877a]">
              Knappen öppnar din meddelandeapp med uppgifterna ifyllda.
              Du skickar själv meddelandet. Tiden är inte bokad förrän vi
              har bekräftat den.
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
