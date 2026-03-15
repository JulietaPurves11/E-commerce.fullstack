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
      <main className="min-h-screen bg-cream text-bg-dark px-4 sm:px-6 lg:px-8 py-8">
        <div className="mx-auto w-full max-w-6xl bg-bg-dark text-cream rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
            
            <div className="order-1 lg:order-2 flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-bold mb-3">{product.name}</h1>
    
              <p className="text-xl sm:text-2xl font-semibold mb-4">${product.price}</p>
    
              <div className="mb-6">
                <AddToCartButton product={product} />
              </div>
    
              <p className="text-sm sm:text-base leading-relaxed text-cream/90">
                {product.description}
              </p>
            </div>
    
            
            <div className="order-2 lg:order-1">
              <div className="relative w-full aspect-[4/3] max-h-[420px] overflow-hidden rounded-lg shadow">
                <Image
                  src={imageSrc}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
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
