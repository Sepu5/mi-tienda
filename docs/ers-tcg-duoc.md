# Especificación de Requisitos de Software TCG Duoc

## Versión 2 - Evaluación Parcial 2 - Desarrollo Fullstack II (DSY1104)

Asignatura: Desarrollo Fullstack II (DSY1104)

Integrantes:

Franco Sepúlveda

Luis Andrés Grossolli

### Control de versiones

| Versión | Evaluación | Descripción |
| --- | --- | --- |
| v1 | Evaluación Parcial 1 | Propuesta inicial de la tienda en HTML, CSS y JavaScript. |
| v2 | Evaluación Parcial 2 | Propuesta personalizada TCG Duoc, migrada a React con Next.js, con componentes, navegación, formularios con validación y pruebas unitarias. |

## 1. Presentación del proyecto

En este documento presentamos la última versión de la especificación de requisitos de nuestra tienda online. En la primera evaluación la tienda estaba hecha solo con HTML, CSS y JavaScript. Para esta segunda evaluación migramos la tienda a **React con Next.js**, la dividimos en componentes, armamos la navegación, hicimos los formularios con validación y escribimos pruebas unitarias con QUnit.

El proyecto parte de una plantilla de tienda de videojuegos en HTML, CSS, JavaScript y Bootstrap, que tenía un carrito de compras en JavaScript con `localStorage`. Esa plantilla la personalizamos como **TCG Duoc**, una tienda de cartas Pokémon. El código está en https://github.com/Sepu5/mi-tienda.

### Negocio en el que se basa

TCG Duoc es una tienda online de cartas coleccionables Pokémon TCG (Trading Card Game). Vende 20 cartas del Set Base de 1999, entre ellas cartas comunes, holo raras y cartas de energía, con precios en pesos chilenos. Las cartas se agrupan por tipo: Fuego, Agua, Planta, Eléctrico, Psíquico y Lucha. La ubicación de referencia de la tienda es Duoc UC Sede Maipú (el footer muestra un mapa de Google Maps).

## 2. Problema que queremos resolver

Quien colecciona o juega cartas Pokémon necesita ver qué cartas hay, cuánto cuestan y cuántas quedan, y poder armar una compra de forma simple. Si esa información está repartida en mensajes o en páginas desordenadas, es difícil comparar precios, saber si hay stock y comprar sin equivocarse.

Con TCG Duoc buscamos reunir todo en un solo sitio: un catálogo ordenado por tipo, un carrito que respeta el stock y una compra con datos de envío validados. Además, para la asignatura necesitábamos pasar de una plantilla de páginas HTML sueltas a una aplicación con componentes reutilizables y pruebas.

## 3. Objetivo general

Desarrollar una tienda online de cartas Pokémon con React y Next.js, con navegación entre sus páginas, carrito de compras, formularios con validación y pruebas unitarias de sus componentes y de su lógica.

## 4. Objetivos específicos

- Migrar la plantilla HTML, CSS y JavaScript a una aplicación Next.js (App Router) con React.

- Dividir la interfaz en componentes reutilizables (navbar, footer, tarjetas de producto, formularios, tabla del carrito, etc.).

- Mostrar el catálogo de 20 cartas con su imagen, nombre, tipo, precio y stock, y permitir ver el detalle de cada una.

- Permitir filtrar las cartas por tipo y ver las ofertas.

- Implementar un carrito con React Context que respete el stock, que conserve sus datos con `localStorage` y que muestre el total en el navbar.

- Implementar una compra simulada con formulario de datos de envío y dos resultados posibles: compra exitosa y pago rechazado.

- Hacer formularios controlados (registro, inicio de sesión, contacto y compra) con validación hecha con el estado de React y mensajes de error por campo.

- Usar Bootstrap 5.3.3 para que el sitio se adapte a computador, tablet y celular, incluyendo un menú lateral para celular.

- Traer los productos de la Home desde una fake-api hecha con json-server.

- Escribir pruebas unitarias con QUnit (la herramienta vista en clase) y medir la cobertura de código con c8.

- Documentar el proyecto (README, documento de cobertura y este ERS) y trabajar con GitHub (ramas y Pull Requests revisados entre ambos) y Trello.

