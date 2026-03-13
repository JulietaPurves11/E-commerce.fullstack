import { IProduct } from "@/interfaces/IProduct";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function getProducts(): Promise<IProduct[]> {
  const res = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al obtener los productos");
  }

  return res.json();
}

export async function getProductById(id: string): Promise<IProduct> {
  const res = await fetch(`${API_URL}/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "<no body>");
    throw new Error(`(${res.status}) ${res.statusText} - ${body}`);
  }

  return res.json();
}
