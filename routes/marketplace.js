const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController.js");
const cartsController = require("../controllers/cartsController.js");

router.get("/productos", productsController.getProducts);
router.get("/productos/:id", productsController.getProductsById);
router.post("/productos/admin", productsController.createProduct);
router.put("/productos/admin/:id", productsController.updateProduct);
router.delete("/productos/admin/:id", productsController.deleteProduct);

/*

{
  "titulo": "Mancuernas 40kg",
  "descripcion": "Par ajustable",
  "stock": 10,
  "tipo": "producto",
  "url_imagen": "https://...",
  "precio": 120000
}

*/

router.get("/carritos/me", cartsController.getOrCreateCart);  // Obtiene/crea carrito abierto y reconcilia stock
router.post("/carritos/detalle", cartsController.AddItemCart); // Agrega producto al carrito (snapshot de precio)
// router.put("/carritos/detalle/:id_item", cartsController.updateCart);  // Actualiza cantidad (clamp por stock/servicio)
// router.delete("/carritos/detalle/:id_item", cartsController.deleteCart); // Elimina línea (204 idempotente) 

/*

{
  "id_producto": 3,
  "cantidad": 2
}

*/

// router.post("/pedidos", cartsController.createCart); // Confirma carrito → crea pedido, descuenta stock y cierra carrito
// router.get("/pedidos", cartsController.getCarts); // Lista mis pedidos
// router.get("/pedidos/:id", cartsController.getCart);  //Detalle (dueño o admin)
// router.put("/pedidos/admin/:id", cartsController.updateCart); // Actualizar estado (admin)

/*
PUT /pedidos/admin/{id}
Request → aquí sí se debe indicar el nuevo estado.
{
  "estado": "pagado"
}
 los demas metodos 
 {}

*/

// al tener la tabla SQL como unica, usamos delete, si queremos registros usamos PUT.
// router.get("/favoritos/", productsController.getCarts);  // Obtiene/crea carrito abierto y reconcilia stock
// router.post("/favoritos/", productsController.createCart); // Agrega producto al carrito (snapshot de precio)
// router.delete("/favoritos/:id_favorito", productsController.deleteCart);  // Elimina línea (204 idempotente)

/*
{ "id_producto": 10 }
*/

// router.get("/resenas/productos/:id_producto", productsController.getReviewsByProduct); // Listar reseñas de un producto
// router.post("/resenas/productos/:id_producto", productsController.createReview); // Crear reseña (dueño de pedido con producto entregado)
// router.put("/resenas/:id_resena", productsController.updateReview); // Actualizar reseña (dueño)
// router.delete("/resenas/:id_resena", productsController.deleteReview); // Eliminar reseña (dueño o admin)

/*
{
  "comentario": "Excelente servicio",
  "calificacion": 5
}
*/

module.exports = router;
 