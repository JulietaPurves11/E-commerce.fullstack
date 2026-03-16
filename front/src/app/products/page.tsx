import { IProduct } from "@/interfaces/IProduct";
import { getProducts } from "@/lib/api/products";
import ProductsCatalog from "@/components/products/ProductsCatalog";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-cream text-bg-dark px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Nuestros Productos</h1>
      <ProductsCatalog products={products as IProduct[]} />
    </main>
  );
}
