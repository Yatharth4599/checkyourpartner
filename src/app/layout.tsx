import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CheckYourPartner.com – Loyalty Test Service",
  description: "Test your partner&apos;s loyalty with our confidential, AI-powered service. Get proof, peace of mind, and results in 5 days.",
  openGraph: {
    title: "CheckYourPartner.com – Loyalty Test Service",
    description: "Test your partner&apos;s loyalty with our confidential, AI-powered service. Get proof, peace of mind, and results in 5 days.",
    url: "https://checkyourpartner.com",
    siteName: "CheckYourPartner.com",
    images: [
      {
        url: "/logo2.jpeg",
        width: 1200,
        height: 630,
        alt: "CheckYourPartner.com Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CheckYourPartner.com – Loyalty Test Service",
    description: "Test your partner&apos;s loyalty with our confidential, AI-powered service. Get proof, peace of mind, and results in 5 days.",
    images: ["/logo2.jpeg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50 text-gray-900 min-h-screen flex flex-col relative">
        <header className="w-full flex items-center px-6 py-4 bg-white shadow-sm z-50">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="CheckMyPartner Logo" width={48} height={48} className="rounded-lg" priority />
            <span className="font-bold text-xl text-gray-900 tracking-tight">checkyourpartner.com</span>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
