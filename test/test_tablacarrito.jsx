// Pruebas del componente TablaCarrito (tabla del carrito de compras).
// Reglas que se prueban:
// - Con el carrito vacío muestra "Tu carrito está vacío."
// - Si en localStorage (clave "cart") hay productos, muestra sus filas y el total.
// - Al hacer clic en "Eliminar" se abre el modal "Confirmar Eliminación".
// - Al confirmar en el modal, la fila del producto se quita de la tabla.
// - Al cancelar en el modal, el producto sigue en la tabla.
// El componente se dibuja dentro de CartProvider, que es quien lee el localStorage.
import { render, screen, fireEvent, cleanup, within } from "@testing-library/react";
import TablaCarrito from "../src/components/carrito/TablaCarrito.jsx";
import { CartProvider } from "../src/context/CartContext.jsx";

const zelda = { id: 1, imagen: "x.png", nombre: "The Legend of Zelda", precio_nuevo: 5999, stock: 19, cantidad: 2 };
const fifa = { id: 13, imagen: "x.png", nombre: "FIFA 21", precio_nuevo: 4999, stock: 2, cantidad: 1 };

function dibujar() {
  return render(
    <CartProvider>
      <TablaCarrito />
    </CartProvider>
  );
}

QUnit.module("TestTablaCarrito", function (hooks) {
    hooks.afterEach(function () {
        cleanup();
        localStorage.clear();
    });

    QUnit.test("Un carrito vacío muestra el mensaje de vacío", function (assert) {
        dibujar();
        const mensaje = screen.queryByText(/Tu carrito está vacío\./);
        assert.ok(mensaje);
    });

    QUnit.test("Con productos guardados muestra las filas y el total", function (assert) {
        localStorage.setItem("cart", JSON.stringify([zelda, fifa]));
        dibujar();
        const nombreZelda = screen.queryByText("The Legend of Zelda");
        const nombreFifa = screen.queryByText("FIFA 21");
        const totalEsperado = "$ 16.997"; // 5999 * 2 + 4999
        assert.ok(nombreZelda);
        assert.ok(nombreFifa);
        assert.ok(screen.queryByText(totalEsperado));
        assert.notOk(screen.queryByText(/Tu carrito está vacío\./));
    });

    QUnit.test("Al hacer clic en Eliminar se abre el modal de confirmación", function (assert) {
        localStorage.setItem("cart", JSON.stringify([zelda]));
        dibujar();
        assert.notOk(screen.queryByText("Confirmar Eliminación"));
        const fila = screen.getByText("The Legend of Zelda").closest("tr");
        fireEvent.click(within(fila).getByRole("button", { name: "Eliminar" }));
        assert.ok(screen.queryByText("Confirmar Eliminación"));
    });

    QUnit.test("Al confirmar la eliminación se quita la fila", function (assert) {
        localStorage.setItem("cart", JSON.stringify([zelda, fifa]));
        dibujar();
        const fila = screen.getByText("The Legend of Zelda").closest("tr");
        fireEvent.click(within(fila).getByRole("button", { name: "Eliminar" }));
        const modal = screen.getByRole("dialog");
        fireEvent.click(within(modal).getByRole("button", { name: "Eliminar" }));
        assert.notOk(screen.queryByText("The Legend of Zelda"));
        assert.ok(screen.queryByText("FIFA 21"));
        assert.notOk(screen.queryByText("Confirmar Eliminación"));
    });

    QUnit.test("Al cancelar la eliminación el producto sigue en la tabla", function (assert) {
        localStorage.setItem("cart", JSON.stringify([zelda]));
        dibujar();
        const fila = screen.getByText("The Legend of Zelda").closest("tr");
        fireEvent.click(within(fila).getByRole("button", { name: "Eliminar" }));
        const modal = screen.getByRole("dialog");
        fireEvent.click(within(modal).getByRole("button", { name: "Cancelar" }));
        assert.ok(screen.queryByText("The Legend of Zelda"));
        assert.notOk(screen.queryByText("Confirmar Eliminación"));
    });

    QUnit.test("Al eliminar el último producto aparece el mensaje de vacío", function (assert) {
        localStorage.setItem("cart", JSON.stringify([fifa]));
        dibujar();
        const fila = screen.getByText("FIFA 21").closest("tr");
        fireEvent.click(within(fila).getByRole("button", { name: "Eliminar" }));
        const modal = screen.getByRole("dialog");
        fireEvent.click(within(modal).getByRole("button", { name: "Eliminar" }));
        assert.ok(screen.queryByText(/Tu carrito está vacío\./));
    });
});
