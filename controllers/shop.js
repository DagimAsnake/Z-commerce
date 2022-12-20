const Product = require("../models/Product");

exports.getIndex = async (req, res, next) => {
  const products = await Product.find({});
  res.render("shop/index", {
    prods: products,
    pageTitle: "Products",
    path: "/",
  });
};

exports.getProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("shop/productDetails", {
    product: product,
    pageTitle: product.title,
    path: "/product/:id",
  });
};
