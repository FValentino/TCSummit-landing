import type { Metadata } from "next";
import "./globals.css";
import Menu from "@/components/common/menu/menu";
import Footer from "@/components/common/footer/footer";

import { Saira, Orbitron, Inter } from "next/font/google";

const saira = Saira({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-saira",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-orbitron",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Techno Crypto Summit",
  description: "Donde la tecnologia se encuentra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${saira.variable} ${orbitron.variable} ${inter.variable} antialiased`}
      >
        <Menu/>

        {children}
        
        <Footer/>
      </body>
    </html>
  );
}
