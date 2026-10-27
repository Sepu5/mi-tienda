// Pruebas del componente FilaCarrito (una fila de la tabla del carrito).
// Reglas que se prueban:
// - El botón "-" está deshabilitado cuando la cantidad es 1.
// - El botón "+" está deshabilitado cuando la cantidad llega al stock.
// - Los productos gratis no muestran los botones + y -.
// - Muestra el subtotal (precio por cantidad).
// - Al hacer clic en "Eliminar" se llama a onEliminar con el item.
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import FilaCarrito from "../src/components/carrito/FilaCarrito.jsx";

const zelda = { id: 1, imagen: "x.png", nombre: "The Legend of Zelda", precio_nuevo: 5999, stock: 19, cantidad: 1 };
const fortnite = { id: 4, imagen: "x.png", nombre: "Fortnite", precio_nuevo: 0, stock: 10, cantidad: 1 };

// Dibuja la fila dentro de una tabla (si no, React se queja del HTML)
function dibujar(item, onCambiar = function () {}, onEliminar = function () {}) {
  return render(
    <table>
      <tbody>
        <FilaCarrito item={item} onCambiar={onCambiar} onEliminar={onEliminar} />
      </tbody>
    </table>
  );
}

QUnit.module("TestFilaCarrito", function (hooks) {
    hooks.afterEach(function () {
        cleanup();
        localStorage.clear();
    });

    QUnit.test("El botón - está deshabilitado con cantidad 1", function (assert) {
        dibujar({ ...zelda, cantidad: 1 });
        const botonRestar = screen.getByRole("button", { name: "Restar una unidad" });
        assert.ok(botonRestar.disabled);
    });

    QUnit.test("El botón - está habilitado con cantidad 2", function (assert) {
        dibujar({ ...zelda, cantidad: 2 });
        const botonRestar = screen.getByRole("button", { name: "Restar una unidad" });
        assert.notOk(botonRestar.disabled);
    });

    QUnit.test("El botón + está deshabilitado cuando la cantidad es igual al stock", function (assert) {
        dibujar({ ...zelda, stock: 2, cantidad: 2 });
        const botonSumar = screen.getByRole("button", { name: "Sumar una unidad" });
        assert.ok(botonSumar.disabled);
    });

    QUnit.test("El botón + está habilitado si queda stock", function (assert) {
        dibujar({ ...zelda, stock: 19, cantidad: 2 });
        const botonSumar = screen.getByRole("button", { name: "Sumar una unidad" });
        assert.notOk(botonSumar.disabled);
    });

    QUnit.test("Un producto gratis no muestra los botones + y -", function (assert) {
        dibujar(fortnite);
        const botonRestar = screen.queryByRole("button", { name: "Restar una unidad" });
        const botonSumar = screen.queryByRole("button", { name: "Sumar una unidad" });
        assert.notOk(botonRestar);
        assert.notOk(botonSumar);
        assert.ok(screen.queryByText("FREE"));
    });

    QUnit.test("Muestra el subtotal del producto", function (assert) {
        dibujar({ ...zelda, cantidad: 2 });
        const subtotal = screen.queryByText("$ 11.998");
        assert.ok(subtotal);
    });

    QUnit.test("Al hacer clic en Eliminar se llama a onEliminar con el item", function (assert) {
        // Función espía hecha a mano: guarda con qué la llamaron
        const llamadas = [];
        function espiaEliminar(item) {
            llamadas.push(item);
        }
        const item = { ...zelda, cantidad: 3 };
        dibujar(item, function () {}, espiaEliminar);
        const botonEliminar = screen.getByRole("button", { name: "Eliminar" });
        fireEvent.click(botonEliminar);
        assert.equal(llamadas.length, 1);
        assert.deepEqual(llamadas[0], item);
    });

    QUnit.test("Al hacer clic en + y - se llama a onCambiar con el id y el cambio", function (assert) {
        const llamadas = [];
        function espiaCambiar(id, delta) {
            llamadas.push([id, delta]);
        }
        dibujar({ ...zelda, cantidad: 2 }, espiaCambiar);
        fireEvent.click(screen.getByRole("button", { name: "Sumar una unidad" }));
        fireEvent.click(screen.getByRole("button", { name: "Restar una unidad" }));
        const llamadasEsperadas = [[1, 1], [1, -1]];
        assert.deepEqual(llamadas, llamadasEsperadas);
    });
});
