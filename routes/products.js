const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController.js");
const { reqAuth, reqAdmin } = require("../middlewares/auth&admin.js");

/* Likes - ESTAS RUTAS DEBEN IR ANTES DE /productos/:id */
router.get("/productos/likes", reqAuth, productsController.getLikesDelUser);
router.post("/productos/likes/:id", reqAuth, productsController.addLike);
router.delete("/productos/likes/:id", reqAuth, productsController.removeLike);

router.post(
  "/productos/admin",
  reqAuth,
  reqAdmin,
  productsController.createProduct
);
router.put(
  "/productos/admin/:id",
  reqAuth,
  reqAdmin,
  productsController.updateProduct
);
router.delete(
  "/productos/admin/:id",
  reqAuth,
  reqAdmin,
  productsController.deleteProduct
);

/* Resenas */
router.get("/resenas/:id", productsController.getResenaProduct);
router.get("/resenas", productsController.admin_getAllResenas);

router.post("/resenas/:id", reqAuth, productsController.addResena);
router.put("/resenas/:id", reqAuth, productsController.updateResena);
router.delete("/resenas/:id", reqAuth, productsController.deleteResena);

/* Producto por ID - ESTA RUTA DEBE IR AL FINAL DE LAS RUTAS DE PRODUCTOS */
router.get("/productos/:id", productsController.getProductsById);
/* Productos */
router.get("/productos", productsController.getProducts);
module.exports = router;
