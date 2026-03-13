"use client";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { IProduct } from "@/interfaces/IProduct";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

export default function AddToCartButton({ product }: { product: IProduct }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [successMessage, setSuccessMessage] = useState("");

  const handleClick = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    try {
      addToCart(product);
      setSuccessMessage("Producto agregado correctamente");

      setTimeout(() => setSuccessMessage(""), 3000);
      
    } catch (err) {
      console.error("Error al agregar al carrito", err);
      alert("No se pudo agregar el producto al carrito.");
    }
  };

  return (
    <div>
      <Button onClick={handleClick} variant="secondary" fullWidth>
        Agregar al carrito
      </Button>

      {successMessage && (
        <Badge variant="primary">{successMessage}</Badge>
      )}
    </div>
  );  
}
