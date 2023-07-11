const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// User Schema
const userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  password1: String,
  image: String,
});

const userModel = mongoose.model("user", userSchema);

// Home Route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Signup API
app.post("/signup", async (req, res) => {
  try {
    const { email } = req.body;
    const result = await userModel.findOne({ email: email });

    if (result) {
      res.send({ message: "Email Id is Already Registered", alert: false });
    } else {
      const data = userModel(req.body);
      const save = await data.save();
      res.send({ message: "Registration Successful", alert: true });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occurred" });
  }
});

// Login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userModel.findOne({
      email: email,
      password: password,
    });

    if (result) {
      const dataSend = {
        _id: result._id,
        firstname: result.firstname,
        lastname: result.lastname,
        email: result.email,
        image: result.image,
      };
      res.send({
        message: "Logged in Successfully",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({ message: "Invalid email or password", alert: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occurred" });
  }
});

// Product Schema
const productSchema = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

const productModel = mongoose.model("product", productSchema);

// Upload Product API
app.post("/uploadproduct", async (req, res) => {
  try {
    const dataProduct = await productModel(req.body);
    const dataSave = await dataProduct.save();
    res.send({ message: "Uploaded Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occurred" });
  }
});

// Get Product API
app.get("/product", async (req, res) => {
  try {
    const data = await productModel.find({});
    res.send(JSON.stringify(data));
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occurred" });
  }
});
app.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    await productModel.findOneAndDelete(
      { _id: productId },
      { maxTimeMS: 30000 }
    );

    res.send({ message: "Product deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occurred" });
  }
});

// Checkout Payment API
app.post("/checkout-payment", async (req, res) => {
  try {
    const lineItems = req.body.map((item) => ({
      price_data: {
        currency: "NPR",
        product_data: {
          name: item.name,
        },
        unit_amount: parseInt(item.price * 100),
      },
      quantity: parseInt(item.qty),
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}success`,
      cancel_url: `${process.env.FRONTEND_URL}cancel`,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error creating checkout session" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
