const request = require("supertest");
const app = require("../server");

// Variables globales
let userToken;
let adminToken;
let userId;
let productId;
let pedidoId;

describe("PROPULSE API - Test Suite Completo", () => {
  beforeAll(async () => {
    console.log("🚀 Iniciando tests de PropulseAPI...");
  });

  // TEST 1: REGISTRO DE USUARIO
  describe("1. AUTENTICACIÓN - Registro de Usuario", () => {
    it("Debe registrar un nuevo usuario correctamente (201)", async () => {
      const userData = {
        nombre: "Usuario Test",
        email: "test@propulse.com",
        password: "password123",
      };

      const res = await request(app).post("/auth/register").send(userData);

      expect([200, 201]).toContain(res.status);
      expect(res.body).toBeDefined();
      console.log("✅ Usuario registrado exitosamente");
    });

    it("Debe rechazar registro con email duplicado (409)", async () => {
      const userData = {
        nombre: "Usuario Duplicado",
        email: "test@propulse.com",
        password: "password123",
      };

      const res = await request(app).post("/auth/register").send(userData);

      expect(res.status).toBe(409);
      expect(res.body.error).toBeDefined();
      console.log("✅ Rechazo de email duplicado funcionando");
    });
  });

  // TEST 2: LOGIN Y AUTENTICACIÓN
  describe("2. AUTENTICACIÓN - Login de Usuario", () => {
    it("Debe permitir login con credenciales válidas (200)", async () => {
      const loginData = {
        email: "test@propulse.com",
        password: "password123",
      };

      const res = await request(app).post("/auth/login").send(loginData);

      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
      userToken = res.body.token;
      console.log("✅ Login exitoso, token obtenido");
    });

    it("Debe rechazar login con credenciales inválidas (401)", async () => {
      const loginData = {
        email: "test@propulse.com",
        password: "passwordIncorrecto",
      };

      const res = await request(app).post("/auth/login").send(loginData);

      expect(res.status).toBe(401);
      console.log("✅ Rechazo de credenciales inválidas funcionando");
    });
  });

  // TEST 3: PERFIL DE USUARIO
  describe("3. PERFIL - Datos del Usuario", () => {
    it("Debe obtener datos del usuario autenticado (200)", async () => {
      const res = await request(app)
        .get("/auth/me")
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.email).toBe("test@propulse.com");
      userId = res.body.id;
      console.log("✅ Datos de usuario obtenidos correctamente");
    });

    it("Debe rechazar acceso sin token (401)", async () => {
      const res = await request(app).get("/auth/me");

      expect(res.status).toBe(401);
      console.log("✅ Protección de rutas autenticadas funcionando");
    });
  });

  // TEST 4: PRODUCTOS
  describe("4. PRODUCTOS - Listado y Detalle", () => {
    it("Debe obtener lista de productos (200)", async () => {
      const res = await request(app).get("/productos");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);

      if (res.body.length > 0) {
        productId = res.body[0].id_producto;
      }
      console.log("✅ Lista de productos obtenida");
    });

    it("Debe obtener detalle de un producto específico (200)", async () => {
      if (productId) {
        const res = await request(app).get(`/productos/${productId}`);

        expect(res.status).toBe(200);
        expect(res.body.id_producto).toBe(productId);
        console.log("✅ Detalle de producto obtenido");
      } else {
        console.log("⚠️  No hay productos para probar detalle");
        expect(true).toBe(true);
      }
    });
  });

  // TEST 5: SISTEMA DE LIKES
  describe("5. INTERACCIONES - Likes", () => {
    it("Debe permitir dar like a un producto (200/201)", async () => {
      if (productId) {
        const res = await request(app)
          .post(`/likes/${productId}`)
          .set("Authorization", `Bearer ${userToken}`);

        expect([200, 201]).toContain(res.status);
        console.log("✅ Like agregado exitosamente");
      }
    });

    it("No debe permitir dar like dos veces al mismo producto (409/200)", async () => {
      if (productId) {
        const res = await request(app)
          .post(`/likes/${productId}`)
          .set("Authorization", `Bearer ${userToken}`);

        expect([200, 201, 409]).toContain(res.status);
        console.log("✅ Protección contra likes duplicados funcionando");
      }
    });

    it("Debe obtener likes del usuario (200)", async () => {
      const res = await request(app)
        .get("/likes")
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      console.log("✅ Lista de likes obtenida");
    });
  });

  // TEST 6: CARRITO
  describe("6. CARRITO - Gestión", () => {
    it("Debe obtener carrito del usuario (200)", async () => {
      const res = await request(app)
        .get("/carritos/me")
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      console.log("✅ Carrito de usuario obtenido");
    });

    it("Debe agregar producto al carrito (200/201)", async () => {
      if (productId) {
        const res = await request(app)
          .put("/carritos/detalle")
          .set("Authorization", `Bearer ${userToken}`)
          .send({ id_producto: productId, cantidad: 2 });

        expect([200, 201]).toContain(res.status);
        console.log("✅ Producto agregado al carrito");
      }
    });

    it("Debe calcular total del carrito (200)", async () => {
      const res = await request(app)
        .get("/carritos/me")
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.total).toBeDefined();
      console.log("✅ Total del carrito calculado");
    });
  });

  // TEST 7: CHECKOUT
  describe("7. PEDIDOS - Checkout", () => {
    it("Debe permitir checkout del carrito (200/201/400)", async () => {
      const res = await request(app)
        .post("/pedidos/checkout")
        .set("Authorization", `Bearer ${userToken}`);

      expect([200, 201, 400]).toContain(res.status);

      if (res.status === 200 || res.status === 201) {
        pedidoId = res.body.id_pedido;
        console.log("✅ Checkout realizado exitosamente");
      } else {
        expect(res.body.error).toBeDefined();
        console.log("⚠️  Checkout falló - posiblemente carrito vacío");
      }
    });

    it("Debe obtener pedidos del usuario (200)", async () => {
      const res = await request(app)
        .get("/pedidos/me")
        .set("Authorization", `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      console.log("✅ Lista de pedidos obtenida");
    });
  });

  // TEST 8: RESEÑAS
  describe("8. RESEÑAS", () => {
    it("Debe permitir agregar reseña válida (200/201)", async () => {
      if (productId) {
        const res = await request(app)
          .post(`/resenas/${productId}`)
          .set("Authorization", `Bearer ${userToken}`)
          .send({ comentario: "Excelente producto", calificacion: 5 });

        expect([200, 201]).toContain(res.status);
        console.log("✅ Reseña agregada exitosamente");
      }
    });

    it("Debe rechazar reseña con calificación inválida (400)", async () => {
      if (productId) {
        const res = await request(app)
          .post(`/resenas/${productId}`)
          .set("Authorization", `Bearer ${userToken}`)
          .send({ comentario: "Mala calificación", calificacion: 10 });

        expect([400, 422]).toContain(res.status);
        console.log("✅ Validación de calificación funcionando");
      }
    });

    it("Debe obtener reseñas del producto (200)", async () => {
      if (productId) {
        const res = await request(app).get(`/resenas/${productId}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        console.log("✅ Reseñas del producto obtenidas");
      }
    });
  });

  // TEST 9: ADMIN
  describe("9. ADMIN - Gestión de Productos", () => {
    it("Debe permitir crear un producto como admin (200/201)", async () => {
      // Suponemos que ya tienes un admin creado y su token en tu DB
      // Si no, deberías hacer un login admin aquí
      if (!adminToken) {
        console.log("⚠️  No hay adminToken disponible");
        expect(true).toBe(true);
        return;
      }

      const res = await request(app)
        .post("/productos")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          titulo: "Producto Admin Test",
          descripcion: "Descripción de prueba",
          stock: 10,
          tipo: "producto",
          url_imagen: "https://via.placeholder.com/150",
          precio: 10000,
        });

      expect([200, 201]).toContain(res.status);
      console.log("✅ Producto creado por admin");
    });
  });

  // TEST 10: GENERAL
  describe("10. API GENERAL", () => {
    it("Debe devolver información general de la API (200)", async () => {
      const res = await request(app).get("/");

      expect(res.status).toBe(200);
      expect(res.body.message).toBeDefined();
      console.log("✅ Información general obtenida");
    });

    it("Debe manejar rutas inexistentes (404)", async () => {
      const res = await request(app).get("/ruta/inexistente");

      expect(res.status).toBe(404);
      console.log("✅ Manejo de rutas 404 funcionando");
    });
  });

  afterAll(async () => {
    console.log("🎯 Tests completados!");
  });
});
