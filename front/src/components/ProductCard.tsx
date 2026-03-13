"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ICardProps } from "@/interfaces/ICardProps";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
}: ICardProps) {
  const router = useRouter();

  const imageSrc = image?.startsWith("http") ? image : "/fallback.jpg";

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
        <Badge variant="secondary">Producto</Badge>
      </div>
    </Card>
  );
}
