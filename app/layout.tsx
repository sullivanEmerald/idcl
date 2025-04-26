import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import "./force-light-mode.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Adminting | Influencer Marketing Platform",
    template: "%s | Adminting"
  },
  description: "Connect brands with influential promoters to create engaging campaigns and drive meaningful results through our streamlined marketing platform.",
  keywords: ["influencer", "marketing", "campaigns", "promoters", "brands", "advertisers", "social media"],
  authors: [{ name: "Adminting Team" }],
  creator: "Adminting",
  publisher: "Adminting",
  applicationName: "Adminting Platform",
  metadataBase: new URL(process.env.NEXT_PUBLIC_FRONTEND_URL || "https://adminting.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_FRONTEND_URL || "https://adminting.com",
    title: "Adminting | Influencer Marketing Platform",
    description: "Connect brands with influential promoters to create engaging campaigns and drive meaningful results.",
    siteName: "Adminting",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Adminting Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Adminting | Influencer Marketing Platform",
    description: "Connect brands with influential promoters to create engaging campaigns and drive meaningful results.",
    images: ["/twitter-image.jpg"],
    creator: "@adminting",
    site: "@adminting"
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png" 
  },
  manifest: "/manifest.json",
  verification: {
    google: "google-site-verification-token", 
    yandex: "yandex-verification-token"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{colorScheme: 'light'}}>
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
