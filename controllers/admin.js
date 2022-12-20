const mongoose = require("mongoose");

const Product = require("../models/Product");

exports.getAddProduct = async (req, res, next) => {
  res.render("admin/newProduct", {
    pageTitle: "Add product",
    path: "/admin/addProduct",
  });
};

exports.postAddProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/product/${newProduct._id}`);
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
  res.redirect(`/product/${product._id}`);
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect("/admin/products");
};
