"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api/auth";

type RegisterData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  address: string;
  phone: string;
};

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegisterData, string>>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  function validate(): boolean {
    const e: Partial<Record<keyof RegisterData, string>> = {};

    if (!form.name.trim()) e.name = "El nombre es requerido.";
    if (!form.email.trim()) e.email = "El email es requerido.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Formato inválido.";

    if (!form.password) e.password = "La contraseña es requerida.";
    else if (form.password.length < 6) e.password = "Debe tener al menos 6 caracteres.";

    if (form.password !== form.passwordConfirm)
      e.passwordConfirm = "Las contraseñas no coinciden.";

    if (!form.address.trim()) e.address = "La dirección es requerida.";

    if (!form.phone.trim()) e.phone = "El teléfono es requerido.";
    else if (!/^\d{6,15}$/.test(form.phone)) e.phone = "Debe tener entre 6 y 15 dígitos.";

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
    setSuccessMsg("");

    try {
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        address: form.address,
        phone: form.phone,
      });

      setSuccessMsg("Registro exitoso. Redirigiendo...");
      setTimeout(() => router.push("/login"), 1500);

    } catch {
      setGeneralError("No se pudo conectar al servidor.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white/5 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Registro</h2>

      {generalError && <p className="text-red-300 text-sm mb-3">{generalError}</p>}
      {successMsg && <p className="text-green-300 text-sm mb-3">{successMsg}</p>}

      <label className="block mb-3">
        <span className="text-sm">Nombre</span>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 rounded-md bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <p id="name-error" className="text-xs text-red-300 mt-1">{errors.name}</p>}
      </label>

      <label className="block mb-3">
        <span className="text-sm">Email</span>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 rounded-md bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <p id="email-error" className="text-xs text-red-300 mt-1">{errors.email}</p>}
      </label>

      <label className="block mb-3">
        <span className="text-sm">Dirección</span>
        <input
          name="address"
          type="text"
          value={form.address}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 rounded-md bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink"
          aria-invalid={!!errors.address}
          aria-describedby={errors.address ? "address-error" : undefined}
        />
        {errors.address && <p id="address-error" className="text-xs text-red-300 mt-1">{errors.address}</p>}
      </label>

      <label className="block mb-3">
        <span className="text-sm">Teléfono</span>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 rounded-md bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && <p id="phone-error" className="text-xs text-red-300 mt-1">{errors.phone}</p>}
      </label>

      <label className="block mb-3">
        <span className="text-sm">Contraseña</span>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 rounded-md bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && <p id="password-error" className="text-xs text-red-300 mt-1">{errors.password}</p>}
      </label>

      <label className="block mb-4">
        <span className="text-sm">Confirmar contraseña</span>
        <input
          name="passwordConfirm"
          type="password"
          value={form.passwordConfirm}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 rounded-md bg-white/10 focus:outline-none focus:ring-2 focus:ring-pink"
          aria-invalid={!!errors.passwordConfirm}
          aria-describedby={errors.passwordConfirm ? "passwordConfirm-error" : undefined}
        />
        {errors.passwordConfirm && <p id="passwordConfirm-error" className="text-xs text-red-300 mt-1">{errors.passwordConfirm}</p>}
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-pink text-bg-dark py-2 rounded-md font-medium disabled:opacity-60"
      >
        {submitting ? "Enviando..." : "Registrarse"}
      </button>
    </form>
  );
}
