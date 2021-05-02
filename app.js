const express = require("express");
const path = require("path");
const { products, people } = require("./data");

const app = express();

app.listen(5000, () => {
  console.log("Listening on port 5000...");
});

app.get("/content", (req, res) => {
  const productId = req.query.id;
  if (productId) {
    const singleProduct = products.find(
      (product) => product.id === Number(req.query.id)
    );
    return singleProduct
      ? res.json(singleProduct)
      : res.status(404).json({ success: true, data: [] });
  }
  res.json(products);
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/login.html"));
});

app.use(express.static("./public"));
