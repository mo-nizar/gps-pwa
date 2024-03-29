// "use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/theme.scss";
import Header from "@/layouts/Header";
import Head from "next/head";
import { Footer } from "@/layouts/Footer";
import { memo } from "react";
import 'dotenv/config';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <body className={inter.className}>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
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
