import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "E-commerce",
  description: "Tienda online de tecnología",
};

export default function RootLayout({children}: {children: React.ReactNode;}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-bg-dark text-cream">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 mt-20">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>          
      </body>
    </html>
  );
}
