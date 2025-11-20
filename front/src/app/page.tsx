import Link from "next/link";

export default function Landing() {
  return (
    <section className="relative bg-linear-to-r from-purple to-rose text-cream min-h-[70vh] flex items-center overflow-hidden">

      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-bg-dark opacity-40"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">

        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            La mejor tecnología <br /> al alcance de tu mano
          </h1>
          <p className="text-lg mb-6 text-pink">
            Productos innovadores, precios increíbles y envío a todo el país.
          </p>
          <Link href="/products" className="bg-pink text-bg-dark px-6 py-3 rounded-md font-semibold hover:bg-cream hover:text-purple transition-all shadow-md">
            Ver productos
          </Link>
        </div>

        <div className="flex-1">
          <div className="w-full h-64 bg-color-rose rounded-lg shadow-inner" />
        </div>
      </div>
    </section>
  );
}
