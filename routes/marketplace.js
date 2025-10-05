const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/cartsController.js");
const { reqAuth, reqAdmin } = require("../middlewares/auth_Admin.js");

/* Carrito & items_detalle anidados */
router.get("/carritos/me", reqAuth, cartsController.getCart);

/* Manejo de items, cantidades, lógica */
router.put("/carritos/detalle", reqAuth, cartsController.addItemCart);
router.patch("/carritos/detalle", reqAuth, cartsController.removeItemCart);
router.delete("/carritos/detalle", reqAuth, cartsController.deleteItemCart);

/* calcula: subtotal, iva, total_carrito */
router.get("/carritos/me/total", reqAuth, cartsController.getTotalCart);

/* confirma carrito, copia a Pedido  */
router.post("/pedidos/checkout", reqAuth, cartsController.checkOutCart);
router.get("/pedidos/me", reqAuth, cartsController.getUserOrders);

router.delete(
  "/carritos/admin",
  reqAuth,
  reqAdmin,
  cartsController.admin_deleteCart
);
router.put("/pedidos/admin", reqAdmin, cartsController.admin_updateOrder);
router.get(
  "/pedidos/admin",
  reqAuth,
  reqAdmin,
  cartsController.admin_getAllOrders
);

module.exports = router;

/** reqAuth se usa para proteger las rutas
 * que requieren user autenticado y reqadmin cuando se requiere el admin*/