## 5. Alcance de esta versión

Esta versión es un frontend completo en Next.js que se puede recorrer de punta a punta: desde ver el catálogo hasta terminar una compra simulada. Los datos de las cartas vienen de archivos del proyecto y, en la Home, de una fake-api local.

Incluye:

- Home con carrusel, categorías y productos cargados desde la fake-api.

- Catálogo de 20 cartas, detalle de cada carta (`/productos/[id]`), página de ofertas y página por tipo de carta (`/categorias/[slug]`).

- Carrito con React Context: agregar, límite por stock, producto gratis máximo 1, cambiar cantidad, eliminar con confirmación, limpiar y persistencia en `localStorage`.

- Compra con formulario de datos de envío (región y comuna dependientes) y pantallas de resultado: compra exitosa (boleta) y pago rechazado.

- Formularios de registro, inicio de sesión y contacto, con validación.

- Páginas Nosotros y Blog (3 entradas).

- Menú lateral para celular con carrito y todos los links.

- 95 pruebas QUnit y reporte de cobertura con c8.

No incluye (somos honestos con esto):

- **Pagos reales:** la compra es una simulación. No se conecta con ningún medio de pago y el checkbox "Simular pago rechazado" existe solo para poder mostrar la pantalla de error.

- **Sesión real y perfil de usuario:** el inicio de sesión y el registro validan los datos y muestran un mensaje de éxito, pero no guardan usuarios ni mantienen una sesión, igual que en la plantilla original.

- **Panel de administración:** no hay mantenedores de productos ni de usuarios.

- **Backend real:** solo hay una fake-api con json-server (`db.json`) y solo la Home la usa.

- Buscador funcional: el campo de búsqueda del navbar está, pero todavía no filtra productos.

## 6. Usuarios del sistema

- **Visitante:** puede recorrer todas las páginas públicas, ver el catálogo, usar el carrito y hacer una compra simulada.

- **Cliente:** es un visitante que usa los formularios de registro e inicio de sesión (simulados) y completa una compra con sus datos de envío. Como no existe una sesión real, no hay diferencia de permisos entre visitante y cliente.

- **Administrador:** es trabajo futuro. En esta versión no existe la vista de administración.

## 7. Navegación y pantallas

Todas las rutas existen como `src/app/<ruta>/page.js`.

| Ruta | Qué muestra |
| --- | --- |
| `/` | Home: carrusel, tarjetas de categorías y productos cargados desde la fake-api. |
| `/ofertas` | Cartas con descuento (precio anterior mayor que el precio actual). |
| `/categorias` | Tarjetas de los tipos de carta y los productos de cada uno. |
| `/categorias/[slug]` | Solo las cartas de un tipo (`fuego`, `agua`, `planta`, `electrico`, `psiquico`, `lucha`). Si el slug no existe muestra la página 404. |
| `/productos/[id]` | Detalle de una carta. Si el id no existe muestra la página 404. |
| `/nosotros` | Información de la tienda: misión y qué vendemos. |
| `/blog` | Tres entradas del blog. |
| `/contacto` | Formulario de contacto con validación. |
| `/iniciar-sesion` | Formulario de inicio de sesión con validación (simulado). |
| `/crear-sesion` | Formulario de registro con validación y región y comuna dependientes (simulado). |
| `/carrito` | Tabla del carrito, total y botones Limpiar y Comprar ahora. |
| `/comprar` | Formulario con los datos de envío y resumen de la compra. |
| `/comprar-ok` | Compra exitosa: boleta con los datos del cliente y los productos. |
| `/comprar-error` | Pago rechazado, con botón para volver a intentar. |

La navegación usa `next/link`, un link activo en el navbar (`NavLink`) y, en celular, un menú lateral (offcanvas de Bootstrap) que se cierra solo al cambiar de página.

## 8. Requerimientos funcionales y estado actual

Estados: **Implementado** (funciona de verdad dentro de la tienda), **Simulado** (valida y responde, pero no guarda ni envía datos a un servidor) y **Pendiente** (no está hecho).

