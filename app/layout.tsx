
import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vagdiagnos.se"),

  title: {
    default: "VAG Diagnos | Fordonsdiagnos & kodning i Eskilstuna",
    template: "%s | VAG Diagnos",
  },

  description:
    "Fordonsdiagnos, felkodsläsning, kodning och elektroniska servicefunktioner för Volkswagen, Audi, Škoda, SEAT och CUPRA. Vi hjälper dig i Eskilstuna med omnejd.",

  keywords: [
    "VAG Diagnos",
    "VCDS Eskilstuna",
    "fordonsdiagnos Eskilstuna",
    "bildiagnos",
    "felkodsläsning",
    "Volkswagen kodning",
    "Audi kodning",
    "Škoda kodning",
    "SEAT kodning",
    "CUPRA kodning",
    "Start Stop anpassning",
    "bilkodning Eskilstuna",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "VAG Diagnos | Diagnos & kodning",
    description:
      "Fordonsdiagnos, kodning och elektroniska anpassningar för VAG-gruppen. Eskilstuna med omnejd.",
    url: "https://vagdiagnos.se",
    siteName: "VAG Diagnos",
    locale: "sv_SE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "VAG Diagnos | Diagnos & kodning",
    description:
      "Fordonsdiagnos och kodning för VW, Audi, Škoda, SEAT och CUPRA.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sv"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
     
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TMTKW3KT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TMTKW3KT');
            `,
          }}
        />

        {children}
      </body>
    </html>
  );
}

