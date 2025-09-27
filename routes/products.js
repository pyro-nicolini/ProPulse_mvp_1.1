const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController.js");
const { reqAuth, reqAdmin } = require("../middlewares/auth&admin.js");

/* LIKES (deben ir ANTES que :id) evitando conflictos de rutas en Express */
router.get("/likes", reqAuth, productsController.getLikesDelUser);
router.post("/likes/:id", reqAuth, productsController.addLike);
router.delete("/likes/:id", reqAuth, productsController.removeLike);

/* CRUD ADMIN PRODUCTOS */
router.post("/productos/admin", reqAuth, reqAdmin, productsController.createProduct);
router.put("/productos/admin/:id", reqAuth, reqAdmin, productsController.updateProduct);
router.delete("/productos/admin/:id", reqAuth, reqAdmin, productsController.deleteProduct);

/* RESEÑAS */
router.get("/resenas", productsController.admin_getAllResenas);
router.get("/resenas/:id", productsController.getResenaProduct);
router.post("/resenas/:id", reqAuth, productsController.addResena);
router.put("/resenas/:id", reqAuth, productsController.updateResena);
router.delete("/resenas/:id", reqAuth, productsController.deleteResena);

/* PRODUCTOS */
router.get("/productos", productsController.getProducts);
router.get("/productos/:id", productsController.getProductsById);

module.exports = router;
