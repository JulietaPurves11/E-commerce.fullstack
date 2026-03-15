"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { ICardProps } from "@/interfaces/ICardProps";
import Card from "@/components/ui/Card";
import { useState } from "react";

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
}: ICardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [added, setAdded] = useState(false);

  const imageSrc = image?.startsWith("http") ? image : "/fallback.jpg";

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      const redirectTo = encodeURIComponent(pathname);
      router.replace(`/login?redirectTo=${redirectTo}`);
      return;
    }

    addToCart({ id, name, description, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);

  };

  return (
    <Card
      variant="secondary"
      padding="sm"
      onClick={() => router.push(`/products/${id}`)}
      className="cursor-pointer hover:scale-[1.02] transition-transform duration-200 flex flex-col justify-between"
    >
      <div className="relative w-full h-72 mb-4 overflow-hidden rounded-lg">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-sm text-violet line-clamp-3 mb-4">{description}</p>

      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-purple">${price}</span>

        <div className="flex items-center gap-2">
          {added && (
            <span className="text-xs font-medium text-pink">Agregado</span>
          )}

          <button
          type="button"
          arial-label={`Agregar ${name} al carrito`}
          onClick={handleAddToCart}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-purple text-cream hover:bg-purple/80 transition-colors"
          >
            <ShoppingCart size={16} />
          </button>
        </div>    
      </div>
    </Card>
  );
}
