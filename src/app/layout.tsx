import PageWithPreload from "@/components/page-with-preload";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
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
  title: 'Donaire | Cerimionialista',
  description:
    'Transformamos o seu sonho em um evento inesquecível',
  keywords: [],
  icons: {
    icon: '/icons/logo.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="preload" as="image" href="/teaser/teaser1.svg" />
      <link rel="preload" as="video" href="/videos/hero.mp4" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors theme="light" position="bottom-center" />
        <PageWithPreload>
          {children}
        </PageWithPreload>
      </body>
    </html>
  );
}