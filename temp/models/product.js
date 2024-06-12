const { error } = require("console");
const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductFromFile = (cb) => {
  fs.readFile(p, (error, fileContent) => {
    if (!error) {
      cb(JSON.parse(fileContent));
    } else {
      console.error(error);
      cb([]);
    }
  });
};

const products = [];

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (error) => {
        console.error(error);
      });
    });
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }
};
