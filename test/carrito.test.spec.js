 const request = require("supertest");
 const app = require("../server");

 let token;
 let carritoId;

 describe("Aunthentication y Carrito", () => {
   beforeAll(async () => {
     // Registrar usuario
     await request(app)
       .post("/auth/register")
       .send({ nombre: "Nuevo", email: "nuevo@test.com", password: "123456" });

     // Loguear y obtener token
     const res = await request(app)
       .post("/auth/login")
       .send({ email: "nuevo@test.com", password: "123456" });

     token = res.body.token;
   });

   it("Debe registrar un usuario nuevo (201)", async () => {
     const res = await request(app)
       .post("/auth/register")
       .send({ nombre: "Otro", email: "otro@test.com", password: "123456" });

     expect([200, 201]).toContain(res.status);
   });

   it("Debe rechazar registro con email duplicado (409)", async () => {
     const res = await request(app)
       .post("/auth/register")
       .send({ nombre: "Nuevo", email: "nuevo@test.com", password: "123456" });

     expect(res.status).toBe(409);
   });

   it("Debe loguear con credenciales válidas (200)", async () => {
     const res = await request(app)
       .post("/auth/login")
       .send({ email: "nuevo@test.com", password: "123456" });

     expect(res.status).toBe(200);
     expect(res.body.token).toBeDefined();
   });

   it("Debe rechazar login con credenciales inválidas (401)", async () => {
     const res = await request(app)
       .post("/auth/login")
       .send({ email: "nuevo@test.com", password: "malaClave" });

     expect(res.status).toBe(401);
   });

   it("Debe crear un carrito abierto (201)", async () => {
     const res = await request(app)
       .post("/auth/login")
       .set("Authorization", `Bearer ${token}`);

     expect(res.status).toBe(201);
     expect(res.body.estado).toBe("abierto");
     carritoId = res.body.id;
   });

   it("Debe rechazar crear carrito sin token (401)", async () => {
     const res = await request(app).post("/carrito");
     expect(res.status).toBe(401);
   });

   it("Debe cerrar el carrito (200)", async () => {
     const res = await request(app)
       .put(`/carrito/${carritoId}/cerrar`)
       .set("Authorization", `Bearer ${token}`);

     expect(res.status).toBe(200);
     expect(res.body.estado).toBe("cerrado");
   });


   it("Debe agregar un producto al carrito (201)", async () => {
     // Crear un nuevo carrito para este test
     const carritoRes = await request(app)
       .post("/carrito")
       .set("Authorization", `Bearer ${token}`);
     const nuevoCarritoId = carritoRes.body.id;

     const res = await request(app)
       .post(`/carrito/${nuevoCarritoId}/detalles`)
       .set("Authorization", `Bearer ${token}`)
       .send({ id_producto: 1, cantidad: 2 });

     expect(res.status).toBe(201);
     expect(res.body.id_producto).toBe(1);
     expect(res.body.cantidad).toBe(2);
   });

   it("Debe incrementar cantidad si agrego el mismo producto (200)", async () => {
     // Crear un nuevo carrito para este test
     const carritoRes = await request(app)
       .post("/carrito")
       .set("Authorization", `Bearer ${token}`);
     const nuevoCarritoId = carritoRes.body.id;

     await request(app)
       .post(`/carrito/${nuevoCarritoId}/detalles`)
       .set("Authorization", `Bearer ${token}`)
       .send({ id_producto: 1, cantidad: 2 });

     const res = await request(app)
       .post(`/carrito/${nuevoCarritoId}/detalles`)
       .set("Authorization", `Bearer ${token}`)
       .send({ id_producto: 1, cantidad: 1 });

     expect(res.status).toBe(200);
     expect(res.body.cantidad).toBe(3);
   });

   it("Debe rechazar datos inválidos (400)", async () => {
     // Crear un nuevo carrito para este test
     const carritoRes = await request(app)
       .post("/carrito")
       .set("Authorization", `Bearer ${token}`);
     const nuevoCarritoId = carritoRes.body.id;

     const res = await request(app)
       .post(`/carrito/${nuevoCarritoId}/detalles`)
       .set("Authorization", `Bearer ${token}`)
       .send({ cantidad: 1 });  falta id_producto

     expect(res.status).toBe(400);
   });

   it("Debe devolver el carrito con totales (200)", async () => {
     // Crear un nuevo carrito y agregar producto
     const carritoRes = await request(app)
       .post("/carrito")
       .set("Authorization", `Bearer ${token}`);
     const nuevoCarritoId = carritoRes.body.id;

     await request(app)
       .post(`/carrito/${nuevoCarritoId}/detalles`)
       .set("Authorization", `Bearer ${token}`)
       .send({ id_producto: 1, cantidad: 2 });

     const res = await request(app)
       .get(`/carrito/${nuevoCarritoId}`)
       .set("Authorization", `Bearer ${token}`);

     expect(res.status).toBe(200);
     expect(res.body.total).toBeGreaterThan(0);
     expect(res.body.detalles.length).toBeGreaterThan(0);
   });

   it("Debe devolver 404 si el carrito no existe", async () => {
     const res = await request(app)
       .get("/carrito/999999")
       .set("Authorization", `Bearer ${token}`);

     expect(res.status).toBe(404);
   });

   it("Debe eliminar un producto del carrito (204)", async () => {
     // Crear un nuevo carrito y agregar producto
     const carritoRes = await request(app)
       .post("/carrito")
       .set("Authorization", `Bearer ${token}`);
     const nuevoCarritoId = carritoRes.body.id;

     await request(app)
       .post(`/carrito/${nuevoCarritoId}/detalles`)
       .set("Authorization", `Bearer ${token}`)
       .send({ id_producto: 1, cantidad: 2 });

     const res = await request(app)
       .delete(`/carrito/${nuevoCarritoId}/detalles/1`)
       .set("Authorization", `Bearer ${token}`);

     expect(res.status).toBe(204);
   });

   it("Debe devolver 404 si el detalle no existe", async () => {
     // Crear un nuevo carrito
     const carritoRes = await request(app)
       .post("/carrito")
       .set("Authorization", `Bearer ${token}`);
     const nuevoCarritoId = carritoRes.body.id;

     const res = await request(app)
       .delete(`/carrito/${nuevoCarritoId}/detalles/9999`)
       .set("Authorization", `Bearer ${token}`);

     expect(res.status).toBe(404);
   });

   it("Debe devolver el historial de carritos (200)", async () => {
     const res = await request(app)
       .get("/carrito/historial")
       .set("Authorization", `Bearer ${token}`);

     expect(res.status).toBe(200);
     expect(Array.isArray(res.body)).toBe(true);
   });
 });
