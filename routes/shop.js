const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");
const isAuth = require("../middlerware/is-auth");

router.get("/", shopController.getIndex);

router.get("/product/:id", shopController.getProduct);

router.get("/cart", isAuth, shopController.getCart);

router.post("/cart/:id", isAuth, shopController.postCart);

router.post("/cart/:id/delete", isAuth, shopController.deleteCart);

router.post("/cartOrder", isAuth, shopController.postOrder);

router.get("/orders", isAuth, shopController.getOrder);

module.exports = router;
