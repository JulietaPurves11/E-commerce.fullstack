"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMyOrders } from "@/lib/api/orders";

interface ProductInOrder {
  id: number;
  name: string;
  price: number;
}

interface Order {
  id: number;
  products: ProductInOrder[];
  status: string;
  date: string;
}

export default function Dashboard() {
  const { user, token, isAuthenticated } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(token!);
        setOrders(data);
        
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, router, token]);

  if (!isAuthenticated) {
    return <p className="text-center mt-10">Redirigiendo...</p>;
  }

  return (
    <main className="min-h-screen bg-pink text-bg-dark flex flex-col items-center py-12">
      <div className="max-w-xl bg-bg-dark text-cream p-8 rounded-lg shadow-lg w-full">
        
        <h1 className="text-4xl font-medium mb-6">Mi Cuenta</h1>

        <p className="text-lg mb-2"><strong>Nombre:</strong> {user?.name}</p>
        <p className="text-lg mb-2"><strong>Email:</strong> {user?.email}</p>
        <p className="text-lg mb-2"><strong>Dirección:</strong> {user?.address}</p>
        <p className="text-lg mb-6"><strong>Teléfono:</strong> {user?.phone}</p>

        <br/>

        <h2 className="text-3xl font-medium mb-4">Mis Compras</h2>

        {loadingOrders ? (
          <p>Cargando órdenes...</p>
        ) : orders.length === 0 ? (
          <p className="opacity-80">Aún no realizaste ninguna compra.</p>
        ) : (
          <div className="flex flex-col gap-5">
            {orders.map(order => {
              const total = order.products.reduce(
                (acc, p) => acc + p.price,
                0
              );

              return (
              <div
                key={order.id}
                className="bg-white/10 p-5 rounded-lg shadow-md text-cream"
              >
                <h3 className="text-2xl font-semibold mb-2">
                  Orden #{order.id}
                </h3>

                <p className="text-sm opacity-70 mb-4">
                  Fecha: {new Date(order.date).toLocaleDateString("es-AR")}
                </p>

                <p className="text-sm opacity-70 mb-4">
                  Estado:{" "}
                  <span
                    className={
                      order.status === "approved"
                        ? "text-cream font-semibold"
                        : "text-cream font-semibold"
                    }
                  >
                    {order.status}
                  </span>
                </p>

                <p className="font-medium mb-2">
                  Productos ({order.products.length}):
                </p>

                <ul className="list-disc ml-5 mb-4">
                  {order.products.map(p => (
                    <li key={p.id}>
                      {p.name} — ${p.price}
                    </li>
                  ))}
                </ul>

                <p className="text-lg font-bold">
                  Total: ${total}
                </p>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
  
}
