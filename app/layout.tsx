import type { Metadata } from "next";
import localFont from 'next/font/local'
import { Roboto, Poppins, Be_Vietnam_Pro, Figtree, Mulish, Jost, Lexend } from "next/font/google";
import "./globals.css";
import Header from "@/components/general/header";
import { Toaster } from 'sonner'

const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mulish',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jost',
});

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Specify required weights
  variable: '--font-figtree', // Optional: CSS variable
});

const be_Vietnam_Pro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-vietnam',
});

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lexend',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} ${jost.variable} ${mulish.variable} ${figtree.variable} ${be_Vietnam_Pro.variable} ${lexend.variable} ${roboto.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased relative flex flex-col min-h-screen">
        <Toaster richColors position="top-center" />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}