// Pruebas del componente ProductosHome (productos que se piden a la fake-api con fetch).
// Reglas que se prueban:
// - Mientras la API no responde muestra "Cargando productos...".
// - Si la API responde bien, muestra las cartas recibidas.
// - Si la API responde con error (ok: false) o el fetch falla, muestra el aviso "No se pudieron cargar los productos...".
// - El componente pide los datos a la URL `${API_URL}/productos`.
// Mock: no usamos la fake-api real. Reemplazamos globalThis.fetch por una función falsa hecha a mano
// que registra las llamadas y devuelve la respuesta que necesita cada prueba.
// El componente se dibuja dentro de CartProvider porque las tarjetas usan el carrito.
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import ProductosHome from "../src/components/productos/ProductosHome.jsx";
import { CartProvider } from "../src/context/CartContext.jsx";
import { API_URL } from "../src/lib/api.js";

const cartasEjemplo = [
  { id: 1, imagen: "/x.png", nombre: "Charizard", categoria: "Fuego", precio_descuento: 399990, precio_nuevo: 349990, stock: 3 },
  { id: 2, imagen: "/x.png", nombre: "Pikachu", categoria: "Eléctrico", precio_descuento: 29990, precio_nuevo: 24990, stock: 10 },
  { id: 3, imagen: "/x.png", nombre: "Blastoise", categoria: "Agua", precio_descuento: 199990, precio_nuevo: 179990, stock: 5 },
];

function dibujar() {
  return render(
    <CartProvider>
      <ProductosHome />
    </CartProvider>
  );
}

QUnit.module("TestProductosHome", function (hooks) {
    let fetchOriginal;
    let consoleErrorOriginal;
    let llamadas;

    hooks.beforeEach(function () {
        fetchOriginal = globalThis.fetch;
        consoleErrorOriginal = console.error;
        llamadas = [];
    });

    hooks.afterEach(function () {
        cleanup();
        localStorage.clear();
        globalThis.fetch = fetchOriginal;
        console.error = consoleErrorOriginal;
    });

    // Mock: fetch falso que responde bien con la lista de cartas
    function mockFetchOk(datos) {
        globalThis.fetch = function (url) {
            llamadas.push(url);
            return Promise.resolve({
                ok: true,
                status: 200,
                json: function () { return Promise.resolve(datos); },
            });
        };
    }

    QUnit.test("Mientras la API no responde muestra Cargando productos", function (assert) {
        // Mock: fetch que nunca termina
        globalThis.fetch = function (url) {
            llamadas.push(url);
            return new Promise(function () {});
        };
        dibujar();
        const resultado = screen.queryAllByText("Cargando productos...").length > 0;
        const resultadoEsperado = true;
        assert.equal(resultado, resultadoEsperado);
    });

    QUnit.test("Con la API respondiendo muestra las cartas", async function (assert) {
        mockFetchOk(cartasEjemplo);
        dibujar();
        const charizard = await screen.findByText("Charizard");
        const pikachu = await screen.findByText("Pikachu");
        const blastoise = await screen.findByText("Blastoise");
        assert.ok(charizard);
        assert.ok(pikachu);
        assert.ok(blastoise);
        assert.equal(screen.queryAllByText("Cargando productos...").length, 0);
    });

    QUnit.test("Si la API responde con error muestra el aviso", async function (assert) {
        console.error = function () {};
        globalThis.fetch = function (url) {
            llamadas.push(url);
            return Promise.resolve({ ok: false, status: 500, json: function () { return Promise.resolve([]); } });
        };
        dibujar();
        const aviso = await screen.findByText(/No se pudieron cargar los productos/);
        assert.ok(aviso);
        assert.equal(screen.queryByText("Charizard"), null);
    });

    QUnit.test("Si el fetch falla (sin red) muestra el aviso", async function (assert) {
        console.error = function () {};
        globalThis.fetch = function (url) {
            llamadas.push(url);
            return Promise.reject(new Error("Failed to fetch"));
        };
        dibujar();
        const aviso = await screen.findByText(/No se pudieron cargar los productos/);
        assert.ok(aviso);
    });

    QUnit.test("Pide los productos a la URL de la API", async function (assert) {
        mockFetchOk(cartasEjemplo);
        dibujar();
        await waitFor(function () {
            assert.equal(llamadas.length, 1);
        });
        const resultado = llamadas[0];
        const resultadoEsperado = `${API_URL}/productos`;
        assert.equal(resultado, resultadoEsperado);
    });
});
