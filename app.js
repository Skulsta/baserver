const express = require("express");
const path = require("path");
const { products, people } = require("./data");

const app = express();
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));

//parse json for the javascript solution
app.use(express.json());

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

app.get("/javascript", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/javascript.html"));
});

app.post("/dashboard", (req, res) => {
  const { name } = req.body;
  name ? res.send(`Welcome ${name}`) : res.send("Please provide a name");
});

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name)
    res.status(400).json({ success: false, msg: "Please provide name value" });
  res.status(201).json({ success: true, person: name });
});
