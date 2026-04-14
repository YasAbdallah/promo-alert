import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import FavoriteCount from "@/components/layout/FavoriteCount";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Promo Alert",
  description: "App de alerta de promoções.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const links = [
    { href: "/", title: "Home" },
    { href: "/products", title: "Produtos" },
    { href: "/favorites", title: "Favoritos", icon: <FavoriteCount /> },
  ];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">

          <div className="flex w-full items-center px-4">
            <Navbar list={links}/>
          </div>

        </header>

        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
