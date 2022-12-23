const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/product/:id", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.post("/cart/:id", shopController.postCart);

router.post("/cart/:id/delete", shopController.deleteCart);

router.post("/cartOrder", shopController.postOrder);

router.get("/orders", shopController.getOrder);

module.exports = router;
