"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type HeroSlide = {
  src: string;
  title: string;
  subtitle: string;
};

const slides: HeroSlide[] = [
  {
    src: "/hero/hero-1.jpg",
    title: "Tecnología que mejora tu día",
    subtitle: "Descubrí productos modernos, prácticos y al mejor precio.",
  },
  {
    src: "/hero/hero-2.jpg",
    title: "Comprá fácil y rápido",
    subtitle: "Envíos a todo el país y una experiencia simple.",
  },
  {
    src: "/hero/hero-3.jpg",
    title: "Tu próxima compra está acá",
    subtitle: "Elegí entre nuestros productos destacados.",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full min-h-[65vh] md:min-h-[75vh] overflow-hidden rounded-2xl">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
      ))}

      <div className="relative z-10 h-full min-h-[65vh] md:min-h-[75vh] flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-cream leading-tight mb-4">
              {slides[current].title}
            </h1>
            <p className="text-base md:text-lg text-cream/90 mb-6">
              {slides[current].subtitle}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center rounded-md bg-pink text-bg-dark px-6 py-3 font-semibold hover:bg-cream transition-colors"
            >
              Ver productos
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`h-2.5 w-2.5 rounded-full ${
              index === current ? "bg-cream" : "bg-cream/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}