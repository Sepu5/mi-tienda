# Documento de cobertura de testing

Proyecto **TCG Duoc** (DSY1104). Este documento explica cómo probamos la tienda, qué partes quedan cubiertas por las pruebas y cuáles no, y por qué.

## 1. Objetivo y alcance

**Objetivo:** comprobar con pruebas automáticas que la lógica y los componentes principales de la tienda funcionan como esperamos, y medir cuánto del código de `src/` ejecutan esas pruebas.

**Qué se prueba:**

- La lógica pura de `src/lib`: carrito, validaciones de formularios, creación de la orden de compra, filtro de categorías y formato de precios.
- Los componentes de React que tienen comportamiento: `ProductCard`, `FilaCarrito`, `TablaCarrito`, `LoginForm`, `RegistroForm`, `ContactoForm` y `ProductosHome`.
- De forma indirecta, `CartProvider`, `BotonAgregar`, `ModalEliminar`, `ProductGrid` y `Campo`, porque forman parte de los componentes anteriores.

**Qué no se prueba directamente:** las páginas de `src/app` (son componentes de servidor de Next.js), los componentes que dependen del router de Next (`NavLink`, `MobileMenu`, `FormularioCompra`) y los componentes de pura presentación (`Navbar`, `Footer`, `Carrusel`, etc.). Más abajo se explica el motivo.

## 2. Herramientas y entorno de pruebas

| Herramienta | Para qué se usa |
| --- | --- |
| **QUnit** 2.24.1 | Framework de pruebas (es el que se vio en clase). |
| **jsdom** + **global-jsdom** | Crean un navegador falso dentro de Node (con `document`, `localStorage`, etc.) para poder dibujar componentes. |
| **React Testing Library** | Dibuja los componentes, busca elementos en pantalla y simula clics y escritura. |
| **tsx** | Permite que Node entienda el JSX de los componentes y de las pruebas. |
| **cross-env** | Define variables de entorno de forma que los scripts funcionen igual en Windows, Linux y Mac. |
| **c8** | Mide la cobertura de código (qué líneas, ramas y funciones se ejecutaron). |

**`test/setup.js`:** se ejecuta antes de las pruebas. Crea el navegador falso con `global-jsdom` (con la URL `http://localhost/`) y activa `IS_REACT_ACT_ENVIRONMENT` para que React sepa que está en un entorno de pruebas.

**`tsconfig.qunit.json`:** le dice a `tsx` que use `react-jsx` para el JSX y entienda el alias `@/` (que apunta a `src/`). Se llama así y no `tsconfig.json` para que Next.js no tome el proyecto como TypeScript.

**Scripts:**

```bash
npm test             # corre todas las pruebas con QUnit
npm run coverage     # corre las mismas pruebas midiendo la cobertura con c8
```

El script `coverage` usa `--all --src=src --include="src/**"` para que cuente **todos** los archivos de `src/`, incluso los que ninguna prueba toca (así aparecen con 0 % en vez de desaparecer del reporte). Los reportes que genera son `text` (tabla en la terminal), `text-summary` (resumen) y `html` (carpeta `coverage/`, que no se sube a Git).

## 3. Cómo se escriben las pruebas

Cada archivo `test/test_<nombre>.js` o `.jsx` tiene un `QUnit.module(...)` que agrupa las pruebas, y cada caso es un `QUnit.test(...)`. Dentro seguimos el patrón **Arrange → Act → Assert**:

1. **Arrange:** preparar los datos.
2. **Act:** ejecutar la función o acción.
3. **Assert:** comprobar el resultado con `assert.equal`, `assert.ok`, `assert.deepEqual`, etc.

Ejemplo real (de `test/test_productcard.jsx`):

```js
QUnit.test("Con descuento se muestra el precio tachado", function (assert) {
    dibujar(charmander);
    const tachado = screen.queryByText("$ 6.999");
    assert.ok(tachado);
});
```

Después de cada prueba de componentes se limpia con `cleanup()` (y se vacía `localStorage`) en `hooks.afterEach`, para que una prueba no afecte a la siguiente.

## 4. Uso de mocks

Un **mock** (o doble de prueba) es algo falso que reemplaza a una parte real de la que depende el código, para poder probarlo sin depender de ella. Por ejemplo, en vez de pedir datos a la fake-api de verdad (que podría estar apagada o devolver otros datos), usamos una función falsa que responde lo que nosotros queramos. Así las pruebas son rápidas y siempre dan el mismo resultado.

