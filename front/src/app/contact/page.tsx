export default function ContactPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl font-bold mb-6 text-color-rose">Contacto</h1>
      <p className="text-lg text-color-cream/80 leading-relaxed mb-4">
        Si tenés dudas o consultas, podés comunicarte con nosotros por los siguientes medios:
      </p>
      <ul className="space-y-3 text-color-cream/90">
        <li>📧 Email: <a href="mailto:info@techstore.com" className="text-color-pink hover:underline">info@techstore.com</a></li>
        <li>📞 Teléfono: +54 11 1234-5678</li>
        <li>📍 Dirección: Calle Falsa 123, Buenos Aires</li>
      </ul>
    </section>
  );
}
