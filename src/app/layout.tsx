import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bubble",
  description: "Crypto game",
  viewport: {
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    width: "device-width",
    userScalable: false,
  },
};

export const viewport: Viewport = {
  userScalable: false,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}
