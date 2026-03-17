"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./ui/Button";
import { House, LogOut, Package, Search, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) {
      router.push("/products");
      setSearchTerm("");
      return;
    }
    router.push(`/products?q=${encodeURIComponent(term)}`);
    setSearchTerm("");
  };

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

        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center gap-2 mx-4 flex-1 max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full rounded-md px-3 py-2 text-sm bg-cream text-bg-dark placeholder:text-bg-dark/60"
          />
          <button
            type="submit"
            className="rounded-md bg-pink text-bg-dark px-3 py-2 text-sm font-medium hover:bg-cream transition-colors"
          >
            Buscar
          </button>
        </form>

        <div className="flex gap-4">
          
          <Button
            onClick={() => setShowMobileSearch((prev) => !prev)}
            variant="ghost"
            className="h-9 w-9 p-0 flex items-center justify-center md:hidden"
            aria-label="Buscar"
            title="Buscar"
          >
            <Search size={16} className="block shrink-0" aria-hidden="true" />
            <span className="sr-only">Buscar</span>
          </Button>

          <Button
            as="link"
            href="/"
            variant="ghost"
            className="h-9 w-9 p-0 flex items-center justify-center leading-none"
            aria-label="Inicio"
            title="Inicio"
          >
            <House size={16} className="block shrink-0" aria-hidden="true" />
            <span className="sr-only">Inicio</span>
          </Button>
          
          <Button
            as="link"
            href="/products"
            variant="ghost"
            className="h-9 w-9 p-0 flex items-center justify-center leading-none"
            aria-label="Productos"
            title="Productos"
          >
            <Package size={16} className="block shrink-0" aria-hidden="true" />
            <span className="sr-only">Productos</span>
          </Button>

          {isAuthenticated ? (
            <> 
              <Button
                as="link"
                href="/cart"
                variant="ghost"
                className="h-9 w-9 p-0 flex items-center justify-center leading-none"
                aria-label="Carrito"
                title="Carrito"
              >
                <ShoppingCart size={16} className="block shrink-0" aria-hidden="true" />
                <span className="sr-only">Carrito</span>
              </Button>
            
              <Button
                as="link"
                href="/dashboard"
                variant="ghost"
                className="h-9 w-9 p-0 flex items-center justify-center leading-none"
                aria-label="Mi cuenta"
                title="Mi cuenta"
              >
                <User size={16} className="block shrink-0" aria-hidden="true" />
                <span className="sr-only">Mi cuenta</span>
              </Button>
            
              <Button
                onClick={logout}
                variant="ghost"
                className="h-9 w-9 p-0 flex items-center justify-center leading-none"
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
              >
                <LogOut size={16} className="block shrink-0" aria-hidden="true" />
                <span className="sr-only">Cerrar sesión</span>
              </Button>
            </>
          ) : (
            <>
              <Button as="link" href="/login" variant="ghost" className="text-sm flex items-center justify-center leading-none">
                Iniciar sesión
              </Button>
              <Button as="link" href="/register" variant="primary" className="text-sm flex items-center justify-center leading-none">
                Registrarse
              </Button>
            </>
          )}
        </div>
      </nav>
      
      {showMobileSearch && (
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full rounded-md px-3 py-2 text-sm bg-cream text-bg-dark placeholder:text-bg-dark/60"
            />
            <button
              type="submit"
              className="rounded-md bg-pink text-bg-dark px-3 py-2 text-sm font-medium hover:bg-cream transition-colors"
            >
              Ir
            </button>
          </form>
        </div>
      )}
      
    </header>
  );
}