| Mock / doble | Dónde | Para qué sirve |
| --- | --- | --- |
| `fetch` falso (función hecha a mano que reemplaza `globalThis.fetch`) | `test/test_productoshome.jsx` | Simula que la API responde bien, responde con error (`ok: false`), falla sin red o nunca responde. Registra las URLs a las que se llamó. En `hooks.afterEach` se restaura el `fetch` original. También se reemplaza `console.error` por una función vacía en los casos de error, para no llenar la terminal de mensajes esperados. |
| Funciones espía `onCambiar` / `onEliminar` | `test/test_filacarrito.jsx` | Funciones hechas a mano que guardan en un arreglo con qué argumentos las llamaron, para comprobar que los botones `+`, `-` y "Eliminar" avisan lo correcto. |
| `localStorage` simulado | `test/test_tablacarrito.jsx`, `test/test_productcard.jsx` | El `localStorage` de jsdom se precarga con un carrito de ejemplo (o se revisa lo que el componente guardó) y se limpia después de cada prueba. No se toca el almacenamiento de ningún navegador real. |
| `CartProvider` dentro de jsdom | casi todos los tests de componentes | Los componentes que usan el carrito se dibujan dentro del `CartProvider` real, que corre sobre el navegador falso de jsdom. |
| Fecha fija | `test/test_compra.js` | `crearOrden` recibe una fecha fija (`2026-10-27T12:00:00Z`) en vez de la hora real, para que el número de orden y la fecha sean siempre los mismos. |

## 5. Matriz de cobertura funcional

| Funcionalidad / Componente | Archivo de prueba | Casos que se prueban | Resultado |
| --- | --- | --- | --- |
| Carrito (`lib/carrito.js`) | `test_carrito.js` | Agregar, cambiar cantidad, eliminar, total y contar productos; límite de stock; producto gratis máximo 1; eliminar al llegar a 0; no modificar el carrito original (20 pruebas) | Pasan |
| Validaciones de los 4 formularios (`lib/validaciones.js`) | `test_validaciones.js` | `validarLogin`, `validarRegistro`, `validarContacto` y `validarCompra`: casos válidos, campos vacíos, largos mínimos y máximos (22 pruebas) | Pasan |
| Compra (`lib/compra.js`) | `test_compra.js` | `crearOrden`: total, items, cliente, fecha ISO, número de orden y carrito vacío (6 pruebas) | Pasan |
| Catálogo y categorías (`lib/catalogo.js`) | `test_catalogo.js` | Buscar categoría por slug (existente e inexistente), filtrar por tipo, tipo sin cartas, no modificar el arreglo original y que ninguna categoría real quede vacía (6 pruebas) | Pasan |
| Formato de precios (`lib/formato.js`) | `test_formato.js` | Punto de miles chileno, el 0 y precios menores a mil (4 pruebas) | Pasan |
| `ProductCard` | `test_productcard.jsx` | Nombre, categoría, precio con formato, `FREE`, precio tachado solo con descuento, link "Ver" y guardar en `localStorage` al añadir (7 pruebas) | Pasan |
| `FilaCarrito` | `test_filacarrito.jsx` | Botones `+` / `-` habilitados o deshabilitados, producto gratis, subtotal y callbacks `onCambiar` / `onEliminar` (8 pruebas) | Pasan |
| `TablaCarrito` | `test_tablacarrito.jsx` | Carrito vacío, filas y total, y flujo del modal: abrir, confirmar, cancelar, eliminar el último producto (6 pruebas) | Pasan |
| `LoginForm` | `test_loginform.jsx` | Errores al enviar vacío, correo sin formato y mensaje de éxito (3 pruebas) | Pasan |
| `RegistroForm` | `test_registroform.jsx` | Comuna deshabilitada sin región, contraseñas distintas, errores al enviar vacío y éxito (5 pruebas) | Pasan |
| `ContactoForm` | `test_contactoform.jsx` | Errores al enviar vacío, mensaje muy corto y agradecimiento con el nombre (3 pruebas) | Pasan |
| `ProductosHome` (con `fetch` falso) | `test_productoshome.jsx` | Estado "Cargando productos...", cartas mostradas con la API respondiendo, aviso si la API responde con error, aviso si el `fetch` falla y URL pedida `${API_URL}/productos` (5 pruebas) | Pasan |

## 6. Resultados de la ejecución

Comando: `npm test`

- **Total de pruebas: 95**
- Pasan: **95**
- Fallan: **0**
- Omitidas: 0

## 7. Cobertura de código

Comando: `npm run coverage`. Salida real:

