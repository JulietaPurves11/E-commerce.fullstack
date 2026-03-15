import HeroCarousel from "@/components/home/HeroCarousel";
import FeaturedProductsCarousel from "@/components/home/FeaturedProductsCarousel";
import { getProducts } from "@/lib/api/products";

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 6);

  return (
    <main className="bg-cream text-bg-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12">
        <HeroCarousel />
        <FeaturedProductsCarousel products={featuredProducts} />
      </div>
    </main>
  );
}
