// Pruebas de la función formatearPrecio (src/lib/formato.js).
// Regla: el precio se muestra en formato chileno, con "$ " y punto como separador de miles.
import { formatearPrecio } from "../src/lib/formato.js";

QUnit.module("TestFormatearPrecio", function () {

    QUnit.test("Formatear 5999", function (assert) {
        const precio = 5999;
        const resultado = formatearPrecio(precio);
        const resultadoEsperado = "$ 5.999";
        assert.equal(resultado, resultadoEsperado);
    });

    QUnit.test("Formatear 0", function (assert) {
        const precio = 0;
        const resultado = formatearPrecio(precio);
        const resultadoEsperado = "$ 0";
        assert.equal(resultado, resultadoEsperado);
    });

    QUnit.test("Formatear 11998", function (assert) {
        const precio = 11998;
        const resultado = formatearPrecio(precio);
        const resultadoEsperado = "$ 11.998";
        assert.equal(resultado, resultadoEsperado);
    });

    QUnit.test("Formatear un precio de menos de mil no lleva punto", function (assert) {
        const precio = 999;
        const resultado = formatearPrecio(precio);
        const resultadoEsperado = "$ 999";
        assert.equal(resultado, resultadoEsperado);
    });
});
