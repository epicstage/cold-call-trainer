import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ColdCall BALANCE – Voice Trainer v0.1",
  description: "콜드 콜 연습을 위한 음성 트레이너",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className="relative">
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-10 md:py-16">
          {children}
        </div>
      </body>
    </html>
  );
}
