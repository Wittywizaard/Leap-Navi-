import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Navi — AI Career Navigator",
  description: "Upload your resume. Get a personalized career roadmap powered by AI.",
  openGraph: {
    title: "Navi — AI Career Navigator",
    description: "Upload your resume. Get a personalized career roadmap powered by AI.",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
