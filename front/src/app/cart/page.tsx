"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";



export default function CartPage() {
  const { isAuthenticated, token, loading } = useAuth();
  const router = useRouter();
  const { cart, clearCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  
 

  useEffect(() => {
    if (!loading && !isAuthenticated) router.replace("/login");
  }, [loading, isAuthenticated, router]);

  if (loading) return <p className="mt-10">Cargando...</p>;

  //if (!isAuthenticated) return <p className="mt-10">Redirigiendo...</p>;

  if (cart.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-cream text-bg-dark">
        <h2 className="text-3xl font-bold mb-4">Tu carrito está vacío</h2>
        <Link
          href="/products"
          className="bg-accent hover:bg-accent-dark text-bg-dark px-6 py-3 rounded-md font-medium"
        >
          Ver productos
        </Link>
      </main>
    );
  }

  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  const handleCheckout = async () => {
    if (!token) {
      alert("Debes iniciar sesión para finalizar la compra.");
      router.push("/login");
      return;
    }
    try {
    const ids = cart.map(p => p.id);

    const res = await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ products: ids }),
    });

    if (!res.ok) throw new Error("No se pudo procesar la compra");

    clearCart();
    router.push("/dashboard?order=success");
  } catch {
    alert("Hubo un problema al procesar tu compra.");
  }
  console.log(token)
};


  return (
    <main className="min-h-screen bg-cream text-bg-dark py-12 px-4">
      <div className="max-w-3xl mx-auto bg-bg-dark text-cream p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>

        <div className="flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white/10 p-4 rounded-lg"
            >
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg shadow-sm">
                <Image
                  src={item.image || "/fallback.jpg"}
                  width={80}
                  height={80}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p>${item.price}</p>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-2 py-1 bg-rose/30 rounded"
                >
                  -
                </button>

                <span className="px-3">{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-2 py-1 bg-rose/30 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-right">
          <p className="text-2xl font-bold">Total: ${total}</p>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-pink text-bg-dark py-3 rounded-lg font-bold hover:bg-pink/80"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </main>
  );
  
}

