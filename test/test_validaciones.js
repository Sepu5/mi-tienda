// Pruebas de las validaciones de los formularios (src/lib/validaciones.js).
// Cada función devuelve un objeto de errores { campo: "mensaje" }.
// Reglas que se prueban:
// - Si el formulario es válido, el objeto de errores queda vacío ({}).
// - Login: correo con formato válido y contraseña obligatoria.
// - Registro: nombre mínimo 3, correo válido, contraseña de 4 a 10 caracteres,
//   contraseñas iguales, región y comuna obligatorias.
// - Contacto: nombre mínimo 3, correo válido, mensaje de 10 a 500 caracteres.
// - Compra: nombre, apellidos, correo, calle, región y comuna obligatorios;
//   departamento máximo 10 caracteres e indicaciones máximo 200.
import {
  validarLogin,
  validarRegistro,
  validarContacto,
  validarCompra,
} from "../src/lib/validaciones.js";

QUnit.module("TestValidarLogin", function () {

    QUnit.test("Login válido no tiene errores", function (assert) {
        const datos = { correo: "franco@correo.cl", contrasena: "1234" };
        const resultado = validarLogin(datos);
        const resultadoEsperado = {};
        assert.deepEqual(resultado, resultadoEsperado);
    });

    QUnit.test("Login vacío pide correo y contraseña", function (assert) {
        const datos = { correo: "", contrasena: "" };
        const resultado = validarLogin(datos);
        const resultadoEsperado = {
            correo: "Debes escribir tu correo.",
            contrasena: "Debes escribir tu contraseña.",
        };
        assert.deepEqual(resultado, resultadoEsperado);
    });

    QUnit.test("Login con correo sin formato válido", function (assert) {
        const datos = { correo: "franco@correo", contrasena: "1234" };
        const resultado = validarLogin(datos);
        const resultadoEsperado = { correo: "El correo no tiene un formato válido." };
        assert.deepEqual(resultado, resultadoEsperado);
    });
});

QUnit.module("TestValidarRegistro", function () {
    const registroValido = {
        nombre: "Franco Sepúlveda",
        correo: "franco@correo.cl",
        contrasena: "abcd1234",
        confirmar: "abcd1234",
        region: "metropolitana",
        comuna: "Maipú",
    };

    QUnit.test("Registro válido no tiene errores", function (assert) {
        const resultado = validarRegistro(registroValido);
        const resultadoEsperado = {};
        assert.deepEqual(resultado, resultadoEsperado);
    });

    QUnit.test("Registro vacío muestra todos los errores", function (assert) {
        const datos = { nombre: "", correo: "", contrasena: "", confirmar: "", region: "", comuna: "" };
        const resultado = validarRegistro(datos);
        const resultadoEsperado = {
            nombre: "Debes escribir tu nombre.",
            correo: "Debes escribir tu correo.",
            contrasena: "Debes escribir tu contraseña.",
            confirmar: "Debes confirmar tu contraseña.",
            region: "Selecciona una región.",
            comuna: "Selecciona una comuna.",
        };
        assert.deepEqual(resultado, resultadoEsperado);
    });

    QUnit.test("Registro con nombre muy corto", function (assert) {
        const datos = { ...registroValido, nombre: "Fr" };
        const resultado = validarRegistro(datos);
        const mensajeEsperado = "El nombre debe tener al menos 3 caracteres.";
        assert.equal(resultado.nombre, mensajeEsperado);
    });

    QUnit.test("Registro con correo malo", function (assert) {
        const datos = { ...registroValido, correo: "franco.correo.cl" };
        const resultado = validarRegistro(datos);
        const mensajeEsperado = "El correo no tiene un formato válido.";
        assert.equal(resultado.correo, mensajeEsperado);
    });

    QUnit.test("Registro con contraseña de menos de 4 caracteres", function (assert) {
        const datos = { ...registroValido, contrasena: "abc", confirmar: "abc" };
        const resultado = validarRegistro(datos);
        const mensajeEsperado = "La contraseña debe tener entre 4 y 10 caracteres.";
        assert.equal(resultado.contrasena, mensajeEsperado);
    });

    QUnit.test("Registro con contraseña de más de 10 caracteres", function (assert) {
        const datos = { ...registroValido, contrasena: "12345678901", confirmar: "12345678901" };
        const resultado = validarRegistro(datos);
        const mensajeEsperado = "La contraseña debe tener entre 4 y 10 caracteres.";
        assert.equal(resultado.contrasena, mensajeEsperado);
    });

    QUnit.test("Registro con contraseña de exactamente 4 y 10 caracteres es válida", function (assert) {
        const datosCuatro = { ...registroValido, contrasena: "1234", confirmar: "1234" };
        const datosDiez = { ...registroValido, contrasena: "1234567890", confirmar: "1234567890" };
        const resultadoCuatro = validarRegistro(datosCuatro);
        const resultadoDiez = validarRegistro(datosDiez);
        const resultadoEsperado = {};
        assert.deepEqual(resultadoCuatro, resultadoEsperado);
        assert.deepEqual(resultadoDiez, resultadoEsperado);
    });

    QUnit.test("Registro con contraseñas distintas", function (assert) {
        const datos = { ...registroValido, confirmar: "otraClave" };
        const resultado = validarRegistro(datos);
        const mensajeEsperado = "Las contraseñas no coinciden.";
        assert.equal(resultado.confirmar, mensajeEsperado);
    });

    QUnit.test("Registro sin región ni comuna", function (assert) {
        const datos = { ...registroValido, region: "", comuna: "" };
        const resultado = validarRegistro(datos);
        const resultadoEsperado = {
            region: "Selecciona una región.",
            comuna: "Selecciona una comuna.",
        };
        assert.deepEqual(resultado, resultadoEsperado);
    });
});

