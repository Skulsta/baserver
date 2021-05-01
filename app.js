const express = require("express");
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

app.get("/api/content/:productId", (req, res) => {
  const { productId } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productId)
  );
  !singleProduct
    ? res.status(404).send("The product doesn't exsist")
    : res.json(singleProduct);
});

app.use(express.static("./public"));
