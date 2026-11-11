import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { MotionProvider } from "@/components/MotionProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Portfolio of Airene V John: AI & machine learning enthusiast, full-stack developer and predictive analytics researcher.";

export const metadata: Metadata = {
  title: "Airene V John | AI/ML & Full-Stack Developer",
  description,
  openGraph: {
    title: "Airene V John | AI/ML & Full-Stack Developer",
    description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable} antialiased`}>
      <body className="min-h-screen">
        <MotionProvider>
          <CustomCursor />
          <Preloader />
          <Navbar />
          <SmoothScroll>{children}</SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
