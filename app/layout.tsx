import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "INSOMNIATOOLS — Kumpulan Tools VamxAPI",
  description:
    "INSOMNIATOOLS: koleksi tools VamxAPI dalam satu tempat. Dark. Minimal. Cepat."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}