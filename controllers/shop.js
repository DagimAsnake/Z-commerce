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

exports.getCart = async (req, res, next) => {
  const user = await req.user.populate("cart.items.productId");
  const products = user.cart.items;
  res.render("shop/cart", {
    products: products,
    pageTitle: "Your Cart",
    path: "/cart",
  });
};

exports.postCart = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  await req.user.addToCart(product);
  res.redirect("/cart");
};
