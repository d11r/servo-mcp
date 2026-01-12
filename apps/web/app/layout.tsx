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
  title: "Servo - Desktop MCP Server for AI Agents | macOS & Windows",
  description:
    "Servo is a desktop MCP server that gives Claude Code tools to take screenshots, click buttons, type text, and verify its work on your desktop. Open source, 100% local, no telemetry.",
  keywords: [
    "MCP server",
    "desktop MCP server",
    "Model Context Protocol",
    "Claude Code",
    "desktop automation",
    "AI agent",
    "screen control",
    "MCP tools",
    "open source",
    "macOS",
    "Windows",
    "desktop control",
    "AI verification",
  ],
  authors: [{ name: "Dragos Strugar", url: "https://dragosstrugar.com" }],
  creator: "Dragos Strugar",
  metadataBase: new URL("https://getservo.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://getservo.app",
    siteName: "Servo",
    title: "Servo - Desktop MCP Server for AI Agents",
    description:
      "A desktop MCP server that gives Claude Code tools to take screenshots, click buttons, and verify its work. Open source, 100% local, no telemetry.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servo - Desktop MCP Server for AI Agents",
    description:
      "A desktop MCP server that gives Claude Code tools to take screenshots, click buttons, and verify its work. Open source, 100% local, no telemetry.",
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
