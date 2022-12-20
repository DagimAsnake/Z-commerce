const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

router.get("/addProduct", adminController.getAddProduct);

router.post("/addProduct", adminController.postAddProduct);

router.get("/products", adminController.getProducts);

router.get("/:id/edit", adminController.getEditProduct);

router.put("/:id", adminController.postEditProduct);

router.delete("/:id/deleteProduct", adminController.deleteProduct);

module.exports = router;
