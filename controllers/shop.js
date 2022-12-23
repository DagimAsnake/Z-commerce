const Product = require("../models/Product");
const Order = require("../models/Order");

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
  const products = await user.cart.items;
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

exports.deleteCart = async (req, res, next) => {
  const { id } = req.params;
  const deletedCart = await req.user.removeFromCart(id);
  res.redirect("/cart");
};

exports.postOrder = async (req, res, next) => {
  const user = await req.user.populate("cart.items.productId");
  const products = await user.cart.items.map((i) => {
    return { quantity: i.quantity, product: { ...i.productId._doc } };
  });
  const order = new Order({
    user: {
      name: req.user.name,
      userId: req.user,
    },
    products: products,
  });

  await order.save();
  await req.user.clearCart();
  res.redirect("/orders");
};

exports.getOrder = async (req, res, next) => {
  const orders = await Order.find({ "user.userId": req.user._id });
  res.render("shop/orders", {
    orders: orders,
    pageTitle: "Orders",
    path: "/orders",
  });
};
