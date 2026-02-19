import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
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
  title: "imaginethat — Games, Tools & Experiments",
  description:
    "A collection of mini games, creative tools, and interactive experiments. Built for fun, made to share.",
  metadataBase: new URL("https://imaginethat.one"),
  openGraph: {
    title: "imaginethat — Games, Tools & Experiments",
    description:
      "A collection of mini games, creative tools, and interactive experiments.",
    url: "https://imaginethat.one",
    siteName: "imaginethat",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} noise-bg min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
