"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

type LoginData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [form, setForm] = useState<LoginData>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginData, string>>>({});
  const [generalError, setGeneralError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const auth = useAuth();

  function validate(): boolean {
    const e: Partial<Record<keyof LoginData, string>> = {};

    if (!form.email.trim()) e.email = "El email es requerido.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Formato de email inválido.";

    if (!form.password) e.password = "La contraseña es requerida.";
    else if (form.password.length < 6) e.password = "Debe tener mínimo 6 caracteres.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
    setGeneralError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setGeneralError("");

    try {
      const res = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok  || !data.login) {
        throw new Error("credenciales inválidas");
      }

      auth.login(data.token, data.user);

      router.push("/dashboard");

    } catch {
      setGeneralError("Email o contraseña incorrectos.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white/5 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Iniciar sesión</h2>

      {generalError && <p className="text-red-300 text-sm mb-3">{generalError}</p>}

      <label className="block mb-3">
        <span className="text-sm">Email</span>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 rounded-md bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink"
        />
        {errors.email && <p className="text-xs text-red-300 mt-1">{errors.email}</p>}
      </label>

      <label className="block mb-4">
        <span className="text-sm">Contraseña</span>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 rounded-md bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink"
        />
        {errors.password && <p className="text-xs text-red-300 mt-1">{errors.password}</p>}
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-color-pink text-color-bg-dark py-2 rounded-md font-medium disabled:opacity-60"
      >
        {submitting ? "Enviando..." : "Entrar"}
      </button>

      <p className="text-sm text-center mt-4">
        ¿No tenés cuenta?{" "}
        <Link href="/register" className="text-pink underline">
          Registrate acá
        </Link>
      </p>
    </form>
  );
}
