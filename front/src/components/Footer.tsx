import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-purple text-cream py-8 mt-12 border-t border-rose/20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-6">
        <div className="text-lg font-semibold tracking-wide">TechStore © 2025</div>

        <div className="flex gap-6 text-sm">
          <Link href="/about" className="hover:text-pink transition-all">Sobre Nosotros</Link>
          <Link href="/privacy" className="hover:text-pink transition-all">Privacidad</Link>
          <Link href="/contact" className="hover:text-pink transition-all">Contacto</Link>
        </div>
      </div>
    </footer>
  );
}

