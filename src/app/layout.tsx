import type { Metadata } from "next";
import { Playfair_Display, Poppins, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Bilu G Travels Kashmir | Luxury Kashmir Tour Packages & DMC",
    template: "%s | Bilu G Travels Kashmir"
  },
  description: "Experience the ultimate luxury of Kashmir with Bilu G Travels. Your trusted local Kashmir DMC for premium tour packages, luxury hotels, houseboats, private transport, and honeymoon tours.",
  keywords: ["Kashmir Tour Packages", "Kashmir DMC", "Bilu G Travels", "Luxury Kashmir Tours", "Offbeat Kashmir", "Srinagar Houseboats", "Gulmarg Packages", "Javid Farooq Kashmir Tours"],
  authors: [{ name: "Bilu G Travels" }],
  creator: "Bilu G Travels",
  publisher: "Bilu G Travels",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Bilu G Travels Kashmir | Luxury Kashmir Tour Packages & DMC",
    description: "Your gateway to the paradise on earth. Luxury hotels, elegant houseboats, private transport, and personalized Kashmir hospitality.",
    url: "https://bilugtravelskashmir.com",
    siteName: "Bilu G Travels Kashmir",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${playfair.variable} ${montserrat.variable} antialiased font-sans bg-white text-[#222222]`}>
        {children}
      </body>
    </html>
  );
}
