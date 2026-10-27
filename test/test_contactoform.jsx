// Pruebas del componente ContactoForm (formulario de contacto).
// Reglas que se prueban:
// - Si se envía vacío, se muestran los errores de nombre, correo y mensaje.
// - Si el mensaje es muy corto, se muestra el error de largo mínimo.
// - Con datos válidos se muestra el agradecimiento con el nombre de quien escribió.
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ContactoForm from "../src/components/contacto/ContactoForm.jsx";

function escribir(etiqueta, valor) {
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
}

QUnit.module("TestContactoForm", function (hooks) {
    hooks.afterEach(function () {
        cleanup();
        localStorage.clear();
    });

    QUnit.test("Enviar vacío muestra los errores", function (assert) {
        render(<ContactoForm />);
        fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
        assert.ok(screen.queryByText("Debes escribir tu nombre."));
        assert.ok(screen.queryByText("Debes escribir tu correo."));
        assert.ok(screen.queryByText("Debes escribir tu mensaje."));
        assert.notOk(screen.queryByText(/Recibimos tu mensaje/));
    });

    QUnit.test("Un mensaje muy corto muestra el error de largo", function (assert) {
        render(<ContactoForm />);
        escribir("Nombre", "Franco");
        escribir("Email", "franco@correo.cl");
        escribir("Mensaje", "Hola");
        fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
        const mensaje = screen.queryByText("Tu mensaje debe tener al menos 10 caracteres.");
        assert.ok(mensaje);
    });

    QUnit.test("Con datos válidos muestra el agradecimiento con el nombre", function (assert) {
        render(<ContactoForm />);
        escribir("Nombre", "Franco");
        escribir("Email", "franco@correo.cl");
        escribir("Mensaje", "Hola, quiero consultar por un juego.");
        fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
        const agradecimiento = screen.queryByText(/¡Gracias Franco! Recibimos tu mensaje/);
        assert.ok(agradecimiento);
    });
});
