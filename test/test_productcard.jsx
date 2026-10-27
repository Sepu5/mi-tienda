// Pruebas del componente ProductCard (tarjeta de producto).
// Reglas que se prueban:
// - Muestra el nombre, la categoría y el precio con formato chileno.
// - Si el precio es 0 muestra "FREE" en vez del precio.
// - El precio anterior tachado solo se muestra si hay descuento (precio_descuento mayor al precio nuevo).
// - El link "Ver" apunta a /productos/{id}.
// - Al hacer clic en "Añadir" el producto se guarda en localStorage (clave "cart") con cantidad 1.
// El componente se dibuja dentro de CartProvider porque el botón usa el carrito.
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import ProductCard from "../src/components/productos/ProductCard.jsx";
import { CartProvider } from "../src/context/CartContext.jsx";

const charmander = {
  id: 1,
  imagen: "/x.png",
  nombre: "Charmander",
  categoria: "Fuego",
  precio_descuento: 6999,
  precio_nuevo: 5999,
  stock: 19,
};
const energiaFuego = {
  id: 4,
  imagen: "/x.png",
  nombre: "Energía Fuego",
  categoria: "Fuego",
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

// Mock: el localStorage de jsdom se usa como carrito simulado y se limpia después de cada prueba
QUnit.module("TestProductCard", function (hooks) {
    hooks.afterEach(function () {
        cleanup();
        localStorage.clear();
    });

    QUnit.test("Muestra el nombre y la categoría del producto", function (assert) {
        dibujar(charmander);
        const nombre = screen.queryByText("Charmander");
        const categoria = screen.queryByText("Fuego");
        assert.ok(nombre);
        assert.ok(categoria);
    });

    QUnit.test("Muestra el precio con formato", function (assert) {
        dibujar(charmander);
        const precio = screen.queryByText("$ 5.999");
        assert.ok(precio);
    });

    QUnit.test("Un producto con precio 0 muestra FREE", function (assert) {
        dibujar(energiaFuego);
        const free = screen.queryByText("FREE");
        const precioCero = screen.queryByText("$ 0");
        assert.ok(free);
        assert.notOk(precioCero);
    });

    QUnit.test("Sin descuento no se muestra el precio tachado", function (assert) {
        const sinDescuento = { ...charmander, precio_descuento: 5999, precio_nuevo: 5999 };
        dibujar(sinDescuento);
        const resultado = screen.queryAllByText("$ 5.999").length;
        const resultadoEsperado = 1;
        assert.equal(resultado, resultadoEsperado);
    });

    QUnit.test("Con descuento se muestra el precio tachado", function (assert) {
        dibujar(charmander);
        const tachado = screen.queryByText("$ 6.999");
        assert.ok(tachado);
    });

    QUnit.test("El link Ver apunta a la página del producto", function (assert) {
        dibujar(charmander);
        const link = screen.getByRole("link", { name: "Ver" });
        const hrefEsperado = "/productos/1";
        assert.equal(link.getAttribute("href"), hrefEsperado);
    });

    QUnit.test("Al hacer clic en Añadir el producto se guarda en localStorage", async function (assert) {
        dibujar(charmander);
        const boton = screen.getByRole("button", { name: /Añadir/ });
        fireEvent.click(boton);
        await waitFor(function () {
            assert.ok(localStorage.getItem("cart").includes("Charmander"));
        });
        const guardado = JSON.parse(localStorage.getItem("cart"));
        assert.equal(guardado.length, 1);
        assert.equal(guardado[0].id, 1);
        assert.equal(guardado[0].cantidad, 1);
    });
});
