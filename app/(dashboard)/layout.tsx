import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
import SessionWrapper from "@/providers/SessionWrapper";
import ToasterProvider from "@/providers/ToasterProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdhamShopMaster - Admin",
  description:
    "Effortlessly manage your online store with AdhamShopMaster's powerful admin dashboard. Experience intuitive controls, real-time analytics, and comprehensive tools designed to streamline your e-commerce operations and boost productivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          <div className="flex text-grey-1 max-lg:flex-col">
            <LeftSideBar />
            <TopBar />
            <div className="flex-1">{children}</div>
          </div>
        </body>
      </html>
    </SessionWrapper>
  );
}
