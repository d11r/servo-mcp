import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Servo - Give AI the ability to see and control your desktop",
  description:
    "Servo is an MCP server that lets Claude Code take screenshots, click buttons, type text, and verify its work. 100% local, open source, no telemetry.",
  keywords: [
    "MCP",
    "Model Context Protocol",
    "Claude Code",
    "desktop automation",
    "AI agent",
    "screen control",
    "open source",
    "macOS",
    "Windows",
  ],
  authors: [{ name: "Dragos Strugar", url: "https://dragosstrugar.com" }],
  creator: "Dragos Strugar",
  metadataBase: new URL("https://getservo.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://getservo.app",
    siteName: "Servo",
    title: "Servo - Give AI the ability to see and control your desktop",
    description:
      "An MCP server that lets Claude Code take screenshots, click buttons, type text, and verify its work. 100% local, open source, no telemetry.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servo - Give AI the ability to see and control your desktop",
    description:
      "An MCP server that lets Claude Code take screenshots, click buttons, type text, and verify its work. 100% local, open source, no telemetry.",
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
