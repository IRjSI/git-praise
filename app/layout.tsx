import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const mr = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Git Praise — Praise GitHub Profiles",
  description:
    "Git Praise: celebrate and highlight remarkable GitHub profiles. Give genuine recognition to developers for their contributions, projects, and impact.",
  metadataBase: new URL("https://git-praise.vercel.app"),
  keywords: [
    "Git Praise",
    "GitHub profiles",
    "developer recognition",
    "praise developers",
    "GitHub showcase",
  ],
  openGraph: {
    title: "Git Praise — Highlight GitHub Profiles",
    description:
      "Celebrate and highlight remarkable GitHub profiles. Recognize developers for their projects and contributions.",
    url: "https://git-praise.vercel.app",
    siteName: "Git Praise",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Git Praise — Highlight GitHub Profiles",
    description:
      "Celebrate and highlight remarkable GitHub profiles. Recognize developers for their projects and contributions.",
    creator: "@_RjS_0",
  },
  authors: [{ name: "RjS", url: "https://git-praise.vercel.app" }],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://git-praise.vercel.app" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${mr.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}