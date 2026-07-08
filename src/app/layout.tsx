import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bilu G Travels Kashmir | Trusted Local Kashmir DMC",
    template: "%s | Bilu G Travels Kashmir"
  },
  description: "Experience the luxury of Kashmir with Bilu G Travels. Your trusted local Kashmir DMC for premium tour packages, offbeat valleys, luxury houseboats, and authentic experiences.",
  keywords: ["Kashmir Tour Packages", "Kashmir DMC", "Bilu G Travels", "Luxury Kashmir Tours", "Offbeat Kashmir", "Srinagar Houseboats", "Gulmarg Packages"],
  authors: [{ name: "Bilu G Travels" }],
  creator: "Bilu G Travels",
  publisher: "Bilu G Travels",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Bilu G Travels Kashmir | Trusted Local Kashmir DMC",
    description: "Your gateway to the paradise on earth. Luxury and authentic Kashmir tours.",
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
