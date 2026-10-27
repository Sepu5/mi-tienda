// Pruebas del componente RegistroForm (formulario de crear cuenta).
// Reglas que se prueban:
// - La comuna está deshabilitada mientras no se elija una región.
// - Al elegir una región, la comuna se habilita y muestra las comunas de esa región.
// - Si las contraseñas son distintas se muestra "Las contraseñas no coinciden."
// - Enviar vacío muestra los errores de los campos obligatorios.
// - Con todos los datos válidos se muestra el mensaje de éxito.
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import RegistroForm from "../src/components/auth/RegistroForm.jsx";

function escribir(etiqueta, valor) {
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
}

QUnit.module("TestRegistroForm", function (hooks) {
    hooks.afterEach(function () {
        cleanup();
        localStorage.clear();
    });

    QUnit.test("La comuna está deshabilitada sin región", function (assert) {
        render(<RegistroForm />);
        const comuna = screen.getByLabelText("Comuna");
        assert.ok(comuna.disabled);
    });

    QUnit.test("La comuna se habilita al elegir una región", function (assert) {
        render(<RegistroForm />);
        escribir("Región", "metropolitana");
        const comuna = screen.getByLabelText("Comuna");
        assert.notOk(comuna.disabled);
        assert.ok(screen.queryByRole("option", { name: "Maipú" }));
    });

    QUnit.test("Las contraseñas distintas muestran el error", function (assert) {
        render(<RegistroForm />);
        escribir("Contraseña", "abcd1234");
        escribir("Confirmar contraseña", "otraClave");
        fireEvent.click(screen.getByRole("button", { name: "Crear cuenta" }));
        const mensaje = screen.queryByText("Las contraseñas no coinciden.");
        assert.ok(mensaje);
    });

    QUnit.test("Enviar vacío muestra los errores obligatorios", function (assert) {
        render(<RegistroForm />);
        fireEvent.click(screen.getByRole("button", { name: "Crear cuenta" }));
        assert.ok(screen.queryByText("Debes escribir tu nombre."));
        assert.ok(screen.queryByText("Debes escribir tu correo."));
        assert.ok(screen.queryByText("Selecciona una región."));
        assert.notOk(screen.queryByText(/Registro simulado/));
    });

    QUnit.test("Con datos válidos muestra el mensaje de éxito", function (assert) {
        render(<RegistroForm />);
        escribir("Nombre completo", "Franco Sepúlveda");
        escribir("Correo electrónico", "franco@correo.cl");
        escribir("Contraseña", "abcd1234");
        escribir("Confirmar contraseña", "abcd1234");
        escribir("Región", "metropolitana");
        escribir("Comuna", "Maipú");
        fireEvent.click(screen.getByRole("button", { name: "Crear cuenta" }));
        const mensaje = screen.queryByText(/Registro simulado correctamente/);
        assert.ok(mensaje);
    });
});