QUnit.module("TestValidarContacto", function () {
    const contactoValido = {
        nombre: "Franco",
        correo: "franco@correo.cl",
        mensaje: "Hola, quiero consultar por un juego.",
    };

    QUnit.test("Contacto válido no tiene errores", function (assert) {
        const resultado = validarContacto(contactoValido);
        const resultadoEsperado = {};
        assert.deepEqual(resultado, resultadoEsperado);
    });

    QUnit.test("Contacto vacío muestra todos los errores", function (assert) {
        const datos = { nombre: "", correo: "", mensaje: "" };
        const resultado = validarContacto(datos);
        const resultadoEsperado = {
            nombre: "Debes escribir tu nombre.",
            correo: "Debes escribir tu correo.",
            mensaje: "Debes escribir tu mensaje.",
        };
        assert.deepEqual(resultado, resultadoEsperado);
    });

    QUnit.test("Contacto con mensaje muy corto", function (assert) {
        const datos = { ...contactoValido, mensaje: "Hola" };
        const resultado = validarContacto(datos);
        const mensajeEsperado = "Tu mensaje debe tener al menos 10 caracteres.";
        assert.equal(resultado.mensaje, mensajeEsperado);
    });

    QUnit.test("Contacto con mensaje muy largo", function (assert) {
        const datos = { ...contactoValido, mensaje: "a".repeat(501) };
        const resultado = validarContacto(datos);
        const mensajeEsperado = "Tu mensaje no puede superar los 500 caracteres.";
        assert.equal(resultado.mensaje, mensajeEsperado);
    });
});

QUnit.module("TestValidarCompra", function () {
    const compraValida = {
        nombre: "Franco",
        apellidos: "Sepúlveda Romero",
        correo: "franco@correo.cl",
        calle: "Av. Pajaritos 1234",
        departamento: "",
        region: "metropolitana",
        comuna: "Maipú",
        indicaciones: "",
    };

    QUnit.test("Compra válida no tiene errores", function (assert) {
        const resultado = validarCompra(compraValida);
        const resultadoEsperado = {};
        assert.deepEqual(resultado, resultadoEsperado);
    });

    QUnit.test("Compra con campos obligatorios vacíos", function (assert) {
        const datos = {
            nombre: "", apellidos: "", correo: "", calle: "",
            departamento: "", region: "", comuna: "", indicaciones: "",
        };
        const resultado = validarCompra(datos);
        const resultadoEsperado = {
            nombre: "Debes escribir tu nombre.",
            apellidos: "Debes escribir tus apellidos.",
            correo: "Debes escribir tu correo.",
            calle: "Debes escribir la calle.",
            region: "Selecciona una región.",
            comuna: "Selecciona una comuna.",
        };
        assert.deepEqual(resultado, resultadoEsperado);
    });

    QUnit.test("Compra con calle muy corta", function (assert) {
        const datos = { ...compraValida, calle: "Av 1" };
        const resultado = validarCompra(datos);
        const mensajeEsperado = "La calle debe tener al menos 5 caracteres.";
        assert.equal(resultado.calle, mensajeEsperado);
    });

    QUnit.test("Compra con departamento de más de 10 caracteres", function (assert) {
        const datos = { ...compraValida, departamento: "Depto 12345X" };
        const resultado = validarCompra(datos);
        const mensajeEsperado = "El departamento no puede superar los 10 caracteres.";
        assert.equal(resultado.departamento, mensajeEsperado);
    });

    QUnit.test("Compra con departamento de exactamente 10 caracteres es válida", function (assert) {
        const datos = { ...compraValida, departamento: "1234567890" };
        const resultado = validarCompra(datos);
        const resultadoEsperado = {};
        assert.deepEqual(resultado, resultadoEsperado);
    });

    QUnit.test("Compra con indicaciones de más de 200 caracteres", function (assert) {
        const datos = { ...compraValida, indicaciones: "a".repeat(201) };
        const resultado = validarCompra(datos);
        const mensajeEsperado = "Las indicaciones no pueden superar los 200 caracteres.";
        assert.equal(resultado.indicaciones, mensajeEsperado);
    });
});
