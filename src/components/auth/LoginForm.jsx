"use client";

import { useState } from "react";
import Link from "next/link";
import Campo from "@/components/auth/Campo";
import { validarLogin } from "@/lib/validaciones";

const INICIAL = { correo: "", contrasena: "" };

export default function LoginForm() {
  // Componente controlado: cada input toma su valor del estado
  const [valores, setValores] = useState(INICIAL);
  const [tocados, setTocados] = useState({});
  const [intentoEnvio, setIntentoEnvio] = useState(false);
  const [exito, setExito] = useState(false);

  // Los errores se calculan a partir de los valores en cada render
  const errores = validarLogin(valores);

  function handleChange(e) {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
    setExito(false);
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTocados((prev) => ({ ...prev, [name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIntentoEnvio(true);
    if (Object.keys(errores).length > 0) return; // no deja enviar datos inválidos

    // Aquí irá la llamada real a la API en una tarea posterior
    setExito(true);
    setValores(INICIAL);
    setTocados({});
    setIntentoEnvio(false);
  }

  const mostrar = (campo) => tocados[campo] || intentoEnvio;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {exito && (
        <div className="alert alert-success" role="alert">
          Datos válidos. Inicio de sesión simulado correctamente.
        </div>
      )}

      <Campo
        id="correo"
        label="Correo electrónico"
        type="email"
        placeholder="correo@ejemplo.com"
        autoComplete="email"
        value={valores.correo}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errores.correo}
        tocado={mostrar("correo")}
      />

      <Campo
        id="contrasena"
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        value={valores.contrasena}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errores.contrasena}
        tocado={mostrar("contrasena")}
      />

      <div className="d-grid gap-2 mt-4">
        <button type="submit" className="btn btn-primary">
          Iniciar sesión
        </button>
        <Link href="/crear-sesion" className="btn btn-outline-secondary">
          Crear una cuenta
        </Link>
      </div>
    </form>
  );
}