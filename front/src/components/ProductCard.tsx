/* eslint-disable @next/next/no-img-element */
"use client";

//import Image from "next/image";
import { useRouter } from "next/navigation";
import { ICardProps } from "@/interfaces/ICardProps";

export default function Card({ id, name, description, price, image }: ICardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-cream text-bg-dark rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 p-4 flex flex-col justify-between"
    >
      <div className="relative w-full h-80 mb-4 overflow-hidden rounded-lg">
        <img
          src={image && image.startsWith("http") ? image : "/fallback.jpg"}
          alt={name}
          className="w-full h-full object-cover"  
        />


      </div>

      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-sm text-violet line-clamp-3 mb-4">{description}</p>
      <span className="text-lg font-semibold text-purple">${price}</span>
    </div>
  );
}
