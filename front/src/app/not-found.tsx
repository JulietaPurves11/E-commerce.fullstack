import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>404 - Página no encontrada</h1>
      <p>La ruta que intentas visitar no existe.</p>
      <Link href="/">Volver al inicio</Link>
    </main>
  );
}
