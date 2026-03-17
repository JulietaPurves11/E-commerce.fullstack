"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/components/ProductCard";
import { IProduct } from "@/interfaces/IProduct";

type CategoryFilter =
  | "todas"
  | "celulares"
  | "notebooks"
  | "auriculares"
  | "tablets"
  | "relojes"
  | "otros";

const categories: { label: string; value: CategoryFilter }[] = [
  { label: "Todas", value: "todas" },
  { label: "Celulares", value: "celulares" },
  { label: "Notebooks", value: "notebooks" },
  { label: "Auriculares", value: "auriculares" },
  { label: "Tablets", value: "tablets" },
  { label: "Relojes", value: "relojes" },
  { label: "Otros", value: "otros" },
];

function mapCategory(product: IProduct): CategoryFilter {
  switch (product.categoryId) {
    case 1:
      return "celulares";
    case 2:
      return "notebooks";
    case 3:
      return "tablets";
    case 4:
      return "relojes";
    case 5:
      return "auriculares";
    default:
      return "otros";
  }
}

export default function ProductsCatalog({ products }: { products: IProduct[] }) {
  const searchParams = useSearchParams();
  const qFromUrl = (searchParams.get("q") || "").trim();

  const search = qFromUrl;
  const [category, setCategory] = useState<CategoryFilter>("todas");

  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase();

    return products.filter((product) => {
      const byName = product.name.toLowerCase().includes(term);
      const byCategory =
        category === "todas" ? true : mapCategory(product) === category;

      return byName && byCategory;
    });
  }, [products, search, category]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as CategoryFilter)}
          className="w-full md:w-64 rounded-md border border-rose/30 px-3 py-2 bg-white"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-bg-dark/70">No se encontraron productos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              categoryId={product.categoryId}
            />
          ))}
        </div>
      )}
    </>
  );
}