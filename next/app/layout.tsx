import type { Metadata } from "next";

import "./globals.css";

import NextTopLoader from "nextjs-toploader";

import { Toaster } from "react-hot-toast";

import Header from "@/src/components/layout/Header";

export const metadata: Metadata = {
  title: "Traveling Like a Root",
  description: "Generated Travel Quotes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-screen antialiased">
        <div className="bg-slate-100 px-2 md:px-6 py-10 min-h-screen">
          
          <Header/>

          <main className="space-y-6 mx-auto max-w-5xl">
            <NextTopLoader
              color="#0f172a"
              height={3}
              showSpinner={false}
            />
            {children}
            <Toaster position="top-right" />
          </main>
        </div>
      </body>
    </html>
  );
}
