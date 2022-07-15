const express = require("express");
const router = express.Router();
const {products} = require("./../data/products_data")
const TEMPLATE_ENGINE = process.env.TEMPLATE_ENGINE || "ejs"


router.get("/", (req, res) => {
  console.log(products);
  res.render(`index.${TEMPLATE_ENGINE}`, { products: products });
});

router.post("/", (req, res) => {
  const title = req.body.title;
  const price = parseFloat(req.body.price);
  const thumbnail = req.body.thumbnail;

  const last_id = getLastId(products)
  products.push({id: last_id+1, title, price, thumbnail})
  res.render(`index.${TEMPLATE_ENGINE}`, { products: products, added: true });
});


function getLastId(products) {
  if (products.length === 0) return 0;
  const productos_id = products.map((p) => p.id);
  return Math.max(...productos_id);
}

module.exports = router;
