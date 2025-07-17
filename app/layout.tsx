import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const mr = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Git Praise — Because too much roast",
  description:
    "Git Praise: Because too much roast now. Celebrate and highlight remarkable GitHub profiles. Give genuine recognition to developers for their contributions, projects, and impact.",
  metadataBase: new URL("https://git-praise.vercel.app"),
  keywords: [
    "Git Praise",
    "Github Praise",
    "GitHub profiles",
    "roast github",
    "git roast",
    "github roast",
    "developer recognition",
    "praise developers",
    "GitHub showcase",
  ],
  openGraph: {
    title: "Git Praise — Because too much roast",
    description:
      "Git Praise: Because too much roast now. Celebrate and highlight remarkable GitHub profiles. Give genuine recognition to developers for their contributions, projects, and impact.",
    url: "https://git-praise.vercel.app",
    siteName: "Git Praise",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Git Praise — Because too much roast",
    description:
      "Git Praise: Because too much roast now. Celebrate and highlight remarkable GitHub profiles. Give genuine recognition to developers for their contributions, projects, and impact.",
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