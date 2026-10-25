"use client";

import { useState } from "react";
import Link from "next/link";
import Campo from "@/components/auth/Campo";
import { zonas } from "@/data/zonas";
import { validarRegistro } from "@/lib/validaciones";

const INICIAL = {
  nombre: "",
  correo: "",
  contrasena: "",
  confirmar: "",
  region: "",
  comuna: "",
};

export default function RegistroForm() {
  const [valores, setValores] = useState(INICIAL);
  const [tocados, setTocados] = useState({});
  const [intentoEnvio, setIntentoEnvio] = useState(false);
  const [exito, setExito] = useState(false);

  const errores = validarRegistro(valores);

  // Comunas de la región elegida (vacío si aún no se elige región)
  const comunas = zonas.find((z) => z.id === valores.region)?.comunas ?? [];

  function handleChange(e) {
    const { name, value } = e.target;
    setValores((prev) => ({
      ...prev,
      [name]: value,
      // Al cambiar de región, la comuna anterior ya no es válida
      ...(name === "region" ? { comuna: "" } : {}),
    }));
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
          Datos válidos. Registro simulado correctamente.
        </div>
      )}

      <Campo
        id="nombre"
        label="Nombre completo"
        placeholder="Ejemplo: Franco Sepúlveda"
        autoComplete="name"
        value={valores.nombre}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errores.nombre}
        tocado={mostrar("nombre")}
      />

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

      <div className="row">
        <div className="col-md-6">
          <Campo
            id="contrasena"
            label="Contraseña"
            type="password"
            placeholder="Entre 4 y 10 caracteres"
            autoComplete="new-password"
            value={valores.contrasena}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errores.contrasena}
            tocado={mostrar("contrasena")}
          />
        </div>
        <div className="col-md-6">
          <Campo
            id="confirmar"
            label="Confirmar contraseña"
            type="password"
            autoComplete="new-password"
            value={valores.confirmar}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errores.confirmar}
            tocado={mostrar("confirmar")}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Campo
            id="region"
            label="Región"
            type="select"
            value={valores.region}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errores.region}
            tocado={mostrar("region")}
          >
            <option value="">Selecciona una región</option>
            {zonas.map((z) => (
              <option key={z.id} value={z.id}>
                {z.nombre}
              </option>
            ))}
          </Campo>
        </div>
        <div className="col-md-6">
          <Campo
            id="comuna"
            label="Comuna"
            type="select"
            value={valores.comuna}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errores.comuna}
            tocado={mostrar("comuna")}
            disabled={!valores.region}
          >
            <option value="">
              {valores.region ? "Selecciona una comuna" : "Primero elige una región"}
            </option>
            {comunas.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Campo>
        </div>
      </div>

      <div className="d-grid gap-2 mt-4">
        <button type="submit" className="btn btn-primary">
          Crear cuenta
        </button>
        <Link href="/iniciar-sesion" className="btn btn-outline-secondary">
          Ya tengo una cuenta
        </Link>
      </div>
    </form>
  );
}