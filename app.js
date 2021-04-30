const express = require("express");
const { products } = require("./data");
const app = express();

app.listen(5000, () => {
  console.log("Listening on port 5000...");
});

app.get("/api/content", (req, res) => {
  newProducts = products.map((product) => {
    const { id, name } = product;
    return { id, name };
  });
  res.json(newProducts);
});

app.use(express.static("./public"));
