// Pruebas de la creación de la orden de compra (src/lib/compra.js).
// Reglas que se prueban:
// - La orden guarda el total del carrito, los items y los datos del cliente.
// - La fecha se guarda en formato ISO.
// - El número de orden son los últimos 8 dígitos de la fecha en milisegundos.
// Se usa una fecha fija para que el resultado siempre sea el mismo.
import { crearOrden } from "../src/lib/compra.js";

const fechaFija = new Date("2026-10-27T12:00:00Z");
const cliente = { nombre: "Franco", apellidos: "Sepúlveda", correo: "franco@correo.cl" };
const carrito = [
  { id: 1, nombre: "The Legend of Zelda", precio_nuevo: 5999, stock: 19, cantidad: 2 },
  { id: 4, nombre: "Fortnite", precio_nuevo: 0, stock: 10, cantidad: 1 },
];

QUnit.module("TestCrearOrden", function () {

    QUnit.test("La orden tiene el total del carrito", function (assert) {
        const orden = crearOrden(cliente, carrito, fechaFija);
        const totalEsperado = 11998;
        assert.equal(orden.total, totalEsperado);
    });

    QUnit.test("La orden guarda los items del carrito", function (assert) {
        const orden = crearOrden(cliente, carrito, fechaFija);
        assert.deepEqual(orden.items, carrito);
    });

    QUnit.test("La orden guarda los datos del cliente", function (assert) {
        const orden = crearOrden(cliente, carrito, fechaFija);
        assert.deepEqual(orden.cliente, cliente);
    });

    QUnit.test("La fecha de la orden está en formato ISO", function (assert) {
        const orden = crearOrden(cliente, carrito, fechaFija);
        const fechaEsperada = "2026-10-27T12:00:00.000Z";
        assert.equal(orden.fecha, fechaEsperada);
    });

    QUnit.test("El número de orden son los últimos 8 dígitos de la fecha", function (assert) {
        const orden = crearOrden(cliente, carrito, fechaFija);
        const numeroEsperado = Number(String(fechaFija.getTime()).slice(-8));
        assert.equal(orden.numero, numeroEsperado);
        assert.ok(orden.numero < 100000000);
    });

    QUnit.test("Una orden con carrito vacío tiene total 0", function (assert) {
        const orden = crearOrden(cliente, [], fechaFija);
        const totalEsperado = 0;
        assert.equal(orden.total, totalEsperado);
        assert.deepEqual(orden.items, []);
    });
});
