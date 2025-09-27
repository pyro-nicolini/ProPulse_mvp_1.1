# ProPulse Backend v1.2 🏋️‍♂️

Desarrollo de **Marketplace fitness** con **React** y **Vite**.  
Backend encargado de la lógica de negocio, cálculos y datos sensibles.

---

## 🚀 Características

- 🔑 **Autenticación**
- 🛒 **Carrito y Pedidos**  
  Rutas de ítems anidadas dentro del carrito.
- 📦 **Productos y Servicios**
- ❤️ **Favoritos**
- ⭐ **Reseñas**
- 🎨 **Interfaz responsiva**
- 🔧 **Lógica de negocio en backend** (cálculos, seguridad e integridad de datos)

---

## 🔧 Mejoras Implementadas

0. **Arquitectura simplificada**: endpoints agrupados por *Marketplace*, *Productos* y *Autorización*.  
1. 🔑 **Middleware** para diferenciar *Clientes* y *Admin*.  
2. 🛒 **Carrito y Pedidos**:  
   - 2a. Unicidad de carritos (1 carro "Abierto" por usuario).  
   - 2b. Creación automática de carrito abierto al hacer **LOGIN()**.  
   - 2c. Ítems del carrito y detalles del pedido anidados.  
   - 2d. Cálculo dinámico del **total parcial** según cantidades y precios.  
   - 2e. Cierre de carrito y consolidación a **Pedido**, fijando el precio para integridad de la transacción.  
3. 📦 **Productos y Servicios**: lógica de conteo de likes ❤️ integrada.  
4. ⭐❤️ **Reseñas y Favoritos**:  
   - 4a. Uso de `PATCH` y `PUT`.  
   - 4b. Endpoints y lógica movidos a **Productos (routes)**.  
5. 🔧 **Testing**: integración con **Jest** y **Supertest**.  

---

## 📡 Endpoints

### 🔑 Auth & Usuarios
| Método  | Endpoint        | Descripción |
|---------|-----------------|-------------|
| POST    | `/auth/register` | Registrar un nuevo usuario |
| POST    | `/auth/login`    | Iniciar sesión y obtener token |
| GET     | `/auth/me`       | Obtener perfil del usuario autenticado |
| GET     | `/usuarios/me`   | Obtener todos los usuarios *(Admin)* |
| PUT     | `/usuarios/:id`  | Actualizar usuario (propio o por Admin) |
| DELETE  | `/usuarios/:id`  | Eliminar perfil del usuario *(Admin)* |

---

### 🛒 Carritos
| Método   | Endpoint             | Descripción |
|----------|----------------------|-------------|
| GET      | `/carritos/me`       | Obtener carrito abierto del usuario |
| (AUTO)   | `/auth/login`        | Crear carrito "Abierto" (si no existe al logear) |
| PUT      | `/carritos/detalle`  | Agregar ítem al carrito |
| PATCH    | `/carritos/detalle`  | Disminuir cantidad de ítem |
| DELETE   | `/carritos/detalle`  | Eliminar ítem del carrito |
| GET      | `/carritos/me/total` | Calcular total dinámico del carrito |
| DELETE   | `/carritos/admin`    | Eliminar carrito de un usuario *(Admin)* |

---

### 📦 Pedidos
| Método  | Endpoint           | Descripción |
|---------|--------------------|-------------|
| POST    | `/pedidos/checkout` | Confirmar carrito y crear pedido |
| GET     | `/pedidos/me`       | Listar pedidos del usuario |
| GET     | `/pedidos/admin`    | Listar todos los pedidos *(Admin)* |
| PUT     | `/pedidos/admin`    | Actualizar estado de pedidos *(Admin)* |

---

### 🛍️ Productos
| Método  | Endpoint                | Descripción |
|---------|-------------------------|-------------|
| GET     | `/productos`            | Listar productos y servicios |
| GET     | `/productos/:id`        | Obtener detalle de producto |
| POST    | `/productos/admin`      | Crear producto *(Admin)* |
| PUT     | `/productos/admin/:id`  | Actualizar producto *(Admin)* |
| DELETE  | `/productos/admin/:id`  | Eliminar producto *(Admin)* |

---

### ❤️ Favoritos / Likes
| Método  | Endpoint        | Descripción |
|---------|-----------------|-------------|
| GET     | `/likes`        | Obtener likes ❤️ de un producto |
| POST    | `/likes/:id`    | Dar like ❤️ a un producto |
| DELETE  | `/likes/:id`    | Quitar like ❤️ |

---

### ⭐ Reseñas
| Método  | Endpoint           | Descripción |
|---------|--------------------|-------------|
| GET     | `/resenas`         | Listar reseñas de productos |
| GET     | `/resenas/:id`     | Obtener reseña por ID |
| POST    | `/resenas/:id`     | Crear reseña para un producto |
| PUT     | `/resenas/:id`     | Editar reseña |
| DELETE  | `/resenas/:id`     | Eliminar reseña |

---

## ▶️ Instalación

```bash
npm install
npm run dev
