// components/Layout.tsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full overflow-hidden">{children}</main>
      <Footer />
    </>
  );
}
