// Pruebas de la lógica pura del carrito (src/lib/carrito.js).
// Reglas que se prueban:
// - Al agregar un producto nuevo, queda con cantidad 1.
// - Si el producto ya está en el carrito, se suma 1 a la cantidad.
// - No se puede superar el stock del producto.
// - Un producto gratis (precio 0) solo se puede llevar 1 vez por compra.
// - Las funciones no modifican el carrito original, devuelven uno nuevo.
// - cambiarCantidad suma o resta; si la cantidad llega a 0 el producto se elimina.
// - calcularTotal suma precio * cantidad (los gratis aportan 0).
// - contarProductos suma todas las unidades del carrito.
import {
  agregarAlCarrito,
  cambiarCantidad,
  eliminarDelCarrito,
  calcularTotal,
  contarProductos,
} from "../src/lib/carrito.js";

// Productos copiados de src/data/productos.js
const charmander = { id: 1, nombre: "Charmander", categoria: "Fuego", precio_descuento: 6999, precio_nuevo: 5999, stock: 19 };
const energiaFuego = { id: 4, nombre: "Energía Fuego", categoria: "Fuego", precio_descuento: 999, precio_nuevo: 0, stock: 10 };
const pikachu = { id: 13, nombre: "Pikachu", categoria: "Eléctrico", precio_descuento: 5999, precio_nuevo: 4999, stock: 2 };

QUnit.module("TestAgregarAlCarrito", function () {

    QUnit.test("Agregar un producto nuevo a un carrito vacío", function (assert) {
        const carrito = [];
        const resultado = agregarAlCarrito(carrito, charmander);
        const carritoEsperado = [{ ...charmander, cantidad: 1 }];
        assert.deepEqual(resultado.carrito, carritoEsperado);
        assert.strictEqual(resultado.error, null);
    });

    QUnit.test("Agregar un producto que ya existe suma 1 a la cantidad", function (assert) {
        const carrito = [{ ...charmander, cantidad: 1 }];
        const resultado = agregarAlCarrito(carrito, charmander);
        const cantidadEsperada = 2;
        assert.equal(resultado.carrito[0].cantidad, cantidadEsperada);
        assert.strictEqual(resultado.error, null);
    });

    QUnit.test("Agregar un producto distinto deja dos productos en el carrito", function (assert) {
        const carrito = [{ ...charmander, cantidad: 3 }];
        const resultado = agregarAlCarrito(carrito, pikachu);
        const largoEsperado = 2;
        assert.equal(resultado.carrito.length, largoEsperado);
        assert.equal(resultado.carrito[0].cantidad, 3);
        assert.equal(resultado.carrito[1].cantidad, 1);
    });

    QUnit.test("No se puede agregar más unidades que el stock", function (assert) {
        const carrito = [{ ...pikachu, cantidad: 2 }];
        const resultado = agregarAlCarrito(carrito, pikachu);
        const errorEsperado = "No puedes añadir más de 2 unidades de Pikachu.";
        assert.equal(resultado.error, errorEsperado);
        assert.deepEqual(resultado.carrito, carrito);
    });

    QUnit.test("Un producto gratis solo se puede agregar una vez", function (assert) {
        const carrito = [{ ...energiaFuego, cantidad: 1 }];
        const resultado = agregarAlCarrito(carrito, energiaFuego);
        const errorEsperado = "Solo puedes añadir un producto gratis por compra.";
        assert.equal(resultado.error, errorEsperado);
        assert.equal(resultado.carrito[0].cantidad, 1);
    });

    QUnit.test("Agregar no modifica el carrito original", function (assert) {
        const carrito = [{ ...charmander, cantidad: 1 }];
        const resultado = agregarAlCarrito(carrito, charmander);
        const cantidadOriginalEsperada = 1;
        assert.equal(carrito[0].cantidad, cantidadOriginalEsperada);
        assert.notStrictEqual(resultado.carrito, carrito);
    });
});

