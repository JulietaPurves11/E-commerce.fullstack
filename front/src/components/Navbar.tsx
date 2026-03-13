"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./ui/Button";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-purple/90 backdrop-blur-sm text-cream shadow-md border-b border-rose/20 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold tracking-wide">
          TechStore
        </Link>

        <div className="flex gap-4">
          <Button as="link" href="/" variant="ghost" className="text-sm">
            Inicio
          </Button>
          <Button as="link" href="/products" variant="ghost" className="text-sm">
            Productos
          </Button>

          {isAuthenticated ? (
            <>
              <Button as="link" href="/cart" variant="ghost" className="text-sm">
                Carrito
              </Button>
              <Button as="link" href="/dashboard" variant="ghost" className="text-sm">
                Mi cuenta
              </Button>

              <Button onClick={logout} variant="primary" className="text-sm">
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Button as="link" href="/login" variant="ghost" className="text-sm">
                Iniciar sesión
              </Button>
              <Button as="link" href="/register" variant="primary" className="text-sm">
                Registrarse
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
