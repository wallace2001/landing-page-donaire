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
    icon: '/icons/logo.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
