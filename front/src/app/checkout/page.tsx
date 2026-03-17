"use client";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/api/orders";
import { CheckoutData } from "@/interfaces/ICheckout";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

const initialForm: CheckoutData = {
  name: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  deliveryMethod: "envio",
};

export default function CheckoutPage() {
  const { isAuthenticated, token, user, loading } = useAuth();
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  const [form, setForm] = useState<CheckoutData>({
    ...initialForm,
    name: user?.name ?? "",
    email: user?.email ?? "",
    address: user?.address ?? "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const redirectTo = encodeURIComponent(pathname);
      router.replace(`/login?redirectTo=${redirectTo}`);
    }
  }, [loading, isAuthenticated, pathname, router]);

  if (loading) return <p className="mt-10 text-center">Cargando...</p>;

  if (cart.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-cream text-bg-dark px-4">
        <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
        <Button as="link" href="/products" variant="primary">
          Ver productos
        </Button>
      </main>
    );
  }

  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const hasEmpty = Object.values(form).some((v) => !String(v).trim());
    if (hasEmpty) {
      alert("Completá todos los campos.");
      return;
    }

    try {
      setSubmitting(true);
      const items = cart.map((p) => ({ id: p.id, quantity: p.quantity }));

      await createOrder(items, form, token);
      clearCart();

      router.push("/dashboard?order=success");
    } catch {
      alert("No se pudo finalizar la compra.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream text-bg-dark py-10 px-4">
      <div className="max-w-3xl mx-auto bg-bg-dark text-cream rounded-xl p-6 sm:p-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="name" placeholder="Nombre completo" value={form.name} onChange={onChange} className="sm:col-span-2 px-3 py-2 rounded-md text-bg-dark bg-cream" />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} className="sm:col-span-2 px-3 py-2 rounded-md text-bg-dark bg-cream" />
          <input name="address" placeholder="Dirección" value={form.address} onChange={onChange} className="sm:col-span-2 px-3 py-2 rounded-md text-bg-dark bg-cream" />
          <input name="city" placeholder="Ciudad" value={form.city} onChange={onChange} className="px-3 py-2 rounded-md text-bg-dark bg-cream" />
          <input name="postalCode" placeholder="Código postal" value={form.postalCode} onChange={onChange} className="px-3 py-2 rounded-md text-bg-dark bg-cream" />

          <select name="deliveryMethod" value={form.deliveryMethod} onChange={onChange} className="sm:col-span-2 px-3 py-2 rounded-md text-bg-dark bg-cream">
            <option value="envio">Envío</option>
            <option value="retiro">Retiro</option>
          </select>

          <div className="sm:col-span-2 mt-2">
            <p className="text-lg font-semibold mb-4">Total: ${total}</p>
            <Button type="submit" variant="primary" fullWidth disabled={submitting}>
              {submitting ? "Procesando..." : "Finalizar compra"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}