const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");
const isAuth = require("../middlerware/is-auth");

router.get("/addProduct", isAuth, adminController.getAddProduct);

router.post("/addProduct", isAuth, adminController.postAddProduct);

router.get("/products", isAuth, adminController.getProducts);

router.get("/:id/edit", isAuth, adminController.getEditProduct);

router.put("/:id", isAuth, adminController.postEditProduct);

router.delete("/:id/deleteProduct", isAuth, adminController.deleteProduct);

module.exports = router;
