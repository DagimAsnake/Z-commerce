const mongoose = require("mongoose");

const Product = require("../models/Product");

exports.getAddProduct = async (req, res, next) => {
  res.render("admin/newProduct", {
    pageTitle: "Add product",
    path: "/admin/addProduct",
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const userId = req.user;
  const newProduct = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: userId,
  });
  await newProduct.save();
  res.redirect(`/admin/products`);
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.find({});
  res.render("admin/products", {
    products: products,
    pageTitle: "Admin products",
    path: "/admin/products",
  });
};

exports.getEditProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("admin/editProduct", {
    product: product,
    pageTitle: "Edit product",
    path: "/admin/:id/edit",
  });
};

exports.postEditProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/admin/products`);
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect("/admin/products");
};
