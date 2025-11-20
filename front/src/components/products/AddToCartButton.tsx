"use client";

import { useCart } from "@/context/CartContext";
import { IProduct } from "@/interfaces/IProduct";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: IProduct }) {
  const { addToCart } = useCart();
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleClick = async () => {
    try {
      await addToCart(product);
      setSuccessMessage("Producto agregado correctamente");

      setTimeout(() => setSuccessMessage(""), 3000);
      
    } catch (err) {
      console.error("Error al agregar al carrito", err);
      alert("No se pudo agregar el producto al carrito.");
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="w-full bg-purple hover:bg-purple/80 text-cream font-bold py-3 px-6 rounded"
      >
        Agregar al carrito
      </button>
      {successMessage && (
        <p className="text-green-600 mt-2 text-sm">{successMessage}</p>
      )}
    </div>
  );  
}