```
-----------------------|---------|----------|---------|---------|-----------------------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                 
-----------------------|---------|----------|---------|---------|-----------------------------------
All files              |   49.31 |    80.62 |   83.63 |   49.31 |                                   
 app                   |       0 |        0 |       0 |       0 |                                   
  layout.js            |       0 |        0 |       0 |       0 | 1-32                              
  page.js              |       0 |        0 |       0 |       0 | 1-31                              
 app/blog              |       0 |        0 |       0 |       0 |                                   
  page.js              |       0 |        0 |       0 |       0 | 1-55                              
 app/carrito           |       0 |        0 |       0 |       0 |                                   
  page.js              |       0 |        0 |       0 |       0 | 1-14                              
 app/categorias        |       0 |        0 |       0 |       0 |                                   
  page.js              |       0 |        0 |       0 |       0 | 1-33                              
 app/categorias/[slug] |       0 |        0 |       0 |       0 |                                   
  page.js              |       0 |        0 |       0 |       0 | 1-66                              
 app/comprar           |       0 |        0 |       0 |       0 |                                   
  page.js              |       0 |        0 |       0 |       0 | 1-13                              
 app/comprar-error     |       0 |        0 |       0 |       0 |                                   
  page.js              |       0 |        0 |       0 |       0 | 1-13                              
 app/comprar-ok        |       0 |        0 |       0 |       0 |                                   
  page.js              |       0 |        0 |       0 |       0 | 1-13                              
 app/contacto          |       0 |        0 |       0 |       0 |                                   
  page.js              |       0 |        0 |       0 |       0 | 1-20                              
 app/crear-sesion      |       0 |        0 |       0 |       0 |                                   
  page.js              |       0 |        0 |       0 |       0 | 1-20                              
 app/iniciar-sesion    |       0 |        0 |       0 |       0 |                                   
  page.js              |       0 |        0 |       0 |       0 | 1-20                              
 app/nosotros          |       0 |        0 |       0 |       0 |                                   
  page.js              |       0 |        0 |       0 |       0 | 1-39                              
 app/ofertas           |       0 |        0 |       0 |       0 |                                   
  page.js              |       0 |        0 |       0 |       0 | 1-15                              
 app/productos/[id]    |       0 |        0 |       0 |       0 |                                   
  page.js              |       0 |        0 |       0 |       0 | 1-66                              
 components            |       0 |        0 |       0 |       0 |                                   
  BootstrapClient.jsx  |       0 |        0 |       0 |       0 | 1-11                              
 components/auth       |   98.13 |    89.04 |    93.1 |   98.13 |                                   
  Campo.jsx            |     100 |     92.3 |     100 |     100 | 1,43                              
  LoginForm.jsx        |   96.59 |    84.21 |    90.9 |   96.59 | 27-29                             
  RegistroForm.jsx     |   98.29 |    89.28 |    90.9 |   98.29 | 41-43                             
 components/carrito    |   85.44 |    86.79 |   94.73 |   85.44 |                                   
  AvisoCarrito.jsx     |       0 |        0 |       0 |       0 | 1-29                              
  BotonAgregar.jsx     |     100 |    88.88 |     100 |     100 | 1                                 
  FilaCarrito.jsx      |     100 |    93.33 |     100 |     100 | 1                                 
  ModalEliminar.jsx    |     100 |       90 |     100 |     100 | 1                                 
  TablaCarrito.jsx     |   97.59 |    83.33 |   91.66 |   97.59 | 30-31                             
 components/compra     |       0 |        0 |       0 |       0 |                                   
  DatosCliente.jsx     |       0 |        0 |       0 |       0 | 1-34                              
  FormularioCompra.jsx |       0 |        0 |       0 |       0 | 1-261                             
  ResultadoCompra.jsx  |       0 |        0 |       0 |       0 | 1-101                             
  ResumenCompra.jsx    |       0 |        0 |       0 |       0 | 1-33                              
 components/contacto   |    96.7 |    84.21 |    90.9 |    96.7 |                                   
  ContactoForm.jsx     |    96.7 |    84.21 |    90.9 |    96.7 | 25-27                             
 components/home       |       0 |        0 |       0 |       0 |                                   
  Carrusel.jsx         |       0 |        0 |       0 |       0 | 1-91                              
  CategoriaCard.jsx    |       0 |        0 |       0 |       0 | 1-22                              
 components/layout     |       0 |        0 |       0 |       0 |                                   
  BotonCarrito.jsx     |       0 |        0 |       0 |       0 | 1-22                              
  Footer.jsx           |       0 |        0 |       0 |       0 | 1-24                              
  MobileMenu.jsx       |       0 |        0 |       0 |       0 | 1-85                              
  NavLink.jsx          |       0 |        0 |       0 |       0 | 1-19                              
  Navbar.jsx           |       0 |        0 |       0 |       0 | 1-80                              
 components/productos  |     100 |    82.69 |     100 |     100 |                                   
  ProductCard.jsx      |     100 |    81.25 |     100 |     100 | 1                                 
  ProductGrid.jsx      |     100 |    76.92 |     100 |     100 | 1                                 
  ProductosHome.jsx    |     100 |    86.95 |     100 |     100 | 1                                 
 context               |   79.79 |       75 |   78.57 |   79.79 |                                   
  CartContext.jsx      |   79.79 |       75 |   78.57 |   79.79 | ...,49-51,57-63,70-71,74-75,96-97 
 data                  |   98.92 |    71.42 |     100 |   98.92 |                                   
  categorias.js        |   97.77 |    71.42 |     100 |   97.77 | 45                                
  productos.js         |    99.5 |    71.42 |     100 |    99.5 | 202                               
  zonas.js             |   96.96 |    71.42 |     100 |   96.96 | 33                                
 lib                   |     100 |    90.27 |   98.36 |     100 |                                   
  api.js               |     100 |    71.42 |     100 |     100 | 1                                 
  carrito.js           |     100 |    90.24 |     100 |     100 | 1,27,51,67                        
  catalogo.js          |     100 |     87.5 |     100 |     100 | 1,9                               
  compra.js            |     100 |    81.81 |    87.5 |     100 | 1-8                               
  formato.js           |     100 |    77.77 |     100 |     100 | 1-2                               
  validaciones.js      |     100 |    96.66 |     100 |     100 | 1,69                              
-----------------------|---------|----------|---------|---------|-----------------------------------
```

