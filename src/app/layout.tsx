import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, IBM_Plex_Mono } from "next/font/google";
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

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${ibmPlexMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
