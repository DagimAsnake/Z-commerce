const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User");
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
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "AA",
          email: "aa@aa",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

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

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("63a5b4fd389ea5b39d098149");
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
});

app.use(shopRoutes);
app.use("/admin", adminRoutes);

app.use(errorController.get404);

app.listen(3000, () => {
  console.log("App is Listening port 3000");
});
