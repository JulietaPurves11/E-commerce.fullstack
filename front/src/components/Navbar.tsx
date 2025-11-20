"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";

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
          <NavButton href="/" label="Inicio" />
          <NavButton href="/products" label="Productos" />

          {isAuthenticated ? (
            <>
              <NavButton href="/cart" label="Carrito" />
              <NavButton href="/dashboard" label="Mi cuenta" />

              <button
                onClick={logout}
                className="bg-rose/30 hover:bg-pink text-cream px-3 py-1 rounded-md text-sm font-medium transition-all shadow-sm hover:shadow-md"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavButton href="/login" label="Iniciar sesión" />
              <NavButton href="/register" label="Registrarse" />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

function NavButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="bg-rose/30 hover:bg-pink text-cream px-3 py-1 rounded-md text-sm font-medium transition-all shadow-sm hover:shadow-md"
    >
      {label}
    </Link>
  );
}