| ID | Requisito | Prioridad | Estado |
| --- | --- | --- | --- |
| RF01 | El sitio debe mostrar el catálogo de cartas con imagen, nombre, tipo, precio y stock. | Alta | Implementado |
| RF02 | El sitio debe mostrar el detalle de una carta en `/productos/[id]` y la página 404 si no existe. | Alta | Implementado |
| RF03 | El sitio debe tener una página de ofertas con las cartas que tienen descuento. | Media | Implementado |
| RF04 | El sitio debe agrupar las cartas por tipo y mostrar una página por cada tipo (`/categorias/[slug]`). | Alta | Implementado |
| RF05 | El usuario debe poder agregar una carta al carrito. | Alta | Implementado |
| RF06 | El carrito no debe permitir superar el stock de la carta. | Alta | Implementado |
| RF07 | Un producto gratis solo se puede llevar una vez por compra. | Media | Implementado |
| RF08 | El usuario debe poder cambiar la cantidad de una carta con los botones + y -. | Alta | Implementado |
| RF09 | El usuario debe poder eliminar una carta del carrito con un modal de confirmación. | Media | Implementado |
| RF10 | El usuario debe poder vaciar el carrito con el botón Limpiar. | Media | Implementado |
| RF11 | El navbar debe mostrar el total y la cantidad de productos del carrito. | Media | Implementado |
| RF12 | El carrito debe conservarse al recargar la página (`localStorage`, clave `cart`). | Alta | Implementado |
| RF13 | La compra debe pedir datos de envío (nombre, apellidos, correo, calle, departamento, región, comuna e indicaciones) con validación. | Alta | Implementado |
| RF14 | La compra debe mostrar una pantalla de compra exitosa con la boleta (`/comprar-ok`) y una de pago rechazado (`/comprar-error`). | Alta | Simulado |
| RF15 | El sitio debe tener un formulario de registro con validación y región y comuna dependientes. | Alta | Simulado |
| RF16 | El sitio debe tener un formulario de inicio de sesión con validación de correo y contraseña. | Alta | Simulado |
| RF17 | El sitio debe tener un formulario de contacto con validación y mensaje de agradecimiento. | Media | Simulado |
| RF18 | El sitio debe tener una página Blog con entradas. | Baja | Implementado |
| RF19 | El sitio debe tener una página Nosotros. | Baja | Implementado |
| RF20 | El sitio debe adaptarse a celular con un menú lateral que incluya el carrito y todos los links. | Alta | Implementado |
| RF21 | Los productos de la Home deben cargarse desde la fake-api, con estado de carga y aviso de error. | Media | Implementado |
| RF22 | Los formularios deben mostrar mensajes de error por campo y no permitir enviar con datos inválidos. | Alta | Implementado |
| RF23 | El navbar debe tener un buscador que filtre cartas. | Baja | Pendiente |
| RF24 | El sitio debe tener inicio de sesión real con sesión y perfil de usuario. | Media | Pendiente |
| RF25 | El administrador debe poder mantener productos y usuarios (panel de administración). | Baja | Pendiente |
| RF26 | La compra debe conectarse con un medio de pago real. | Baja | Pendiente |

En total son 26 requerimientos funcionales: 18 implementados, 4 simulados y 4 pendientes.

## 9. Validaciones y reglas de negocio

Las reglas de los formularios están en `src/lib/validaciones.js`. Cada función devuelve un objeto con los errores (`{ campo: "mensaje" }`); si el objeto está vacío, el formulario es válido. Los textos se revisan sin contar los espacios del principio y del final. Un error se muestra solo si el campo fue tocado o si ya se intentó enviar el formulario.

El formato de correo que se pide en todos los formularios es `algo@dominio.xx` (expresión regular `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$`).

### Registro e inicio de sesión

Inicio de sesión (`validarLogin`):

| Campo | Regla | Mensaje |
| --- | --- | --- |
| Correo | Obligatorio | "Debes escribir tu correo." |
| Correo | Formato válido | "El correo no tiene un formato válido." |
| Contraseña | Obligatoria (no se revisa el largo al iniciar sesión) | "Debes escribir tu contraseña." |

Registro (`validarRegistro`):

