# Mi Tienda

Tienda de videojuegos hecha para el caso semestral de **DSY1104**. El proyecto parte de una plantilla en HTML, CSS, JavaScript y Bootstrap (con un carrito de compras en JavaScript y `localStorage`) y la migramos a **React con Next.js**: dividimos la página en componentes, armamos la navegación, hicimos los formularios con validación y escribimos pruebas para los componentes con **QUnit**.

## Integrantes y asignatura

| Integrante | Usuario de GitHub |
| --- | --- |
| Franco Sepúlveda | [Sepu5](https://github.com/Sepu5) |
| Luis Grossolli | [lugrossolli-ux](https://github.com/lugrossolli-ux) |

- **Asignatura:** DSY1104 (Duoc UC), caso semestral.
- **Repositorio:** https://github.com/Sepu5/mi-tienda

## Tecnologías

| Tecnología | Versión | Para qué la usamos |
| --- | --- | --- |
| [Next.js](https://nextjs.org/) (App Router) | 16.4.3 | Framework, rutas y layout |
| [React](https://react.dev/) / React DOM | 19.3.0 | Componentes, estado y hooks |
| [Bootstrap](https://getbootstrap.com/) | ^5.3.3 | Estilos y componentes visuales (navbar, carrusel, offcanvas, tablas) |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | ^1.13.2 | Íconos |
| [json-server](https://github.com/typicode/json-server) | ^0.17.4 | Fake-api con `db.json` |
| [QUnit](https://qunitjs.com/) | 2.24.1 | Pruebas unitarias (la herramienta vista en clase) |
| jsdom + global-jsdom | 30.1.3 / 30.0.0 | Navegador falso para probar componentes en Node |
| [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) (`@testing-library/react` y `@testing-library/dom`) | 16.3.3 / 10.4.2 | Dibujar componentes y simular clics en las pruebas |
| tsx | 4.23.15 | Permite que Node entienda el JSX de los tests y componentes |
| cross-env | 10.1.0 | Que `npm test` funcione igual en Windows, Linux y Mac |
| ESLint + eslint-config-next | ^9 / 16.4.3 | Revisión del código |

## Requisitos

- **Node.js** LTS reciente. Next.js pide como mínimo la versión 20.9, pero `global-jsdom` (que usan las pruebas) pide **Node 22 o superior**, así que recomendamos Node 22 o más nuevo.
- **npm** (viene con Node).
- **Git**.

## Instalación

```bash
git clone https://github.com/Sepu5/mi-tienda.git
cd mi-tienda
git checkout Desarrollo
npm install
```

## Cómo ejecutar

La tienda necesita **dos terminales abiertas al mismo tiempo**: una para la fake-api y otra para Next.js.

**Terminal 1: fake-api (json-server)**

```bash
npm run api
```

Levanta `db.json` en http://localhost:4000. Los productos quedan en http://localhost:4000/productos (son 20).

**Terminal 2: la tienda**

```bash
npm run dev
```

Abrir http://localhost:3000 en el navegador.

**¿Qué pasa si la API no está corriendo?** Solo la Home pide los productos a la API (`ProductosHome`). Si la API está apagada, la Home muestra un aviso rojo: *"No se pudieron cargar los productos. ¿Está corriendo la fake-api (npm run api)?"*. El resto de las páginas (ofertas, categorías, detalle de producto, carrito, etc.) usan los datos de `src/data/productos.js` y funcionan igual sin la API.

### Otros comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en http://localhost:3000 |
| `npm run build` | Genera la versión de producción |
| `npm start` | Sirve la versión generada con `npm run build` |
| `npm run lint` | Revisa el código con ESLint (hoy: 0 errores y 8 advertencias por usar `<img>` en vez de `next/image`) |
| `npm run api` | Fake-api en http://localhost:4000 |
| `npm test` | Corre las pruebas con QUnit |

## Cómo ejecutar las pruebas

```bash
npm test
```

Al terminar se ve el detalle de cada prueba (`ok 1 ...`, `ok 2 ...`) y un resumen como este:

```
1..82
# pass 82
# skip 0
# todo 0
# fail 0
```

Si todo está bien aparece `# pass 82` y `# fail 0`. El comando usa `cross-env` para definir las variables de entorno, así que **funciona igual en Windows (PowerShell), Linux y Mac**.

## Estructura de carpetas

```
mi-tienda/
├── db.json                  # Base de datos de la fake-api (colección "productos")
├── package.json             # Scripts y dependencias
├── next.config.mjs          # Configuración de Next.js
├── jsconfig.json            # Alias "@/..." que apunta a "src/..."
├── eslint.config.mjs        # Configuración de ESLint
├── tsconfig.qunit.json      # Configuración que usan las pruebas (JSX y alias "@/")
├── public/
│   └── assets/img/          # Imágenes de la plantilla (banners, logo, avatar)
├── src/
│   ├── app/                 # Rutas (una carpeta por página, con su page.js)
│   │   ├── layout.js        # Molde de todas las páginas (Navbar, Footer, CartProvider)
│   │   ├── globals.css      # Estilos propios (los de la plantilla)
│   │   ├── page.js          # Home (/)
│   │   ├── blog/            # /blog
│   │   ├── carrito/         # /carrito
│   │   ├── categorias/      # /categorias
│   │   ├── comprar/         # /comprar
│   │   ├── comprar-ok/      # /comprar-ok
│   │   ├── comprar-error/   # /comprar-error
│   │   ├── contacto/        # /contacto
│   │   ├── crear-sesion/    # /crear-sesion
│   │   ├── iniciar-sesion/  # /iniciar-sesion
│   │   ├── nosotros/        # /nosotros
│   │   ├── ofertas/         # /ofertas
│   │   └── productos/[id]/  # /productos/1, /productos/2, ... (ruta dinámica)
│   ├── components/          # Componentes agrupados por tema
│   │   ├── BootstrapClient.jsx
│   │   ├── auth/            # Campo, LoginForm, RegistroForm
│   │   ├── carrito/         # AvisoCarrito, BotonAgregar, FilaCarrito, ModalEliminar, TablaCarrito
│   │   ├── compra/          # DatosCliente, FormularioCompra, ResultadoCompra, ResumenCompra
│   │   ├── contacto/        # ContactoForm
│   │   ├── home/            # Carrusel, CategoriaCard
│   │   ├── layout/          # BotonCarrito, Footer, MobileMenu, NavLink, Navbar
│   │   └── productos/       # ProductCard, ProductGrid, ProductosHome
│   ├── context/
│   │   └── CartContext.jsx  # Carrito compartido (React Context) + hook useCarrito
│   ├── lib/                 # Lógica pura, sin React (fácil de probar)
│   │   ├── api.js           # URL de la fake-api
│   │   ├── carrito.js       # Agregar, cambiar cantidad, eliminar, total
│   │   ├── compra.js        # Crear la orden de compra
│   │   ├── formato.js       # Formato de precios chilenos
│   │   └── validaciones.js  # Reglas de validación de los formularios
│   └── data/                # Datos fijos
│       ├── categorias.js    # Categorías de la Home
│       ├── productos.js     # Catálogo local de 20 productos
│       └── zonas.js         # Regiones y comunas de Chile
└── test/                    # Pruebas QUnit
    ├── setup.js             # Prepara jsdom para las pruebas de componentes
    ├── test_carrito.js
    ├── test_compra.js
    ├── test_formato.js
    ├── test_validaciones.js
    ├── test_contactoform.jsx
    ├── test_filacarrito.jsx
    ├── test_loginform.jsx
    ├── test_productcard.jsx
    ├── test_registroform.jsx
    └── test_tablacarrito.jsx
```

## Páginas / rutas

| Ruta | Descripción |
| --- | --- |
| `/` | Home: carrusel, categorías y productos (cargados desde la fake-api) |
| `/ofertas` | Productos con descuento (precio anterior mayor que el precio actual) |
| `/categorias` | Tarjetas de categorías y los productos de cada una |
| `/productos/[id]` | Detalle de un producto (ruta dinámica). Si el id no existe muestra la página 404 |
| `/nosotros` | Información de la tienda (página simple por ahora) |
| `/blog` | Entradas del blog |
| `/contacto` | Formulario de contacto con validación |
| `/iniciar-sesion` | Formulario de inicio de sesión con validación |
| `/crear-sesion` | Formulario de registro con validación y región → comuna |
| `/carrito` | Tabla del carrito, total, botones Limpiar y Comprar ahora |
| `/comprar` | Formulario con los datos de envío y el resumen de la compra |
| `/comprar-ok` | Compra exitosa: boleta con los datos del cliente y los productos |
| `/comprar-error` | Pago rechazado, con botón para volver a intentar |

## Análisis de componentes

Hay 24 componentes en `src/components/`, agrupados por tema. En las tablas, el **tipo** indica dónde se ejecuta cada uno:

- **Servidor:** no tiene `"use client"`; se genera en el servidor y no manda JavaScript de React al navegador.
- **Cliente:** tiene `"use client"` porque usa estado, eventos, `localStorage` o hooks del navegador.
- **Compartido:** no tiene `"use client"`, pero tampoco lo necesita: se comporta como servidor cuando lo importa una página y pasa a ejecutarse en el cliente cuando lo importa un componente cliente (por ejemplo `FilaCarrito` dentro de `TablaCarrito`).

### Raíz

| Componente | Tipo | Props | Responsabilidad |
| --- | --- | --- | --- |
| `BootstrapClient` | Cliente | ninguna | Carga el JavaScript de Bootstrap (`bootstrap.bundle.min.js`) en el navegador con `useEffect`, para que funcionen el carrusel, el dropdown y el menú lateral. No dibuja nada. |

### `auth/` (formularios de sesión)

| Componente | Tipo | Props | Responsabilidad |
| --- | --- | --- | --- |
| `Campo` | Compartido | `id`, `label`, `type`, `value`, `onChange`, `onBlur`, `error`, `tocado`, `placeholder`, `disabled`, `autoComplete`, `requerido`, `rows`, `children` | Un campo de formulario con su label, estilos de Bootstrap (`is-valid` / `is-invalid`) y mensaje de error. Sirve para `input`, `select` (`type="select"`) y `textarea` (`type="textarea"`). Lo usan **todos** los formularios. |
| `LoginForm` | Cliente | ninguna | Formulario de inicio de sesión (correo y contraseña) controlado con estado. La validación es real, pero el inicio de sesión es simulado (muestra un mensaje de éxito). |
| `RegistroForm` | Cliente | ninguna | Formulario de crear cuenta con región → comuna dependiente. También simulado al enviar. |

### `carrito/`

| Componente | Tipo | Props | Responsabilidad |
| --- | --- | --- | --- |
| `AvisoCarrito` | Cliente | ninguna | Alerta flotante (abajo a la derecha) con los mensajes del carrito; se cierra sola a los 3 segundos. Está en el layout. |
| `BotonAgregar` | Cliente | `producto`, `className` | Botón "Añadir": llama a `agregar` del contexto. |
| `FilaCarrito` | Compartido | `item`, `onCambiar`, `onEliminar` | Una fila de la tabla: imagen, precio, botones `+` / `-` (deshabilitados en el mínimo o en el stock; no aparecen en productos gratis), subtotal y botón Eliminar. Avisa al padre con callbacks. |
| `ModalEliminar` | Cliente | `producto`, `onConfirmar`, `onCancelar` | Modal de confirmación controlado por React. Se muestra solo cuando `producto` no es `null`. |
| `TablaCarrito` | Cliente | ninguna | Tabla completa del carrito con total, botones Limpiar y Comprar ahora, y el modal para eliminar. Si el carrito está vacío muestra un mensaje con link a la Home. |

### `compra/`

| Componente | Tipo | Props | Responsabilidad |
| --- | --- | --- | --- |
| `DatosCliente` | Compartido | `cliente` | Muestra en solo lectura los datos del cliente y la dirección de entrega (con el nombre de la región). |
| `FormularioCompra` | Cliente | ninguna | Formulario de compra con validación. Al pagar guarda la orden y navega con `useRouter` a `/comprar-ok` o `/comprar-error`. Incluye el checkbox "Simular pago rechazado". |
| `ResultadoCompra` | Cliente | `exito` | Pantalla final de la compra. Lee la última orden de `localStorage` y muestra la boleta (si `exito`) o el detalle del pago rechazado. Si no hay una compra reciente, avisa. |
| `ResumenCompra` | Compartido | `items` | Tabla de solo lectura con los productos de la compra. |

### `contacto/`

| Componente | Tipo | Props | Responsabilidad |
| --- | --- | --- | --- |
| `ContactoForm` | Cliente | ninguna | Formulario de contacto (nombre, correo y mensaje) con validación. Al enviar bien muestra un agradecimiento con el nombre. |

### `home/`

| Componente | Tipo | Props | Responsabilidad |
| --- | --- | --- | --- |
| `Carrusel` | Servidor | ninguna | Carrusel de Bootstrap con 3 slides (los datos están dentro del componente). El JavaScript que lo hace girar lo carga `BootstrapClient`. |
| `CategoriaCard` | Compartido | `categoria` | Tarjeta de una categoría con link a `/categorias`. Se usa en la Home y en Categorías. |

### `layout/`

| Componente | Tipo | Props | Responsabilidad |
| --- | --- | --- | --- |
| `Navbar` | Servidor | ninguna | Barra superior (logo, buscador, botones de sesión y, en celular, botón del carrito y botón del menú) y barra inferior de navegación (visible solo en pantallas grandes). También incluye el `MobileMenu`. |
| `NavLink` | Cliente | `href`, `className`, `children` | Link que se marca como activo según la página actual (usa `usePathname`). |
| `MobileMenu` | Cliente | ninguna | Menú lateral (offcanvas) para celulares con Iniciar sesión, Crear cuenta, Home, Categorías, Ofertas, Nosotros, Blog, Contacto y Carrito. Se cierra solo cuando cambia la ruta. |
| `BotonCarrito` | Cliente | `className`, `compacto` | Botón verde con el total del carrito y la cantidad de productos (lee el contexto). Se usa en la barra de escritorio, en la barra superior del celular (versión `compacto`) y en el menú lateral. |
| `Footer` | Servidor | ninguna | Pie de página con el mapa de Google Maps. |

### `productos/`

| Componente | Tipo | Props | Responsabilidad |
| --- | --- | --- | --- |
| `ProductCard` | Compartido | `producto` | Tarjeta de un producto: imagen, nombre, categoría, precio anterior y actual (o `FREE`), stock, link "Ver" y `BotonAgregar`. |
| `ProductGrid` | Compartido | `productos` | Grilla que dibuja una `ProductCard` por cada producto de la lista. |
| `ProductosHome` | Cliente | ninguna | Pide los productos a la fake-api con `fetch` + `useEffect`, muestra un spinner mientras carga y un aviso si falla. En pantalla deja los primeros 6 como "Productos" y los siguientes 6 como "Los más vistos". |

### Decisiones de diseño

- **Por qué algunos componentes son `"use client"`:** en Next.js los componentes son de servidor por defecto. Pasan a cliente solo cuando necesitan `useState`/`useEffect`, eventos (`onClick`, `onChange`), `localStorage` o hooks de navegación como `usePathname` y `useRouter`. Dejamos el resto sin `"use client"` para mandar menos JavaScript al navegador.
- **Reutilización:** `ProductCard` (dentro de `ProductGrid`) se usa en la Home, Ofertas y Categorías, y `Campo` se usa en los cuatro formularios (login, registro, contacto y compra). Cambiar una tarjeta o un campo se hace en un solo archivo. `ResumenCompra` y `DatosCliente` también se reutilizan en las dos pantallas finales de la compra.
- **Lógica pura separada en `src/lib`:** las reglas del carrito, las validaciones, el formato de precios y la creación de la orden son funciones normales de JavaScript, sin React ni `localStorage`. Reciben datos y devuelven datos nuevos (por ejemplo, el carrito no se modifica, se devuelve uno nuevo), así se pueden probar directamente con QUnit sin dibujar nada.
- **Formularios controlados:** cada formulario guarda en estado `valores` (lo que escribe el usuario), `tocados` (qué campos ya visitó), `intentoEnvio` (si apretó el botón de enviar) y los `errores` **se calculan en cada render** llamando a la función de `validaciones.js`. Un error se muestra solo si el campo fue tocado o ya se intentó enviar, así no aparecen errores antes de que el usuario escriba.

## Manejo de estado

### Carrito (React Context)

El carrito vive en `src/context/CartContext.jsx`. El componente `CartProvider` envuelve toda la aplicación desde `layout.js` y entrega el carrito a cualquier componente cliente mediante el hook **`useCarrito()`**, sin tener que pasar props de componente en componente.

| Valor del contexto | Qué es |
| --- | --- |
| `carrito` | Lista de productos con su `cantidad` |
| `total` | Total a pagar |
| `cantidadTotal` | Cantidad de unidades en el carrito |
| `agregar(producto)` | Agrega un producto |
| `cambiar(id, delta)` | Suma o resta unidades |
| `eliminar(id)` | Quita un producto |
| `limpiar()` | Vacía el carrito |
| `aviso`, `cerrarAviso()` | Mensaje que muestra `AvisoCarrito` |

**Persistencia:** el carrito se guarda en `localStorage` con la clave **`cart`** (la misma que usaba la plantilla HTML). Se lee en un `useEffect` al cargar la página (y no al crear el estado, para no tener errores de hidratación entre servidor y cliente) y se vuelve a guardar cada vez que cambia.

**Reglas del carrito** (en `src/lib/carrito.js`):

- No se puede superar el **stock** del producto, ni al añadirlo ni con el botón `+`.
- Un **producto gratis** (`precio_nuevo` igual a 0) solo se puede llevar **una vez** por compra; su fila no muestra los botones `+` / `-`.
- Si una cantidad llega a 0, el producto se elimina del carrito.
- El total es la suma de `precio_nuevo × cantidad`.
- Las funciones nunca modifican el carrito original: devuelven uno nuevo (y un `error` con el mensaje si no se pudo hacer el cambio).

### Orden de compra

Al pagar en `/comprar`, `crearOrden` (en `src/lib/compra.js`) arma la orden con el cliente, los productos, el total, la fecha en formato ISO y un número (los últimos 8 dígitos de la fecha en milisegundos). La orden se guarda en `localStorage` con la clave **`ultimaCompra`** y un campo `estado`:

- `"pagada"`: se vacía el carrito y se va a `/comprar-ok`.
- `"rechazada"` (si se marcó "Simular pago rechazado"): el carrito se mantiene para reintentar y se va a `/comprar-error`.

`ResultadoCompra` lee esa orden y solo muestra la de su estado: la página de éxito solo muestra órdenes pagadas y la de error solo las rechazadas.

## Navegación

- **`next/link`:** todos los links internos usan `Link` de Next.js, así la navegación no recarga la página completa.
- **`NavLink`:** marca en el navbar la página en la que estás (clase `active` y `aria-current="page"`) usando `usePathname`. El Home solo está activo en `/`; los demás lo están en su ruta y las que cuelgan de ella.
- **Menú lateral en celular:** en pantallas chicas el navbar inferior se oculta y aparecen un botón del carrito (con el total) y un botón que abre un menú lateral (offcanvas de Bootstrap) con todos los links de la tienda. `MobileMenu` detecta con `usePathname` que cambió la ruta y lo **cierra automáticamente** al navegar.
- **Rutas dinámicas:** `/productos/[id]` busca el producto por su id. Cada `ProductCard` lleva a `/productos/<id>` y si el id no existe se muestra la página 404 (`notFound()`).
- **Navegación por código:** `FormularioCompra` usa `useRouter().push(...)` para ir a la pantalla de éxito o de error después de pagar.

## Formularios y validaciones

Las reglas están todas en `src/lib/validaciones.js`. Cada función recibe los valores y devuelve un objeto con los errores (`{ campo: "mensaje" }`); si el objeto está vacío, el formulario es válido. Los textos (nombre, correo, calle, mensaje, etc.) se revisan sin contar los espacios del principio y del final.

| Formulario | Campos | Reglas |
| --- | --- | --- |
| Iniciar sesión (`LoginForm`) | correo, contraseña | Correo obligatorio y con formato válido (`algo@dominio.xx`). Contraseña obligatoria. |
| Crear cuenta (`RegistroForm`) | nombre, correo, contraseña, confirmar, región, comuna | Nombre obligatorio, mínimo 3 caracteres. Correo obligatorio con formato válido. Contraseña obligatoria, **entre 4 y 10 caracteres**. Confirmación obligatoria e igual a la contraseña. Región y comuna obligatorias. |
| Contacto (`ContactoForm`) | nombre, correo, mensaje | Nombre mínimo 3 caracteres. Correo con formato válido. Mensaje **entre 10 y 500 caracteres**. |
| Compra (`FormularioCompra`) | nombre, apellidos, correo, calle, departamento, región, comuna, indicaciones | Nombre y apellidos: mínimo 2 caracteres. Correo con formato válido. Calle: mínimo 5 caracteres. Departamento (opcional): máximo 10 caracteres. Región y comuna obligatorias. Indicaciones (opcional): máximo 200 caracteres. |

Detalles que vale la pena mencionar:

- **Región → comuna dependiente:** en el registro y en la compra, el select de comuna está deshabilitado hasta elegir una región, y solo muestra las comunas de esa región (datos de `src/data/zonas.js`). Si se cambia la región, la comuna elegida antes se borra porque ya no es válida.
- **Mensajes de error y estilos:** cada campo muestra su error debajo (`invalid-feedback`) y se pinta en rojo o verde con las clases de Bootstrap. Los formularios usan `noValidate` para que la validación la haga React y no el navegador.
- **No se puede enviar con datos inválidos:** al enviar, si hay errores se marcan todos los campos y el formulario no avanza.
- **Checkbox "Simular pago rechazado":** está en el formulario de compra, solo para probar. Si está marcado, al pagar se guarda la orden como rechazada y se va a `/comprar-error`.
- El inicio de sesión, el registro y el contacto son **simulados**: validan y muestran un mensaje de éxito, pero no envían los datos a ningún servidor.

## Pruebas (informe)

### Cómo están organizadas

Escribimos las pruebas con **QUnit**, siguiendo el estilo que vimos en clase: cada archivo agrupa sus pruebas con `QUnit.module(...)`, cada caso es un `QUnit.test(...)` y dentro seguimos el patrón **Arrange → Act → Assert** (preparar los datos, ejecutar la función o la acción, y comprobar el resultado con `assert.equal`, `assert.deepEqual`, `assert.ok`, etc.).

Hay dos tipos de pruebas:

1. **Lógica pura** (`.js`): se prueban las funciones de `src/lib` directamente, sin dibujar nada.
2. **Componentes** (`.jsx`): se dibuja el componente con React Testing Library dentro de un navegador falso (jsdom), se simulan clics y escritura, y se revisa lo que aparece en pantalla. Después de cada prueba se limpia con `cleanup()` y se vacía `localStorage`.

### Resultado por archivo

| Archivo | Qué prueba | Pruebas |
| --- | --- | --- |
| `test/test_carrito.js` | `agregarAlCarrito`, `cambiarCantidad`, `eliminarDelCarrito`, `calcularTotal` y `contarProductos`: stock, producto gratis, eliminar al llegar a 0 y que no se modifique el carrito original | 20 |
| `test/test_compra.js` | `crearOrden`: total, items, cliente, fecha ISO, número de orden y carrito vacío | 6 |
| `test/test_formato.js` | `formatearPrecio`: formato chileno con punto de miles, el 0 y precios menores a mil | 4 |
| `test/test_validaciones.js` | `validarLogin`, `validarRegistro`, `validarContacto` y `validarCompra`: casos válidos, vacíos, largos mínimos y máximos | 22 |
| `test/test_productcard.jsx` | `ProductCard`: nombre, categoría, precio con formato, `FREE`, link "Ver" y que "Añadir" guarde el producto en `localStorage` | 5 |
| `test/test_filacarrito.jsx` | `FilaCarrito`: botones `+` / `-` habilitados o deshabilitados, producto gratis, subtotal y callbacks `onCambiar` / `onEliminar` | 8 |
| `test/test_tablacarrito.jsx` | `TablaCarrito`: carrito vacío, filas y total, y el flujo del modal (abrir, confirmar, cancelar, eliminar el último producto) | 6 |
| `test/test_loginform.jsx` | `LoginForm`: errores al enviar vacío, correo sin formato y mensaje de éxito | 3 |
| `test/test_registroform.jsx` | `RegistroForm`: comuna deshabilitada sin región, contraseñas distintas, errores al enviar vacío y éxito | 5 |
| `test/test_contactoform.jsx` | `ContactoForm`: errores al enviar vacío, mensaje muy corto y agradecimiento con el nombre | 3 |
| **Total** | | **82** |

De forma indirecta también se prueban `CartProvider`, `useCarrito`, `BotonAgregar`, `ModalEliminar` y `Campo`, porque forman parte de los componentes anteriores.

### Configuración

- **`test/setup.js`:** usa `global-jsdom` para crear un navegador falso (con `localStorage`, `document`, etc.) antes de correr las pruebas, y activa `IS_REACT_ACT_ENVIRONMENT` para que React sepa que está en un entorno de pruebas.
- **`tsconfig.qunit.json`:** le indica a `tsx` cómo interpretar el JSX (`react-jsx`) y el alias `@/` que usan los componentes. Se llama así (y no `tsconfig.json`) para que Next.js no tome el proyecto como TypeScript.
- **Script `npm test`:** corre QUnit con `tsx` (para entender JSX) y el archivo de preparación, sobre todos los archivos `test/**/test_*.js` y `test/**/test_*.jsx`:

  ```
  cross-env TSX_TSCONFIG_PATH=tsconfig.qunit.json NODE_OPTIONS=--import=tsx qunit --require ./test/setup.js "test/**/test_*.{js,jsx}"
  ```
- Los componentes y tests que tienen JSX usan la extensión **`.jsx`**, porque `tsx` no transforma JSX dentro de archivos `.js`.

### Qué no se prueba directamente

| Componente | Por qué |
| --- | --- |
| `NavLink`, `MobileMenu`, `FormularioCompra` | Dependen del router de Next.js (`usePathname`, `useRouter`), que solo existe dentro de la aplicación corriendo y no en un entorno de pruebas simple. Su lógica sí está cubierta por pruebas de las funciones puras: reglas de validación y creación de la orden. |
| `ProductosHome` | Hace `fetch` a la fake-api, así que depende de que `npm run api` esté corriendo. |
| `Navbar`, `Footer`, `Carrusel`, `CategoriaCard`, `BotonCarrito`, `ProductGrid`, `BootstrapClient` | Son casi solo estructura HTML o dependen del JavaScript de Bootstrap, y la lógica que usan (formato de precios, total del carrito) ya tiene sus pruebas. |
| `AvisoCarrito`, `DatosCliente`, `ResumenCompra`, `ResultadoCompra` | Son pantallas de presentación; la información que muestran sale de `crearOrden` y del carrito, que sí están probados. |

### Resultado obtenido

```
1..82
# pass 82
# skip 0
# todo 0
# fail 0
```

Las **82 pruebas pasan** sin fallas. Además, `npm run build` compila sin errores y `npm run lint` termina con 0 errores (8 advertencias por usar `<img>`).

## Flujo de trabajo con Git y Trello

### Ramas

- `main`: versión final y estable. Solo recibe cambios al final del proyecto.
- `Desarrollo`: rama donde se integran las tareas terminadas. Se crea desde `main`.
- `tarea/<nombre>`: una rama por cada tarea, creada desde `Desarrollo` y que vuelve a `Desarrollo` mediante un Pull Request.

```
main
 └── Desarrollo
      ├── tarea/configuracion-inicial
      ├── tarea/layout
      ├── tarea/home-catalogo
      ├── tarea/paginas-y-navegacion
      ├── tarea/formularios-sesion
      ├── tarea/fake-api
      ├── tarea/carrito
      ├── tarea/formulario-compra
      ├── tarea/pruebas
      ├── tarea/relleno-blog
      ├── tarea/arreglo-dependencias
      ├── tarea/menu-movil
      └── tarea/documentacion
```

### Pull Requests y revisión

Cada tarea se integra con un Pull Request hacia `Desarrollo` que **revisa y aprueba el otro integrante** antes de hacer el merge. Así todos los cambios pasaron por una segunda persona.

| PR | Rama | Qué incluye |
| --- | --- | --- |
| #1 | `tarea/configuracion-inicial` | Proyecto Next.js, Bootstrap, estilos e imágenes de la plantilla |
| #2 | `tarea/layout` | Navbar, menú para celular y footer |
| #3 | `tarea/home-catalogo` | Home: carrusel, categorías y productos (`ProductCard`, `ProductGrid`) |
| #4 | `tarea/paginas-y-navegacion` | Páginas (categorías, ofertas, nosotros, blog, contacto, detalle de producto) y navegación |
| #5 | `tarea/formularios-sesion` | Iniciar sesión y crear cuenta con validación |
| #6 | `tarea/fake-api` | Fake-api con json-server y productos de la Home desde la API |
| #7 | `tarea/carrito` | Lógica del carrito, contexto, página del carrito y modal |
| #8 | `tarea/formulario-compra` | Formulario de contacto, compra, compra exitosa y compra con error |
| #9 | `tarea/pruebas` | Configuración de QUnit y pruebas |
| #10 | `tarea/relleno-blog` | Contenido del blog |
| #11 | `tarea/arreglo-dependencias` | Arreglo de la versión de `jsdom` para que `npm install` funcione en una instalación limpia |
| #12 | `tarea/menu-movil` | Carrito y todos los links en el menú del celular |
| #13 | `tarea/documentacion` | Este README |

Los mensajes de commit son cortos y describen lo que se hizo (por ejemplo, "Agrego el navbar y el footer como componentes").

### Trello

Nos organizamos con un tablero de Trello: [mi-tienda-Fullstack2](https://trello.com/b/yoU20p4r/mi-tienda-fullstack2). Tiene una tarjeta por cada tarea del proyecto y cuatro listas: **Por hacer**, **En progreso**, **En revisión (Pull Request)** y **Listo**. Las tarjetas se mueven de lista a medida que avanza la rama y el compañero revisa el PR.

## Diferencias y mejoras respecto a la plantilla original

| Plantilla (HTML + JS) | Este proyecto (Next.js + React) |
| --- | --- |
| Navbar y footer copiados en cada archivo HTML | `Navbar` y `Footer` se escriben una vez en `layout.js` y se usan en todas las páginas |
| Tarjetas de productos repetidas a mano | Un solo `ProductCard` reutilizado por una lista de datos (Home, Ofertas, Categorías) |
| Un archivo HTML por página, enlazado con `.html` | Rutas de Next.js (`src/app/<ruta>/page.js`) con `next/link`, sin recargar la página, y una ruta dinámica `/productos/[id]` en vez de `producto1.html` |
| Carrito con funciones que manipulan el DOM y `localStorage` directamente | Carrito con estado de React (`CartContext` + `useCarrito`): el total y el contador del navbar se actualizan solos; lógica pura aparte en `src/lib/carrito.js` y probada |
| Modal de eliminar manejado con el JavaScript de Bootstrap | `ModalEliminar` controlado por React: se muestra según el estado (`productoAEliminar`) |
| Formularios sin la lógica del framework | Formularios controlados con estado y validaciones en `src/lib/validaciones.js`, con mensajes de error por campo |
| Regiones y comunas en un archivo de datos | Select de comuna dependiente de la región elegida (`RegistroForm` y `FormularioCompra`) |
| Productos en un archivo JS leído por cada página | Productos de la Home traídos desde una fake-api (json-server) con `fetch` y `useEffect`, con estado de carga y de error |
| Sin avisos visuales propios al agregar productos | `AvisoCarrito`: alerta flotante que avisa cuando se añade un producto o se llega al límite de stock |
| Compra: páginas HTML estáticas de éxito y error | Páginas `/comprar-ok` y `/comprar-error` que leen la orden guardada (`ultimaCompra`) y muestran los datos reales; con opción para simular el rechazo del pago |
| Menú sin saber en qué página estás y sin acceso al carrito en celular | Menú lateral (offcanvas) para celular con todos los links y el carrito, que se cierra solo al navegar; botón del carrito visible en la barra del celular; link activo en el navbar con `NavLink` |
| Sin pruebas | 82 pruebas automatizadas con QUnit |

## Limitaciones conocidas

- El inicio de sesión y el registro son simulados: no hay sesión de usuario ni perfil, y los datos no se guardan.
- Solo la Home usa la fake-api; el detalle de producto, Ofertas, Categorías y el carrito usan `src/data/productos.js`.
- El buscador del navbar todavía no filtra productos y los links de las categorías llevan a `/categorias` completo.
- Las páginas Nosotros y Blog tienen contenido de relleno.
