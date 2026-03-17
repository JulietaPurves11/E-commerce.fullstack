import { CheckoutData } from "@/interfaces/ICheckout";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface OrderProductInput {
  id: number;
  quantity: number;
}

export interface ProductInOrder {
  id: number;
  name: string;
  price: number;
}

export interface Order {
  id: number;
  products: ProductInOrder[];
  productsQuantities?: Record<string, number>;
  status: string;
  date: string;
  customerName?: string;
  customerEmail?: string;
  customerAddress?: string;
  customerCity?: string;
  customerPostalCode?: string;
  deliveryMethod?: "envio" | "retiro";
}

export async function createOrder(products: OrderProductInput[], checkout: CheckoutData, token: string): Promise<void> {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ products, checkout }),
  });

  if (!res.ok) {
    throw new Error("No se pudo procesar la compra");
  }
}

export async function getMyOrders(token: string): Promise<Order[]> {
  const res = await fetch(`${API_URL}/users/orders`, {
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener órdenes");
  }

  return res.json();
}