| Campo | Regla | Mensaje |
| --- | --- | --- |
| Nombre | Obligatorio | "Debes escribir tu nombre." |
| Nombre | Mínimo 3 caracteres | "El nombre debe tener al menos 3 caracteres." |
| Correo | Obligatorio y con formato válido | Los mismos mensajes del inicio de sesión. |
| Contraseña | Obligatoria | "Debes escribir tu contraseña." |
| Contraseña | Entre 4 y 10 caracteres | "La contraseña debe tener entre 4 y 10 caracteres." |
| Confirmar contraseña | Obligatoria | "Debes confirmar tu contraseña." |
| Confirmar contraseña | Igual a la contraseña | "Las contraseñas no coinciden." |
| Región | Obligatoria | "Selecciona una región." |
| Comuna | Obligatoria | "Selecciona una comuna." |

El select de comuna está deshabilitado hasta elegir una región y solo muestra las comunas de esa región (datos de `src/data/zonas.js`). Al enviar bien, ambos formularios muestran un mensaje de éxito, pero no se guarda ningún usuario.

### Contacto

`validarContacto`:

| Campo | Regla | Mensaje |
| --- | --- | --- |
| Nombre | Obligatorio | "Debes escribir tu nombre." |
| Nombre | Mínimo 3 caracteres | "Tu nombre debe tener al menos 3 caracteres." |
| Correo | Obligatorio y con formato válido | "Debes escribir tu correo." / "El correo no tiene un formato válido." |
| Mensaje | Obligatorio | "Debes escribir tu mensaje." |
| Mensaje | Mínimo 10 caracteres | "Tu mensaje debe tener al menos 10 caracteres." |
| Mensaje | Máximo 500 caracteres | "Tu mensaje no puede superar los 500 caracteres." |

### Compra

`validarCompra`:

| Campo | Regla | Mensaje |
| --- | --- | --- |
| Nombre | Obligatorio, mínimo 2 caracteres | "Debes escribir tu nombre." / "Tu nombre debe tener al menos 2 caracteres." |
| Apellidos | Obligatorios, mínimo 2 caracteres | "Debes escribir tus apellidos." / "Los apellidos deben tener al menos 2 caracteres." |
| Correo | Obligatorio y con formato válido | "Debes escribir tu correo." / "El correo no tiene un formato válido." |
| Calle | Obligatoria, mínimo 5 caracteres | "Debes escribir la calle." / "La calle debe tener al menos 5 caracteres." |
| Departamento | Opcional, máximo 10 caracteres | "El departamento no puede superar los 10 caracteres." |
| Región | Obligatoria | "Selecciona una región." |
| Comuna | Obligatoria | "Selecciona una comuna." |
| Indicaciones | Opcional, máximo 200 caracteres | "Las indicaciones no pueden superar los 200 caracteres." |

Si hay errores al enviar, se marcan todos los campos y el formulario no avanza. Si el formulario es válido, se guarda la orden y se va a `/comprar-ok`. Si está marcado "Simular pago rechazado", se guarda como rechazada y se va a `/comprar-error`.

### Carrito

Las reglas están en `src/lib/carrito.js` y no modifican el carrito original (devuelven uno nuevo y un `error` si no se pudo hacer el cambio):

- Al agregar una carta que no está en el carrito, se agrega con cantidad 1.

- No se puede superar el stock, ni al agregar ni con el botón +. Mensaje: "No puedes añadir más de N unidades de NOMBRE."

- Un producto gratis (`precio_nuevo` igual a 0) solo se puede llevar una vez por compra. Mensaje: "Solo puedes añadir un producto gratis por compra." Su fila no muestra los botones + y -.

- Si la cantidad llega a 0 o menos, la carta se elimina del carrito.

- El total es la suma de `precio_nuevo` por `cantidad` de cada carta.

- Los precios se muestran con formato chileno (por ejemplo "$ 5.999") con `formatearPrecio` de `src/lib/formato.js`.

- Una carta se considera en oferta cuando su `precio_descuento` es mayor que su `precio_nuevo`, y el precio anterior tachado solo se muestra en ese caso.

## 10. Requerimientos no funcionales

