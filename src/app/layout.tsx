import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "@fontsource/hind-siliguri/400.css";
import "@fontsource/hind-siliguri/500.css";
import "@fontsource/hind-siliguri/600.css";
import "@fontsource/hind-siliguri/700.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import AuthNotice from "@/components/AuthNotice";

export const metadata: Metadata = {
  title: "বাজার দর — আজকের বাজারের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের দাম, বাজারভিত্তিক সর্বনিম্ন-সর্বাধিক ও গড় দাম এক জায়গায়।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" data-theme="bazar">
      <body className="flex min-h-screen flex-col bg-base-200 text-base-content antialiased">
        <Navbar />
        <Ticker />
        <main className="flex-1">{children}</main>
        <Footer />

        <Toaster
          position="top-center"
          toastOptions={{ style: { fontFamily: "var(--font-sans)", fontSize: "14px" } }}
        />
        <Suspense fallback={null}>
          <AuthNotice />
        </Suspense>
      </body>
    </html>
  );
}
