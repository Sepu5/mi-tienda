// Pruebas de la lógica pura del catálogo (src/lib/catalogo.js).
// Reglas que se prueban:
// - buscarCategoria devuelve la categoría que tiene el slug pedido.
// - Si el slug no existe, buscarCategoria devuelve null.
// - productosDeCategoria devuelve solo los productos del tipo pedido.
// - Si no hay productos de ese tipo, devuelve un arreglo vacío.
// - La función no modifica el arreglo original.
// - Todas las categorías reales tienen al menos una carta (no pueden salir vacías).
import { buscarCategoria, productosDeCategoria } from "../src/lib/catalogo.js";
import { categorias as categoriasReales } from "../src/data/categorias.js";
import { productos as productosReales } from "../src/data/productos.js";

const categorias = [
  { id: 1, nombre: "Fuego", slug: "fuego" },
  { id: 2, nombre: "Eléctrico", slug: "electrico" },
];
const productos = [
  { id: 1, nombre: "Charizard", categoria: "Fuego" },
  { id: 2, nombre: "Pikachu", categoria: "Eléctrico" },
  { id: 3, nombre: "Ponyta", categoria: "Fuego" },
];

QUnit.module("TestCatalogo", function () {

    QUnit.test("Busca una categoría existente por su slug", function (assert) {
        const resultado = buscarCategoria(categorias, "electrico");
        const resultadoEsperado = categorias[1];
        assert.deepEqual(resultado, resultadoEsperado);
    });

    QUnit.test("Un slug que no existe devuelve null", function (assert) {
        const resultado = buscarCategoria(categorias, "dragon");
        const resultadoEsperado = null;
        assert.strictEqual(resultado, resultadoEsperado);
    });

    QUnit.test("Filtra los productos de un tipo", function (assert) {
        const resultado = productosDeCategoria(productos, "Fuego").map((p) => p.nombre);
        const resultadoEsperado = ["Charizard", "Ponyta"];
        assert.deepEqual(resultado, resultadoEsperado);
    });

    QUnit.test("Un tipo sin productos devuelve un arreglo vacío", function (assert) {
        const resultado = productosDeCategoria(productos, "Agua");
        const resultadoEsperado = [];
        assert.deepEqual(resultado, resultadoEsperado);
    });

    QUnit.test("No modifica el arreglo original de productos", function (assert) {
        productosDeCategoria(productos, "Fuego");
        const resultado = productos.length;
        const resultadoEsperado = 3;
        assert.equal(resultado, resultadoEsperado);
    });

    QUnit.test("Todas las categorías reales tienen al menos una carta", function (assert) {
        const vacias = categoriasReales
            .filter((c) => productosDeCategoria(productosReales, c.nombre).length === 0)
            .map((c) => c.nombre);
        const resultadoEsperado = [];
        assert.deepEqual(vacias, resultadoEsperado);
    });
});
