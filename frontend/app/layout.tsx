import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Load the Geist Sans and Geist Mono fonts from Google Fonts, and set them as CSS variables for use in the app.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


// Load the Geist Mono font from Google Fonts, and set it as a CSS variable for use in the app.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// Define the metadata for the application, including the title and description that will be used in the HTML head.
export const metadata: Metadata = {
  title: "Mini GEO Audit",
  description: "Analyze a public webpage for AI citation readiness and structured data opportunities.",
};


// Define the root layout component for the application, which wraps all pages and components. It sets up the HTML structure and applies the loaded fonts to the entire app.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}