const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const methodOverride = require("method-override");

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const errorController = require("./controllers/error");

mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb://localhost:27017/Zcommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Database Error");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(shopRoutes);
app.use("/admin", adminRoutes);

app.use(errorController.get404);

app.listen(3000, () => {
  console.log("App is Listening port 3000");
});