QUnit.module("TestCambiarCantidad", function () {

    QUnit.test("Sumar 1 aumenta la cantidad", function (assert) {
        const carrito = [{ ...charmander, cantidad: 2 }];
        const resultado = cambiarCantidad(carrito, 1, 1);
        const cantidadEsperada = 3;
        assert.equal(resultado.carrito[0].cantidad, cantidadEsperada);
        assert.strictEqual(resultado.error, null);
    });

    QUnit.test("Restar 1 disminuye la cantidad", function (assert) {
        const carrito = [{ ...charmander, cantidad: 2 }];
        const resultado = cambiarCantidad(carrito, 1, -1);
        const cantidadEsperada = 1;
        assert.equal(resultado.carrito[0].cantidad, cantidadEsperada);
    });

    QUnit.test("Si la cantidad llega a 0 se elimina el producto", function (assert) {
        const carrito = [{ ...charmander, cantidad: 1 }, { ...pikachu, cantidad: 1 }];
        const resultado = cambiarCantidad(carrito, 1, -1);
        const carritoEsperado = [{ ...pikachu, cantidad: 1 }];
        assert.deepEqual(resultado.carrito, carritoEsperado);
    });

    QUnit.test("No se puede sumar más allá del stock", function (assert) {
        const carrito = [{ ...pikachu, cantidad: 2 }];
        const resultado = cambiarCantidad(carrito, 13, 1);
        const errorEsperado = "No puedes añadir más de 2 unidades de Pikachu.";
        assert.equal(resultado.error, errorEsperado);
        assert.equal(resultado.carrito[0].cantidad, 2);
    });

    QUnit.test("Cambiar un producto que no está en el carrito no hace nada", function (assert) {
        const carrito = [{ ...charmander, cantidad: 1 }];
        const resultado = cambiarCantidad(carrito, 99, 1);
        assert.deepEqual(resultado.carrito, carrito);
        assert.strictEqual(resultado.error, null);
    });

    QUnit.test("Cambiar la cantidad no modifica el carrito original", function (assert) {
        const carrito = [{ ...charmander, cantidad: 2 }];
        cambiarCantidad(carrito, 1, 1);
        const cantidadOriginalEsperada = 2;
        assert.equal(carrito[0].cantidad, cantidadOriginalEsperada);
    });
});

QUnit.module("TestEliminarDelCarrito", function () {

    QUnit.test("Eliminar un producto lo saca del carrito", function (assert) {
        const carrito = [{ ...charmander, cantidad: 1 }, { ...pikachu, cantidad: 2 }];
        const resultado = eliminarDelCarrito(carrito, 1);
        const carritoEsperado = [{ ...pikachu, cantidad: 2 }];
        assert.deepEqual(resultado, carritoEsperado);
    });

    QUnit.test("Eliminar un id que no existe deja el carrito igual", function (assert) {
        const carrito = [{ ...charmander, cantidad: 1 }];
        const resultado = eliminarDelCarrito(carrito, 99);
        assert.deepEqual(resultado, carrito);
    });

    QUnit.test("Eliminar no modifica el carrito original", function (assert) {
        const carrito = [{ ...charmander, cantidad: 1 }];
        eliminarDelCarrito(carrito, 1);
        const largoOriginalEsperado = 1;
        assert.equal(carrito.length, largoOriginalEsperado);
    });
});

QUnit.module("TestTotalYCantidad", function () {

    QUnit.test("El total de un carrito vacío es 0", function (assert) {
        const carrito = [];
        const resultado = calcularTotal(carrito);
        const resultadoEsperado = 0;
        assert.equal(resultado, resultadoEsperado);
    });

    QUnit.test("El total multiplica precio por cantidad y suma todo", function (assert) {
        const carrito = [{ ...charmander, cantidad: 2 }, { ...pikachu, cantidad: 1 }];
        const resultado = calcularTotal(carrito);
        const resultadoEsperado = 5999 * 2 + 4999;
        assert.equal(resultado, resultadoEsperado);
    });

    QUnit.test("Un producto gratis no suma al total", function (assert) {
        const carrito = [{ ...energiaFuego, cantidad: 1 }, { ...pikachu, cantidad: 1 }];
        const resultado = calcularTotal(carrito);
        const resultadoEsperado = 4999;
        assert.equal(resultado, resultadoEsperado);
    });

    QUnit.test("Contar productos en un carrito vacío da 0", function (assert) {
        const carrito = [];
        const resultado = contarProductos(carrito);
        const resultadoEsperado = 0;
        assert.equal(resultado, resultadoEsperado);
    });

    QUnit.test("Contar productos suma todas las unidades", function (assert) {
        const carrito = [{ ...charmander, cantidad: 3 }, { ...energiaFuego, cantidad: 1 }, { ...pikachu, cantidad: 2 }];
        const resultado = contarProductos(carrito);
        const resultadoEsperado = 6;
        assert.equal(resultado, resultadoEsperado);
    });
});
