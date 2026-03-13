import Card from "@/components/ProductCard"; 
import { IProduct } from "@/interfaces/IProduct";
import { getProducts } from "@/lib/api/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-cream text-bg-dark px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Nuestros Productos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product: IProduct) => (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </main>
  );
}