Resumen:

```
=============================== Coverage summary ===============================
```

| Métrica | Resultado |
| --- | --- |
| Statements | 49.31 % |
| Branches | 80.62 % |
| Functions | 83.63 % |
| Lines | 49.31 % |

**Cómo abrir el reporte HTML:** después de correr `npm run coverage` se crea la carpeta `coverage/`. Abre el archivo `coverage/index.html` con el navegador (doble clic o arrastrarlo a Chrome). Ahí se puede entrar a cada archivo y ver en verde las líneas ejecutadas y en rojo las que no.

> Nota: el porcentaje global de statements y líneas es bajo porque el comando cuenta todos los archivos de `src/`, incluidas las páginas y los componentes de presentación que no se prueban de forma directa (ver sección 8). Si solo se mira la lógica y los componentes con comportamiento, la cobertura es muy alta.

## 8. Análisis

**Bien cubierto**

- `src/lib` (carrito, validaciones, compra, catálogo, formato y api): **100 %** de statements y líneas, y 98,36 % de funciones. Es donde está la lógica de negocio.
- Formularios (`components/auth` y `components/contacto`): entre 96 % y 100 % de statements.
- `components/productos` (`ProductCard`, `ProductGrid`, `ProductosHome`): 100 % de statements, gracias al mock de `fetch`.
- `components/carrito`: 85 %; `FilaCarrito`, `BotonAgregar` y `ModalEliminar` al 100 %.
- `src/data`: cerca de 99 %, porque se usa al probar el catálogo y las regiones.

**Baja cobertura y por qué**

- **Páginas de `src/app` (0 %):** son componentes de servidor de Next.js; se arman con el router y el sistema de rutas, que no existen en un entorno de pruebas simple con jsdom. Solo ensamblan componentes que sí se prueban.
- **Componentes que dependen del router (`NavLink`, `MobileMenu`, `FormularioCompra`, 0 %):** usan `usePathname` / `useRouter`, que solo funcionan dentro de la aplicación corriendo.
- **Presentación (`Navbar`, `Footer`, `Carrusel`, `CategoriaCard`, `BotonCarrito`, `AvisoCarrito`, `DatosCliente`, `ResumenCompra`, `ResultadoCompra`, `BootstrapClient`, 0 %):** son casi solo estructura HTML o dependen del JavaScript de Bootstrap.
- **`CartContext.jsx` (79,79 %):** quedan sin ejecutar algunas funciones auxiliares del contexto, como el manejo de los avisos.

**Cómo se mitiga:** la lógica de esos componentes está sacada a `src/lib` (validaciones de la compra, `crearOrden`, formato de precios, total del carrito) y esa parte sí se prueba al 100 %. Lo que queda sin probar es mayormente presentación y conexión con el router.

**Conclusión:** las pruebas cubren casi por completo la lógica de la tienda y los componentes interactivos (80,62 % de ramas y 83,63 % de funciones en total). El 49,31 % de statements refleja los archivos de presentación y de rutas que no se miden con pruebas unitarias. Como mejora futura se podrían probar `FormularioCompra` y `NavLink` simulando el router de Next, y las páginas con una herramienta de pruebas de extremo a extremo.
