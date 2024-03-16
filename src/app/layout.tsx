import type { Metadata, Viewport } from "next";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Bubble",
  description: "Crypto game",
};
export const viewport: Viewport = {
  userScalable: false,
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
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0"
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}
