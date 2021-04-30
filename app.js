const express = require("express");
const { products } = require("./data");
const app = express();

app.listen(5000, () => {
  console.log("Listening on port 5000...");
});

app.get("/api/content/:productId", (req, res) => {
  const { productId } = req.params;
  const singleProduct = products.find((product) => {
    return product.id === Number(productId);
  });
  res.json(singleProduct);
});

app.use(express.static("./public"));