| ID | Categoría | Requisito |
| --- | --- | --- |
| RNF01 | Usabilidad | Los formularios muestran un mensaje de error debajo de cada campo y se pintan en rojo o verde con las clases de Bootstrap. El carrito avisa con una alerta flotante que se cierra sola a los 3 segundos. |
| RNF02 | Diseño responsive | El sitio se adapta a computador, tablet y celular con Bootstrap 5.3.3 (grilla de tarjetas `row-cols-2 row-cols-md-4 row-cols-lg-6`, navbar y menú lateral para celular). |
| RNF03 | Rendimiento | Los componentes sin estado se dejan como componentes de servidor para mandar menos JavaScript al navegador, y las páginas de tipo de carta se generan al hacer el build (`generateStaticParams`). |
| RNF04 | Mantenibilidad | El código se divide en componentes por carpeta (`auth`, `carrito`, `compra`, `contacto`, `home`, `layout`, `productos`), con la lógica pura separada en `src/lib`. Un componente como `Campo` o `ProductCard` se cambia en un solo archivo. |
| RNF05 | Compatibilidad | El sitio funciona en navegadores actuales de escritorio y celular con soporte de Bootstrap 5 y de `localStorage`. |
| RNF06 | Calidad | La lógica y los componentes principales tienen 95 pruebas QUnit que pasan, y la cobertura se mide con c8. `npm run lint` termina con 0 errores. |
| RNF07 | Portabilidad | Los scripts usan `cross-env`, por lo que `npm test` y `npm run coverage` funcionan igual en Windows, Linux y Mac. Se recomienda Node 22 o superior. |
| RNF08 | Seguridad básica | Los formularios son simulados y no envían datos a ningún servidor. No se guardan contraseñas ni datos de pago reales; en `localStorage` solo se guardan el carrito y la última orden de compra. |
| RNF09 | Trazabilidad | El trabajo está versionado en GitHub con ramas por tarea y Pull Requests revisados por el otro integrante, y organizado en un tablero de Trello. |

En total son 9 requerimientos no funcionales.

## 11. Información principal del sistema

### Carta o producto

Está en `src/data/productos.js` (20 cartas) y en `db.json` (los mismos 20 productos, colección `productos`).

| Campo | Descripción |
| --- | --- |
| `id` | Número que identifica la carta. |
| `imagen` | URL de la imagen de la carta (Pokémon TCG API). |
| `nombre` | Nombre de la carta, por ejemplo Charizard. |
| `categoria` | Tipo de la carta (Fuego, Agua, Planta, Eléctrico, Psíquico o Lucha). |
| `descripcion` | Texto con número de carta en el Set Base, rareza y una frase. |
| `precio_descuento` | Precio anterior. |
| `precio_nuevo` | Precio actual. Si es 0, la carta es gratis. |
| `stock` | Unidades disponibles. |

### Categoría

Está en `src/data/categorias.js` (6 categorías). Campos: `id`, `nombre`, `slug` (para la ruta `/categorias/[slug]`), `descripcion` e `imagen`.

### Ítem de carrito

Es una carta con un campo extra `cantidad`. Se guarda en `localStorage` con la clave `cart`.

### Orden de compra

`crearOrden` (en `src/lib/compra.js`) arma la orden con `numero` (los últimos 8 dígitos de la fecha en milisegundos), `fecha` (formato ISO), `cliente` (datos del formulario de compra), `items` (el carrito) y `total`. Al pagar se le agrega un campo `estado` (`"pagada"` o `"rechazada"`) y se guarda en `localStorage` con la clave `ultimaCompra`. Si el pago fue exitoso se vacía el carrito; si fue rechazado, el carrito se mantiene para reintentar.

### Usuario o registro simulado

El formulario de registro pide nombre, correo, contraseña, confirmación, región y comuna. Estos datos solo se validan en pantalla: no se guardan en ninguna parte.

### Flujo principal

Visitante -> Catálogo (Home, categorías u ofertas) -> Detalle de carta -> Carrito -> Compra (datos de envío) -> Resultado (`/comprar-ok` o `/comprar-error`).

## 12. Arquitectura y tecnologías

