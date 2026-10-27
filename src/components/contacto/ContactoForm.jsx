"use client";

import { useState } from "react";
import Campo from "@/components/auth/Campo";
import { validarContacto } from "@/lib/validaciones";

const INICIAL = { nombre: "", correo: "", mensaje: "" };

export default function ContactoForm() {
  const [valores, setValores] = useState(INICIAL);
  const [tocados, setTocados] = useState({});
  const [intentoEnvio, setIntentoEnvio] = useState(false);
  // Nombre de quien envió el mensaje (null = aún no se envía nada)
  const [enviadoPor, setEnviadoPor] = useState(null);

  const errores = validarContacto(valores);

  function handleChange(e) {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
    setEnviadoPor(null);
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTocados((prev) => ({ ...prev, [name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIntentoEnvio(true);
    if (Object.keys(errores).length > 0) return;

    setEnviadoPor(valores.nombre.trim());
    setValores(INICIAL);
    setTocados({});
    setIntentoEnvio(false);
  }

  const mostrar = (campo) => tocados[campo] || intentoEnvio;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {enviadoPor && (
        <div className="alert alert-success" role="alert">
          ¡Gracias {enviadoPor}! Recibimos tu mensaje y te responderemos pronto.
        </div>
      )}

      <Campo
        id="nombre"
        label="Nombre"
        autoComplete="name"
        value={valores.nombre}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errores.nombre}
        tocado={mostrar("nombre")}
      />

      <Campo
        id="correo"
        label="Email"
        type="email"
        autoComplete="email"
        value={valores.correo}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errores.correo}
        tocado={mostrar("correo")}
      />

      <Campo
        id="mensaje"
        label="Mensaje"
        type="textarea"
        rows={4}
        placeholder="Tu mensaje"
        value={valores.mensaje}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errores.mensaje}
        tocado={mostrar("mensaje")}
      />

      <button type="submit" className="btn btn-primary">
        Enviar
      </button>
    </form>
  );
}
