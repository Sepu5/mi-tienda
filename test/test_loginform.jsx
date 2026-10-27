// Pruebas del componente LoginForm (formulario de iniciar sesión).
// Reglas que se prueban:
// - Si se envía vacío, se muestran los errores de correo y contraseña.
// - Si se escribe un correo sin formato válido, se muestra el error de formato.
// - Con datos válidos se muestra el mensaje de éxito y no hay errores.
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import LoginForm from "../src/components/auth/LoginForm.jsx";

QUnit.module("TestLoginForm", function (hooks) {
    hooks.afterEach(function () {
        cleanup();
        localStorage.clear();
    });

    QUnit.test("Enviar vacío muestra los errores", function (assert) {
        render(<LoginForm />);
        fireEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));
        assert.ok(screen.queryByText("Debes escribir tu correo."));
        assert.ok(screen.queryByText("Debes escribir tu contraseña."));
        assert.notOk(screen.queryByText(/Inicio de sesión simulado/));
    });

    QUnit.test("Un correo sin formato válido muestra el error de formato", function (assert) {
        render(<LoginForm />);
        fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "franco" } });
        fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "1234" } });
        fireEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));
        assert.ok(screen.queryByText("El correo no tiene un formato válido."));
    });

    QUnit.test("Con datos válidos muestra el mensaje de éxito", function (assert) {
        render(<LoginForm />);
        fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "franco@correo.cl" } });
        fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "1234" } });
        fireEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));
        const mensaje = screen.queryByText(/Inicio de sesión simulado correctamente/);
        assert.ok(mensaje);
        assert.notOk(screen.queryByText("Debes escribir tu correo."));
    });
});
