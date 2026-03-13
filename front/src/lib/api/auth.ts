const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface User {
  id: number;
  email: string;
  name: string;
  address: string;
  phone: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  login: boolean;
  token: string;
  user: User;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok || !data.login) {
    throw new Error("Credenciales inválidas");
  }

  return data as LoginResponse;
}

export async function registerUser(payload: RegisterPayload): Promise<void> {
  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Error al registrarse. Intenta nuevamente.");
  }
}