La aplicación usa el **App Router** de Next.js: cada página es una carpeta con su `page.js` dentro de `src/app`. Los componentes de React están en `src/components`, agrupados por tema. El carrito se comparte con **React Context** (`src/context/CartContext.jsx`, hook `useCarrito`). Las reglas del carrito, las validaciones, el formato de precios, la orden de compra y el filtro de categorías están en `src/lib` como funciones normales de JavaScript, sin React, para poder probarlas directamente con QUnit. La **fake-api** es un servidor json-server que sirve `db.json` en el puerto 4000.

| Tecnología | Versión | Para qué la usamos |
| --- | --- | --- |
| Next.js (App Router) | 16.4.3 | Framework, rutas y layout |
| React y React DOM | 19.3.0 | Componentes, estado y hooks |
| Bootstrap | ^5.3.3 | Estilos y componentes visuales |
| Bootstrap Icons | ^1.13.2 | Íconos |
| json-server | ^0.17.4 | Fake-api con `db.json` |
| QUnit | 2.24.1 | Pruebas unitarias |
| jsdom y global-jsdom | 30.1.3 y 30.0.0 | Navegador falso para probar componentes en Node |
| @testing-library/react y @testing-library/dom | 16.3.3 y 10.4.2 | Dibujar componentes y simular clics |
| tsx | 4.23.15 | Que Node entienda el JSX de los tests |
| cross-env | 10.1.0 | Variables de entorno en Windows, Linux y Mac |
| c8 | 12.0.0 | Cobertura de código |
| ESLint y eslint-config-next | ^9 y 16.4.3 | Revisión del código |

Estructura de carpetas (resumida):

```
mi-tienda/
├── db.json                  # fake-api (colección "productos")
├── docs/                    # documentación (cobertura y este ERS)
├── public/assets/img/       # logo propio en SVG
├── src/
│   ├── app/                 # rutas (una carpeta por página)
│   ├── components/          # auth, carrito, compra, contacto, home, layout, productos
│   ├── context/             # CartContext.jsx
│   ├── lib/                 # lógica pura (carrito, validaciones, compra, catalogo, formato, api)
│   └── data/                # categorias.js, productos.js, zonas.js
└── test/                    # pruebas QUnit
```

Flujo de datos de una compra:

```
ProductCard -> BotonAgregar -> CartContext (carrito en localStorage "cart")
   -> /carrito (TablaCarrito) -> /comprar (FormularioCompra + validarCompra)
   -> crearOrden -> localStorage "ultimaCompra" -> /comprar-ok o /comprar-error
```

## 13. Requisitos implementados respecto a la pauta

Las pruebas unitarias las hicimos con **QUnit**, que es la herramienta que vimos en clase.

| Indicador de la pauta | Cómo se cumple | Evidencia |
| --- | --- | --- |
| IE2.1.1 Framework JavaScript | Migramos la plantilla HTML a React con Next.js 16 (App Router), con rutas, layout compartido y rutas dinámicas. | `src/app/`, `package.json` |
| IE2.1.2 Componentes, props, estado y responsive con Bootstrap | 24 componentes reutilizables que reciben props (por ejemplo `ProductCard`, `Campo`, `FilaCarrito`), estado con `useState` y `useEffect`, Context para el carrito y diseño responsive con Bootstrap 5.3.3. | `src/components/`, `src/context/CartContext.jsx`, `README.md` (sección Análisis de componentes) |
| IE2.2.1 Pruebas unitarias | 95 pruebas QUnit que pasan, sobre la lógica de `src/lib` y sobre los componentes con comportamiento. | `test/`, comando `npm test` |
| IE2.3.1 Proceso de testeo: entorno, mocks, análisis y cobertura | Entorno con jsdom, React Testing Library y tsx. Mocks de `fetch`, funciones espía y `localStorage`. Análisis de resultados y cobertura con c8 (`npm run coverage`). | `test/setup.js`, `tsconfig.qunit.json`, `test/test_productoshome.jsx`, `docs/cobertura-testing.md`, `docs/cobertura-testing.docx` |

Resultado de la cobertura medida con c8: 49,31 % de statements y líneas, 80,62 % de ramas y 83,63 % de funciones. La lógica de `src/lib` está al 100 %.

