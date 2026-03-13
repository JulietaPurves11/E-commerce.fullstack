//import { IProduct } from "@/interfaces/IProduct";
import Image from "next/image";
import { getProductById } from "@/lib/api/products";
//import Link from "next/link";
import AddToCartButton from "@/components/products/AddToCartButton";
import Button from "@/components/ui/Button";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const product = await getProductById(id);
    const imageSrc = product.image?.startsWith("http") ? product.image : "/fallback.jpg";

    return (
      <main className="min-h-screen bg-cream text-bg-dark flex flex-col items-center py-12">

        <div className="w-full max-w-4xl bg-bg-dark text-cream p-6 md:p-10 rounded-lg shadow-lg">

          <div className="flex flex-col md:flex-row gap-8">

            <div className="w-full md:w-1/2 h-72 md:h-auto overflow-hidden rounded-lg shadow">
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col md:w-1/2">

              <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

              <p className="text-2xl font-semibold mb-5">${product.price}</p>

              <AddToCartButton product={product} />

              <p className="text-base mt-6 leading-relaxed">
                {product.description}
              </p>

            </div>
          </div>
        </div>
      </main>
    );
  } catch (error: unknown) {
    const message = getErrorMessage(error);

    return (
      <main className="min-h-screen bg-cream text-bg-dark flex items-center justify-center p-8">
        <div className="max-w-xl bg-white/80 dark:bg-bg-dark/90 text-bg-dark dark:text-cream p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2">No se pudo cargar el producto</h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-4">
            {message ?? "Error desconocido. Revisa el backend o intenta nuevamente."}
          </p>

          <div className="flex gap-3">
            <Button as="link" href="/products" variant="primary">
              Volver a Productos
            </Button>
            <Button as="link" href={`/products/${id}`} variant="ghost">
              Reintentar
            </Button>
          </div>
        </div>
      </main>
    );
  }
}
