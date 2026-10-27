// Pruebas del componente ProductCard (tarjeta de producto).
// Reglas que se prueban:
// - Muestra el nombre, la categoría y el precio con formato chileno.
// - Si el precio es 0 muestra "FREE" en vez del precio.
// - El link "Ver" apunta a /productos/{id}.
// - Al hacer clic en "Añadir" el producto se guarda en localStorage (clave "cart") con cantidad 1.
// El componente se dibuja dentro de CartProvider porque el botón usa el carrito.
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import ProductCard from "../src/components/productos/ProductCard.jsx";
import { CartProvider } from "../src/context/CartContext.jsx";

const zelda = {
  id: 1,
  imagen: "https://placehold.co/400x300?text=Videojuego",
  nombre: "The Legend of Zelda",
  categoria: "Aventura",
  precio_descuento: 6999,
  precio_nuevo: 5999,
  stock: 19,
};
const fortnite = {
  id: 4,
  imagen: "https://placehold.co/400x300?text=Videojuego",
  nombre: "Fortnite",
  categoria: "Battle Royale",
  precio_descuento: 999,
  precio_nuevo: 0,
  stock: 10,
};

function dibujar(producto) {
  return render(
    <CartProvider>
      <ProductCard producto={producto} />
    </CartProvider>
  );
}

QUnit.module("TestProductCard", function (hooks) {
    hooks.afterEach(function () {
        cleanup();
        localStorage.clear();
    });

    QUnit.test("Muestra el nombre y la categoría del producto", function (assert) {
        dibujar(zelda);
        const nombre = screen.queryByText("The Legend of Zelda");
        const categoria = screen.queryByText("Aventura");
        assert.ok(nombre);
        assert.ok(categoria);
    });

    QUnit.test("Muestra el precio con formato", function (assert) {
        dibujar(zelda);
        const precio = screen.queryByText("$ 5.999");
        assert.ok(precio);
    });

    QUnit.test("Un producto con precio 0 muestra FREE", function (assert) {
        dibujar(fortnite);
        const free = screen.queryByText("FREE");
        const precioCero = screen.queryByText("$ 0");
        assert.ok(free);
        assert.notOk(precioCero);
    });

    QUnit.test("El link Ver apunta a la página del producto", function (assert) {
        dibujar(zelda);
        const link = screen.getByRole("link", { name: "Ver" });
        const hrefEsperado = "/productos/1";
        assert.equal(link.getAttribute("href"), hrefEsperado);
    });

    QUnit.test("Al hacer clic en Añadir el producto se guarda en localStorage", async function (assert) {
        dibujar(zelda);
        const boton = screen.getByRole("button", { name: /Añadir/ });
        fireEvent.click(boton);
        await waitFor(function () {
            assert.ok(localStorage.getItem("cart").includes("Zelda"));
        });
        const guardado = JSON.parse(localStorage.getItem("cart"));
        assert.equal(guardado.length, 1);
        assert.equal(guardado[0].id, 1);
        assert.equal(guardado[0].cantidad, 1);
    });
});
