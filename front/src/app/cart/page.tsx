"use client";

//import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { createOrder } from "@/lib/api/orders";

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
        <Button as="link" href="/products" variant="primary">
          Ver productos
        </Button>
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
    await createOrder(ids, token);
    
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
                <Button onClick={() => decreaseQuantity(item.id)} variant="ghost" className="px-3 py-1">
                  -
                </Button>

                <span className="px-3">{item.quantity}</span>

                <Button onClick={() => increaseQuantity(item.id)} variant="ghost" className="px-3 py-1">
                  +
                </Button>
              </div>

              <Button onClick={() => removeFromCart(item.id)} variant="ghost" className="text-red-300 border-red-300/40 hover:bg-red-500/10">
                Eliminar
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-right">
          <p className="text-2xl font-bold">Total: ${total}</p>

          <Button onClick={handleCheckout} variant="primary" fullWidth className="mt-6 py-3 font-bold">
            Finalizar compra
          </Button>
        </div>
      </div>
    </main>
  );
  
}

