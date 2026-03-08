import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "أمير السماحي | الموقع الرسمي",
  description: "الموقع الرسمي لأمير السماحي - حزب العدل",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} font-sans antialiased bg-gray-50 text-gray-900`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