## 14. Criterios de aceptación

- Un visitante puede recorrer todas las rutas de la sección 7 sin errores.

- La Home muestra los productos traídos de la fake-api cuando `npm run api` está corriendo, y un aviso rojo cuando está apagada.

- Cada tipo de carta tiene su página en `/categorias/[slug]` y un slug inexistente muestra la página 404.

- Al agregar una carta al carrito, el total y la cantidad del navbar se actualizan, y el carrito se mantiene al recargar la página.

- El carrito no deja superar el stock de una carta ni llevar más de un producto gratis.

- Eliminar una carta pide confirmación en un modal, y si la cantidad baja a 0 la carta sale del carrito.

- Los formularios muestran los mensajes de error de la sección 9 y no se pueden enviar con datos inválidos.

- La comuna se habilita solo después de elegir una región y muestra solo las comunas de esa región.

- Una compra con datos válidos lleva a `/comprar-ok`, muestra la boleta y vacía el carrito.

- Una compra con "Simular pago rechazado" lleva a `/comprar-error` y mantiene el carrito.

- En celular, el menú lateral muestra todos los links y el carrito, y se cierra al cambiar de página.

- `npm test` termina con `# pass 95` y `# fail 0`.

- `npm run lint` termina con 0 errores y `npm run build` compila sin errores.

## 15. Riesgos y mejoras pendientes

- **Datos duplicados:** las 20 cartas están en `src/data/productos.js` y también en `db.json`. Si se cambia una, hay que cambiar la otra. Solo la Home usa la fake-api; el detalle, las ofertas, las categorías y el carrito usan `src/data/productos.js`.

- **Buscador sin funcionar:** el campo de búsqueda del navbar todavía no filtra productos.

- **Sesión simulada:** el inicio de sesión y el registro solo validan; no hay usuarios guardados, sesión ni perfil.

- **Sin panel de administración:** no hay mantenedores de productos ni de usuarios.

- **Compra simulada:** no hay pago real ni envío real, y la última orden queda solo en el `localStorage` del navegador.

- **Cobertura de líneas cercana al 49 %:** las pruebas cubren la lógica y los componentes con comportamiento, pero no las páginas de `src/app` ni los componentes que dependen del router de Next.js (`NavLink`, `MobileMenu`, `FormularioCompra`) ni los de presentación. Podría mejorarse con pruebas con un router simulado.

- **Imágenes externas:** las imágenes de las cartas se cargan desde `images.pokemontcg.io`. Si ese sitio falla o no hay internet, no se ven las cartas.

- **Advertencias de lint:** `npm run lint` tiene 0 errores, pero 7 advertencias por usar `<img>` en vez de `next/image`.

- **Versiones muy nuevas:** el proyecto usa versiones recientes de Next.js, React y jsdom, y las pruebas piden Node 22 o superior; con una versión de Node más antigua `npm install` o las pruebas pueden fallar.

## 16. Conclusión

Con esta versión del proyecto pasamos de una plantilla de tienda en HTML, CSS y JavaScript a una aplicación en React con Next.js, personalizada como TCG Duoc, una tienda de cartas Pokémon del Set Base. La tienda tiene catálogo, detalle, ofertas, categorías por tipo, carrito con Context, compra simulada con resultado exitoso o rechazado, formularios con validación hecha con el estado de React, menú responsive y una fake-api para la Home.

Escribimos 95 pruebas unitarias con QUnit, medimos la cobertura con c8 y dejamos documentado el proceso de testeo. También trabajamos con ramas y Pull Requests revisados entre los dos integrantes y con un tablero de Trello.

Quedan como trabajo futuro la sesión real y el perfil de usuario, el panel de administración, un buscador que funcione, un pago real y un backend de verdad que reemplace a la fake-api y evite tener los datos duplicados.

## Créditos de imágenes

Las imágenes de las cartas vienen de la Pokémon TCG API (https://pokemontcg.io). Pokémon y sus marcas pertenecen a Nintendo, Creatures y GAME FREAK / The Pokémon Company. Este es un proyecto académico, de uso académico y sin fines comerciales. El logo (`public/assets/img/logo-tcg-duoc.svg`) es de creación propia.
