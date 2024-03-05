import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/theme.scss";
import Header from "@/layouts/Header";
import Head from "next/head";
import { Footer } from "@/layouts/Footer";
import { memo } from "react";

const inter = Inter({ subsets: ["latin"] });

const RenderHeader = memo(() => <Header />);
const RenderFooter = memo(() => <Footer />);

export const metadata: Metadata = {
  title: "Global Prostate Solutions",
  description: "Healthcare Solutions",
  icons: "./favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={inter.className}>
        <RenderHeader />
        {children}
        <RenderFooter />
      </body>
    </html>
  );
}

// Add display name to functional components
RootLayout.displayName = "RootLayout";
RenderHeader.displayName = "RenderHeader";
RenderFooter.displayName = "RenderFooter";
