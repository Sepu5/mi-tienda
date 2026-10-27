// Reglas de validación de los formularios (iniciar sesión, crear cuenta, contacto y compra).
// Cada función devuelve un objeto de errores: { campo: "mensaje" }.
// Si el objeto está vacío, el formulario es válido.

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validarCorreo(correo) {
  if (!correo.trim()) return "Debes escribir tu correo.";
  if (!REGEX_CORREO.test(correo.trim())) return "El correo no tiene un formato válido.";
  return "";
}

function validarContrasena(contrasena) {
  if (!contrasena) return "Debes escribir tu contraseña.";
  if (contrasena.length < 4 || contrasena.length > 10) {
    return "La contraseña debe tener entre 4 y 10 caracteres.";
  }
  return "";
}

function limpiar(errores) {
  // Deja solo los campos que realmente tienen un mensaje
  return Object.fromEntries(Object.entries(errores).filter(([, mensaje]) => mensaje));
}

export function validarLogin({ correo, contrasena }) {
  return limpiar({
    correo: validarCorreo(correo),
    contrasena: !contrasena ? "Debes escribir tu contraseña." : "",
  });
}

export function validarRegistro({ nombre, correo, contrasena, confirmar, region, comuna }) {
  return limpiar({
    nombre: !nombre.trim()
      ? "Debes escribir tu nombre."
      : nombre.trim().length < 3
        ? "El nombre debe tener al menos 3 caracteres."
        : "",
    correo: validarCorreo(correo),
    contrasena: validarContrasena(contrasena),
    confirmar: !confirmar
      ? "Debes confirmar tu contraseña."
      : confirmar !== contrasena
        ? "Las contraseñas no coinciden."
        : "",
    region: !region ? "Selecciona una región." : "",
    comuna: !comuna ? "Selecciona una comuna." : "",
  });
}

// Valida un texto obligatorio con largo mínimo (y máximo opcional).
function validarTexto(valor, etiqueta, min, max) {
  const texto = valor.trim();
  if (!texto) return `Debes escribir ${etiqueta}.`;
  if (texto.length < min) return `${etiqueta[0].toUpperCase()}${etiqueta.slice(1)} debe tener al menos ${min} caracteres.`;
  if (max && texto.length > max) return `${etiqueta[0].toUpperCase()}${etiqueta.slice(1)} no puede superar los ${max} caracteres.`;
  return "";
}

export function validarContacto({ nombre, correo, mensaje }) {
  return limpiar({
    nombre: validarTexto(nombre, "tu nombre", 3),
    correo: validarCorreo(correo),
    mensaje: validarTexto(mensaje, "tu mensaje", 10, 500),
  });
}

export function validarCompra({
  nombre,
  apellidos,
  correo,
  calle,
  departamento,
  region,
  comuna,
  indicaciones,
}) {
  return limpiar({
    nombre: validarTexto(nombre, "tu nombre", 2),
    // "Apellidos" es plural, por eso el mensaje de largo se escribe aparte
    apellidos: !apellidos.trim()
      ? "Debes escribir tus apellidos."
      : apellidos.trim().length < 2
        ? "Los apellidos deben tener al menos 2 caracteres."
        : "",
    correo: validarCorreo(correo),
    calle: validarTexto(calle, "la calle", 5),
    // Opcionales: solo se revisa el largo máximo
    departamento: departamento.trim().length > 10 ? "El departamento no puede superar los 10 caracteres." : "",
    region: !region ? "Selecciona una región." : "",
    comuna: !comuna ? "Selecciona una comuna." : "",
    indicaciones: indicaciones.trim().length > 200 ? "Las indicaciones no pueden superar los 200 caracteres." : "",
  });
}
