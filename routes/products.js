const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController.js");
const { reqAuth, reqAdmin } = require("../middlewares/auth&admin.js");

/* Productos */
router.get("/productos", productsController.getProducts);
router.get("/productos/:id", productsController.getProductsById);

router.post("/productos/admin", reqAuth, reqAdmin, productsController.createProduct);
router.put("/productos/admin/:id", reqAuth, reqAdmin, productsController.updateProduct);
router.delete("/productos/admin/:id", reqAuth, reqAdmin, productsController.deleteProduct);

/* Likes */
router.get("/productos/likes/:id_producto", reqAuth, productsController.getUserLikeProduct);
router.post("/productos/likes", reqAuth, productsController.addLike);
router.delete("/productos/likes", reqAuth, productsController.removeLike);

/* Resenas */
router.get("/productos/resenas", reqAuth, productsController.admin_getAllResenas);
router.get("/productos/resenas/:id", reqAuth, productsController.getResenaProduct);
router.post("/productos/resenas", reqAuth, productsController.addResena);
router.put("/productos/resenas", reqAuth, productsController.updateResena);
router.delete("/productos/resenas", reqAuth, productsController.deleteResena);


module.exports = router;
