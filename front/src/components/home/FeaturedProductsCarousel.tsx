import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { IProduct } from "@/interfaces/IProduct";

export default function FeaturedProductsCarousel({
  products,
}: {
  products: IProduct[];
}) {
  return (
    <section className="w-full">
      <SectionHeader
        title="Productos destacados"
        subtitle="Una selección para empezar"
      />

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-4 snap-x snap-mandatory">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[280px] sm:min-w-[320px] lg:min-w-[360px] snap-start"
            >
              <ProductCard
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}